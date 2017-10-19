const centralDeck = document.querySelector('#CentralDeck');

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
