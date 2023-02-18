import Ship from "../js/ship.js";

test("Ship Factory Function", () => {
    const ship = Ship(3);
    expect(ship.length).toBe(3);
    expect(ship.isSunk()).toBe(false);
    ship.hit(0);
    expect(ship.isSunk()).toBe(false);
    ship.hit(1);
    expect(ship.isSunk()).toBe(false);
    ship.hit(2);
    expect(ship.isSunk()).toBe(true);
});