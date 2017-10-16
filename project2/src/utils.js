function CreateElementWithClass(type, classname) {
  const el = document.createElement(type);
  el.setAttribute("class", classname);
  return el;
}

function GetPlayingSide(sideId) {
  const side = document.querySelector(sideId);

  const hand = side.querySelector('.Hand');

  const equip = side.querySelector('.Equip');

  const stats = side.querySelector('.Stats');

  return { side, hand, equip, stats };
}

function IsPlayerTurn(){
  const currentTurn = GetData("TURN");

  return currentTurn === CONSTANT.PLAYER_TURN;
}

function IsNPCTurn() {
  return !IsPlayerTurn();
}
