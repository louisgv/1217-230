/*
  Code for the maggots goes here!
*/

"use strict";

class Bitemark extends PIXI.Sprite {
	constructor(container, {
		x = 0,
		y = 0,
        scale = 1
	}) {
		super(PIXI.loader.resources["bitemark"].texture);

		this.x = x;
		this.y = y;

		this.scale.set(scale);

		this.container = container;
	}
}
