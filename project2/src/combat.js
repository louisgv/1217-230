
// The combat phase with all the math and calculation behind the scene
async function Combat() {
		SetData(STOREKEY.PHASE, CONSTANT.PHASE.COMBAT);
		
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

function Nullify() {

}
