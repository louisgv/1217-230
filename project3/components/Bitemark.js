/*
  Code for the maggots goes here!
*/

"use strict";

class Bitemark extends PIXI.Graphics {
	constructor(container, {x, y}, radius, color = 0x000000, duration = 9000) {
		super();
		if (!this.renderable) {
			return
		}

		this.beginFill(color);
		this.drawCircle(x, y, radius);
		this.endFill();

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
