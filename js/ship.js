/**
 * Battleship Game
 *
 * Author: Rohit Mehta
 */

/**
 * Ship Factory Function
 * @param {natural} l - length of the ship
 * @returns {object} - ship object
 */
const Ship = l => {
    const length = l;
    console.assert(length > 0, "Ship length must be greater than 0");

    const hitCount = new Array(length).fill(false);
    const isSunk = () => hitCount.every(hit => hit);
    const hit = i => {
        if (i >= 0 && i < length) {
            hitCount[i] = true;
        }
    };
    return { length, hit, isSunk };
};

export default Ship;
