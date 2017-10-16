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


  const cardEl = CreateCard(OnCardPlayed);

  player.hand.appendChild(cardEl);
}
