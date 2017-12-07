
const DEFAULT_TEXT_STYLE = {
    fontFamily: 'Arial',
    fontSize: 20,
    stroke: '#000000',
    strokeThickness: 5,
    dropShadowBlur: 4,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 6,
    wordWrap: true,
    wordWrapWidth: 440
};

/*
    Generic text class
*/

class Text extends PIXI.Text {

  constructor(text = 'Message', color = '#d6e4f9', x=0, y=0, {
    right,
    bottom
  } = {}) {

    const style = new PIXI.TextStyle(Object.assign(DEFAULT_TEXT_STYLE, {
        fill: [color], // gradient
    }));

    super(text, style);

    this.x = x;
    this.y = y;

    if (right) {
      this.x = this.x - this.width
    }

    if (bottom) {
      this.y = this.y - this.height
    }
  }

  // An example dynamic style
  active() {
    // this.setStyle(Object.assign(DEFAULT_TEXT_STYLE, {
    //     fill: ['#000000'], // gradient
    // }))
  }

}
