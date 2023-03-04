/**
 * Battleship Game
 *
 * Author: Rohit Mehta
 */
import Gameboard from "./gameboard.js";
import "../css/player.css";

/**
 * Player Factory Function
 * @param {string} n - name of the player
 * @param {object} g - Gameboard object
 * @returns {object} - player object
 */

const Player = n => {
    console.assert(typeof n === "string", "Player name must be a string");

    const name = n;
    // let isTurn = false;
    let gameboard = Gameboard();
    gameboard.placeRandom();

    console.assert(
        typeof gameboard === "object" &&
            gameboard !== undefined &&
            gameboard !== null,
        "Gameboard is undefined"
    );

    // const startTurn = _ => (isTurn = true);
    // const endTurn = _ => (isTurn = false);
    // const isMyTurn = _ => isTurn;

    const receiveAttack = (x, y) => gameboard.receiveAttack(x, y);
    const isLost = _ => gameboard.allShipsSunk();
    const setGameboard = g => (gameboard = g); // To let the player set their own gameboard

    // Render the player's gameboard
    // @param {boolean} showShips - true to show ships, false to hide ships
    // @returns {object} - DOM element
    const render = (showShips = false) => {
        const divPlayer = document.createElement("div");
        divPlayer.classList.add("board-wrapper");

        const h3PlayerName = document.createElement("h3");
        h3PlayerName.textContent = name;
        divPlayer.appendChild(h3PlayerName);

        const divGameboard = gameboard.render(showShips);
        divPlayer.appendChild(divGameboard);

        return divPlayer;
    };

    return {
        name,
        receiveAttack,
        isLost,
        setGameboard,
        // startTurn,
        // endTurn,
        // isMyTurn,
        render,
    };
};

export default Player;
