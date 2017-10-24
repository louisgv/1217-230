// Setup the game and restore the state of previous game if exist
async function Setup() {
	await WarmUpGiphyTable();

	// TODO: Improve this:
	SetData(STOREKEY.ROUND, 0);

	SpawnHeroSelectionCards();
}

window.addEventListener('load', Setup);
