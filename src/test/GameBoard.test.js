import { test, expect } from '@jest/globals';
import { GameBoard } from '../Gameboard.js';

test('Initializes a gameboard must be an empty board', () => {
    const gameBoard = new GameBoard();
    const expectedBoard = [];
    for (let i = 0; i < 10; i++) {
        expectedBoard.push(new Array(10).fill(null));
    }

    expect(gameBoard.board).toStrictEqual(expectedBoard);
});

test('Must place a horizontal ship in thas coordenates', () => {
    const gameBoard = new GameBoard();
    gameBoard.placeShip(0, 0, 3, 'horizontal');
    expect(gameBoard.board[0][0].length).toBe(3);
    expect(gameBoard.board[0][1].length).toBe(3);
    expect(gameBoard.board[0][2].length).toBe(3);
});

test('Must place a vertical ship in thas coordenates', () => {
    const gameBoard = new GameBoard();
    gameBoard.placeShip(5, 8, 2, 'vertical');
    expect(gameBoard.board[5][8].length).toBe(2);
    expect(gameBoard.board[6][8].length).toBe(2);
});

test('it must not go beyond the boundaries of the board', () => {
    const gameBoard = new GameBoard();
    expect(gameBoard.placeShip(0, 7, 4, 'horizontal')).toBe(false);
});

test('Two ships cant colition', () => {
    const gameBoard = new GameBoard();
    // first ship
    expect(gameBoard.placeShip(0, 0, 7, 'vertical')).toBe(true);
    // second ship
    expect(gameBoard.placeShip(6, 0, 3, 'horizontal')).toBe(false);
});

test('Attack an empty cell on board', () => {
    const gameBoard = new GameBoard();
    expect(gameBoard.receiveAttack(2, 2)).toBe(true);
    expect(gameBoard.board[2][2]).toBe('miss');
});

test('Attack an occupied cell on board', () => {
    const gameBoard = new GameBoard();
    // Place a ship
    gameBoard.placeShip(0, 0, 3, 'horizontal');

    expect(gameBoard.receiveAttack(0, 2)).toBe(true);
    expect(gameBoard.board[0][2].hits).toBe(1);
});

test('Attack a cell that was attacked before', () => {
    const gameBoard = new GameBoard();

    expect(gameBoard.receiveAttack(0, 5)).toBe(true);
    expect(gameBoard.receiveAttack(0, 5)).toBe(false);
});

test('Rejects attacking the exact same ship coordinate twice', () => {
    const gameBoard = new GameBoard();
    gameBoard.placeShip(0, 0, 3, 'horizontal');

    expect(gameBoard.receiveAttack(0, 0)).toBe(true);
    expect(gameBoard.receiveAttack(0, 0)).toBe(false);
    expect(gameBoard.board[0][0].hits).toBe(1);
});

test('Are all ships sunk', () => {
    const gameBoard = new GameBoard();
    gameBoard.placeShip(0, 0, 3, 'horizontal');

    gameBoard.receiveAttack(0, 0);
    gameBoard.receiveAttack(0, 1);
    gameBoard.receiveAttack(0, 2);

    expect(gameBoard.board[0][0].hits).toBe(3);
    expect(gameBoard.board[0][1].hits).toBe(3);
    expect(gameBoard.board[0][2].hits).toBe(3);

    expect(gameBoard.areAllShipsSunk()).toBe(true);
});
