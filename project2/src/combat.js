
// The combat phase with all the math and calculation behind the scene
async function Combat() {
	SetData(STOREKEY.PHASE, CONSTANT.PHASE.COMBAT);

	NPCRevealEquipment();

	const playerStatus = GetStatus(player);
	const npcStatus = GetStatus(npc);

	EtherCancellation(playerStatus.score, npcStatus.score);

	EtherNullification(playerStatus, npcStatus);

	ElementNullification(playerStatus, npcStatus);

	// setTimeout(function () {
	// 	CleanUpEquip();
  //
	// 	NPCHideEquipment();
  //
	// 	NewRound(CONSTANT.TURN.PLAYER);
	// }, 9000);
}

// Cleanup equipment card
function CleanUpEquip() {
	RemoveAllChild(player.equip);
	RemoveAllChild(npc.equip);
}

// Return the score of a playing side
function GetStatus(playingSide) {
	const score = Object.assign({}, CONSTANT.ELEMENT_SCORE)

	let maxScore = 0;
	let maxElement = 0;

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
function EtherNullification(playerStatus, npcStatus) {
	playerStatus.score[playerStatus.maxElement] -= npcStatus.score.ETHER;

	npcStatus.score[npcStatus.maxElement] -= playerStatus.score.ETHER;
}


// Cancel Elemental point
async function ElementNullification(playerStatus, npcStatus) {

	const playerOriginalStatus = Object.assign({}, playerStatus);
	const npcOriginalStatus = Object.assign({}, npcStatus);

	CONSTANT.ELEMENTS.map(element => {
		const nullifyElement = CONSTANT.ELEMENT_NULLIFICATION[element];

		playerStatus.score[nullifyElement] -= npcOriginalStatus.score[element];

		npcStatus.score[nullifyElement] -= playerOriginalStatus.score[element];
	})
}
