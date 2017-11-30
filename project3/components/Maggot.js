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

		this.zOrder = 9;

		this.anchor.set(0.5);

		// different maggots, different sizes
		this.scale.set(0.8 + Math.random() * 0.3);

		this.tint = Math.random() * 0xFFFFFF;

		// create a random direction in radians
		this.direction = Math.random() * Math.PI * 2;

		// this number will be used to modify the direction of the sprite over time
		this.turningSpeed = Math.random() - 0.8;

		// create a random speed between 0 - 2, and these maggots are slooww
		this.speed = (2 + Math.random() * 2) * 0.2;

		this.offset = Math.random() * 100;
	}

	move(bounds){
		// console.log(this.x, this,y);
		this.direction += this.turningSpeed * 0.01;
		this.x += Math.sin(this.direction) * (this.speed * this.scale.y);
		this.y += Math.cos(this.direction) * (this.speed * this.scale.y);
		this.rotation = -this.direction + Math.PI;

		// wrap the maggots
		if (this.x < bounds.x) {
		    this.x += bounds.width;
		}
		else if (this.x > bounds.x + bounds.width) {
		    this.x -= bounds.width;
		}

		if (this.y < bounds.y) {
		    this.y += bounds.height;
		}
		else if (this.y > bounds.y + bounds.height) {
		    this.y -= bounds.height;
		}
	}
}
