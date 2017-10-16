const npc = GetPlayingSide('#NPCSide')

function NPCDrawCard() {
  const card = CreateCard();

  npc.hand.appendChild(card);
}

function NPCPlayCard() {

}
