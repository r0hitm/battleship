import gb from '../js/gameboard.js';
import Ship from '../js/ship.js';

test('Gameboard can place ships', () => {
    const gameboard = gb();
    const ship = Ship(1);
    const x = 0;
    const y = 0;
    const isHorizontal = true;
    expect(gameboard.placeShip(ship, x, y, isHorizontal)).toBe(true);
    expect(gameboard.shipsAt.length).toBe(1);
    expect(gameboard.placeShip(ship, x + 3, y + 3, false)).toBe(true);
    expect(gameboard.shipsAt.length).toBe(2);
});

test('Gameboard can avoid overlapping the ships', () => {
    const gameboard = gb();
    const ship = Ship(1);
    const x = 0;
    const y = 0;
    const isHorizontal = true;
    gameboard.placeShip(ship, x, y, isHorizontal);
    expect(gameboard.placeShip(ship, x, y, isHorizontal)).toBe(false);
});

test('Gameboard can receive attacks', () => {
    const gameboard = gb();
    const ship = Ship(1);
    const x = 0;
    const y = 0;
    const isHorizontal = true;
    gameboard.placeShip(ship, x, y, isHorizontal);
    gameboard.receiveAttack(x, y);
    expect(gameboard.getShipAt(x, y).isSunk()).toBe(true);
});

test('Gameboard can check if all ships have been sunk', () => {
    const gameboard = gb();
    const ship = Ship(1);
    const x = 0;
    const y = 0;
    const isHorizontal = true;
    gameboard.placeShip(ship, x, y, isHorizontal);
    expect(gameboard.allShipsSunk()).toBe(false);
    gameboard.receiveAttack(x, y);
    expect(gameboard.allShipsSunk()).toBe(true);
});

test('Gameboard can keep track of missed shots', () => {
    const gameboard = gb();
    const x = 0;
    const y = 0;
    gameboard.receiveAttack(x, y);
    expect(gameboard.getMissedShots()).toEqual([[x, y]]);
});

test('Gameboard can keep track of hit shots', () => {
    const gameboard = gb();
    const ship = Ship(1);
    const x = 0;
    const y = 0;
    const isHorizontal = true;
    gameboard.placeShip(ship, x, y, isHorizontal);
    gameboard.receiveAttack(x, y);
    expect(gameboard.getHitShots()).toEqual([[x, y]]);
});

test('Gameboard can check if a ship can be placed at a given coordinate', () => {
    const gameboard = gb();
    const ship = Ship(3);
    const x = 3;
    const y = 3;
    const isHorizontal = false;
    expect(gameboard.canPlaceShip(x, y)).toBe(true);
    gameboard.placeShip(ship, x, y, isHorizontal);
    expect(gameboard.canPlaceShip(x, y)).toBe(false);
    expect(gameboard.canPlaceShip(x, y + 1)).toBe(false);
    expect(gameboard.canPlaceShip(x, y + 2)).toBe(false);
});

test('Gameboard can retrive the ship using the given coordinates', () => {
    const gameboard = gb();
    const ship = Ship(3);
    const x = 3;
    const y = 3;
    const isHorizontal = false;
    gameboard.placeShip(ship, x, y, isHorizontal);
    // expect(gameboard.getShipAt(x, y)).toBe
    expect(gameboard.getShipAt(x, y)).toEqual(ship);
    expect(gameboard.getShipAt(x, y + 1)).toEqual(ship);
    expect(gameboard.getShipAt(x, y + 2)).toEqual(ship);
    expect(gameboard.getShipAt(x, y + 3)).toEqual(null);
});
