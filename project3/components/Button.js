
class Button extends PIXI.Container {

  constructor(
    text = 'Message', clickCallBack=()=>{},
    width = 100, height=100, x=-5, y=5, {
      right,
      bottom
    } = {}) {

    // text middle aligned using height of text
    // constructor defines position, width and height
    // white button black text
    // interacive and hover
    // white boarder, black background and white text
    // on hover white border and white background, black text

    super();

    //const textElement = new Text(text, '#FFFFFF', 0, 0);

    this.body = new PIXI.Graphics();

    this.renderBody(0x000000, 0xff1505)

    this.body.x = x;
    this.body.y = y;
    this.body.buttonMode = true;
    this.body.interactive = true;

    this.body.on('pointerover', ()=>{
      this.renderBody(0xffffff, 0xffffff)
    });

    this.body.on('pointerout', ()=>{
      this.renderBody(0x000000, 0xff1505)
    });

    this.body.on('pointerdown', clickCallBack);
    // square.on('pointerup', e=>{e.target.tint=0xffffff});
    // square.on('pointerout', e=>{e.target.tint=0xffffff});
    // square.on('pointerupoutside', e=>{e.target.tint=0xffffff});
    this.addChild(this.body);


    const buttonText = new Text(text, "#ffffff",  100, 100 );
    buttonText.x = 590;
    buttonText.y = 15;
    buttonText.ineractive = true;
    buttonText.buttonMode = true;
    //this.addChild(textElement);
    this.addChild(buttonText);
  }

  // Render the body of the button
  renderBody(color, line){
    this.body.beginFill(color); 	// red in hexadecimal
    this.body.lineStyle(3, line, 1); // lineWidth,color in hex, alpha

    this.body.drawRect(590,10,110,30); 	// x,y,width,height

    this.body.endFill();
  }
}