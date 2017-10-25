const centralDeck = document.querySelector('#CentralDeck');

// Start the game
function StartGame() {

	for(let i = 0; i < CONSTANT.INITIAL_CARD_COUNT; i++) {
		PlayerDrawCard();
		NPCDrawCard();
	}

	NewRound(GetFirstTurnPlayer());
}

// Start a new round
function NewRound(firstPlayer) {
	const currentRound = CheckAndIncrement(STOREKEY.ROUND);

	if (currentRound >= CONSTANT.ROUND_LIMIT) {

		console.log("GAMEOVER");

		return;
	}

	SetTurn(firstPlayer);

	SetData(STOREKEY.PHASE, CONSTANT.PHASE.PREPARE);
}

// Implementing a 5-way rock paper scisor game to determine the first
// to make a move
function GetFirstTurnPlayer() {

	const playerHero = GetData(STOREKEY.PLAYER_HERO);

	const npcHero = GetData(STOREKEY.NPC_HERO);

	// If the NPC element hiearchy has the player's element, this means NPC's element
	// beats player's element
	return (CONSTANT.ELEMENT_HIERARCHY[npcHero.element].includes(playerHero.element))
		? CONSTANT.TURN.NPC
		: CONSTANT.TURN.PLAYER;
}

// Check and increment round number accordingly
function CheckAndIncrement(key) {
	const current = GetData(key);

	const next = current !== null
		? (current + 1)
		: 0;

	return SetData(key, next);
}

// Handle event when player click on the drawing deck
function OnCentralDeckClicked() {
  if (!IsPlayerTurn() || !PlayerCanDraw() || IsCombatPhase()) {
		// Show overlay saying max card
    return;
  }

  PlayerDrawCard();
  SwitchTurn();
}

// NPC behavior lies here
function NPCMakeMove() {
	if (IsCombatPhase()) {
		return;
	}

	// If it can draw, assigns a random to it drawing chance
	const willDraw = NPCCanDraw()
		? Math.random()
		: 0;

	// If it can play card, assigns a random to its playing chance
	const willPlayCard = NPCCanPlayCard()
		? Math.random()
		: 0;

	// Based on the decision, it either draw or play
	if (willDraw > willPlayCard) {
		NPCDrawCard();
	} else {
		NPCPlayCard();
	}

	SwitchTurn();
}

// Check if the combat phase should commence
function ShouldCombat () {
	return PlayerReachedEquipLimit() || NPCReachedEquipLimit();
}

// Handle switching turn and invoke NPC's logic
function SwitchTurn() {
	if (ShouldCombat()) {
		Combat();
	}

	if (IsCombatPhase()) {
		return;
	}

	// Check if it is npc turn
	const isCurrentlyNPCTurn = IsNPCTurn();

	// Switch turn
  const nextTurn = isCurrentlyNPCTurn
    ? CONSTANT.TURN.PLAYER
    : CONSTANT.TURN.NPC

	SetTurn(nextTurn);
}

async function SetTurn(turn) {
	SetData(STOREKEY.TURN, turn);

	Info(IsNPCTurn()
	? "NPC TURN"
	: "YOUR TURN", 1800)

	// If after set turn, it is npc turn
	if (IsNPCTurn()) {
		document.body.style.cursor = "progress";
		await Wait(2000);
		NPCMakeMove();
		document.body.style.cursor = "default";
	}
}

centralDeck.addEventListener('click', OnCentralDeckClicked)
