// Setup the game and restore the state of previous game if exist
function Setup() {
	SpawnHeroSelectionCards();

	for(let i = 0; i < CONSTANT.INITIAL_CARD_COUNT; i++) {
		PlayerDrawCard();
		NPCDrawCard();
	}

	SetData("TURN", "PLAYER_TURN");
}

window.addEventListener('load', Setup);
