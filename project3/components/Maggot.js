/*
  Code for the maggots goes here!
*/

"use strict";

class Maggot extends PIXI.Sprite {
	constructor({
		x = 0,
		y = 0
	}) {
		super(PIXI.loader.resources["images/Maggot.png"].texture);

		this.x = x;
		this.y = y;

		this.anchor.set(0.5);

		// different maggots, different sizes
		this.scale.set(0.8 + Math.random() * 0.3);

		this.tint = Math.random() * 0xFFFFFF;

		// create a random direction in radians
		// this.direction = {X: 0, y: 0};

		// create a random speed between 0 - 2, and these maggots are slooww
		this.speed = (2 + Math.random() * 2) * 0.2;
	}

	

	move(bounds, dt=1/60){


	}
}
