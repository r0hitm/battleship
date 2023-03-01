/**
 * @fileoverview This file contains the available ships for the game.
 */
import Ship from "./ship.js";

const availableShips = [
    Ship(4),
    Ship(3),
    Ship(3),
    Ship(2),
    Ship(2),
    Ship(2),
    Ship(1),
    Ship(1),
    Ship(1),
    Ship(1),
];

// Ships placed on the board presets
// Array of arrays of ships
const presets = [
    [
        { ship: Ship(3), x: 0, y: 1, isHorizontal: false },
        { ship: Ship(4), x: 2, y: 1, isHorizontal: true },
        { ship: Ship(3), x: 3, y: 4, isHorizontal: true },
        { ship: Ship(2), x: 7, y: 4, isHorizontal: false },
        { ship: Ship(1), x: 9, y: 5, isHorizontal: true },
        { ship: Ship(1), x: 1, y: 6, isHorizontal: true },
        { ship: Ship(1), x: 4, y: 6, isHorizontal: true },
        { ship: Ship(2), x: 0, y: 8, isHorizontal: true },
        { ship: Ship(2), x: 6, y: 8, isHorizontal: false },
        { ship: Ship(1), x: 8, y: 8, isHorizontal: true },
    ],
];

export { availableShips, presets };
