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

    let hitCount = 0;
    const isSunk = _ => hitCount === length;
    const hit = _ => hitCount++;
    return { length, hit, isSunk };
};

export default Ship;
