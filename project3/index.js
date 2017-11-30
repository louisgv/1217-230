"use strict";
let paused = false;

let dt = 0;

PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

const app = new PIXI.Application(window.innerWidth, window.innerHeight, {
	// backgroundColor: 0xffffff
	backgroundColor: 0x000000
});

const sceneWidth = app.view.width;
const sceneHeight = app.view.height;

const soundManager = new Sound();

document.body.appendChild(app.view);

const uiContainer = new PIXI.Container();
app.stage.addChild(uiContainer);

const mainContainer = new PIXI.Container();
app.stage.addChild(mainContainer);

const maggotSet = new Set()

const maggotSystem = new PIXI.particles.ParticleContainer(10000, {
	scale: true,
	position: true,
	rotation: true,
	uvs: true,
	alpha: true
});

const bitemarkSystem = new PIXI.Container();

const foodSystem = new PIXI.Container();

mainContainer.addChild(foodSystem);

mainContainer.addChild(bitemarkSystem);

mainContainer.addChild(maggotSystem);
uiContainer.addChild(UserInterface.getInstruction())


// applyZoom(app)
// applyDragAndDrop(mainContainer)
applyDropZone(app, loadAndProcessDrop)

async function loadAndProcessDrop(data, mousePos, isUrl) {

	if (isUrl) {
		return processDroppedImage(data, mousePos);
	}

	const base64Data = await readFile(data);

	const {
		result
	} = base64Data;

	processDroppedImage(result, mousePos);
}

function processDroppedImage(image, mousePos) {
	if(Store.hasImage(image)) {
		// TODO: Show notification saying you can't feed them the same image

		return;
	}

	const imageHash = Store.addImage(image)

	PIXI.loader.add(imageHash, image)
		.load((loader, resources) => {
			addFood(new PIXI.Sprite(resources[imageHash].texture), mousePos)
		})
}

function addFood(food, {
	x,
	y
}) {
	const {
		MAX_WIDTH
	} = Store.getFood();

	if(food.width > MAX_WIDTH) {
		const ratio = food.height / food.width

		food.width = MAX_WIDTH

		food.height = MAX_WIDTH * ratio
	}

	food.position.x = x - food.width / 2;
	food.position.y = y - food.height / 2;

	foodSystem.addChild(food);
}

window.addEventListener('resize', (e) => {
	app.view.style.width = `${window.innerWidth}px`;
	app.view.style.height = `${window.innerHeight}px`;

	app.renderer.resize(window.innerWidth, window.innerHeight)
}, false);

main()

// Main startup logic
async function main() {
	await loadImages()

	soundManager.playWalking();

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

function getScreenBound(padding) {
	return new PIXI.Rectangle(-padding, -padding,
		sceneWidth + padding * 2,
		sceneHeight + padding * 2
	);
}

function getBlackSolidCircle(radius) {
	const solidCircle = new PIXI.Graphics();
	solidCircle.beginFill(0xFFFFFF);
	solidCircle.drawCircle(0, 0, radius);
	solidCircle.endFill()
	return solidCircle;
}

const maggotProps = {
	boundsPadding: 100,
	bounds: getScreenBound(this.boundsPadding),
	bite: getBlackSolidCircle(10)
}

// Update run every ticker frame
function update() {
	// keep this commented out for now
	if(paused) return;

	// #1 - Calculate "delta time"
	dt = 1 / app.ticker.FPS;
	if(dt > 1 / 12) dt = 1 / 12;

	for(let maggot of maggotSet) {
		maggot.move(maggotProps.bounds)

		// new Bitemark(bitemarkSystem, maggot.position, 5)
	}
}

function end() {

}
