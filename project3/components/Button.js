/*
    Generic button class with following layout:
    // text middle aligned using height of text
    // constructor defines position, width and height
    // white button black text
    // interacive and hover
    // white boarder, black background and white text
    // on hover white border and white background, black text
*/
class Button extends PIXI.Container {

	constructor(text = 'Message', clickCallBack = () => {}, x = 5, y = 5, width = 110, height = 30,  {right, bottom} = {}) {

		super();

        this.x = x;
        this.y = y;

        this.buttonWidth = width;
        this.buttonHeight = height;

		this.button = new PIXI.Graphics();

		this.renderBody(0x000000, 0xff1505)

		this.button.buttonMode = true;
		this.button.interactive = true;

		this
			.button
			.on('pointerover', () => {
				this.renderBody(0xffffff, 0xffffff)
			})
            .on('pointerout', () => {
				this.renderBody(0x000000, 0xff1505)
			})
            .on('pointerdown', clickCallBack);
		// square.on('pointerup', e=>{e.target.tint=0xffffff});
		// square.on('pointerout', e=>{e.target.tint=0xffffff});
		// square.on('pointerupoutside', e=>{e.target.tint=0xffffff});

		const buttonText = new Text(text, "#ffffff", width/2, height/3);

        buttonText.anchor.x=0.5;
        // buttonText.anchor.y=0.5;

		buttonText.ineractive = true;
		buttonText.buttonMode = true;

		this.addChild(this.button);
		this.addChild(buttonText);
	}

	// Render the body of the button
	renderBody(color, line) {
		this
			.button
			.beginFill(color);

        this
			.button
			.lineStyle(3, line, 1); // lineWidth,color in hex, alpha

		this
			.button
			.drawRect(0, 10, this.buttonWidth, this.buttonHeight); // x,y,width,height

		this
			.button
			.endFill();
	}
}
