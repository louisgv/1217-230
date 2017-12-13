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

const sceneCenter = new de.math.Vector(sceneWidth/2, sceneHeight/2);

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

const bitemarkSystem = new PIXI.particles.ParticleContainer(10000, {
	scale: true,
	position: true,
	rotation: false,
	uvs: false,
	alpha: false
});

const foodSystem = new PIXI.Container();

mainContainer.addChild(foodSystem);

mainContainer.addChild(bitemarkSystem);

mainContainer.addChild(maggotSystem);

uiContainer.addChild(UserInterface.getInstruction())
uiContainer.addChild(UserInterface.getFooter())
uiContainer.addChild(UserInterface.getDocumentationButton())
uiContainer.addChild(UserInterface.errorNotification())

const score = new Score(Store.getMaggotCount())

uiContainer.addChild(score)

// applyZoom(app)
// applyDragAndDrop(mainContainer)
applyDropZone(app, loadAndProcessDrop)

// Process the dropped data
async function loadAndProcessDrop(data, mousePos, isUrl) {

	if(isUrl) {
		return processDroppedImage(data, mousePos);
	}

	const base64Data = await readFile(data);

	const {
		result
	} = base64Data;

	processDroppedImage(result, mousePos);
}

// Process the image and check for duplication
function processDroppedImage(image, mousePos) {
	if(Store.hasImage(image)) {
		// TODO: Show notification saying you can't feed them the same image
		new Notification(Store.getRandomWarning(), uiContainer, {
			x: sceneWidth / 2,
			y: 10
		}, '#ff0000')
		return;
	}

	const imageHash = Store.addImage(image)

	PIXI.loader.add(imageHash, image)
		.load((loader, resources) => {
			new Food(resources[imageHash].texture, mousePos, foodSystem)
		})
}

// Resize the renderer
window.addEventListener('resize', (e) => {
	app.view.style.width = `${window.innerWidth}px`;
	app.view.style.height = `${window.innerHeight}px`;

	app.renderer.resize(window.innerWidth, window.innerHeight)
}, false);

window.addEventListener('load', Store.initializeImageHashSet);

window.addEventListener('unload', Store.serializeImageHashSet);


main()

// Main startup logic
async function main() {
	await loadImages()

	soundManager.playWalking();

	spawnMaggots(Store.getMaggotCount());

	app.ticker.add(update);
}

// Batch spawning the maggots
function spawnMaggots(maggotCount = 18) {
	for(let i = 0; i < maggotCount; i++) {
 		new Maggot({
			x: Math.random() * app.renderer.width,
			y: Math.random() * app.renderer.height,
			maggotSet,
			maggotSystem
		})
	}
}


// Update run every ticker frame
function update() {
	// keep this commented out for now
	if(paused) return;

	// #1 - Calculate "delta time"
	dt = 1 / app.ticker.FPS;
	if(dt > 1 / 12) dt = 1 / 12;

	const neighbors = maggotSystem.children.map(({x,y}) => new de.math.Vector(x, y))

	const headingDirections = maggotSystem.children.map(({rotation}) => de.math.Vector.fromRad(rotation))

	const firstFood = foodSystem.children[0];

	const target = firstFood
		? new de.math.Vector(firstFood.x, firstFood.y)
		: null

	let isEating = false;

	for(let maggot of maggotSet) {
		maggot.updateVelocity(neighbors, headingDirections, sceneCenter, target)

		if (target && rectsIntersect(maggot, firstFood)) {
			new Bitemark(
				bitemarkSystem,
				maggot.position, 5)

			maggot.grow(dt)

			firstFood.getConsumed(foodConsumed);

			isEating = true;
		}
	}

	if (isEating) {
		soundManager.playEating()
	} else {
		soundManager.stopEating()
	}
}

// Callback when a piece of food is consumed
function foodConsumed() {
	// Cleanup the bitemarks on the table
	bitemarkSystem.removeChildren()
	// Adding score and so on here
	const maggotCount = maggotSystem.children.length;

	score.setScore(maggotCount);

	Store.setMaggotCount(maggotCount);
}

// End simulation method, call once all maggot died
function end() {

}
