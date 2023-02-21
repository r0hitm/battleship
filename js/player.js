/**
 * Battleship Game
 *
 * Author: Rohit Mehta
 */
import Gameboard from "./gameboard.js";

/**
 * Player Factory Function
 * @param {string} n - name of the player
 * @param {object} g - Gameboard object
 * @returns {object} - player object
 */

const Player = n => {
    console.assert(typeof n === "string", "Player name must be a string");

    const name = n;
    let isTurn = false;
    let gameboard = Gameboard();
    gameboard.init();

    console.assert(
        typeof gameboard === "object" &&
            gameboard !== undefined &&
            gameboard !== null,
        "Gameboard is undefined"
    );

    const startTurn = _ => (isTurn = true);
    const endTurn = _ => (isTurn = false);
    const isMyTurn = _ => isTurn;

    const takeShot = (x, y) => gameboard.receiveAttack(x, y);
    const isGameOver = _ => gameboard.allShipsSunk();
    const setGameboard = g => (gameboard = g); // To let the player set their own gameboard

    // Render the player's gameboard
    // If showShips is true, show the ships on the gameboard
    const render = showShips => {
        const divPlayer = document.createElement("div");
        divPlayer.classList.add("player");

        const h3PlayerName = document.createElement("h3");
        h3PlayerName.textContent = name;
        divPlayer.appendChild(h3PlayerName);

        const divGameboard = gameboard.render(showShips);
        divGameboardWrapper.appendChild(divGameboard);

        return divPlayer;
    };

    return {
        name,
        takeShot,
        isGameOver,
        setGameboard,
        startTurn,
        endTurn,
        isMyTurn,
        render,
    };
};

export default Player;
