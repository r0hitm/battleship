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

// Accessing DOM elements
const playArea = document.querySelector("#play-area");
const startGame = document.querySelector("#start");
const stopBtn = document.querySelector("#stop");
const player = document.querySelector("#player");
const computer = document.querySelector("#computer");
const status = document.querySelector("#status");

// Event Listeners
startGame.addEventListener("click", _ => {
    console.log("Start Game: TODO");
    playGame(); // TODO
});

stopBtn.addEventListener("click", _ => {
    console.log("Reset Game: TODO");
    stopGame();
});

player.addEventListener("click", _ => {
    console.log("Player Clicked");
    // player.innerHTML = "";
    // player.appendChild(player1.render(true));
});

computer.addEventListener("click", e => {
    // console.log("Computer Clicked");
    const targetIndex = e.target.getAttribute("data-index");
    console.assert(
        targetIndex !== null,
        "Player clicked on null square on computer's board"
    );

    const x = targetIndex % 10;
    const y = Math.floor(targetIndex / 10);
    // console.log(`Player clicked on square ${x}, ${y}`);
    if (player1.isMyTurn()) {
        computer1.receiveAttack(x, y);
        player1.endTurn();
        computer1.startTurn();
    }

    computer.innerHTML = "";
    computer.appendChild(computer1.render(false, true));
});

// ------------------------------

// Initialize the game
const init = _ => {
    // const playerName = prompt("Enter your name: ", "Player");
    const playerName = "Player"; // TODO: Remove this line

    // Creating Player and Computer objects
    const player1 = Player(playerName);
    player1.startTurn(); // Player starts first

    const computer1 = Player("Computer");
};

// TODO: !!!
// Assume:
// Player has set their own gameboard (user input)
// Computer has set their own gameboard (randomly)

// !!!
const playGame = _ => {
    init(); // Initialize the game

    // player1.startTurn();    // Player starts first (This is an Event Listener)
    playArea.addEventListener("click", _ => {
        console.log("Play Area Clicked");
    });
    player.appendChild(player1.render(true));
    computer.appendChild(computer1.render(false, true));
};

// !!!
const stopGame = _ => {
    // TODO: clear the board + reset the page
    player1.innerHTML = '';
    computer1.innerHTML = '';
};

// ------------------------------

// testing:
console.log(status);
status.textContent = messages.intro;