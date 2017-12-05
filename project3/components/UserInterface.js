class UserInterface {

  static getInstruction() {
    // rm
    const instructionContainer = new PIXI.Container();

    const dragAndDropContainer = new PIXI.Container();

    dragAndDropContainer.addChild(
      new Text('Drag', '#ff1505', -80, 0, {
        right: true
      }))

    dragAndDropContainer.addChild(
      new Text('and', '#d6e4f9', -40, 0, {
      right: true
    }));

    dragAndDropContainer.addChild(
      new Text('Drop', '#ff1505', 10, 0, {
        right: true
      })
    )

    const theimages = new Text('images from your computer', "#d6e4f9", 7, 20, {
      right: true
    });

    const theGrub = new Text('so the grubs can', "#d6e4f9", -40, 40, {
      right: true
    });

    const theFeast = new Text('feast', "#ff1505", 8, 40, {
      right: true
    });

    instructionContainer.addChild(dragAndDropContainer)
    instructionContainer.addChild(theimages)
    instructionContainer.addChild(theGrub)
    instructionContainer.addChild(theFeast)
    instructionContainer.position.y += sceneHeight / 2;

    instructionContainer.position.x = sceneWidth - 18;


    return instructionContainer
  }

  static getScore() {
    // lt
    const scoreContainer = new PIXI.Container();

    const theScore = new Text('Score: 0', '#ff1505', 10, 10);

    scoreContainer.addChild(theScore);

    return scoreContainer
  }

  static getFooter() {
    // bc
    const theFooter = new PIXI.Container();

    const theCopy = new Text('Ⓒ Stoney Reed and Lab', '#d6e4f9', 0, -10, {
      bottom: true
    });

    theFooter.addChild(theCopy);
    theFooter.position.x = sceneWidth / 2;
    theFooter.position.y = sceneHeight;
    theCopy.anchor.x = 0.5;
    return theFooter
  }

  static getDocumentationButton() {
    // rt
    const documentContainer = new PIXI.Container();


    documentContainer.position.x = sceneWidth;

    return documentContainer
  }

  static errorNotification() {
    const instructionContainer = new PIXI.Container();

    const dragAndDrop = new Text('', '#d6e4f9', 0, 0);

    const teDrop = new Text('', '#00FF00', sceneWidth, 0, {
      right: true
    });

    instructionContainer.addChild(dragAndDrop)
    instructionContainer.addChild(teDrop)

    return instructionContainer
  }

}
