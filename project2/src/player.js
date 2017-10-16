const player = GetPlayingSide('#PlayerSide')

function GetPlayerHand(){
  return player.hand;
}

function OnCardPlayed(event) {
  event.preventDefault()



  event.target.remove();
  SwitchTurn();
}

function PlayerDrawCard() {
  if (IsNPCTurn()) {
    return;
  }
  const card = CreateCard(OnCardPlayed);

  player.hand.appendChild(card);
}
