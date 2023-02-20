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
    expect(gameboard.shipsAt[0]).toEqual(ship);
});

test('Gameboard can avoid overlapping the ships', () => {
    const gameboard = gb();
    const ship1 = Ship(1);
    const ship2 = Ship(1);
    const x = 0;
    const y = 0;
    const isHorizontal = true;
    gameboard.placeShip(ship1, x, y, isHorizontal);
    expect(gameboard.placeShip(ship2, x, y, isHorizontal)).toBe(false);
});

test('Gameboard can avoid placing ships out of bounds', () => {
    const gameboard = gb();
    const ship = Ship(1);
    const x = 10;
    const y = 9;
    const isHorizontal = true;
    expect(gameboard.placeShip(ship, x, y, isHorizontal)).toBe(false);
});

test('Gameboard can initialize with 10 random ships', () => {
    const gameboard = gb();
    gameboard.init();
    expect(gameboard.shipsAt.length).toBe(10);
    expect(gameboard.shipsAt.every(ship => ship.length >= 1 && ship.length <= 4)).toBe(true);
});

test('Gameboard can receive attacks/ all ships have sunk', () => {
    const gameboard = gb();
    const ship = Ship(1);
    const x = 0;
    const y = 0;
    const isHorizontal = true;
    gameboard.placeShip(ship, x, y, isHorizontal);
    gameboard.receiveAttack(x, y);
    expect(gameboard.getShipAt(x, y).isSunk()).toBe(true);
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
    expect(gameboard.canPlaceShip(ship, x, y, isHorizontal)).toBe(true);
    gameboard.placeShip(ship, x, y, isHorizontal);
    expect(gameboard.canPlaceShip(ship, x, y, isHorizontal)).toBe(false);
    expect(gameboard.canPlaceShip(ship, x, y + 1, isHorizontal)).toBe(false);
    expect(gameboard.canPlaceShip(ship, x, y + 2, isHorizontal)).toBe(false);
});
