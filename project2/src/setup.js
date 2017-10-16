const total = 5;

function Setup() {
	RestoreCopyRightState();

	for(let i = 0; i < total; i++) {
		PlayerDrawCard();
		NPCDrawCard();
	}

	SetData("TURN", "PLAYER_TURN");
}

window.addEventListener('load', Setup);
