export const NOTES = ["C", "C# ( Db )", "D", "D# ( Eb )", "E", "F", "F# ( Gb )", "G", "G# ( Ab )", "A", "A# ( Bb )", "B"];

export const diatonicChordsMajorScaleRules = [
  {
    chordType: "M",
    notation: "I"
  },
  {
    chordType: "m",
    notation: "ii"
  },
  {
    chordType: "m",
    notation: "iii"
  },
  {
    chordType: "M",
    notation: "IV"
  },
  {
    chordType: "M",
    notation: "V"
  },
  {
    chordType: "m",
    notation: "vi"
  },
  {
    chordType: "dim",
    notation: "vii-"
  }
];


export const diatonicChordsMinorScaleRules = [
  {
    chordType: "m",
    notation: "i"
  },
  {
    chordType: "dim",
    notation: "ii-"
  },
  {
    chordType: "M",
    notation: "III"
  },
  {
    chordType: "m",
    notation: "iv"
  },
  {
    chordType: "m",
    notation: "v"
  },
  {
    chordType: "M",
    notation: "VI"
  },
  {
    chordType: "M",
    notation: "VII"
  }
];

// 1 represents a half step
// 2 represents a whole step
export const scaleIntervalArrays = {
  major: [2, 2, 1, 2, 2, 2, 1],
  naturalMinor: [2, 1, 2, 2, 1, 2, 2],
  harmonicMinor: [2, 1, 2, 2, 1, 3, 1],
}