import './styles.css';
import './template.html';
import { createBoard, attackListener, renderBoard, cleanBoard } from './Ui.js';
import { Game } from './Game.js';

const humanBoard = document.getElementById('human-board');
const computerBoard = document.getElementById('computer-board');
const randomizeShips = document.getElementById('randomize-btn');
const startGame = document.getElementById('start-game');
const popUpWinner = document.getElementById('winner');
const winnerPlayer = document.getElementById('winner-player');
const playAgain = document.getElementById('play-again');

let game = new Game();

createBoard(humanBoard);
createBoard(computerBoard);
let isShipsPlaced = false;
let isGameStarted = false;
let isComputerThinking = false;
startGame.disabled = true;

attackListener(computerBoard, (row, column) => {
    if (!isGameStarted) return;
    if (game.winner) return;
    if (isComputerThinking) return;

    const success = game.playRound(row, column);

    if (!success) return;

    renderBoard(computerBoard, game.computer.gameBoard, true);
    if (game.winner) {
        const winnerName =
            game.winner === game.human ? 'You win!' : 'Computer wins!';
        popUpWinner.classList.remove('hidden');
        winnerPlayer.textContent = winnerName;
        startGame.textContent = 'Play Again';
        return;
    }
    isComputerThinking = true;
    humanBoard.classList.remove('active');
    computerBoard.classList.add('active');

    setTimeout(() => {
        game.computerRound();
        renderBoard(humanBoard, game.human.gameBoard);

        if (game.winner) {
            const winnerName =
                game.winner === game.human ? 'You win!' : 'Computer wins!';
            popUpWinner.classList.remove('hidden');
            winnerPlayer.textContent = winnerName;
            startGame.textContent = 'Play Again';
            return;
        }

        isComputerThinking = false;
        computerBoard.classList.remove('active');
        humanBoard.classList.add('active');
    }, 200);
});

randomizeShips.addEventListener('click', () => {
    if (isGameStarted) return;
    const succes = game.replaceRandomShips();
    if (succes) {
        cleanBoard(humanBoard);
        renderBoard(humanBoard, game.human.gameBoard);
        isShipsPlaced = true;
        startGame.disabled = false;
    }
});

startGame.addEventListener('click', () => {
    if (!isShipsPlaced) return;
    if (startGame.textContent === 'Start Game') {
        isGameStarted = true;
        randomizeShips.disabled = true;
        startGame.textContent = 'Restart Game';
    } else {
        createNewGame();
    }
});

playAgain.addEventListener('click', () => {
    popUpWinner.classList.add('hidden');
    createNewGame();
});

popUpWinner.addEventListener('click', (e) => {
    if (e.target.classList.contains('winner')) {
        popUpWinner.classList.add('hidden');
    }
});

function createNewGame() {
    game = new Game();
    isShipsPlaced = false;
    isGameStarted = false;
    randomizeShips.disabled = false;
    startGame.textContent = 'Start Game';
    startGame.disabled = true;
    humanBoard.classList.remove('active');
    computerBoard.classList.remove('active');

    cleanBoard(humanBoard);
    cleanBoard(computerBoard);
}
