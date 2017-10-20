const npc = GetPlayingSide('#NPCSide')

// Draw a card into the NPC's hand
function NPCDrawCard() {
  const card = GetRandomCard();

  const cardEl = CreateCardEl(card);

  npc.hand.appendChild(cardEl);
}

// Set the hero card for the player
function NPCSetHero(heroCard) {
  const heroCardEl = CreateCardEl(heroCard);

  npc.avatar.appendChild(heroCardEl);
}


// Play a card from the NPC's hand
function NPCPlayCard() {

}
