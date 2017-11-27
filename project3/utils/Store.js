"use strict";

// const MOUNT_ID = 'game-root'

const FOOD = {
	MAX_WIDTH: 100
}

const ZOOM = {
	MAX: 1.0,
	MIN: 0.1,
	SCALE: 0.1
}

const ASSETS = [
    "assets/Maggot.png"
]

const IMAGE_HASH_SET = new Set();

class Store {
	static getFood() {
		return FOOD;
	}

	static getZoom() {
		return ZOOM;
	}

	static getAssets() {
		return ASSETS;
	}

	static addImage(base64Data) {
		const imageHash = keccak512(base64Data)

		IMAGE_HASH_SET.add(imageHash)

        return imageHash;
	}

	static hasImage(base64Data) {
        const imageHash = keccak512(base64Data)

		return(IMAGE_HASH_SET.has(imageHash))
	}
}
