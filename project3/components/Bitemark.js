/*
  Code for the maggots bitemark goes here!
*/

"use strict";

class Bitemark extends PIXI.Sprite {
	constructor(container, {x, y}, radius, duration = 9000) {
			super(PIXI.loader.resources["images/Bitemark.png"].texture);

		if (!this.renderable) {
			return
		}

		this.x = x;
		this.y = y;

		this.anchor.x = 0.5;
		this.anchor.y = 0.5;

		this.duration = duration;

		this.container = container;

		container.addChild(this);

		this.delayedSelfDestruct()
	}

	// Self destruct after specified duration
	async delayedSelfDestruct() {
		await wait(this.duration);

		this.container.removeChild(this);

		this.destroy()
	}
}
