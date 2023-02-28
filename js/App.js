/**
 * BattleShip Game
 * 
 * Author: Rohit Mehta
 */
import Player from "./player.js";
import Gameboard from "./gameboard.js";
import Ship from "./ship.js";
import "../css/style.css";

import availableShips from "./availableShips.js";

// Accessing DOM elements
const startGame = document.querySelector("#start");
const resetGame = document.querySelector("#reset");
const player = document.querySelector("#player");
const computer = document.querySelector("#computer");

// Creating Player and Computer objects
const player1 = Player("Player");
const computer1 = Player("Computer");

// Creating Gameboard objects for both players
const playerBoard = Gameboard();
const computerBoard = Gameboard();

playerBoard.init();
computerBoard.init();

player.appendChild(playerBoard.render(false));