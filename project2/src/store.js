// Global constant for the game's configuration
const CONSTANT = {
	GIPHY: {
		URL: 'https://api.giphy.com/v1/stickers/search?',
		API_KEY: 'kD7ApWahPcBwM4UuSGk1Y99Hot9F7Dsv',
		TIMEOUT: 60 * 60 * 1000 // Re-fetch every hour
	},
	PLAYER_TURN: 'PLAYER_TURN', // 0 Player, 1 NPC
	NPC_TURN: 'NPC_TURN',
	INITIAL_CARD_COUNT: 5,
	CARD_LIMIT: 6,
	POINT_LIMIT: 10,
	DEFAULT_THRESHOLD: 0.72,
	ELEMENT: {
		ETHER: 'ETHER',
		WATER: 'WATER',
		FIRE: 'FIRE',
		EARTH: 'EARTH',
		WIND: 'WIND',
	},
	ELEMENT_COLOR: {
		ETHER: 'gray',
		WATER: 'blue',
		FIRE: 'red',
		EARTH: 'brown',
		WIND: 'green'
	},
	ELEMENT_KEYWORD: {
		ETHER: 'CRYSTAL',
		WATER: 'WATER',
		FIRE: 'FIRE',
		EARTH: 'DIRT',
		WIND: 'WIND_BLOW'
	},
	ELEMENTS: ['WATER', 'FIRE', 'EARTH', 'WIND', 'ETHER']
}

// Get data from a data source, using localStorage for now.
function GetData(key) {
	return JSON.parse(localStorage.getItem(key));
}

// Set the data in a data source, using localStorage for now.
function SetData(key, value) {
	localStorage.setItem(key, JSON.stringify(value));
}

const GIPHY_TABLE = {
	ETHER: [],
	WATER: [],
	FIRE: [],
	EARTH: [],
	WIND: [],
}

/*
LOCALSTORAGE data structure keys:
*/

const STOREKEY = {
	TURN: 'TURN',
	PLAYER_HERO: 'PLAYER_HERO',
	NPC_HERO: 'NPC_HERO',
	COPYRIGHT_STATE: 'COPYRIGHT_STATE',
	GIPHY_TABLE: 'GIPHY_TABLE',
	GIPHY_TIMESTAMP: 'GIPHY_TIMESTAMP'
}
