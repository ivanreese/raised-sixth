export const samples = [
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

export type Note = {
  pitch: number
  volume: number
  position: number
}

export type Melody = {
  name: string
  beatsPerBar: number
  barsPerMeasure: number
  notes: Array<Note>
}

export const melodies: Melody[] = [
  {
    name: "Walkies",
    beatsPerBar: 8,
    barsPerMeasure: 6,
    notes: [
      { pitch: 0 - 12, volume: 58, position: 0 },
      { pitch: 2 - 12, volume: 61, position: 1 },
      { pitch: 3 - 12, volume: 68, position: 2 },
      { pitch: 5 - 12, volume: 63, position: 3 },
      { pitch: 7 - 12, volume: 62, position: 4 },
      { pitch: 8 - 12, volume: 67, position: 5 },
      { pitch: 10 - 12, volume: 63, position: 6 },
      { pitch: 12 - 12, volume: 66, position: 7 },
    ],
  },
  {
    name: "Down Upper",
    beatsPerBar: 24,
    barsPerMeasure: 3,
    notes: [
      { pitch: 0 + 12, volume: 69, position: 0 },
      { pitch: -4 + 12, volume: 66, position: 1 },
      { pitch: -5 + 12, volume: 69, position: 2 },
      { pitch: -9 + 12, volume: 71, position: 3 },
      { pitch: -10 + 12, volume: 75, position: 4 },
      { pitch: -14 + 12, volume: 75, position: 5 },
      { pitch: 0 + 12, volume: 98, position: 6 },
      { pitch: -4 + 12, volume: 68, position: 7 },
      { pitch: -5 + 12, volume: 73, position: 8 },
      { pitch: -9 + 12, volume: 70, position: 9 },
      { pitch: -10 + 12, volume: 68, position: 10 },
      { pitch: -14 + 12, volume: 72, position: 11 },
      { pitch: 0 + 12, volume: 91, position: 12 },
      { pitch: -4 + 12, volume: 77, position: 13 },
      { pitch: -2 + 12, volume: 79, position: 14 },
      { pitch: -4 + 12, volume: 75, position: 15 },
      { pitch: -5 + 12, volume: 71, position: 16 },
      { pitch: -10 + 12, volume: 68, position: 17 },
      { pitch: -9 + 12, volume: 80, position: 18 },
      { pitch: -7 + 12, volume: 84, position: 19 },
      { pitch: -9 + 12, volume: 67, position: 20 },
      { pitch: -10 + 12, volume: 75, position: 21 },
      { pitch: -12 + 12, volume: 75, position: 22 },
      { pitch: -14 + 12, volume: 70, position: 23 },
    ],
  },
  // {
  //   name: "Standing Still",
  //   beatsPerBar: 2,
  //   barsPerMeasure: 24,
  //   notes: [{ pitch: -21 + 24, volume: 66, position: 1 }],
  // },
  // {
  //   name: "Very Still",
  //   beatsPerBar: 12,
  //   barsPerMeasure: 12,
  //   notes: [
  //     { pitch: -21 + 24, volume: 71, position: 6 },
  //     { pitch: -21 + 24, volume: 79, position: 7 },
  //   ],
  // },
  // {
  //   name: "Popping UpDown",
  //   beatsPerBar: 16,
  //   barsPerMeasure: 3,
  //   notes: [
  //     { pitch: 26 - 12, volume: 58, position: 0 },
  //     { pitch: 24 - 12, volume: 55, position: 1 },
  //     { pitch: 27 - 12, volume: 64, position: 2 },
  //     { pitch: 26 - 12, volume: 59, position: 3 },
  //     { pitch: 26 - 12, volume: 61, position: 4 },
  //     { pitch: 24 - 12, volume: 57, position: 5 },
  //     { pitch: 27 - 12, volume: 67, position: 6 },
  //     { pitch: 26 - 12, volume: 54, position: 7 },
  //     { pitch: 31 - 12, volume: 67, position: 8 },
  //     { pitch: 24 - 12, volume: 53, position: 9 },
  //     { pitch: 22 - 12, volume: 53, position: 10 },
  //     { pitch: 26 - 12, volume: 63, position: 11 },
  //     { pitch: 26 - 12, volume: 62, position: 12 },
  //     { pitch: 24 - 12, volume: 60, position: 13 },
  //     { pitch: 20 - 12, volume: 50, position: 14 },
  //     { pitch: 26 - 12, volume: 70, position: 15 },
  //   ],
  // },
  {
    name: "Popping Differently",
    beatsPerBar: 24,
    barsPerMeasure: 3,
    notes: [
      { pitch: 24 - 24, volume: 77, position: 1 },
      { pitch: 24 - 24, volume: 77, position: 3 },
      { pitch: 20 - 24, volume: 77, position: 5 },
      { pitch: 24 - 24, volume: 75, position: 7 },
      { pitch: 22 - 24, volume: 70, position: 9 },
      { pitch: 27 - 24, volume: 78, position: 11 },
      { pitch: 29 - 24, volume: 72, position: 13 },
      { pitch: 27 - 24, volume: 80, position: 15 },
      { pitch: 31 - 24, volume: 73, position: 17 },
      { pitch: 27 - 24, volume: 77, position: 19 },
      { pitch: 27 - 24, volume: 76, position: 21 },
      { pitch: 24 - 24, volume: 76, position: 23 },
    ],
  },
  {
    name: "Walking Up Sixers",
    beatsPerBar: 12,
    barsPerMeasure: 12,
    notes: [
      { pitch: -9, volume: 69, position: 0 },
      { pitch: -7, volume: 81, position: 1 },
      { pitch: -5, volume: 84, position: 2 },
      { pitch: -4, volume: 81, position: 3 },
      { pitch: -2, volume: 79, position: 4 },
      { pitch: 0, volume: 83, position: 5 },
      { pitch: -4, volume: 73, position: 6 },
      { pitch: -2, volume: 81, position: 7 },
      { pitch: 0, volume: 82, position: 8 },
      { pitch: 2, volume: 80, position: 9 },
      { pitch: 3, volume: 82, position: 10 },
      { pitch: 5, volume: 81, position: 11 },
    ],
  },
  {
    name: "Walking Down Thrice",
    beatsPerBar: 6,
    barsPerMeasure: 12,
    notes: [
      { pitch: 8, volume: 101, position: 0 },
      { pitch: 7, volume: 103, position: 1 },
      { pitch: 5, volume: 107, position: 2 },
      { pitch: 3, volume: 105, position: 3 },
      { pitch: 2, volume: 109, position: 4 },
      { pitch: 0, volume: 106, position: 5 },
    ],
  },
  // {
  //   name: "Low Still Bonk",
  //   beatsPerBar: 1,
  //   barsPerMeasure: 32,
  //   notes: [{ pitch: -12 + 12, volume: 67, position: 0 }],
  // },
  {
    name: "Double Down Double Up",
    beatsPerBar: 48,
    barsPerMeasure: 6,
    notes: [
      { pitch: 3, volume: 64, position: 2 },
      { pitch: 3, volume: 72, position: 3 },
      { pitch: 3, volume: 71, position: 6 },
      { pitch: 3, volume: 73, position: 7 },
      { pitch: 0, volume: 69, position: 10 },
      { pitch: 0, volume: 74, position: 11 },
      { pitch: 0, volume: 66, position: 14 },
      { pitch: 0, volume: 77, position: 15 },
      { pitch: 7, volume: 67, position: 18 },
      { pitch: 7, volume: 72, position: 19 },
      { pitch: 7, volume: 67, position: 22 },
      { pitch: 7, volume: 76, position: 23 },
      { pitch: 8, volume: 68, position: 26 },
      { pitch: 8, volume: 73, position: 27 },
      { pitch: 8, volume: 70, position: 30 },
      { pitch: 8, volume: 76, position: 31 },
      { pitch: 12, volume: 68, position: 34 },
      { pitch: 12, volume: 74, position: 35 },
      { pitch: 12, volume: 69, position: 38 },
      { pitch: 12, volume: 75, position: 39 },
      { pitch: 7, volume: 67, position: 42 },
      { pitch: 7, volume: 73, position: 43 },
      { pitch: 7, volume: 71, position: 46 },
      { pitch: 7, volume: 74, position: 47 },
    ],
  },
  // {
  //   name: "Very Low Still Bonk",
  //   beatsPerBar: 1,
  //   barsPerMeasure: 12,
  //   notes: [{ pitch: -21 + 12, volume: 115, position: 0 }],
  // },
  // {
  //   name: "Very Very Low Still Bonk",
  //   beatsPerBar: 1,
  //   barsPerMeasure: 12,
  //   notes: [
  //     { pitch: -28 + 36, volume: 70, position: 0 },
  //   ],
  // },
  {
    name: "Jumping Up Resolve",
    beatsPerBar: 4,
    barsPerMeasure: 12,
    notes: [
      { pitch: -28 + 36, volume: 67, position: 0 },
      { pitch: -33 + 36, volume: 68, position: 2 },
      { pitch: -29 + 36, volume: 81, position: 3 },
    ],
  },
  // {
  //   name: "123",
  //   beatsPerBar: 36,
  //   barsPerMeasure: 3,
  //   notes: [
  //     { pitch: -17 + 12, volume: 85, position: 6 },
  //     { pitch: -17 + 12, volume: 93, position: 7 },
  //     { pitch: -16 + 12, volume: 100, position: 8 },
  //     { pitch: -16 + 12, volume: 92, position: 15 },
  //     { pitch: -16 + 12, volume: 98, position: 16 },
  //     { pitch: -21 + 12, volume: 88, position: 17 },
  //     { pitch: -12 + 12, volume: 88, position: 24 },
  //     { pitch: -12 + 12, volume: 100, position: 25 },
  //     { pitch: -9 + 12, volume: 107, position: 26 },
  //     { pitch: -5 + 12, volume: 86, position: 33 },
  //     { pitch: -9 + 12, volume: 87, position: 34 },
  //     { pitch: -12 + 12, volume: 91, position: 35 },
  //   ],
  // },
  // {
  //   name: "The Only Actual Melody",
  //   beatsPerBar: 24,
  //   barsPerMeasure: 4,
  //   notes: [
  //     { pitch: 8, volume: 71, position: 0 },
  //     { pitch: 7, volume: 72, position: 1 },
  //     { pitch: 5, volume: 76, position: 2 },
  //     { pitch: 3, volume: 70, position: 3 },
  //     { pitch: 2, volume: 68, position: 4 },
  //     { pitch: 0, volume: 66, position: 5 },
  //     { pitch: -2, volume: 70, position: 6 },
  //     { pitch: -4, volume: 68, position: 7 },
  //     { pitch: 0, volume: 79, position: 8 },
  //     { pitch: 0, volume: 77, position: 9 },
  //     { pitch: -9, volume: 62, position: 10 },
  //     { pitch: -9, volume: 74, position: 11 },
  //     { pitch: -2, volume: 81, position: 12 },
  //     { pitch: -2, volume: 79, position: 13 },
  //     { pitch: -10, volume: 57, position: 14 },
  //     { pitch: -10, volume: 73, position: 15 },
  //     { pitch: -9, volume: 78, position: 16 },
  //     { pitch: -7, volume: 81, position: 17 },
  //     { pitch: -5, volume: 88, position: 18 },
  //     { pitch: -4, volume: 84, position: 19 },
  //     { pitch: -4, volume: 76, position: 20 },
  //     { pitch: -2, volume: 83, position: 21 },
  //     { pitch: 0, volume: 83, position: 22 },
  //     { pitch: 2, volume: 82, position: 23 },
  //   ],
  // },
]