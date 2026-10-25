import { Ship } from './Ship.js';

export class GameBoard {
    constructor() {
        this.board = this.#createBoard();
        this.missedAttacks = new Set();
        this.hitAttacks = new Set();
        this.ships = [];
    }

    #createBoard() {
        let board = [];
        for (let i = 0; i < 10; i++) {
            board.push(new Array(10).fill(null));
        }
        return board;
    }

    placeShip(row, column, length, direction) {
        // Check of its possible place a ship there
        const isPossible = this.#checkIfItsPossiblePlaceAShip(
            row,
            column,
            length,
            direction
        );
        if (!isPossible) {
            return false;
        }
        const shipToPlace = new Ship(length);
        this.ships.push(shipToPlace);

        if (direction === 'horizontal') {
            for (let i = 0; i < length; i++) {
                this.board[row][column] = shipToPlace;
                column++;
            }
        } else if (direction === 'vertical') {
            for (let i = 0; i < length; i++) {
                this.board[row][column] = shipToPlace;
                row++;
            }
        }

        return true;
    }

    #checkIfItsPossiblePlaceAShip(row, column, length, direction) {
        if (direction === 'horizontal') {
            for (let i = 0; i < length; i++) {
                if (column >= 10) {
                    return false;
                }
                if (this.board[row][column] !== null) {
                    return false;
                }
                column++;
            }
        } else if (direction === 'vertical') {
            for (let i = 0; i < length; i++) {
                if (row >= 10) {
                    return false;
                }
                if (this.board[row][column] !== null) {
                    return false;
                }
                row++;
            }
        }
        return true;
    }

    receiveAttack(x, y) {
        if (this.missedAttacks.has(`${x},${y}`)) {
            return false;
        }
        const cellAttacked = this.board[x][y];
        if (cellAttacked === null) {
            this.board[x][y] = 'miss';
        } else if (typeof cellAttacked === 'object') {
            this.board[x][y].hit();
            this.hitAttacks.add(`${x},${y}`);
        } else {
            return false;
        }
        this.missedAttacks.add(`${x},${y}`);
        return true;
    }

    areAllShipsSunk() {
        return this.ships.every((ship) => ship.isSunk());
    }
}
