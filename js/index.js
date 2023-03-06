/**
 * BattleShip Game
 *
 * Author: Rohit Mehta
 */
import "../css/index.css";
import Player from "./player.js";
import messages from "./messages.json";

// import Gameboard from "./gameboard.js";
// import Ship from "./ship.js";
// import {presets} from "./availableShips.js";
const typingSpeed = 40; // ms

let playing = false; // Is the game currently running?
const players = { human: null, computer: null };
const computerAttackQueue = [];

// Accessing DOM elements
const status = document.querySelector("#status");
const playerBoard = document.querySelector("#player");
const computerBoard = document.querySelector("#computer");
const playBtn = document.querySelector("#play");

// helper functions:
const delay = ms => new Promise(res => setTimeout(res, ms));

// Initialize the game
const init = _ => {
    console.assert(playing === false, "Game is already running");
    console.assert(players.human === null, "Human player already exists");
    console.assert(players.computer === null, "Computer player already exists");
    // const playerName = prompt("Enter your name: ", "Human");
    const playerName = "Human"; // TODO: Remove this line

    // Creating Player and Computer objects
    const human = Player(playerName);
    human.startTurn();
    const comp = Player("Computer");
    playing = true;
    players.human = human;
    players.computer = comp;

    displayMessage(messages.gameStart);
    updateGameboard();
};

// TODO: !!!
// Assume:
// Player has set their own gameboard (user input)
// Computer has set their own gameboard (randomly)

const updateGameboard = _ => {
    // console.log("Updating gameboard");
    playerBoard.innerHTML = "";
    playerBoard.appendChild(players.human.render(true));
    computerBoard.innerHTML = "";
    computerBoard.appendChild(players.computer.render(true)); // TODO: change to false
};

// Displays text messages to the user
// With character by character typing effect
// @param {string} message - message to be displayed
const displayMessage = (message, i = 0) => {
    if (i < message.length) {
        if (i === 0) status.textContent = ""; // clear previous message
        status.textContent += message.charAt(i);
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

        await delay(3000);

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
        init();
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
