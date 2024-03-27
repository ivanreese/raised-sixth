import { samples } from "./data.js"
import * as math from "./math.js"

let audioContext: AudioContext
export let master: { input: GainNode; analyser: AnalyserNode }
let sampleRate: number

const buffers: Record<string, AudioBuffer> = {}

type PlayableNote = {
  pan: number
  pitch: number
  volume: number
}

export function play(sampleName: string, note: PlayableNote) {
  if (buffers[sampleName]) {
    const source = new AudioBufferSourceNode(audioContext, { buffer: buffers[sampleName], playbackRate: note.pitch })
    const gain = new GainNode(audioContext, { gain: math.clip(note.volume) })
    const pan = new StereoPannerNode(audioContext, { pan: 0 }) //note.pan })
    source.connect(gain).connect(pan).connect(master.input)
    source.start()
  }
}

function makeReverb(seconds: number, decay: number, reverse: boolean) {
  const wet = audioContext.createGain()
  const dry = audioContext.createGain()
  const input = audioContext.createGain()
  const output = audioContext.createGain()
  const convolver = audioContext.createConvolver()
  const duration = sampleRate * seconds
  const impulse = audioContext.createBuffer(2, duration, sampleRate)
  const impulseL = impulse.getChannelData(0)
  const impulseR = impulse.getChannelData(1)

  for (let i = 0; i < duration; i++) {
    const n = reverse ? duration - i : i
    impulseL[i] = impulseR[i] = math.rand(-1, 1) * (1 - n / duration) ** decay
  }

  convolver.buffer = impulse
  input.connect(dry).connect(output)
  input.connect(convolver).connect(wet).connect(output)
  return {
    input: input,
    output: output,
    wet: wet.gain,
    dry: dry.gain,
  }
}

export function setupAudio() {
  audioContext = new window.AudioContext()
  sampleRate = audioContext.sampleRate

  const input = new GainNode(audioContext, { gain: 1 })
  const analyser = audioContext.createAnalyser()
  const reverb = makeReverb(.5, 3, false)
  const softCompressor = audioContext.createDynamicsCompressor()
  const hardCompressor = audioContext.createDynamicsCompressor()
  const output = audioContext.createGain()

  reverb.wet.value = 0.2
  reverb.dry.value = 0.8

  softCompressor.attack.value = 0.05
  softCompressor.knee.value = 10
  softCompressor.ratio.value = 3
  softCompressor.release.value = 0.1
  softCompressor.threshold.value = -15

  hardCompressor.attack.value = 0.003
  hardCompressor.knee.value = 5
  hardCompressor.ratio.value = 15
  hardCompressor.release.value = 0.01
  hardCompressor.threshold.value = -6
  output.gain.value = 0.5

  input.connect(analyser).connect(reverb.input)
  reverb.output.connect(softCompressor).connect(hardCompressor).connect(output)
  output.connect(audioContext.destination)

  master = {
    input: input,
    analyser: analyser,
  }

  samples.forEach(async (sample) => {
    const resp = await fetch("samples/" + sample + ".mp3")
    const arrayBuffer = await resp.arrayBuffer()
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer)
    buffers[sample] = audioBuffer
  })
}
