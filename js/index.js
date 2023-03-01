/**
 * BattleShip Game
 *
 * Author: Rohit Mehta
 */
import "../css/index.css";
import Player from "./player.js";
// import Gameboard from "./gameboard.js";
// import Ship from "./ship.js";

import availableShips from "./availableShips.js";

// Accessing DOM elements
const playArea = document.querySelector("#play-area");
const startGame = document.querySelector("#start");
const resetGame = document.querySelector("#reset");
const player = document.querySelector("#player");
const computer = document.querySelector("#computer");

// Event Listeners
startGame.addEventListener("click", _ => {
    console.log("Start Game: TODO");
    // TODO
});

resetGame.addEventListener("click", _ => {
    console.log("Reset Game: TODO");
    // TODO
});

player.addEventListener("click", _ => {
    // console.log("Player Clicked");
    player.innerHTML = "";
    player.appendChild(player1.render(true));
});

computer.addEventListener("click", e => {
    // console.log("Computer Clicked");
    const targetIndex = e.target.getAttribute("data-index");
    console.assert(targetIndex !== null, "Player clicked on null square on computer's board");
    const x = targetIndex % 10;
    const y = Math.floor(targetIndex / 10);
    console.log(`Player clicked on square ${x}, ${y}`);
    computer1.takeShot(x, y);
    computer.innerHTML = "";
    computer.appendChild(computer1.render(false, true));
});

// ------------------------------

// const playerName = prompt("Enter your name: ", "Player");
const playerName = "Player"; // TODO: Remove this line

// Creating Player and Computer objects
const player1 = Player(playerName);
const computer1 = Player("Computer");

// TODO: !!!
// Assume:
// Player has set their own gameboard (user input)
// Computer has set their own gameboard (randomly)

//
const game = _ => {
    playArea.addEventListener("click", e => {
        console.log("Play Area Clicked");
        console.log("Player's turn: ", player1.isMyTurn());
        console.log("Computer's turn: ", computer1.isMyTurn());

        if (player1.isMyTurn()) {
            // TODO
            // player1.takeShot();
            // player1.endTurn();
            // computer1.startTurn();
        } else if (computer1.isMyTurn()) {
            // TODO
            // computer1.takeShot(Math.floor(Math.random() * 10), Math.floor(Math.random() * 10));
            // computer1.endTurn();
            // player1.startTurn();
        }
    });
    // TODO
    // while (!player1.isGameOver() && !computer1.isGameOver()) {
    //     player1.startTurn();
    //     computer1.startTurn();
    // }
};

player.appendChild(player1.render(true));
computer.appendChild(computer1.render(false, true));
