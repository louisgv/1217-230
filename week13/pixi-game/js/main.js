// We will use `strict mode`, which helps us by having the browser catch many common JS mistakes
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
"use strict";
const app = new PIXI.Application(600,600);
document.body.appendChild(app.view);

// constants
const sceneWidth = app.view.width;
const sceneHeight = app.view.height;

// pre-load the images
PIXI.loader.
add(["images/Spaceship.png","images/explosions.png"]).
on("progress",e=>{console.log(`progress=${e.progress}`)}).
load(setup);

// aliases
let stage;

// game variables
let startScene;
let gameScene,ship,scoreLabel,lifeLabel,shootSound,hitSound,fireballSound;
let gameOverScene;

let circles = [];
let bullets = [];
let aliens = [];
let explosions = [];
let explosionTextures;
let score = 0;
let life = 100;
let levelNum = 1;
let paused = true;

function setup() {
	stage = app.stage;
	// #1 - Create the `start` scene

	// #2 - Create the main `game` scene and make it invisible

	// #3 - Create the `gameOver` scene and make it invisible

	// #4 - Create labels for all 3 scenes

	// #5 - Create ship

	// #6 - Load Sounds

	// #7 - Load sprite sheet

	// #8 - Start update loop

	// #9 - Start listening for click events on the canvas

	// Now our `startScene` is visible
	// Clicking the button calls startGame()
}
