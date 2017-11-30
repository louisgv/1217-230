class UserInterface {

  static getInstruction() {
    // rm
    const instructionContainer = new PIXI.Container();

    const dragAndDrop = new Text('HUMAN', '#d6e4f9', 0, 0);

    const teDrop = new Text('SUCKS', '#00FF00', sceneWidth, 0, {
      right: true
    });

    instructionContainer.addChild(dragAndDrop)
    instructionContainer.addChild(teDrop)

    return instructionContainer
  }

  static getScore() {
    // lt
    
  }

  static getFooter() {
    // bc
  }

  static getDocumentationButton() {
    // rt
  }

}
