const npc = GetPlayingSide('#NPCSide')

// Hide equipment cards
function NPCHideEquipment() {
	npc.equip.classList.remove("Flip")
}

// Reveal npc's equip card
function NPCRevealEquipment() {
	npc.equip.classList.add("Flip")
}

// Check if NPC Equip exceed limit
function NPCReachedEquipLimit() {
	return npc.equip.children.length >= CONSTANT.EQUIP_LIMIT;
}

// Check if NPC Hand is below limit
function NPCCanDraw(){
	return npc.hand.children.length < CONSTANT.CARD_LIMIT;
}

// Check if NPC has card on hand
function NPCCanPlayCard() {
	return npc.hand.children.length > 0;
}

// Draw a card into the NPC's hand
function NPCDrawCard() {
	const hero = GetData(STOREKEY.NPC_HERO);

	const point = GetRandomInt(CONSTANT.POINT_LIMIT) + 1;

	const card = GetRandomCard(hero.element, point);

  const cardEl = CreateCardEl(card);

  npc.hand.appendChild(cardEl);
}

// Set the hero card for the player
function NPCSetHero(heroCard) {
  const heroCardEl = CreateCardEl(heroCard);

  npc.avatar.appendChild(heroCardEl);

	SetEquipLimit(npc, CONSTANT.EQUIP_LIMIT);
}

// Play a card from the NPC's hand
function NPCPlayCard() {
	const cardEl = GetRandomInArray(npc.hand.children);

	npc.equip.appendChild(cardEl);
}
