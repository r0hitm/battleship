/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 484:
/***/ ((module) => {

module.exports = {"gameStart":"Your ships are ready, commander. Begin the attack when ready.","humanTurn":"Attack, commander.","computerTurn":"Incoming enemy attack, commander.","humanWon":"You Won, commander ^_^","computerWon":"You Lost, commander :(","rearrange":"Rearrange your ships.","outOfShips":"You have no more ships to place.","humanMiss":"You Missed. Enemy's turn!","computerMiss":"Enemy Missed. Your turn!"}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";

;// CONCATENATED MODULE: ./js/ship.js
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
    const hit = _ => {
        if (isSunk()) {
            return false;
        }
        hitCount++;
        return true;
    };
    return { length, hit, isSunk };
};

/* harmony default export */ const ship = (Ship);

;// CONCATENATED MODULE: ./js/availableShips.js
/**
 * @fileoverview This file contains the available ships for the game.
 */


const availableShips = [
    ship(4),
    ship(3),
    ship(3),
    ship(2),
    ship(2),
    ship(2),
    ship(1),
    ship(1),
    ship(1),
    ship(1),
];

// Ships placed on the board presets
// Array of arrays of ships
const presets = [
    [
        { ship: ship(3), x: 0, y: 1, isHorizontal: false },
        { ship: ship(4), x: 2, y: 1, isHorizontal: true },
        { ship: ship(3), x: 3, y: 4, isHorizontal: true },
        { ship: ship(2), x: 7, y: 4, isHorizontal: false },
        { ship: ship(1), x: 9, y: 5, isHorizontal: true },
        { ship: ship(1), x: 1, y: 6, isHorizontal: true },
        { ship: ship(1), x: 4, y: 6, isHorizontal: true },
        { ship: ship(2), x: 0, y: 8, isHorizontal: true },
        { ship: ship(2), x: 6, y: 8, isHorizontal: false },
        { ship: ship(1), x: 8, y: 8, isHorizontal: true },
    ],
    [
        { ship: ship(1), x: 7, y: 0, isHorizontal: true },
        { ship: ship(3), x: 1, y: 1, isHorizontal: false },
        { ship: ship(2), x: 3, y: 1, isHorizontal: true },
        { ship: ship(4), x: 4, y: 3, isHorizontal: true },
        { ship: ship(1), x: 3, y: 5, isHorizontal: true },
        { ship: ship(2), x: 0, y: 6, isHorizontal: true },
        { ship: ship(2), x: 6, y: 6, isHorizontal: false },
        { ship: ship(1), x: 9, y: 6, isHorizontal: false },
        { ship: ship(1), x: 3, y: 9, isHorizontal: true },
        { ship: ship(1), x: 9, y: 2, isHorizontal: true },
    ],
    [
        { ship: ship(1), x: 6, y: 0, isHorizontal: true },
        { ship: ship(1), x: 8, y: 0, isHorizontal: true },
        { ship: ship(1), x: 4, y: 1, isHorizontal: true },
        { ship: ship(3), x: 0, y: 2, isHorizontal: true },
        { ship: ship(2), x: 6, y: 2, isHorizontal: false },
        { ship: ship(2), x: 4, y: 3, isHorizontal: false },
        { ship: ship(4), x: 2, y: 4, isHorizontal: false },
        { ship: ship(1), x: 0, y: 6, isHorizontal: true },
        { ship: ship(2), x: 4, y: 6, isHorizontal: false },
        { ship: ship(3), x: 6, y: 7, isHorizontal: false },
    ],
    [
        { ship: ship(2), x: 1, y: 0, isHorizontal: false },
        { ship: ship(3), x: 5, y: 0, isHorizontal: false },
        { ship: ship(1), x: 9, y: 0, isHorizontal: true },
        { ship: ship(1), x: 1, y: 3, isHorizontal: true },
        { ship: ship(2), x: 4, y: 5, isHorizontal: false },
        { ship: ship(1), x: 6, y: 5, isHorizontal: true },
        { ship: ship(3), x: 0, y: 6, isHorizontal: true },
        { ship: ship(1), x: 7, y: 7, isHorizontal: true },
        { ship: ship(4), x: 2, y: 8, isHorizontal: true },
        { ship: ship(2), x: 7, y: 9, isHorizontal: true },
    ],
];



;// CONCATENATED MODULE: ./js/gameboard.js
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

        if (isMissedShot(x, y) || isHitShot(x, y)) {
            return false;
        }

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
        // const presetCopy = presets.slice();
        const randomIndex = Math.floor(Math.random() * presets.length);
        // shipsAt = presetCopy[randomIndex];
        // Using slice makes a copy of the array, so we don't modify the original presets array
        // don't know if this is necessary
        shipsAt = presets.slice(randomIndex, randomIndex + 1)[0]; // get a random preset
    };

    // render the gameboard
    // showShips: true to show ships, false to hide ships
    // userAttackable: true if the user can attack this gameboard, false otherwise
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

    const isMissedShot = (x, y) => {
        for (let i = 0; i < missedShots.length; i++) {
            const [mx, my] = missedShots[i];
            if (mx === x && my === y) {
                return true;
            }
        }
        return false;
    };

    const isHitShot = (x, y) => {
        for (let i = 0; i < hitShots.length; i++) {
            const [hx, hy] = hitShots[i];
            if (hx === x && hy === y) {
                return true;
            }
        }
        return false;
    };

    // clear the gameboard
    const clear = _ => {
        shipsAt = [];
        missedShots = [];
        hitShots = [];
    };

    return {
        placeShip,
        receiveAttack,
        allShipsSunk,
        getMissedShots,
        getHitShots,
        placeRandom,
        render,
        isHitShot,
        isMissedShot,
        clear,
        // For testing purposes only
        // getShipAt,
        // canPlaceShip,
        // shipsAt,
    };
};

