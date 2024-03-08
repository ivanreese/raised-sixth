import * as Engine from "./engine.js"
import { melodies } from "./data.js"
import type { Note, Melody } from "./data.js"
import Musician from "./musician.js"
import Orchestra from "./orchestra.js"
import * as Render from "./render.js"
import Plot from "./plot.js"
import * as math from "./math.js"

export default class Player extends Musician {
  static fadeRate = 0.03
  static transposeOnRepeat = 2
  static minTransposition = 1 / 16
  static maxTransposition = 8
  static minDeathVelocity = 1 / 64
  static maxDeathVelocity = 32

  phase = 0
  reps = 0
  transposition = 1

  melody: Melody
  nextNoteIndex: number
  currentNote: Note

  lastNoteTime = 0
  lastNoteDist = Infinity
  detune = math.rand(0.99, 1.01)
  fastest = math.randInt(200, 400)

  // history = new Plot(1, 1000)

  constructor(sync: number, exp: number) {
    super(samples)

    // this.melody = math.arrRand(melodies)
    this.melody = melodies[(6 + this.index) % melodies.length]

    this.transposition = [0.5, 1, 2][this.index % 3]

    this.exp = exp // should always be an integer, representing 2^x
    this.life = (sync * 2 ** exp) % 1 // life is what we use to sync different musicians
    this.phase = (sync * 2 ** exp) % 1 // phase is what we use to figure out which notes to play

    this.nextNoteIndex = this.melody.notes.findIndex((note) => note.position / this.melody.beatsPerBar >= this.phase)

    if (this.nextNoteIndex < 0) {
      this.nextNoteIndex = 0
      this.reps++
    }

    this.currentNote = this.melody.notes[this.nextNoteIndex]
  }

  getSyncPosition(): number {
    // First, we undo the effect of any doubling/halving, to get the life as it would have been naturally
    // For instance, with exp 1, a life of 5 becomes 2.5
    const lifeUnscaled = this.life / 2 ** this.exp

    // Next, we pull the life as close to 0 as possible without breaking phase alignment
    // For instance, a lifeUnscaled of 2.5 becomes 0.5
    // const sync = math.mod(lifeUnscaled, 1)

    // Let's verify that this sync value is good by considering how it'll sync some other players
    // Player:    orig  A     B     C     D
    // exp:       1     2     1     0    -1
    // life:      5
    // unscaled:  2.5
    // sync:      0.5   0.5   0.5   0.5   0.5
    // rescaled:        2     1     0.5   0.25
    // so…
    // life:      5     2     1     0.5   0.25
    // life:      4     0     0     0     0
    // life:      6     4     2     1     0.5
    return lifeUnscaled
  }

  static ratios = [1, 256 / 243, 9 / 8, 32 / 27, 81 / 64, 4 / 3, 1024 / 729, 3 / 2, 128 / 81, 27 / 16, 16 / 9, 243 / 128]

  static pythagorean(pitch: number) {
    const octave = Math.floor(pitch / 12)
    const pitchClass = math.mod(pitch, 12)
    return Math.pow(2, octave) * Player.ratios[pitchClass]
  }

  tick() {
    super.tick()

    this.phase += 2 ** this.exp * Orchestra.velocity * Engine.dt

    const nextNote = this.melody.notes[this.nextNoteIndex]

    if (this.phase >= this.reps + nextNote.position / this.melody.beatsPerBar) {
      this.currentNote = nextNote

      // const pitch = Player.pythagorean(this.currentNote.pitch) * this.transposition * Orchestra.transposition
      const pitch = 2 ** ((this.detune * this.currentNote.pitch) / 12) * this.transposition * Orchestra.transposition

      this.nextNoteIndex++

      this.lastNoteDist = Math.min(performance.now() - this.lastNoteTime, this.lastNoteDist)
      this.lastNoteTime = performance.now()

      this.volume = math.clip(math.renormalized(this.lastNoteDist, this.fastest, this.fastest + 100, 0, 1))
      super.play(pitch)

      if (this.lastNoteDist < this.fastest) {
        this.lastNoteDist = Infinity
        this.halve()
        this.phase /= 2
        this.reps = Math.floor(this.reps / 2)
        this.melody = math.arrRand(melodies)
        this.nextNoteIndex = this.melody.notes.findIndex((note) => note.position / this.melody.beatsPerBar >= this.phase)
        if (this.nextNoteIndex < 0) {
          this.nextNoteIndex = 0
          this.reps++
        }
        this.currentNote = this.melody.notes[this.nextNoteIndex]
        return
      }

      if (this.nextNoteIndex >= this.melody.notes.length) {
        this.nextNoteIndex = 0
        this.reps++
        // this.transposition *= Player.transposeOnRepeat
        // if (math.rand() > 0.95) Orchestra.transpose()
      }
    }

    // this.history.add(this.prevNote)
  }

