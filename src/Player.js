import { GameBoard } from './Gameboard.js';

export class Player {
    constructor(name) {
        this.name = name;
        this.gameBoard = new GameBoard();
        this.nextMoves = [];
    }

    attack(x, y, enemyBoard) {
        return enemyBoard.receiveAttack(x, y);
    }

    attackRandom(enemyBoard) {
        let x = Math.floor(Math.random() * 10);
        let y = Math.floor(Math.random() * 10);
        let attack = enemyBoard.receiveAttack(x, y);

        while (attack === false) {
            x = Math.floor(Math.random() * 10);
            y = Math.floor(Math.random() * 10);
            attack = enemyBoard.receiveAttack(x, y);
        }
    }

    smartAttack(enemyBoard) {
        let x, y;

        if (this.nextMoves.length > 0) {
            const move = this.nextMoves.shift();
            x = move.x;
            y = move.y;
        } else {
            do {
                x = Math.floor(Math.random() * 10);
                y = Math.floor(Math.random() * 10);
            } while (
                enemyBoard.missedAttacks.has(`${x},${y}`) ||
                enemyBoard.hitAttacks.has(`${x},${y}`)
            );
        }

        enemyBoard.receiveAttack(x, y);
        const coord = `${x},${y}`;

        if (enemyBoard.hitAttacks.has(coord)) {
            const ship = enemyBoard.board[x][y];

            if (ship.isSunk()) {
                this.nextMoves = [];
            } else {
                this.#addAdjacentMoves(x, y, enemyBoard);
            }
        }
    }

    #addAdjacentMoves(x, y, enemyBoard) {
        const potentialMoves = [
            { x: x - 1, y: y }, // Arriba
            { x: x + 1, y: y }, // Abajo
            { x: x, y: y - 1 }, // Izquierda
            { x: x, y: y + 1 }, // Derecha
        ];

        for (const move of potentialMoves) {
            if (move.x >= 0 && move.x < 10 && move.y >= 0 && move.y < 10) {
                const moveStr = `${move.x},${move.y}`;
                if (
                    !enemyBoard.missedAttacks.has(moveStr) &&
                    !enemyBoard.hitAttacks.has(moveStr)
                ) {
                    const isAlreadyInList = this.nextMoves.some(
                        (m) => m.x === move.x && m.y === move.y
                    );
                    if (!isAlreadyInList) {
                        this.nextMoves.push(move);
                    }
                }
            }
        }
    }

    getName() {
        return this.name;
    }
}
