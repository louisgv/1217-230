// Helper method to create an element with specified class
function CreateElementWithClass(type, classname) {
  const el = document.createElement(type);
  el.setAttribute("class", classname);
  return el;
}

// Helper method to create an element with specified class
function CreateElementWithId(type, id) {
  const el = document.createElement(type);
  el.setAttribute("id", id);
  return el;
}

// Utility method to get the playing side elements from the DOM
function GetPlayingSide(sideId) {
  const side = document.querySelector(sideId);

  const hand = side.querySelector('.Hand');

  const equip = side.querySelector('.Equip');

  const stats = side.querySelector('.Stats');

  const fire = stats.querySelector('.Fire');
  const water = stats.querySelector('.Water');
  const earth = stats.querySelector('.Earth');
  const wind = stats.querySelector('.Aero');

  const avatar = stats.querySelector('.Avatar');

  return {
    side, hand, equip, stats,
    fire, water, earth, wind,
    avatar
  };
}

// Return true if it is Player's turn
function IsPlayerTurn(){
  const currentTurn = GetData("TURN");

  return currentTurn === CONSTANT.PLAYER_TURN;
}

// Return true if it is NPC's turn
function IsNPCTurn() {
  return !IsPlayerTurn();
}

// Get a random element in an array
function GetRandomInArray(array) {
  return array[Math.floor(Math.random() * array.length)]
}
