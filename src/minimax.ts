import { Board, BoardState, Player, checkForTie, checkForWinner } from "@/lib";

const EMPTY = "";
const MAX_SCORE = 10;
const MIN_SCORE = -10;

export class Node {
    board: Board;
    children: Array<Node> = []; // array of child nodes (possible moves) for decision tree
    depth: number;
    heuristic: number = 0; // default heuristic value for leaf nodes
    move: Array<number>;
    parent: Node | null;

    constructor(board: Board, move: Array<number>, parent: Node | null = null, depth: number = 0) {
        this.board = board;
        this.depth = depth;
        this.move = move; // position on the board where a symbol is placed
        this.parent = parent; // null parent indicates root node
    }

    addChild(child: Node) {
        this.children.push(child);
    }
};

// Minimax implementation for Tic Tac Toe
function minimax(node: Node, depth: number, minimizer: Player, maximizer: Player, isMaximizer: boolean) {
    // Win state, leaf node, or max search depth reached
    if (node.heuristic === MAX_SCORE ||
        node.heuristic === MIN_SCORE ||
        node.children.length === 0 ||
        depth === 0) {
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

function evaluate(board: Board, minimizer: Player, maximizer: Player) {
    if (checkForWinner(board.boardState, maximizer.symbol)) {
        return MAX_SCORE;
    } else if (checkForWinner(board.boardState, minimizer.symbol)) {
        return MIN_SCORE;
    } else if (checkForTie(board.boardState)) {
        return 0;
    } else {
        return 0; // no winner yet
    }
}

export function findBestMove(node: Node, minimizer: Player, maximizer: Player) {
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

export function buildGameTree(
    root: Node,
    minimizer: Player,
    maximizer: Player,
    isMaximizer: boolean,
    depth = 8) {
    // Stop recursion when win state, leaf node, or max search depth reached
    console.log("gameTree board:", root.board.boardState)
    if (checkForWinner(root.board.boardState, minimizer.symbol) || 
        checkForWinner(root.board.boardState, maximizer.symbol) || 
        depth === 0) {
        return root;
    }

    // Populate all possible moves
    root.board.boardState.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            if (root.board.boardState[rowIndex][colIndex].value === EMPTY) {
                // let newBoard = JSON.parse(JSON.stringify(root.board.boardState)); // deep clone board state
                let newBoard = structuredClone(root.board); // deep clone board state
                newBoard.boardState[rowIndex][colIndex] = isMaximizer ? maximizer.symbol : minimizer.symbol;

                // Select player for next level
                const player = (isMaximizer ? maximizer : minimizer);

                let newNode = new Node(newBoard, [rowIndex, colIndex], root);
                newNode.heuristic = evaluate(newBoard, minimizer, maximizer) - depth;

                // Recurse to leaf nodes
                root.children.push(buildGameTree(newNode, minimizer, maximizer, !isMaximizer, depth - 1));
            }

        })
    });

    return root;
}
