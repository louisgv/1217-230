const player = GetPlayingSide('#PlayerSide')

function PlayerCanDraw() {
	return player.hand.children.length <= CONSTANT.CARD_LIMIT;
}

// Handle event when player clicked on a card
function OnCardPlayed(event) {
  event.preventDefault()
  if (IsNPCTurn()) {
    return;
  }

	this.removeEventListener('click', OnCardPlayed);

	player.equip.appendChild(this);

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

	const hero = GetData(STOREKEY.PLAYER_HERO);

	const point = GetRandomInt(CONSTANT.POINT_LIMIT) + 1;

	const card = GetRandomCard(hero.element, point);

  const cardEl = CreateCardEl(card, OnCardPlayed);

  player.hand.appendChild(cardEl);
}
