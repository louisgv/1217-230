const npc = getPlayingSide('#NPCSide')

function npcHideStats() {
	npc.stats.classList.remove("Flip")
}

function npcRevealStats() {
	npc.stats.classList.add("Flip")
}

// Hide equipment cards
function npcHideEquipment() {
	npc.equip.classList.remove("Flip")
}

// Reveal npc's equip card
function npcRevealEquipment() {
	npc.equip.classList.add("Flip")
}

// Check if npc Equip exceed limit
function npcReachedEquipLimit() {
	return npc.equip.children.length >= CONSTANT.EQUIP_LIMIT;
}

// Check if npc Hand is below limit
function npcCanDraw(){
	return npc.hand.children.length < CONSTANT.CARD_LIMIT;
}

// Check if npc has card on hand
function npcCanPlayCard() {
	return npc.hand.children.length > 0;
}

// Draw a card into the npc's hand
function npcDrawCard() {
	const hero = getData(STOREKEY.NPC_HERO);

	const point = getRandomInt(CONSTANT.POINT_LIMIT) + 1;

	const card = getRandomCard(hero.element, point);

  const cardEl = createCardEl(card);

  npc.hand.appendChild(cardEl);
}

// Set the hero card for the player
function npcSetHero(heroCard) {
  const heroCardEl = createCardEl(heroCard);

  npc.avatar.appendChild(heroCardEl);

	setEquipLimit(npc, CONSTANT.EQUIP_LIMIT);
}

// Play a card from the npc's hand
function npcPlayCard() {
	const cardEl = getRandomInArray(npc.hand.children);

	npc.equip.appendChild(cardEl);

	npcSetScore(cardEl.card);
}

function npcSetScore({
	element,
	point
}) {
	if (element === CONSTANT.ELEMENT.ETHER) {
		return;
	}

	const currentPoint = parseInt(npc.point[element].innerHTML);
	npc.point[element].innerHTML = currentPoint + point;
}
