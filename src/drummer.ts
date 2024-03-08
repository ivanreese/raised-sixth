import Musician from "./musician.js"
import * as Render from "./render.js"
import * as math from "./math.js"
import * as Engine from "./engine.js"
import Orchestra from "./orchestra.js"

export default class Drummer extends Musician {
  age = 0
  tightPhase: number
  duration: number
  phase: number

  constructor(phase: number, exp: number) {
    super(samples)

    exp -= 5

    this.phase = phase * 2 ** exp
    this.life = phase * 2 ** exp // not used for anything yet
    this.exp = exp // should always be an integer, representing 2^x

    const meter = 1 / 48
    this.duration = meter * 2 ** math.randInt(-1, 1)
    this.tightPhase = math.mod(this.phase, this.duration)
  }

  getSyncPosition = () => math.mod(this.life, 1) / 2 ** this.exp

  tick() {
    super.tick()
    this.phase += 2 ** this.exp * Orchestra.velocity * Engine.dt

    this.phase = math.mod(this.phase, 1)
    this.tightPhase += 2 ** this.exp * Orchestra.velocity * Engine.dt

    if (this.tightPhase >= this.duration) {
      this.tightPhase -= this.duration
      super.play()
    }
  }

  draw(context: CanvasRenderingContext2D, i: number, allPlayers: [Musician]) {
    context.fillStyle = context.strokeStyle = this.color

    const x = (window.innerWidth * (1 + i)) / (allPlayers.length + 1)
    const y = math.renormalized(this.tightPhase, 0, this.duration, 0, window.innerHeight)
    context.fillText(this.index.toString(), x, y)

    const stack = Render.beginStack(x, window.innerHeight / 2)
    Render.stackV(context, stack, this.sample)
    Render.stackV(context, stack, "exp " + this.exp)
    Render.stackV(context, stack, "dur " + this.duration.toFixed(2))
    Render.stackV(context, stack, "phase " + this.phase.toFixed(2))
    Render.stackV(context, stack, "pos " + this.life.toFixed(2))
  }
}

const samples = [
  "ArghBlock",
  "ArghKick",
  "ArghRim",
  "ArghRim2",
  "ArghSnareFlam",
  "ArghSnareFlam2",
  "ArghSuck",
  "ChordDidg",
  "ChordSproingy",
  "CrashMute",
  "FloorTom",
  "Hat",
  "LarFan",
  "LarSubKick",
  "Ride",
  "Snare",
  "Tick",
  "Vibra",
]
