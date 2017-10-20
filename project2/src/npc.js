const npc = GetPlayingSide('#NPCSide')

function NPCCanDraw(){
	return npc.hand.children.length <= CONSTANT.CARD_LIMIT;
}

// Draw a card into the NPC's hand
function NPCDrawCard() {
	const hero = GetData(STOREKEY.NPC_HERO);

  const card = GetRandomCard(hero.element);

  const cardEl = CreateCardEl(card);

  npc.hand.appendChild(cardEl);
}

// Set the hero card for the player
function NPCSetHero(heroCard) {
  const heroCardEl = CreateCardEl(heroCard);

  npc.avatar.appendChild(heroCardEl);
}

function NPCCanPlayCard() {
	return npc.hand.children.length > 0;
}

// Play a card from the NPC's hand
function NPCPlayCard() {
	const cardEl = GetRandomInArray(npc.hand.children);

	// const chosenCard = cardEl.card;
	//
	// const equipCardEl = CreateCardEl(chosenCard);

	npc.equip.appendChild(cardEl);

	// cardEl.remove();
}
