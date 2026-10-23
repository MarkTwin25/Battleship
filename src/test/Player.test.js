import { test, expect } from '@jest/globals';
import { Player } from '../Player.js';

test('Human player attacks and fails', () => {
    const player = new Player();
    const computer = new Player();

    player.attack(0, 0, computer.gameBoard);
    expect(computer.gameBoard.board[0][0]).toBe('miss');
});

test('Human player attacks and hit', () => {
    const player = new Player();
    const computer = new Player();
    computer.gameBoard.placeShip(0, 0, 3, 'vertical');

    player.attack(0, 0, computer.gameBoard);
    expect(computer.gameBoard.board[0][0].hits).toBe(1);
    expect(computer.gameBoard.board[1][0].hits).toBe(1);
    expect(computer.gameBoard.board[2][0].hits).toBe(1);
});

test('Human player attacks and sunk', () => {
    const player = new Player();
    const computer = new Player();
    computer.gameBoard.placeShip(0, 0, 3, 'vertical');

    player.attack(0, 0, computer.gameBoard);
    player.attack(1, 0, computer.gameBoard);
    player.attack(2, 0, computer.gameBoard);
    expect(computer.gameBoard.board[0][0].hits).toBe(3);
    expect(computer.gameBoard.board[1][0].hits).toBe(3);
    expect(computer.gameBoard.board[2][0].hits).toBe(3);

    expect(computer.gameBoard.areAllShipsSunk()).toBe(true);
});

test('Computer player attacks', () => {
    const player = new Player();
    const computer = new Player();

    computer.attackRandom(player.gameBoard);
    expect(player.gameBoard.missedAttacks.size).toBe(1);
});
