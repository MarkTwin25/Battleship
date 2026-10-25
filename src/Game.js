import { GameBoard } from './Gameboard.js';
import { Player } from './Player.js';

export class Game {
    constructor() {
        this.human = new Player('Player');
        this.computer = new Player('Computer');
        this.currentTurn = this.human;
        this.#placeRandomShips(this.human);
        this.#placeRandomShips(this.computer);
        this.winner = null;
        this.isGameStarted = false;
    }

    #placeRandomShips(player) {
        const shipsLengths = [1, 2, 3, 4];

        for (const ship of shipsLengths) {
            let x = Math.floor(Math.random() * 10);
            let y = Math.floor(Math.random() * 10);
            let direction = ['horizontal', 'vertical'][
                Math.floor(Math.random() * 2)
            ];

            while (!player.gameBoard.placeShip(x, y, ship, direction)) {
                x = Math.floor(Math.random() * 10);
                y = Math.floor(Math.random() * 10);
                direction = ['horizontal', 'vertical'][
                    Math.floor(Math.random() * 2)
                ];
            }
        }
    }

    replaceRandomShips() {
        if (this.isGameStarted) return false;
        this.human.gameBoard = new GameBoard();
        this.#placeRandomShips(this.human);
        return true;
    }

    playRound(x, y) {
        if (this.winner) return false;

        const isValidAttack = this.human.attack(x, y, this.computer.gameBoard);
        this.isGameStarted = true;

        if (!isValidAttack) return false;

        if (this.checkWinner()) {
            this.winner = this.human;
        }
        return true;
    }
    computerRound() {
        if (this.winner) return false;
        this.computer.smartAttack(this.human.gameBoard);

        if (this.checkWinner()) {
            this.winner = this.computer;
        }
    }

    checkWinner() {
        if (
            this.computer.gameBoard.areAllShipsSunk() ||
            this.human.gameBoard.areAllShipsSunk()
        ) {
            return true;
        } else {
            return false;
        }
    }
}
