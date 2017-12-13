/*
    Implement user interface for the game
*/
class UserInterface {

    // Instruction text
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

    const theimages = new Text('images from your computer', "#d6e4f9", 10, 20, {
      right: true
    });

    const theGrub = new Text('so the maggots can', "#d6e4f9", -45, 40, {
      right: true
    });

    const theFeast = new Text('Feast', "#ff1505", 10, 40, {
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

  // Generate the footer
  static getFooter() {
    // bc
    const theFooter = new PIXI.Container();

    const theCopy = new Text('Ⓒ Stoney Lab under a GPLv3 license', '#d6e4f9', 0, -10, {
      bottom: true
    });

    theFooter.addChild(theCopy);
    theFooter.position.x = sceneWidth / 2;
    theFooter.position.y = sceneHeight;
    theCopy.anchor.x = 0.5;
    return theFooter
  }

  // Generate the documentation button
  static getDocumentationButton() {
      return new Button("Documentation", ()=>{
      	window.open("https://people.rit.edu/hhn2884/230/project3/documentation/", "_blank");
      }, sceneWidth - 125)
  }

  // Rendering any error
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
