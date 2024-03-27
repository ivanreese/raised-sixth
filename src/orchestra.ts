import * as math from "./math.js"
import Musician from "./musician.js"
import Plot from "./plot.js"
import * as Render from "./render.js"
import * as Engine from "./engine.js"
import Player from "./player.js"
import Drummer from "./drummer.js"
import * as Audio from "./audio.js"

const keyChangeSteps = 7
const minPlayers = 10
const maxPlayers = 10
const initialKeyChangeTime = 240
const maxDrumFrac = 0.5 // 50% drummers at most

const spawnTimeSpan = () => math.rand(1, 1)
const keyChangeTimeSpan = () => math.rand(2400, 2400) // rand(60, 600);

export default class Orchestra {
  static keyChangeTime = initialKeyChangeTime
  static nextPlayerIndex = 0 // Math.floor(rand() * 10000)
  static accel = 1
  static velocity = 1
  static drumFrac = 0
  static spawnTime = 0
  static transposition = 1
  static allPlayers = new Array<Musician>()

  // TODO: We probably want to store fewer samples for the orchestra's history after a while, because that's a LOT of data
  // It used to be 10, but I dropped it to 1 for debugging
  // static velPlot = new Plot(1, 12_000, "hsl(180, 60%, 70%)")

  static halve() {
    this.velocity /= 2
    for (const player of this.allPlayers) {
      player.double()
    }
  }

  static double() {
    this.velocity *= 2
    for (const player of this.allPlayers) {
      player.halve()
    }
  }

  static tick(mouse: { x: number; y: number }) {
    // Update the percentage of musicians that are drummers
    // this.drumFrac = Math.min(maxDrumFrac, this.velocity / 4, Engine.count / 10000)

    // Update the orchestra's velocity
    this.accel = 1.5 //math.renormalized(mouse.y, window.innerHeight, 0, 0.9, 1.1)
    this.velocity = Math.max(0, this.velocity * this.accel ** Engine.dt)

    const exp = Math.round(Math.log2(Orchestra.velocity))
    if (exp > 0) this.halve()
    if (exp < 0) this.double()

    // this.velPlot.add(this.velocity)

    // Consider transposing
    if (Engine.time >= this.keyChangeTime) this.transpose()

    // Spawn a new player every so often
    const tooFewPlayers = this.allPlayers.length < minPlayers
    const itsTimeToSpawn = Engine.time >= this.spawnTime
    const notAtMaxPlayers = this.allPlayers.length < maxPlayers
    if (tooFewPlayers || (itsTimeToSpawn && notAtMaxPlayers)) this.spawn()

    // Update all the players
    Audio.master.input.gain.value = math.renormalized(this.allPlayers.length, 0, maxPlayers, 1, 0.5)
    this.allPlayers.forEach((player) => player.tick())
    this.allPlayers = this.allPlayers.filter((player) => player.alive)
  }

  static transpose() {
    this.keyChangeTime = Engine.time + keyChangeTimeSpan()
    this.transposition *= 2 ** (keyChangeSteps / 12)
    while (this.transposition > 1.5) this.transposition /= 2
  }

  static spawn(position?: number, type?: typeof Drummer | typeof Player) {
    type ??= Math.random() <= this.drumFrac ? Drummer : Player

    let exp = -Math.round(Math.log2(this.velocity))
    position ??= this.allPlayers.at(-1)?.getSyncPosition() ?? 0

    exp += [-1, 0, 1][this.nextPlayerIndex % 3]

    const newPlayer = new type(position, exp)
    this.allPlayers.push(newPlayer)

    this.spawnTime = Engine.time + spawnTimeSpan()
  }

  static render(context: CanvasRenderingContext2D) {
    context.fillStyle = context.strokeStyle = "#FFF"

    let stack = Render.beginStack(36, 16)
    Render.stackH(context, stack, `Time ${Engine.time.toFixed(2)}`)
    Render.stackH(context, stack, `Count ${Engine.count}`)
    Render.stackH(context, stack, `Xpos ${this.transposition.toFixed(2)}`)
    Render.stackH(context, stack, `Drums ${Math.round(this.drumFrac * 100)}%`)
    Render.stackH(context, stack, `Accel ${this.accel.toFixed(4)}`)
    Render.stackH(context, stack, `Vel ${this.velocity.toFixed(8)}`)
    Render.stackH(context, stack, `Exp ${Math.round(Math.log2(Orchestra.velocity))}`)

    // Render.drawPlot(context, this.velPlot, 0, 0, window.innerWidth, window.innerHeight)
  }
}
