/*

*/


class Sound {
  constructor() {
    this.walkingSound = new Howl({
      src: ['sounds/Squishy.mp3']
    })

    this.eatingSound = new Howl({
      src: ['sounds/Eating.mp3']
    })
  }

  playWalking(){
    this.walkingSound.play()
  }

  playEating(){
    this.eatingSound.play()
  }
}
