const centralDeck = document.querySelector('#CentralDeck');

// Start the game
function StartGame() {

	const currentRound = CheckAndIncrement(STOREKEY.ROUND);

	if (currentRound >= CONSTANT.ROUND_LIMIT) {

		console.log("GAMEOVER");

		return;
	}

	for(let i = 0; i < CONSTANT.INITIAL_CARD_COUNT; i++) {
		PlayerDrawCard();
		NPCDrawCard();
	}

	SetData(STOREKEY.PHASE,
		CONSTANT.PHASE.PREPARE);

	// TODO: Adding a RPS phase for choosing
	// MAYBE the RPS is based on the element as well
	SetData(STOREKEY.TURN,
		CONSTANT.TURN.PLAYER);
}

// Check and increment round number accordingly
function CheckAndIncrement(key) {
	const current = GetData(key);

	const next = current !== null
		? (current + 1)
		: 0;

	return SetData(key, next);
}

// Handle event when player click on the drawing deck
function OnCentralDeckClicked() {
  if (!IsPlayerTurn() || !PlayerCanDraw()) {
    return;
  }

  PlayerDrawCard();
  SwitchTurn();
}

// NPC behavior lies here
function NPCMakeMove() {

	// If it can draw, assigns a random to it drawing chance
	const willDraw = NPCCanDraw()
		? Math.random()
		: 0;

	// If it can play card, assigns a random to its playing chance
	const willPlayCard = NPCCanPlayCard()
		? Math.random()
		: 0;

	// Based on the decision, it either draw or play
	if (willDraw > willPlayCard) {
		NPCDrawCard();
	} else {
		NPCPlayCard();
	}

	SwitchTurn();
}

// Check if the combat phase should commence
function ShouldCombat () {
	return
		PlayerReachedEquipLimit() ||
		NPCReachedEquipLimit();
}

// The combat phase with all the math and calculation behind the scene
async function Combat() {
		SetData(STOREKEY.PHASE, CONSTANT.PHASE.COMBAT);

}

// Handle switching turn and invoke NPC's logic
function SwitchTurn() {

	if (ShouldCombat()) {
		Combat();
		return;
	}

	// Check if it is npc turn
	const isCurrentlyNPCTurn = IsNPCTurn();

	// Switch turn
  const nextTurn = isCurrentlyNPCTurn
    ? CONSTANT.TURN.PLAYER
    : CONSTANT.TURN.NPC

  SetData(STOREKEY.TURN, nextTurn);

	// If after switch turn, it is npc turn
	if (IsNPCTurn()) {
		NPCMakeMove();
	}
}

centralDeck.addEventListener('click', OnCentralDeckClicked)
