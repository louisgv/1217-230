const centralDeck = document.querySelector('#CentralDeck');

function StartGame() {
	for(let i = 0; i < CONSTANT.INITIAL_CARD_COUNT; i++) {
		PlayerDrawCard();
		NPCDrawCard();
	}

	SetData("TURN", "PLAYER_TURN");
}

// Handle event when player click on the drawing deck
function OnCentralDeckClicked() {
  if (IsNPCTurn() ||
      playerHand.children.length >= CONSTANT.CARD_LIMIT) {
    return;
  }

  PlayerDrawCard();
  SwitchTurn();
}

// Handle switching turn and invoke NPC's logic
function SwitchTurn() {
  const currentTurn = GetData("TURN");

  const nextTurn = currentTurn === CONSTANT.PLAYER_TURN
    ? CONSTANT.NPC_TURN
    : CONSTANT.PLAYER_TURN

  SetData("TURN", nextTurn);
}

centralDeck.addEventListener('click', OnCentralDeckClicked)
