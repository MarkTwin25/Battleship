import { test, expect } from '@jest/globals';
import { Ship } from '../Ship.js';

test('Create a new Ship of legth n', () => {
    const ship = new Ship(3);

    expect(ship.length).toBe(3);
    expect(ship.hits).toBe(0);
    expect(ship.isSunk()).toBe(false);
});

test('Ship must be hit and increase its hits', () => {
    const ship = new Ship(3);
    ship.hit();
    expect(ship.hits).toBe(1);
});

test('Ship is Sunk when hits = its length', () => {
    const ship = new Ship(3);
    ship.hit();
    ship.hit();
    // Is not sunk yet
    expect(ship.isSunk()).toBe(false);
    ship.hit();
    expect(ship.isSunk()).toBe(true);
});
