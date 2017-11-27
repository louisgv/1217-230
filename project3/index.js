"use strict";

let paused = false;

let dt = 0;

PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

const app = new PIXI.Application(window.innerWidth, window.innerHeight);

document.body.appendChild(app.view);

const mainContainer = new PIXI.Container();

app.stage.addChild(mainContainer);

// applyZoom(app)
applyDropZone(app, loadAndProcessImage)

async function loadAndProcessImage(fileBlob, mousePos) {
    const base64Data = await readFile(fileBlob);

    console.log(base64Data);
}


window.addEventListener('resize', (e) => {
	app.view.style.width = `${window.innerWidth}px`;
	app.view.style.height = `${window.innerHeight}px`;

	app.renderer.resize(window.innerWidth, window.innerHeight)
}, false);

const maggotSet = new Set()

const maggotSystem = new PIXI.particles.ParticleContainer(10000, {
	scale: true,
	position: true,
	rotation: true,
	uvs: true,
	alpha: true
});

mainContainer.addChild(maggotSystem);

applyDragAndDrop(mainContainer)

main()

// Main startup logic
async function main() {
	await loadAssets()

	spawnMaggots(app, maggotSystem);

	app.ticker.add(update);
}

// Batch spawning the maggots
function spawnMaggots(app, maggotSystem) {
	const maggotCount = 9;

	for(let i = 0; i < maggotCount; i++) {
		const maggotInstance = new Maggot({
			x: Math.random() * app.renderer.width,
			y: Math.random() * app.renderer.height
		})

		maggotSet.add(maggotInstance);

		maggotSystem.addChild(maggotInstance);
	}
}

async function setup() {

}

function start() {

}

const maggotBoundsPadding = 100;

const maggotBounds = new PIXI.Rectangle(-maggotBoundsPadding, -maggotBoundsPadding,
	app.renderer.width + maggotBoundsPadding * 2,
	app.renderer.height + maggotBoundsPadding * 2
);

function update() {
	// keep this commented out for now
	if(paused) return;

	// #1 - Calculate "delta time"
	dt = 1 / app.ticker.FPS;
	if(dt > 1 / 12) dt = 1 / 12;

	for(let maggot of maggotSet) {
		maggot.move(maggotBounds)
	}
}

function end() {

}
