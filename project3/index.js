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

const bitemarkSystem = new PIXI.particles.ParticleContainer(10000, {
	scale: true,
	position: true,
	rotation: false,
	uvs: true,
	alpha: true
});

const foodSystem = new PIXI.Container();

mainContainer.addChild(foodSystem);

mainContainer.addChild(bitemarkSystem);

mainContainer.addChild(maggotSystem);
uiContainer.addChild(UserInterface.getInstruction())


// applyZoom(app)
// applyDragAndDrop(mainContainer)
applyDropZone(app, loadAndProcessImage)

async function loadAndProcessImage(fileBlob, mousePos) {
  const base64Data = await readFile(fileBlob);

  const {
    result
  } = base64Data;

  if (Store.hasImage(result)) {
    // TODO: Show notification saying you can't feed them the same image

    return;
  }

  const imageHash = Store.addImage(result)

  PIXI.loader.add(imageHash, result)
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

  if (food.width > MAX_WIDTH) {
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

  for (let i = 0; i < maggotCount; i++) {
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
    app.renderer.width + padding * 2,
    app.renderer.height + padding * 2
  );
}

function getBlackSolidCircle(radius) {
  const solidCircle = new PIXI.Graphics();
  solidCircle.beginFill(0x000000);
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

		// bitemarkSystem
		// maggotBite.position.copy(maggot)
		// app.renderer.render(maggotBite, maggotBiteTexture, false, null, false)/
	}
}

function end() {

}
