/*
    Sound Manager class
    Used to load and play sound effects
*/


class Sound {
  // Load all the sound
  constructor() {
    this.walkingSound = new Howl({
      src: ['sounds/Squishy.mp3'],
      loop: true
    })

    this.eatingSound = new Howl({
      src: ['sounds/Eating.mp3'],
      loop: true
    })
  }

  // Play the walking sound
  playWalking(){
    this.walkingSound.play()
  }
  // Play the eating sound
  playEating(){
      if (this.eatingSound.playing()) {
          return;
      }
      this.eatingSound.play()
  }

  // Stop the eating sound
  stopEating() {
      this.eatingSound.stop()
  }
}
