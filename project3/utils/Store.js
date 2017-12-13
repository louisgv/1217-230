"use strict";

// const MOUNT_ID = 'game-root'

const FOOD = {
	MAX_WIDTH: 100,
	MAX_HEIGHT: 100
}

const ZOOM = {
	MAX: 1.0,
	MIN: 0.1,
	SCALE: 0.1
}

const INIT_MAGGOT_COUNT = 18;

const IMAGES = ["images/Maggot.png", "images/Bitemark.png"]

const UNIQUE_WARNING = [
	"You cannot feed the same image twice",
	"They already ate that",
	"The maggots demand fresh memes",
	"Feed us fresh meme!",
	"Can I have fresh meme please bause?",
	"That food is old"
]

let imageHashSet = new Set();

const MAGGOT_COUNT_KEY = "TAMAGGOTCHI_MAGGOT_COUNT"

const MAGGOT_HASH_KEY = "TAMAGGOTCHI_MAGGOT_HASH"

// The Store abstract all of storage/database interaction
class Store {
	// Return the food config
	static getFood() {
		return FOOD;
	}

	// Save the maggot count to localstorage
	static setMaggotCount(count) {
		localStorage.setItem(MAGGOT_COUNT_KEY, JSON.stringify(count));
	}

	//Return the maggot count from local storage
	static getMaggotCount() {
		//Retrieve an array from localStorage
		let count = localStorage.getItem(MAGGOT_COUNT_KEY);
		if (!count) {
			return INIT_MAGGOT_COUNT;
		}
		return JSON.parse(count);
	}

	// Return the zoom config
	static getZoom() {
		return ZOOM;
	}

	// Return name of image assets
	static getImages() {
		return IMAGES;
	}

	// Return a random warning for variety sake
	static getRandomWarning() {
		return UNIQUE_WARNING[Math.floor(Math.random() * UNIQUE_WARNING.length)]
	}

	// Initialize the image hash set from local storage
	static initializeImageHashSet() {
		const cachedSet = localStorage.getItem(MAGGOT_HASH_KEY);

		if (!cachedSet) {
			return Store.serializeImageHashSet()
		}

		imageHashSet = new Set(JSON.parse(cachedSet))
	}

	// Serialize and store the image set into local storage
	static serializeImageHashSet() {
		const serializableData = Array.from(imageHashSet);

		localStorage.setItem(MAGGOT_HASH_KEY, JSON.stringify(serializableData));
	}

	// Add a new image into the hash list
	static addImage(base64Data) {
		const imageHash = keccak512(base64Data)

		imageHashSet.add(imageHash)

		return imageHash;
	}

	// Check if image is already in the hashset
	static hasImage(base64Data) {
		const imageHash = keccak512(base64Data)

		return (imageHashSet.has(imageHash))
	}
}
