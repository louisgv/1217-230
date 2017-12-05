/*
  Maggot behavior class
  Author: LAB
*/

"use strict";

class Maggot extends PIXI.Sprite {
	// Initialize a new maggot
	constructor({
		x = 0,
		y = 0,
		maggotSet,
		maggotSystem
	}) {
		super(PIXI.loader.resources["images/Maggot.png"].texture);

		this.x = x;
		this.y = y;

		this.anchor.x = 0.75;
		this.anchor.y = 0.5;

		this.velocity = {
			x: 0,
			y: 0
		};

		this.maxVelocity = 2.7;
		this.maxForce = 0.27;

		// different maggots, different sizes
		this
			.scale
			.set(0.36 + Math.random() * 0.18);

		this.tint = Math.random() * 0xFFFFFF;

		this.maxScale = 1.0;

		this.growthRate = Math.random() * 0.01

		this.maggotSystem = maggotSystem;
		this.maggotSet = maggotSet;

		maggotSet.add(this);
		maggotSystem.addChild(this);
	}

	// Give birth to 9 more baby maggot
	giveBirth() {
		// Give birth
		for (let i = 0; i < 9; i++) {
			new Maggot(this)
		}

		this.killYourSelf()
	}

	// Self destruct
	killYourSelf() {
		this.maggotSystem.removeChild(this);
		this.maggotSet.delete(this);

		this.destroy()
	}

	// Maggot will grow a little bit as it eat more and more
	grow(dt) {
		const {scale, maxScale} = this;
		if (scale.x < maxScale) {
			this
				.scale
				.set(scale.x + this.growthRate * dt)
		} else {
			this.giveBirth()
		}
	}

	// Update the maggot velocity
	updateVelocity(neighbors, headingDirections, center, target) {
		const position = new de
			.math
			.Vector(this.x, this.y);
		const forward = de
			.math
			.Vector
			.fromRad(this.rotation)
			.scale(0.5);

		const totalVelocity = new de
			.math
			.Vector(0, 0);
		// Separation force
		totalVelocity.add(de.steer.behaviors.seperate(position, neighbors).scale(0.01))
		// Cohesion force
		// totalVelocity.add(de.steer.behaviors.cohese(position, neighbors).scale(0.01))
		// Alignment force
		totalVelocity.add(de.steer.behaviors.align(forward, headingDirections).scale(0.015))

		if (target) {
			// Seek the target if it exist
			totalVelocity.add(de.steer.behaviors.seek(position, target).scale(0.005))
		} else {
			// Wandering force

		}
		totalVelocity.add(de.steer.behaviors.wander(this.rotation).scale(1))

		// Centering force
		totalVelocity.add(de.steer.behaviors.seek(position, center).scale(0.00045))

		// console.log(totalVelocity);
		this.move(totalVelocity)
	}

	// Move the maggot
	move(desiredVelocity) {
		const velocity = new de
			.math
			.Vector(this.velocity.x, this.velocity.y)

		const steeringForce = de
			.math
			.Vector
			.sub2(desiredVelocity, velocity)
			.truncate(this.maxForce);

		velocity
			.add(steeringForce)
			.truncate(this.maxVelocity)

		this.velocity.x = velocity.x;
		this.velocity.y = velocity.y;

		this.x += velocity.x;
		this.y += velocity.y;

		this.rotation = velocity.toRad();
	}
}
