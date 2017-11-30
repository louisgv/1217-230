
class Text extends PIXI.Text {

  constructor(text = 'Message', color = '#d6e4f9', x=0, y=0) {

    const style = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 20,
        fill: [color], // gradient
        stroke: '#000000',
        strokeThickness: 5,
        dropShadowBlur: 4,
        dropShadowAngle: Math.PI / 6,
        dropShadowDistance: 6,
        wordWrap: true,
        wordWrapWidth: 440
    });

    super(text, style);

    this.x = x;
    this.y = y;

  }
}
