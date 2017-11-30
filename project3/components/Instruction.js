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
    dropShadowAngle: Math.PI / 6,
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
