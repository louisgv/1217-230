const npc = GetPlayingSide('#NPCSide')

// Draw a card into the NPC's hand
function NPCDrawCard() {
  const card = CreateCard();

  npc.hand.appendChild(card);
}

// Play a card from the NPC's hand
function NPCPlayCard() {

}
