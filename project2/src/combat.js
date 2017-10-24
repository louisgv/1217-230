
// The combat phase with all the math and calculation behind the scene
async function Combat() {
	SetData(STOREKEY.PHASE, CONSTANT.PHASE.COMBAT);

	NPCRevealEquipment();




	setTimeout(function () {

		CleanUpEquip();

		NPCHideEquipment();

		NewRound(CONSTANT.TURN.PLAYER);
	}, 9000);
}

// Cleanup equipment card
function CleanUpEquip() {
	RemoveAllChild(player.equip);
	RemoveAllChild(npc.equip);
}

// Return the score of a playing side
function GetScore(playingSide) {
	const score = Object.assigns(CONSTANT.ELEMENT_SCORE)

	playingSide.equip.children.map(child => {
		const {element, point} = child.card;

		score[element] += point;
	})

	return score
}

function EtherNullification() {

}

function EtherCancellation() {

}

function ElementCancellation() {

}
