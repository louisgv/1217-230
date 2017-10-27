const player = getPlayingSide('#PlayerSide')

// Check if player equip exceeds limit
function playerReachedEquipLimit() {
	return player.equip.children.length >= CONSTANT.EQUIP_LIMIT;
}

// Check if player hand is less than limit
function playerCanDraw() {
	return player.hand.children.length < CONSTANT.CARD_LIMIT;
}

// Handle event when player clicked on a card
function onCardPlayed(event) {
	event.preventDefault()
	if(isNPCTurn() || isCombatPhase()) {
		return;
	}

	this.removeEventListener('click', onCardPlayed);

	player.equip.appendChild(this);

	playerSetScore(this.card);

	switchTurn();
}

// Set the hero card for the player
function playerSetHero(heroCard) {

	const heroCardEl = createCardEl(heroCard);

	player.avatar.appendChild(heroCardEl);

	setEquipLimit(player, CONSTANT.EQUIP_LIMIT);
}

// Set score for an element of the player
function playerSetScore({
	element,
	point
}) {
	if (element === CONSTANT.ELEMENT.ETHER) {
		return;
	}

	const currentPoint = parseInt(player.point[element].innerHTML);
	player.point[element].innerHTML = currentPoint + point;
}

// Draw a card and append it to the player's hand
function playerDrawCard() {

	const hero = getData(STOREKEY.PLAYER_HERO);

	const point = getRandomInt(CONSTANT.POINT_LIMIT) + 1;

	const card = getRandomCard(hero.element, point);

	const cardEl = createCardEl(card, onCardPlayed);

	player.hand.appendChild(cardEl);
}
