// Global constant for the game's configuration
const CONSTANT = {
	PLAYER_TURN: 'PLAYER_TURN', // 0 Player, 1 NPC
	NPC_TURN: 'NPC_TURN',
	INITIAL_CARD_COUNT: 5,
	CARD_LIMIT: 6,
	DEFAULT_THRESHOLD: 0.80,
	ELEMENT: {
		ETHER: 'ETHER',
		WATER: 'WATER',
		FIRE: 'FIRE',
		EARTH: 'EARTH',
		AERO: 'AERO',
	},
	ELEMENT_COLOR: {
		ETHER: 'gray',
		WATER: 'blue',
		FIRE: 'red',
		EARTH: 'brown',
		AERO: 'green'
	},
	ELEMENTS: ['WATER', 'FIRE', 'EARTH', 'AERO', 'ETHER']
}

// Get data from a data source, using localStorage for now.
function GetData(key) {
	return JSON.parse(localStorage.getItem(key));
}

// Set the data in a data source, using localStorage for now.
function SetData(key, value) {
	localStorage.setItem(key, JSON.stringify(value));
}


/*
LOCALSTORAGE data structure keys:
*/

const STOREKEY = {
	TURN: 'TURN',
	PLAYER_HERO: 'PLAYER_HERO',
	NPC_HERO: 'NPC_HERO',
	COPYRIGHT_STATE: 'COPYRIGHT_STATE',
}
