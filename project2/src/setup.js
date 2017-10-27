// setup the game and restore the state of previous game if exist
async function setup() {
	await warmUpGiphyTable();

	// TODO: Improve this:
	setData(STOREKEY.ROUND, 0);

	info("PICK HERO");

	await	spawnHeroSelectionCards();

	// await tutorial();

	startGame();
}

window.addEventListener('load', setup);
