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
// import availableShips from "./availableShips.js";

let playing = false; // Is the game currently running?
const players = { human: null, computer: null };

// Accessing DOM elements
const status = document.querySelector("#status");
const playerBoard = document.querySelector("#player");
const computerBoard = document.querySelector("#computer");
const playBtn = document.querySelector("#start");
// const stopBtn = document.querySelector("#stop");

// helper functions:
const delay = ms => new Promise(res => setTimeout(res, ms));

const reset = _ => {
    playing = false;
    players.human = null;
    players.computer = null;
    // status.textContent = "";
    // playerBoard.innerHTML = "";
    // computerBoard.innerHTML = "";
};

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
const displayMessage = message => {
    // TODO: add typing effect
    status.textContent = message;
};

async function gameLoop(clickEvent) {
    if (!playing) return;
    console.assert(
        players.human !== null && players.computer !== null,
        "Players are not initialized"
    );

    const square = clickEvent.target.getAttribute("data-index");
    console.assert(
        square !== null,
        "Issue with retrieving data-index attribute"
    );

    const cx = square % 10;
    const cy = Math.floor(square / 10);
    // console.log(`Player clicked on square ${x}, ${y}`);

    if (players.human.isMyTurn()) {
        players.human.endTurn();
        let attackStatus = false;

        // Computer takes damage
        attackStatus = players.computer.receiveAttack(cx, cy);
        if (attackStatus) {
            // console.log("Computer takes damage", { attackStatus });
            updateGameboard();

            // does computer lose? -> end game
            if (players.computer.isLost()) {
                console.log("Computer lost");
                displayMessage(messages.humanWon);
                return;
            }

            displayMessage(messages.computerTurn);
        }
        // Player misses
        displayMessage(messages.miss);

        // await delay(2000);

        // player takes damage
        attackStatus = false;
        const hx = Math.floor(Math.random() * 10);
        const hy = Math.floor(Math.random() * 10);
        attackStatus = players.human.receiveAttack(hx, hy);
        if (attackStatus) {
            console.log("Human takes damage", { attackStatus });
            updateGameboard();

            // does player lose? -> end game
            if (players.human.isLost()) {
                console.log("Player lost");
                displayMessage(messages.computerWon);
                return;
            }
        }

        displayMessage(messages.computerMiss + messages.humanTurn);
        // displayMessage(messages.humanTurn);
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
        console.error("Invalid button text");
    }
});
// stopBtn.addEventListener("click", endGame);

// Game loop follows the player's turn
// which is fired by player when they click on computer's board
// user turn -> computer turn -> user turn -> computer turn -> ...
computerBoard.addEventListener("click", gameLoop);

// window.addEventListener("load", _ => {
//     console.log("Game loaded");
//     displayMessage(messages.gameStart);
// });
