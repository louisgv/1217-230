/*
    Score class for counting maggot
*/
class Score extends PIXI.Container {
    constructor(initCount = 9) {
        super()

        this.maggotCount = initCount;

        const text = new Text('Maggots: ', '#ffffff', 10, 10);

        this.scoreNumber = new Text(this.maggotCount, '#ff1505', 108, 12);

        this.addChild(text);
        this.addChild(this.scoreNumber);
    }
    // Set the text of the score object
    setScore(count){
        this.scoreNumber.text = count
    }
}
