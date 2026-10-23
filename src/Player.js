import { GameBoard } from './Gameboard.js';

export class Player {
    constructor() {
        this.gameBoard = new GameBoard();
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
}
