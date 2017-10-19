const player = GetPlayingSide('#PlayerSide')


// Handle event when player clicked on a card
function OnCardPlayed(event) {
  event.preventDefault()



  event.target.remove();
  SwitchTurn();
}

// Draw a card and append it to the player's hand
function PlayerDrawCard() {
  if (IsNPCTurn()) {
    return;
  }


  const cardEl = CreateCard(OnCardPlayed);

  player.hand.appendChild(cardEl);
}
