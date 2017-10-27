
// The combat phase with all the math and calculation behind the scene
async function Combat() {
	SetData(STOREKEY.PHASE, CONSTANT.PHASE.COMBAT);

	Info('COMBAT!', 1800)

	NPCRevealEquipment();

	await Wait(2000);

	NPCRevealStats();

	await Wait(2000);

	const playerStatus = GetStatus(player);
	const npcStatus = GetStatus(npc);

	// console.log(JSON.stringify(playerStatus));
	// console.log(JSON.stringify(npcStatus));

	await EtherCancellation(playerStatus.score, npcStatus.score);

	await EtherNullification(playerStatus, npcStatus);

	await ElementNullification(playerStatus, npcStatus);

	// console.log(playerStatus);
	// console.log(npcStatus);

	const playerFinalScore = GetTotalPoint(player);
	const npcFinalScore = GetTotalPoint(npc);

	// console.log(playerFinalScore);
	// console.log(npcFinalScore);

	let nextTurn;

	if (playerFinalScore === npcFinalScore) {
		nextTurn = CONSTANT.TURN.PLAYER;
		Info('DRAW!', 1800)
	}
	else if (playerFinalScore > npcFinalScore) {
		nextTurn = CONSTANT.TURN.PLAYER;
		Info('YOU WON!', 1800)
		CheckAndIncrement(STOREKEY.PLAYER_ROUND);
	}
	else {
		nextTurn = CONSTANT.TURN.NPC;
		Info('I WON!', 1800)
		CheckAndIncrement(STOREKEY.NPC_ROUND);
	}

	await Wait(9000);
	CleanUpEquip();

	NPCHideEquipment();
	NPCHideStats();

	NewRound(nextTurn);
}

function GetTotalPoint(playingSide) {
	const pointEl = playingSide.point;

	return CONSTANT.ELEMENTS.reduce((p, element) => {
		if (element === CONSTANT.ELEMENT.ETHER) {
			return p;
		} else {
			return p + parseInt(pointEl[element].innerHTML);
		}
	}, 0)
}

// Deduct point from an element
async function DeductPoint(playingSide, element, point){
	const pointEl = playingSide.point[element];

	let currentPoint = parseInt(pointEl.innerHTML);

	const originalColor = pointEl.style.color;

	pointEl.style.color = 'red';

	const targetPoint = currentPoint - point;

	while (currentPoint > targetPoint) {
		pointEl.innerHTML = --currentPoint;
		await Wait(100);
	}

	pointEl.style.color = originalColor;
}

// Cleanup equipment card
function CleanUpEquip() {
	RemoveAllChild(player.equip);
	RemoveAllChild(npc.equip);
}

// Return the score of a playing side
function GetStatus(playingSide) {
	const score = Object.assign({}, CONSTANT.ELEMENT_SCORE)

	let maxScore = -1;
	let maxElement = null;

	Array.from(playingSide.equip.children).map(child => {
		const {element, point} = child.card;

		score[element] += point;

		if (element !== CONSTANT.ELEMENT.ETHER && score[element] > maxScore) {
			maxElement = element;
			maxScore = score[element];
		}
	})

	return {
		score, maxElement
	}
}

// Cancel ether point
async function EtherCancellation(playerScore, npcScore) {
	const minEther = Math.min(playerScore.ETHER, npcScore.ETHER);
	playerScore.ETHER -= minEther;
	npcScore.ETHER -= minEther;
}

// Subtract ether from max of opposing
async function EtherNullification(playerStatus, npcStatus) {
	if (playerStatus.maxElement) {
		playerStatus.score[playerStatus.maxElement] -= npcStatus.score.ETHER;
		await DeductPoint(player, playerStatus.maxElement, npcStatus.score.ETHER)
	}

	if (npcStatus.maxElement) {
		npcStatus.score[npcStatus.maxElement] -= playerStatus.score.ETHER;
		await DeductPoint(npc, npcStatus.maxElement, playerStatus.score.ETHER)
	}
}


// Cancel Elemental point
async function ElementNullification(playerStatus, npcStatus) {

	const playerOriginalStatus = Object.assign({}, playerStatus);
	const npcOriginalStatus = Object.assign({}, npcStatus);

	await Promise.all(CONSTANT.ELEMENTS.map(async (element) => {
		if (element === CONSTANT.ELEMENT.ETHER) {
			return;
		}
		const nullifyElement = CONSTANT.ELEMENT_NULLIFICATION[element];

		const playerDeduction = playerStatus.score[nullifyElement] > npcOriginalStatus.score[element]
			? npcOriginalStatus.score[element]
			: playerStatus.score[nullifyElement];

		playerStatus.score[nullifyElement] -= playerDeduction;

		if (playerDeduction) {
			await DeductPoint(player, nullifyElement, playerDeduction);
		}

		const npcDeduction = npcStatus.score[nullifyElement] > playerOriginalStatus.score[element]
			? playerOriginalStatus.score[element]
			: npcStatus.score[nullifyElement];

		npcStatus.score[nullifyElement] -= npcDeduction;

		if (npcDeduction) {
			await DeductPoint(npc, nullifyElement, npcDeduction);
		}
	}))
}
