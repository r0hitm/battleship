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
import Ship from './ship.js';

const Gameboard = _ => {
    const shipsAt = [];     // Array of ships on the gameboard
    let missedShots = [];   // Shots that missed all ships
    let hitShots = [];      // Shots that hit a ship

    // Public methods
    const placeShip = (ship, x, y, isHorizontal) => {
        // Check if ship can be placed at the given coordinate
        // If ship can be placed, add it to shipsAt
        // If ship cannot be placed, return false
    };

    const receiveAttack = (x, y) => {
        // Check if there is a ship at the given coordinate
        // If there is a ship, call the ship's hit method
        // If there is no ship, do nothing
    };

    const allShipsSunk = () => {
        // Check if all ships have been sunk
        // Return true if all ships have been sunk, false otherwise
    };

    const getMissedShots = _ => missedShots;
    const getHitShots = _ => hitShots;

    const init = _ => {
        // Place 4 ships of length 1, 3 ships of length 2, 2 ships of length 3, and 1 ship of length 4
        // Place ships randomly on the gameboard
    };

    // Private methods
    const getShipAt = (x, y) => {
        // Return the ship at the given coordinate
        // If there is no ship at the given coordinate, return false
    };

    const canPlaceShip = (ship, x, y, isHorizontal) => {
        // Check if ship can be placed at the given coordinate
        // Return true if ship can be placed, false otherwise
    };

    return {
        placeShip,
        receiveAttack,
        allShipsSunk,
        getMissedShots,
        getHitShots,
        init,
        // For testing purposes only
        getShipAt,
        canPlaceShip,
        shipsAt
    };
};

export default Gameboard;
