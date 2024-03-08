import Orchestra from "./orchestra.js"
import * as Engine from "./engine.js"
import * as math from "./math.js"
import * as Audio from "./audio.js"

export default abstract class Musician {
  index: number
  sample: string
  life: number
  exp: number
  volume = 1
  pan = math.rand(-1, 1) ** 3 // Bias toward 0
  color: string
  alive = true

  constructor(samples: string[]) {
    this.index = Orchestra.nextPlayerIndex++
    // this.sample = math.arrRand(samples)
    // this.sample = "3Beep"
    this.sample = samples[(8 + this.index) % samples.length]
    this.color = math.hsl(this.index * 11, 60, 70)
  }

  play(pitch: number = 1) {
    Audio.play(this.sample, { pitch, volume: this.volume, pan: this.pan })
  }

  abstract getSyncPosition(): number

  tick() {
    this.life += 2 ** this.exp * Orchestra.velocity * Engine.dt

    // need some way to factor in the effect of exp
    // if (this.life >= 16) this.alive = false
    // if (this.exp <= -10) this.alive = false
  }

  halve = () => this.exp--
  double = () => this.exp++

  abstract draw(c: CanvasRenderingContext2D, i: number, allPlayers: Musician[])
}
