const centralDeck = document.querySelector('#CentralDeck');

// Start the game
function StartGame() {
	for(let i = 0; i < CONSTANT.INITIAL_CARD_COUNT; i++) {
		PlayerDrawCard();
		NPCDrawCard();
	}

	SetData(STOREKEY.TURN,
		CONSTANT.PLAYER_TURN);
}

// Handle event when player click on the drawing deck
function OnCentralDeckClicked() {
  if (!IsPlayerTurn() || !PlayerCanDraw()) {
    return;
  }

  PlayerDrawCard();
  SwitchTurn();
}

function NPCMakeMove() {

	const willDraw = NPCCanDraw()
		? Math.random()
		: 0;

	const willPlayCard = NPCCanPlayCard()
		? Math.random()
		: 0;

	if (willDraw > willPlayCard) {
		NPCDrawCard();
	} else {
		NPCPlayCard();
	}

	SwitchTurn();
}

// Handle switching turn and invoke NPC's logic
function SwitchTurn() {
	// Check if it is npc turn
	const isCurrentlyNPCTurn = IsNPCTurn();

	// Switch turn
  const nextTurn = isCurrentlyNPCTurn
    ? CONSTANT.PLAYER_TURN
    : CONSTANT.NPC_TURN

  SetData(STOREKEY.TURN, nextTurn);

	// If after switch turn, it is npc turn
	if (IsNPCTurn()) {
		NPCMakeMove();
	}
}

centralDeck.addEventListener('click', OnCentralDeckClicked)
