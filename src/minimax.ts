import { BoardState, Player, checkForTie, checkForWinner } from "@/lib";

const EMPTY = "";
const MAX_SCORE = Infinity;
const MIN_SCORE = -Infinity;

export class Node {
    boardState: BoardState;
    children: Array<Node> = []; // array of child nodes (possible moves) for decision tree
    depth: number;
    heuristic: number = 0; // default heuristic value for leaf nodes
    move: Array<number>;
    parent: Node | null;

    constructor(boardState: BoardState, move: Array<number>, parent: Node | null = null, depth: number = 0) {
        this.boardState = boardState;
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
        depth === 8) {
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

function evaluate(boardState: BoardState, minimizer: Player, maximizer: Player) {
    if (checkForWinner(boardState, maximizer.symbol)) {
        return MAX_SCORE;
    } else if (checkForWinner(boardState, minimizer.symbol)) {
        return MIN_SCORE;
    } else if (checkForTie(boardState)) {
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
    if (checkForWinner(root.boardState, minimizer.symbol) || 
        checkForWinner(root.boardState, maximizer.symbol) || 
        depth === 0) {
        return root;
    }

    // Populate all possible moves
    root.boardState.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            if (root.boardState[rowIndex][colIndex].value === EMPTY) {
                let newBoard = structuredClone(root.boardState); // deep clone board state
                newBoard[rowIndex][colIndex] = isMaximizer ? maximizer.symbol : minimizer.symbol;

                let newNode = new Node(newBoard, [rowIndex, colIndex], root);
                newNode.heuristic = evaluate(newBoard, minimizer, maximizer) - depth;

                // Recurse to leaf nodes
                root.children.push(buildGameTree(newNode, minimizer, maximizer, !isMaximizer, depth - 1));
            }
        })
    });

    return root;
}
