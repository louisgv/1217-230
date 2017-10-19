// Global constant for the game's configuration
const CONSTANT = {
	PLAYER_TURN: 'PLAYER_TURN', // 0 Player, 1 NPC
	NPC_TURN: 'NPC_TURN',
	INITIAL_CARD_COUNT: 5,
	CARD_LIMIT: 6,
	RANDOM_THRESHOLD: 0.80,
	ELEMENT: {
		WATER: 'WATER',
		FIRE: 'FIRE',
		EARTH: 'EARTH',
		AERIAL: 'AERIAL',
		ETHER: 'ETHER'
	},
	ELEMENT_COLOR: {
		WATER: 'blue',
		FIRE: 'red',
		EARTH: 'brown',
		AERIAL: 'green',
		ETHER: 'white'
	},
	ELEMENTS: ['WATER', 'FIRE', 'EARTH', 'AERIAL', ' ETHER']
}

// Get data from a data source, using localStorage for now.
function GetData(key) {
	return localStorage.getItem(key);
}

// Set the data in a data source, using localStorage for now.
function SetData(key, value) {
	localStorage.setItem(key, value);
}
