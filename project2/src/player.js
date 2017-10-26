const player = GetPlayingSide('#PlayerSide')

// Check if player equip exceeds limit
function PlayerReachedEquipLimit() {
	return player.equip.children.length >= CONSTANT.EQUIP_LIMIT;
}

// Check if player hand is less than limit
function PlayerCanDraw() {
	return player.hand.children.length < CONSTANT.CARD_LIMIT;
}

// Handle event when player clicked on a card
function OnCardPlayed(event) {
	event.preventDefault()
	if(IsNPCTurn() || IsCombatPhase()) {
		return;
	}

	this.removeEventListener('click', OnCardPlayed);

	player.equip.appendChild(this);

	PlayerSetScore(this.card);

	SwitchTurn();
}

// Set the hero card for the player
function PlayerSetHero(heroCard) {

	const heroCardEl = CreateCardEl(heroCard);

	player.avatar.appendChild(heroCardEl);

	SetEquipLimit(player, CONSTANT.EQUIP_LIMIT);
}

function PlayerSetScore({
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
function PlayerDrawCard() {

	const hero = GetData(STOREKEY.PLAYER_HERO);

	const point = GetRandomInt(CONSTANT.POINT_LIMIT) + 1;

	const card = GetRandomCard(hero.element, point);

	const cardEl = CreateCardEl(card, OnCardPlayed);

	player.hand.appendChild(cardEl);
}
