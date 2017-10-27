const centralDeck = document.querySelector('#CentralDeck');

// Start the game
function StartGame() {

	for(let i = 0; i < CONSTANT.INITIAL_CARD_COUNT; i++) {
		PlayerDrawCard();
		NPCDrawCard();
	}

	NewRound(GetFirstTurnPlayer());
}

async function IsGameOver() {

	const playerRoundCount = GetData(STOREKEY.PLAYER_ROUND);
	const npcRoundCount = GetData(STOREKEY.NPC_ROUND);

	if (!playerRoundCount || !npcRoundCount) {
		SetData(STOREKEY.PLAYER_ROUND, 0);
		SetData(STOREKEY.NPC_ROUND, 0);
		return false;
	}

	if (playerRoundCount + npcRoundCount >= CONSTANT.ROUND_LIMIT) {

		if (playerRoundCount > npcRoundCount) {
			Anounce("GAMEOVER, You Won!");
		} else {
			Anounce("GAMEOVER, I Won!");
		}

		SetData(STOREKEY.PLAYER_ROUND, 0);
		SetData(STOREKEY.NPC_ROUND, 0);
		return true;
	}

	return false;
}

// Start a new round
async function NewRound(firstPlayer) {
	const currentRound = CheckAndIncrement(STOREKEY.ROUND);

	const isGameOver = await IsGameOver();

	if (isGameOver) {
		return;
	}

	Info("ROUND " + currentRound, 1800);

	await Wait(2000);

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
		Info("DRAW CARD", 1800);
		NPCDrawCard();
	} else {
		Info("PLAY CARD", 1800);
		NPCPlayCard();
	}
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
	? "MY TURN"
	: "YOUR TURN", 1800)

	// If after set turn, it is npc turn
	if (IsNPCTurn()) {
		document.body.style.cursor = "progress";
		await Wait(2000);

		Info("THINKING", 1800);

		await Wait(2000);

		NPCMakeMove();

		await Wait(2000);

		SwitchTurn();

		document.body.style.cursor = "default";
	}
}

centralDeck.addEventListener('click', OnCentralDeckClicked)
