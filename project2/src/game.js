const centralDeck = document.querySelector('#CentralDeck');

// Start the game
function startGame() {

	for(let i = 0; i < CONSTANT.INITIAL_CARD_COUNT; i++) {
		playerDrawCard();
		npcDrawCard();
	}

	newRound(getFirstTurnPlayer());
}

async function isGameOver() {

	const playerRoundCount = getData(STOREKEY.PLAYER_ROUND);
	const npcRoundCount = getData(STOREKEY.NPC_ROUND);

	if (!playerRoundCount || !npcRoundCount) {
		setData(STOREKEY.PLAYER_ROUND, 0);
		setData(STOREKEY.NPC_ROUND, 0);
		return false;
	}

	if (playerRoundCount + npcRoundCount >= CONSTANT.ROUND_LIMIT) {

		if (playerRoundCount > npcRoundCount) {
			anounce("GAMEOVER, You Won!");
		} else {
			anounce("GAMEOVER, I Won!");
		}

		setData(STOREKEY.PLAYER_ROUND, 0);
		setData(STOREKEY.NPC_ROUND, 0);
		return true;
	}

	return false;
}

// Start a new round
async function newRound(firstPlayer) {
	const currentRound = checkAndIncrement(STOREKEY.ROUND);

	const endGame = await isGameOver();

	if (endGame) {
		return;
	}

	info("ROUND " + currentRound, 1800);

	await wait(2000);

	setTurn(firstPlayer);

	setData(STOREKEY.PHASE, CONSTANT.PHASE.PREPARE);
}

// Implementing a 5-way rock paper scisor game to determine the first
// to make a move
function getFirstTurnPlayer() {

	const playerHero = getData(STOREKEY.PLAYER_HERO);

	const npcHero = getData(STOREKEY.NPC_HERO);

	// If the npc element hiearchy has the player's element, this means npc's element
	// beats player's element
	return (CONSTANT.ELEMENT_HIERARCHY[npcHero.element].includes(playerHero.element))
		? CONSTANT.TURN.NPC
		: CONSTANT.TURN.PLAYER;
}

// Handle event when player click on the drawing deck
function onCentralDeckClicked() {
  if (!isPlayerTurn() || !playerCanDraw() || isCombatPhase()) {
		// Show overlay saying max card
    return;
  }

  playerDrawCard();
  switchTurn();
}

// npc behavior lies here
function npcMakeMove() {
	if (isCombatPhase()) {
		return;
	}

	// If it can draw, assigns a random to it drawing chance
	const willDraw = npcCanDraw()
		? Math.random()
		: 0;

	// If it can play card, assigns a random to its playing chance
	const willPlayCard = npcCanPlayCard()
		? Math.random()
		: 0;

	// Based on the decision, it either draw or play
	if (willDraw > willPlayCard) {
		info("DRAW CARD", 1800);
		npcDrawCard();
	} else {
		info("PLAY CARD", 1800);
		npcPlayCard();
	}
}

// Check if the combat phase should commence
function shouldcombat () {
	return playerReachedEquipLimit() || npcReachedEquipLimit();
}

// Handle switching turn and invoke npc's logic
function switchTurn() {
	if (shouldcombat()) {
		combat();
	}

	if (isCombatPhase()) {
		return;
	}

	// Check if it is npc turn
	const isCurrentlyNPCTurn = isNPCTurn();

	// Switch turn
  const nextTurn = isCurrentlyNPCTurn
    ? CONSTANT.TURN.PLAYER
    : CONSTANT.TURN.NPC

	setTurn(nextTurn);
}

async function setTurn(turn) {
	setData(STOREKEY.TURN, turn);

	info(isNPCTurn()
	? "MY TURN"
	: "YOUR TURN", 1800)

	// If after set turn, it is npc turn
	if (isNPCTurn()) {
		document.body.style.cursor = "progress";
		await wait(2000);

		info("THINKING", 1800);

		await wait(2000);

		npcMakeMove();

		await wait(2000);

		switchTurn();

		document.body.style.cursor = "default";
	}
}

centralDeck.addEventListener('click', onCentralDeckClicked)
