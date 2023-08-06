import { checkForWinner, checkForTie } from "./game.js";

const EMPTY = "";
const MAX_SCORE = 10;
const MIN_SCORE = -10;

const Node = (board, move, parentNode = null) => {
    let children = []; // array of child nodes (possible moves) for decision tree
    let heuristic = 0; // defualt heuristic value for leaf nodes

    const addChild = ((child) => {
        children.push(child);
    });
    return { board, move, children, addChild, heuristic, parentNode };
};

// Minimax implementation for Tic Tac Toe
function minimax(node, depth, minimizer, maximizer, isMaximizer) {
    // win state, leaf node, or max search depth reached
    if (node.heuristic === MAX_SCORE || node.heuristic === MIN_SCORE || node.children.length === 0 || depth === 0) {
        return node.heuristic;
    }

    if (isMaximizer) {
        let bestValue = Number.NEGATIVE_INFINITY;
        node.children.forEach((child) => {
            let value = minimax(child, depth - 1, minimizer, maximizer, false);
            bestValue = Math.max(bestValue, value);
        });
        return bestValue;
    } else {
        let bestValue = Number.POSITIVE_INFINITY;
        node.children.forEach((child) => {
            let value = minimax(child, depth - 1, minimizer, maximizer, true); 
            bestValue = Math.min(bestValue, value);
        });
        return bestValue;
    }
}

function evaluate(board, minimizer, maximizer) {
    let maximizerSymbol = maximizer.getTeamSymbol();
    let minimizerSymbol = minimizer.getTeamSymbol();
    if (checkForWinner(board, maximizerSymbol)) {
        return MAX_SCORE;
    } else if (checkForWinner(board, minimizerSymbol)) {
        return MIN_SCORE;
    } else if (checkForTie(board)) {
        return 0;
    } else {
        return 0; // no winner yet
    }
}

function findBestMove(node, minimizer, maximizer) {
    let bestMove = null;
    let bestMoveValue = Number.NEGATIVE_INFINITY;
    node.children.forEach((child) => {
        let moveValue = minimax(child, child.depth, minimizer, maximizer, false);
        if (moveValue > bestMoveValue) {
            bestMoveValue = moveValue;
            bestMove = child.move;
        }
    });
    return bestMove;
}

const buildGameTree = (root, minimizer, maximizer, isMaximizer, depth = 8) => {
    let minSymbol = minimizer.getTeamSymbol();
    let maxSymbol = maximizer.getTeamSymbol();
    // Stop recursion when win state, leaf node, or max search depth reached
    if (checkForWinner(root.board, minimizer.getTeamSymbol()) || 
        checkForWinner(root.board, maximizer.getTeamSymbol()) || 
        depth === 0) {
        return root;
    }

    // Populate all possible moves
    root.board.forEach((row, rowIndex) => {
        row.forEach((col, colIndex) => {
            if (root.board[rowIndex][colIndex] === EMPTY) {
                let newBoard = JSON.parse(JSON.stringify(root.board)); // deep clone board state
                newBoard[rowIndex][colIndex] = isMaximizer ? maxSymbol : minSymbol;

                // Select player for next level
                const player = (isMaximizer ? maximizer : minimizer);

                let newNode = Node(newBoard, [rowIndex, colIndex], root);
                newNode.heuristic = evaluate(newBoard, minimizer, maximizer) - depth;

                // Recurse to leaf nodes
                root.children.push(buildGameTree(newNode, minimizer, maximizer, !isMaximizer, depth - 1));
            }
        });
    });

    return root;
}

export { Node, minimax, buildGameTree, findBestMove};