  draw(context: CanvasRenderingContext2D, i: number, allPlayers: [Musician]) {
    context.fillStyle = context.strokeStyle = this.color

    const prevNote = this.melody.notes[math.mod(this.nextNoteIndex - 1, this.melody.notes.length)]
    const note = this.melody.notes[this.nextNoteIndex]
    const phase = math.mod(this.phase, 1)

    const x = (window.innerWidth * (1 + i)) / (allPlayers.length + 1)
    // const y = math.renormalized(this.currentNote.pitch, -48, 96, window.innerHeight, 0)
    // const y = math.renormalized(phase, -1, 2, window.innerHeight, 0)
    const y = 300

    const tau = Math.PI * 2
    const pi = Math.PI
    const lo = (-1 / 4) * tau
    const hi = (3 / 4) * tau

    const speed = math.clip(math.normalized(this.lastNoteDist, 1000, this.fastest))
    context.beginPath()
    context.lineWidth = 2
    context.arc(x, y, 10, lo - pi * speed, lo + pi * speed)
    context.stroke()

    context.beginPath()
    context.lineWidth = 2
    context.arc(x, y, 20, lo - pi * phase, lo + pi * phase)
    context.stroke()

    context.beginPath()
    context.lineWidth = 2
    let p = math.renormalized(note.position / this.melody.beatsPerBar, 0, 1, lo, lo + pi)
    context.arc(x, y, 20, p, p + 0.01)
    context.stroke()
    context.beginPath()
    p = math.renormalized(note.position / this.melody.beatsPerBar, 0, 1, lo, lo - pi)
    context.arc(x, y, 20, p, p + 0.01)
    context.stroke()
    context.lineWidth = 1

    const stack = Render.beginStack(x, 80)
    Render.stackV(context, stack, this.melody.name)
    Render.stackV(context, stack, this.sample)
    Render.stackV(context, stack, "exp " + this.exp)
    Render.stackV(context, stack, "phase " + this.phase.toFixed(2))
    Render.stackV(context, stack, "life " + this.life.toFixed(2))
    Render.stackV(context, stack, "Note " + this.currentNote.position)
    Render.stackV(context, stack, "Pitch " + this.currentNote.pitch)
    Render.stackV(context, stack, "X " + this.transposition)
    Render.stackV(context, stack, "" + this.lastNoteDist.toFixed(2))

    context.fillStyle = "#FFF"
    context.fillText(this.index.toString(), x, y)
  }
}

const samples = [
  // "1BCLo",
  // "2BCHi",
  // "3Beep",
  // "4Bit",
  // "5Glock",
  // "6OrganBass",
  // "ArghBassGuitar",
  // "ArghBlock",
  // "ArghCat",
  // "ArghChrome",
  // "ArghKick",
  // "ArghOrgan",
  // "ArghOrganHi",
  // "ArghOrganLow",
  // "ArghPiano",
  // "ArghPianoHi",
  // "ArghRim",
  // "ArghRim2",
  // "ArghSnareFlam",
  // "ArghSnareFlam2",
  // "ArghSuck",
  // "ArghSynth",
  // "ArghTunk",
  // "ArghWho",
  // "ChordDidg",
  // "ChordFart",
  // "ChordFeedback",
  // "ChordFeedback2",
  // "ChordFeedbackDrone",
  // "ChordFeedbackSting",
  // "ChordFeedbackSwell",
  // "ChordFeedbackSwell2",
  // "ChordSproingy",
  // "ChordThunderBuzz",
  // "CrashMute",
  // "EarnstChrom",
  // "EarnstFlute",
  // "EarnstFluteFlutter",
  // "EarnstFluteFlutter2",
  // "EarnstSing",
  // "EarnstSingOvertones",
  // "EarnstSingOvertones2",
  // "EarnstSingPulse",
  // "EarnstSingWav",
  // "EarnstWarble",
  // "FloorTom",
  // "Gas",
  // "Hat",
  // "LarAcc",
  // "LarBass",
  // "LarFan",
  // "LarFlute",
  // "LarFlute2",
  // "LarJawharp",
  // "LarJawharp2",
  // "LarJawharpR",
  // "LarMelodicaLow",
  // "LarMelodicaSwell",
  // "LarPiano",
  // "LarSubKick",
  // "LarXylo",
  // "LarXylo2",
  // "MaternalAccStrum",
  // "MaternalBowedGuitar",
  // "MaternalCello",
  // "MaternalCello2",
  // "MaternalGlock",
  // "MaternalPiano",
  // "MaternalPiano2",
  "MaternalXylo",
  // "MewlPurr",
  // "MewlSing",
  // "Ride",
  // "SlideUp",
  // "Snare",
  // "TanBCR",
  // "TanPianoEchos",
  // "TanPulsar",
  // "TanXylo",
  // "Tick",
  // "Vibra",
]
