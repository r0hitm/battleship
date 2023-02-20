import Ship from "../js/ship.js";

test("Ship Factory Function", () => {
    const ship = Ship(3);
    expect(ship.length).toBe(3);
    expect(ship.isSunk()).toBe(false);
    ship.hit();
    expect(ship.isSunk()).toBe(false);
    ship.hit();
    expect(ship.isSunk()).toBe(false);
    ship.hit();
    expect(ship.isSunk()).toBe(true);
});