/**
 * BattleShip Game
 *
 * Author: Rohit Mehta
 *
 *
 * Gameboard Factory Function
 * @returns {object} - gameboard object
 *
 * A gameboard is a 10x10 grid of squares, where each square is either empty or has a ship.
 * A ship can be of length 1, 2, 3, or 4. A ship can be placed horizontally or vertically.
 * In this implementation, the gameboard only stores the ships, not the empty squares.
 * Note 1: Always place ships from left to right or top to bottom.
 * Note 2: Ships cannot overlap.
 *
 * Each ship is stored as an object with the following properties:
 *  - ship: the ship object
 * - x: the x coordinate of the ship's leftmost square
 * - y: the y coordinate of the ship's topmost square
 * - isHorizontal: true if the ship is horizontal, false if vertical
 *
 */
import { presets } from "./availableShips.js";

const Gameboard = _ => {
    let shipsAt = []; // Array of ships on the gameboard
    let missedShots = []; // Shots that missed all ships
    let hitShots = []; // Shots that hit a ship

    // Public methods
    // Place a ship on the gameboard
    // Return true if ship was placed, false otherwise
    const placeShip = (ship, x, y, isHorizontal) => {
        console.assert(
            typeof ship === "object" && ship !== null,
            "Ship must be an object"
        );
        console.assert(
            typeof ship.length === "number" && ship.length > 0,
            "Ship length must be a positive number"
        );
        console.assert(
            typeof ship.hit === "function" && ship.hasOwnProperty("hit"),
            "Ship must have a hit() method"
        );
        console.assert(
            typeof ship.isSunk === "function" && ship.hasOwnProperty("isSunk"),
            "Ship must have an isSunk() method"
        );
        console.assert(x >= 0 && x < 10, "x must be between 0 and 9");
        console.assert(
            isHorizontal === true || isHorizontal === false,
            "isHorizontal must be true or false"
        );

        if (!canPlaceShip(x, y)) {
            return false;
        }
        shipsAt.push({ ship, x, y, isHorizontal });
        return true;
    };

    // Receive an attack at the given coordinate
    // If there is a ship at the given coordinate, call the ship's hit method and return true
    // If there is no ship at the given coordinate, return false
    const receiveAttack = (x, y) => {
        console.assert(x >= 0 && x < 10, "x must be between 0 and 9");
        console.assert(y >= 0 && y < 10, "y must be between 0 and 9");

        const ship = getShipAt(x, y);
        if (ship) {
            ship.hit();
            hitShots.push([x, y]);
            return true;
        } else {
            missedShots.push([x, y]);
            return false;
        }
    };

    // Return true if all ships have been sunk, false otherwise
    const allShipsSunk = () => {
        return shipsAt.every(s => s.ship.isSunk());
    };

    const getMissedShots = _ => missedShots;
    const getHitShots = _ => hitShots;

    // place random ships on the gameboard
    const placeRandom = _ => {
        shipsAt = presets[Math.floor(Math.random() * presets.length)];
    };

    // render the gameboard
    // showShips: true to show ships, false to hide ships
    const render = showShips => {
        const board = document.createElement("div");
        board.classList.add("board");

        const boardArray = convertToFlatArray();
        console.assert(
            boardArray.length === 100,
            "Board array must be 100 elements long"
        );
        for (let i = 0; i < boardArray.length; i++) {
            const square = document.createElement("div");
            square.classList.add("square");
            square.setAttribute("data-index", i);

            if (boardArray[i] === "X") {
                square.classList.add("hit");
            } else if (boardArray[i] === "O") {
                square.classList.add("miss");
            } else if (showShips && boardArray[i] === "ship") {
                square.classList.add("ship");
            }

            board.appendChild(square);
        }
        return board;
    };

    // Private methods
    // Return the ship at the given coordinate
    const getShipAt = (x, y) => {
        for (let i = 0; i < shipsAt.length; i++) {
            const s = shipsAt[i];
            if (s.isHorizontal) {
                if (s.y === y && s.x <= x && x < s.x + s.ship.length) {
                    return s.ship;
                }
            } else {
                if (s.x === x && s.y <= y && y < s.y + s.ship.length) {
                    return s.ship;
                }
            }
        }
        return null;
    };

    // Return true if ship can be placed at the given coordinate, false otherwise
    const canPlaceShip = (x, y) => {
        const ship = getShipAt(x, y);
        return ship === null;
    };

    // Return a flat array of 100 elements, where each element is:
    // - "ship" if there is a ship at that coordinate
    // - "O" if there is a miss at that coordinate
    // - "X" if there is a hit at that coordinate
    // - false if there is nothing at that coordinate
    const convertToFlatArray = _ => {
        const arr = new Array(100).fill(false);
        console.assert(
            arr.length === 100,
            "In covertToFlatArray arr does not have 100 elements"
        );
        for (let i = 0; i < shipsAt.length; i++) {
            const s = shipsAt[i];
            if (s.isHorizontal) {
                for (let j = 0; j < s.ship.length; j++) {
                    arr[s.y * 10 + s.x + j] = "ship";
                }
            } else {
                for (let j = 0; j < s.ship.length; j++) {
                    arr[(s.y + j) * 10 + s.x] = "ship";
                }
            }
        }
        for (let i = 0; i < missedShots.length; i++) {
            const [x, y] = missedShots[i];
            arr[y * 10 + x] = "O";
        }
        for (let i = 0; i < hitShots.length; i++) {
            const [x, y] = hitShots[i];
            arr[y * 10 + x] = "X";
        }
        return arr;
    };

    return {
        placeShip,
        receiveAttack,
        allShipsSunk,
        getMissedShots,
        getHitShots,
        placeRandom,
        render,
        // For testing purposes only
        // getShipAt,
        // canPlaceShip,
        // shipsAt,
    };
};

export default Gameboard;
