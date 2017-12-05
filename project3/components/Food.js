/*
    Food behavior class
*/

"use strict";

class Food extends PIXI.Sprite {
	// Initialize a new maggot
	constructor(texture, {
		x,
		y
	}, container) {
		super(texture);
		const {MAX_WIDTH, MAX_HEIGHT} = Store.getFood();

		// Cramp the food height
		if (this.width > MAX_WIDTH) {
			const ratio = this.height / this.width

			this.width = MAX_WIDTH

			this.height = MAX_WIDTH * ratio
		}

		if (this.height > MAX_HEIGHT) {
			const ratio = this.width / this.height;

			this.height = MAX_HEIGHT

			this.width = MAX_HEIGHT * ratio
		}

		this.anchor.x = 0.5;
		this.anchor.y = 0.5;

		this.x = x;
		this.y = y;

		this.container = container;
		this
			.container
			.addChild(this);

		this.isBeingConsumed = false;
	}

	// Destroy itself after a certain amount of time if it is being consumed
	async getConsumed(callback) {
		if (this.isBeingConsumed) {
			return;
		}
		this.isBeingConsumed = true;

		await wait(getRandom(3600, 5400));

		callback()

		this
			.container
			.removeChild(this);

		this.destroy()

	}
}