/* harmony default export */ const js_gameboard = (Gameboard);

;// CONCATENATED MODULE: ./js/player.js
/**
 * Battleship Game
 *
 * Author: Rohit Mehta
 */



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
    let gameboard = js_gameboard();
    gameboard.placeRandom();

    console.assert(
        typeof gameboard === "object" &&
            gameboard !== undefined &&
            gameboard !== null,
        "Gameboard is undefined"
    );

    const startTurn = _ => (isTurn = true);
    const endTurn = _ => (isTurn = false);
    const isMyTurn = _ => isTurn;

    const receiveAttack = (x, y) => gameboard.receiveAttack(x, y);
    const isLost = _ => gameboard.allShipsSunk();
    const setGameboard = g => (gameboard = g); // To let the player set their own gameboard
    const getGameboard = _ => gameboard;

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
        getGameboard,
        startTurn,
        endTurn,
        isMyTurn,
        render,
    };
};

/* harmony default export */ const player = (Player);

// EXTERNAL MODULE: ./js/messages.json
var messages = __webpack_require__(484);
;// CONCATENATED MODULE: ./js/index.js
/**
 * BattleShip Game
 *
 * Author: Rohit Mehta
 */






// import Ship from "./ship.js";

const typingSpeed = 40; // ms

let playing = false; // Is the game currently running?
const players = { human: null, computer: null };
const computerAttackQueue = [];

// Accessing DOM elements
const js_status = document.querySelector("#status");
const playerBoard = document.querySelector("#player");
const computerBoard = document.querySelector("#computer");
const playBtn = document.querySelector("#play");

// Accessing Overlay DOM elements
const overlayWrapper = document.querySelector(".overlay-wrapper");
// const inputBoard = document.querySelector("#input-board");
const inputBoardSq = Array.from(
    document.querySelectorAll("#input-board .square")
);
// console.log(inputBoardSq);
const shipParameters = {
    currentShipIndex: 0,
    currentShipLength: 0,
    currentShipOrientation: "X",
    currentShipPlaced: false,
    // currentShipPosition: -1, // 0 - 99
};
const switchBtn = document.querySelector("#switch");
const shipPlacementIndicator = {
    direction: document.querySelector("#placing-direction"),
    length: document.querySelector("#ship-length"),
};
const randomizeBtn = document.querySelector("#randomize");
const clearBtn = document.querySelector("#clear");

const clearGameboard = _ => {
    shipParameters.currentShipIndex = 0;
    // shipParameters.currentShipLength = 0;
    shipParameters.currentShipOrientation = "X";
    shipParameters.currentShipPlaced = false;
    // shipParameters.currentShipPosition = -1;

    inputBoardSq.forEach(sq => {
        sq.classList.remove("ship");
    });
};

// Play button event listener // Overlay event listeners
const play = _ => {
    // init();
    const gb = js_gameboard();
    // inputBoard.appendChild(gb.render(true));

    overlayWrapper.classList.remove("hidden");

    randomizeBtn.addEventListener("click", _ => init());
    clearBtn.addEventListener("click", clearGameboard);

    inputBoardSq.forEach(sq => {
        sq.addEventListener("click", e => {
            const index = parseInt(sq.getAttribute("data-index"));
            const x = index % 10;
            const y = Math.floor(index / 10);
            const ship = availableShips[shipParameters.currentShipIndex];
            const isHorizontal = shipParameters.currentShipOrientation === "X";
            shipParameters.currentShipPlaced = gb.placeShip(
                ship,
                x,
                y,
                isHorizontal
            );

            if (shipParameters.currentShipPlaced) {
                // Update the UI
                if (isHorizontal) {
                    for (let j = 0; j < ship.length; j++) {
                        inputBoardSq[y * 10 + x + j].classList.add("ship");
                    }
                } else {
                    for (let j = 0; j < ship.length; j++) {
                        inputBoardSq[(y + j) * 10 + x].classList.add("ship");
                    }
                }

                // update the shipParameters object
                shipParameters.currentShipIndex++;
                if (shipParameters.currentShipIndex === availableShips.length) {
                    // All ships have been placed
                    init(gb);
                    return;
                }
                shipParameters.currentShipPlaced = false;
                shipPlacementIndicator.length.textContent =
                    availableShips[shipParameters.currentShipIndex].length;
            }
        });
    });
    switchBtn.addEventListener("click", e => {
        if (shipParameters.currentShipOrientation === "X") {
            shipParameters.currentShipOrientation = "Y";
            shipPlacementIndicator.direction.textContent = "Vertical";
        } else {
            shipParameters.currentShipOrientation = "X";
            shipPlacementIndicator.direction.textContent = "Horizontal";
        }
    });

    shipPlacementIndicator.length.textContent =
        availableShips[shipParameters.currentShipIndex].length;
};

