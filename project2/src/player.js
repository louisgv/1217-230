const player = GetPlayingSide('#PlayerSide')

// Handle event when player clicked on a card
function OnCardPlayed(event) {
  event.preventDefault()
  if (IsNPCTurn()) {
    return;
  }



  event.target.remove();
  SwitchTurn();
}

// Set the hero card for the player
function PlayerSetHero(heroCard) {

  const heroCardEl = CreateCardEl(heroCard);

  player.avatar.appendChild(heroCardEl);

  // player.avatar.style.background = heroCard.background;
}


// Draw a card and append it to the player's hand
function PlayerDrawCard() {
  if (IsNPCTurn()) {
    return;
  }

  const card = GetRandomCard();

  console.log(card);

  const cardEl = CreateCardEl(card, OnCardPlayed);

  player.hand.appendChild(cardEl);
}
