const CONSTANT = {
	PLAYER_TURN: 'PLAYER_TURN', // 0 Player, 1 NPC
	NPC_TURN: 'NPC_TURN',
	CARD_LIMIT: 6,
	RANDOM_THRESHOLD: 0.80,
	ELEMENT: {
		WATER: 'WATER',
		FIRE: 'FIRE',
		EARTH: 'EARTH',
		AERIAL: 'AERIAL',
		ETHER: 'ETHER'
	},
	ELEMENTS: ['WATER', 'FIRE', 'EARTH', 'AERIAL', ' ETHER']
}

function GetData(key) {
	return localStorage.getItem(key);
}

function SetData(key, value) {
	localStorage.setItem(key, value);
}