// helper functions:
const delay = ms => new Promise(res => setTimeout(res, ms));

/**
 * Initializes the game
 * @param {humanBoard}  Gameboard object - optional for human player
 */
const init = (humanBoard = null) => {
    console.assert(playing === false, "Game is already running");
    console.assert(players.human === null, "Human player already exists");
    console.assert(players.computer === null, "Computer player already exists");
    overlayWrapper.classList.add("hidden");

    const playerName = prompt("Enter your name: ", "Human");
    // const playerName = "Human"; // For testing

    // Creating Player and Computer objects
    const human = player(playerName);
    if (humanBoard !== null) human.setGameboard(humanBoard);
    human.startTurn();
    const comp = player("Computer");
    playing = true;
    players.human = human;
    players.computer = comp;

    displayMessage(messages.gameStart);
    updateGameboard();
};

const updateGameboard = _ => {
    // console.log("Updating gameboard");
    playerBoard.innerHTML = "";
    playerBoard.appendChild(players.human.render(true));
    computerBoard.innerHTML = "";
    computerBoard.appendChild(players.computer.render(false)); // Hide computer's ships.
};

// Displays text messages to the user
// With character by character typing effect
// @param {string} message - message to be displayed
const displayMessage = (message, i = 0) => {
    if (i < message.length) {
        if (i === 0) js_status.textContent = ""; // clear previous message
        js_status.textContent += message.charAt(i);
        setTimeout(displayMessage, typingSpeed, message, i + 1);
    }
};

async function gameLoop(clickEvent) {
    if (!playing) return;
    console.assert(
        players.human !== null && players.computer !== null,
        "Players are not initialized"
    );

    const square = parseInt(clickEvent.target.getAttribute("data-index"));
    console.assert(
        square !== null,
        "Issue with retrieving data-index attribute"
    );
    if (square === null) return; // click and drag usually causes this

    if (players.human.isMyTurn()) {
        players.human.endTurn();
        let attackStatus = false;
        const cx = square % 10;
        const cy = Math.floor(square / 10);
        // console.log(`Player clicked on square ${x}, ${y}`);

        // Computer takes damage
        attackStatus = players.computer.receiveAttack(cx, cy);
        updateGameboard();
        if (attackStatus) {
            // console.log("Computer takes damage", { attackStatus });
            // does computer lose? -> end game
            if (players.computer.isLost()) {
                console.log("Computer lost");
                playing = false; // end game
                displayMessage(messages.humanWon);
                return;
            }

            displayMessage(messages.computerTurn);
            attackStatus = false; // reset attackStatus
        } else {
            // Player misses
            displayMessage(messages.humanMiss);
        }

        await delay(2500);

        // player takes damage
        players.computer.startTurn();
        const i = Math.floor(Math.random() * 100);
        let hx = i % 10;
        let hy = Math.floor(i / 10);
        if (computerAttackQueue.length > 0) {
            const el = computerAttackQueue.shift();
            hx = el[0];
            hy = el[1];
        }
        attackStatus = players.human.receiveAttack(hx, hy);
        updateGameboard();
        if (attackStatus) {
            // console.log("Human takes damage", { attackStatus });
            const nextMoves = [
                [hx - 1, hy],
                [hx, hy - 1],
                [hx + 1, hy],
                [hx, hy + 1],
            ].filter(m => {
                const x = m[0];
                const y = m[1];
                return (
                    x >= 0 &&
                    x < 10 &&
                    y >= 0 &&
                    y < 10 &&
                    !players.human.getGameboard().isMissedShot(x, y) &&
                    !players.human.getGameboard().isHitShot(x, y)
                );
            });
            computerAttackQueue.push(...nextMoves);

            // does player lose? -> end game
            if (players.human.isLost()) {
                console.log("Player lost");
                playing = false; // end game
                displayMessage(messages.computerWon);
                return;
            }

            displayMessage(messages.humanTurn);
            // attackStatus = false;   // reset attackStatus
        } else {
            // Computer misses
            displayMessage(messages.computerMiss);
        }

        players.computer.endTurn();
        players.human.startTurn();
    }
}

// Event listeners
playBtn.addEventListener("click", _ => {
    const startGameText = playBtn.textContent;
    if (startGameText === "Play") {
        play();
        playBtn.textContent = "Restart";
    } else if (startGameText === "Restart") {
        window.location.reload();
    } else {
        console.error("Impossible Error: Invalid button text");
    }
});

// Game loop follows the player's turn
// which is fired by player when they click on computer's board
// user turn -> computer turn -> user turn -> computer turn -> ...
computerBoard.addEventListener("click", gameLoop);

})();

/******/ })()
;