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

const bitemarkSystem = new PIXI.Container();

const foodSystem = new PIXI.Container();

mainContainer.addChild(foodSystem);

mainContainer.addChild(bitemarkSystem);

mainContainer.addChild(maggotSystem);
uiContainer.addChild(UserInterface.getInstruction())
uiContainer.addChild(UserInterface.getScore())
uiContainer.addChild(UserInterface.getFooter())
uiContainer.addChild(UserInterface.getDocumentationButton())
uiContainer.addChild(UserInterface.errorNotification())

const docButton = new Button("Document", ()=>{
	console.log("POP");
});

uiContainer.addChild(docButton);

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

		return;
	}

	const imageHash = Store.addImage(image)

	PIXI.loader.add(imageHash, image)
		.load((loader, resources) => {
			addFood(new PIXI.Sprite(resources[imageHash].texture), mousePos)
		})
}

// Add a food item at the specified location
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

	food.anchor.x = 0.5;
	food.anchor.y = 0.5;

	food.x = x;
	food.y = y;

	foodSystem.addChild(food);
}

// Resize the renderer
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

	spawnMaggots();

	app.ticker.add(update);
}

// Batch spawning the maggots
function spawnMaggots(maggotCount = 18) {
	for(let i = 0; i < maggotCount; i++) {
		const maggotInstance = new Maggot({
			x: Math.random() * app.renderer.width,
			y: Math.random() * app.renderer.height
		})

		maggotSet.add(maggotInstance);
		maggotSystem.addChild(maggotInstance);
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

	for(let maggot of maggotSet) {
		maggot.updateVelocity(neighbors, headingDirections, sceneCenter, target)

		if (target && rectsIntersect(maggot, firstFood)) {
			new Bitemark(
				bitemarkSystem,
				maggot.position, 5)

		}
	}
}

// End simulation method, call once all maggot died
function end() {

}
