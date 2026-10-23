import { Player } from './Player.js';

export class Game {
    constructor() {
        this.human = new Player();
        this.computer = new Player();
        this.currentTurn = this.human;
        this.#placeRandomShips(this.human);
        this.#placeRandomShips(this.computer);
        this.winner = null;
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

    playRound(x, y) {
        if (this.winner) return;

        const isValidAttack = this.human.attack(x, y, this.computer.gameBoard);
        if (!isValidAttack) return;

        if (this.checkWinner()) {
            this.winner = this.human;
            return;
        }

        this.computer.attackRandom(this.human.gameBoard);

        if (this.checkWinner()) {
            this.winner = this.computer;
            return;
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
