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

import availableShips from "./availableShips.js";

let playing = false; // Is the game currently running?
const players = { human: null, computer: null };

// Accessing DOM elements
const status = document.querySelector("#status");
const playerBoard = document.querySelector("#player");
const computerBoard = document.querySelector("#computer");
const startGame = document.querySelector("#start");
const stopBtn = document.querySelector("#stop");

// helper functions:
const delay = ms => new Promise(res => setTimeout(res, ms));

// Initialize the game
const init = _ => {
    // const playerName = prompt("Enter your name: ", "Player");
    const playerName = "Human"; // TODO: Remove this line

    // Creating Player and Computer objects
    const human = Player(playerName);
    const comp = Player("Computer");
    playing = true;
    players.human = human;
    players.computer = comp;

    displayMessage(messages.gameStart);
    updateGameboard();
    // console.log("Game started");
};

// End the game
const endGame = _ => {
    playing = false;

    if (players.human.isLost()) {
        displayMessage(messages.computerWon);
    } else if (players.computer.isLost()) {
        displayMessage(messages.humanWon);
    } else {
        console.error("Game ended without a winner");
    }

    players.human = null;
    players.computer = null;
    console.log("Game ended");
};

// TODO: !!!
// Assume:
// Player has set their own gameboard (user input)
// Computer has set their own gameboard (randomly)

const updateGameboard = _ => {
    console.log("Updating gameboard");
    playerBoard.innerHTML = "";
    playerBoard.appendChild(players.human.render(true));
    computerBoard.innerHTML = "";
    computerBoard.appendChild(players.computer.render(true)); // TODO: change to false
};

// Displays text messages to the user
// With character by character typing effect
// @param {string} message - message to be displayed
const displayMessage = message => {
    // TODO: add typing effect
    status.textContent = message;
};

async function gameLoop(clickEvent) {
    console.log("Game Loop called");
    if (!playing)
        return;
    console.assert(
        players.human !== null && players.computer !== null,
        "Players are not initialized"
    );

    const square = clickEvent.target.getAttribute("data-index");
    console.assert(
        square !== null,
        "Issue with retrieving data-index attribute"
    );

    const x = square % 10;
    const y = Math.floor(square / 10);
    // console.log(`Player clicked on square ${x}, ${y}`);
    // Computer takes damage
    let attackStatus = players.computer.receiveAttack(x, y);
    // console.log({ attackStatus });
    updateGameboard();

    // does computer lose? -> end game
    if (players.computer.isLost()) {
        endGame();
        // playing = false;
        return;
    }

    displayMessage(messages.computerTurn);
    await delay(2000);

    // player takes damage
    attackStatus = players.human.receiveAttack(
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10)
    );
    // console.log({ attackStatus });
    updateGameboard();

    // does player lose? -> end game
    if (players.human.isLost()) {
        endGame();
        // playing = false;
        return;
    }

    displayMessage(messages.humanTurn);
}

// Event listeners
startGame.addEventListener("click", init);
stopBtn.addEventListener("click", endGame);

// Game loop follows the player's turn
// which is fired by player when they click on computer's board
// user turn -> computer turn -> user turn -> computer turn -> ...
computerBoard.addEventListener("click", gameLoop);

// window.addEventListener("load", _ => {
//     console.log("Game loaded");
//     displayMessage(messages.gameStart);
// });