/*
  Code for the maggots goes here!
*/

"use strict";

const style1 = new PIXI.TextStyle({

    fontFamily: 'Arial',
    fontSize: 20,
    fill: ['#d6e4f9'], // gradient
    stroke: '#000000',
    strokeThickness: 5,
    dropShadowBlur: 4,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 6,
    wordWrap: true,
    wordWrapWidth: 440
});

var richText1 = new PIXI.Text('Drag and drop pictures from your computer so the grubs can grub', style1);
richText1.x = 800;
richText1.y = 180;


var style2 = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontSize: 25,
    fill: ['#FFFFFF'], // gradient
    stroke: '#000000',
    strokeThickness: 6,
    dropShadowBlur: 4,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 6,
    wordWrap: true,
    wordWrapWidth: 440
});

var richText2 = new PIXI.Text('Instructions Menu:', style2);
richText2.x = 890;
richText2.y = 150;


var style3 = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontSize: 20,
    fill: ['#ffdddb'], // gradient
    stroke: '#000000',
    strokeThickness: 5,
    dropShadowBlur: 4,
    dropShadowAngl
    e: Math.PI / 6,
    dropShadowDistance: 6,
    wordWrap: true,
    wordWrapWidth: 440
});

var richText3 = new PIXI.Text('The Grubs will burst and multiply after it eats enough pictures', style3);
richText3.x = 800;
richText3.y = 240;

app.stage.addChild(richText1);
app.stage.addChild(richText2);
app.stage.addChild(richText3);

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
