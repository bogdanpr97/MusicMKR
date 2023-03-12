import { useEffect, useState } from 'react';
import {
  NOTES,
  diatonicChordsMajorScaleRules,
  diatonicChordsMinorScaleRules, 
  scaleIntervalArrays
} from './data.js';
import './App.css';

// Ideas for this app:
// How to play your song: select key song is in and we will show you where to find the notes on guitar or piano?
// Compose music easier - find ideas - try new things
// A tool for learning and testing - asking where are notes on the guitar with live feedback
// will finish the musci theory and music course and then decide
// On 30 Jan I will have this ready

function calculateNextNote(currentNote, nextInterval) {
  let nextStepIndex = NOTES.indexOf(currentNote) + nextInterval;

  // go to the beggining of array if needed
  if (nextStepIndex > NOTES.length - 1) {
    console.log(nextStepIndex);

    nextStepIndex = nextStepIndex - NOTES.length;
  }

  return NOTES[nextStepIndex];
}

function App() {
  const [selectedKey, setSelectedKey] = useState(NOTES[0]);
  const [selectedScale, setSelectedScale] = useState("major");
  const [resultedNotesInKey, setResultedNotesInKey] = useState([]);
  const [resultedTriadsInKey, setResultedTriadsInKey] = useState([]);

  function calculateNotesInScale(rootNote = "C", scale = "major") {
    const notesInScale = [rootNote];
    let nextNote = rootNote;

    scaleIntervalArrays[scale].forEach(interval => {
      nextNote = calculateNextNote(nextNote, interval);
      notesInScale.push(nextNote);
    }); 

    setResultedNotesInKey(notesInScale);
    console.log(`Notes in the scale ${scale} with root note ${rootNote} are:`, notesInScale);
  }

  // construct the diatronic triads
  function constructDiatonicTriadsForScale(scaleNotesArray) {
    // here the first note was repeated in the middle
    // se I used slice to remove it
    const doublesScale = [...scaleNotesArray, ...(scaleNotesArray.slice(1))];
    let triadRules = selectedScale === "major" ? diatonicChordsMajorScaleRules : diatonicChordsMinorScaleRules;
    const arrayOfTriads = [];

    scaleNotesArray.forEach((note, index) => {
      // the last note is the octave which we already know
      // from the root
      if(index === scaleNotesArray.length - 1) return;

      // jump a note in the scale
      // we don't need the notes for now
      // we can get the chord from the first note and the
      // diatonic rules in a scale
      const thirdNote = doublesScale[index + 2];
      const fifthNote = doublesScale[index + 4];
      let triad = ` - ${note} ${thirdNote} ${fifthNote}`;

      let chordName = note;

      if(triadRules[index].chordType === 'm' || triadRules[index].chordType === 'dim') {
        chordName = chordName + triadRules[index].chordType;
      }

      arrayOfTriads.push(chordName + " ( " + triadRules[index].notation + " )" + " " + triad); 

    })

    setResultedTriadsInKey(arrayOfTriads);
  }

  useEffect(() => {
    calculateNotesInScale(selectedKey, selectedScale);
  }, [selectedKey, selectedScale]);

  useEffect(() => {
    constructDiatonicTriadsForScale(resultedNotesInKey, selectedScale);
  }, [resultedNotesInKey]);

  return (
    <>
      <h1>Music Maker</h1>
        <section>
          <h2>
            Please Select a Key To Work In
          </h2>
          <ul>
            {NOTES.map((note, index) => {
              return (
                <li key={`${index + note}`}><button onClick={() => setSelectedKey(note)}>{note}</button></li>
              )
            })}
          </ul>
          <p>Selected key is: <strong>{selectedKey}</strong></p>
        </section>
        <section>
          <h2>Would you like a major or minor scale?</h2>
          <button onClick={() => setSelectedScale("major")}>MAJOR</button>
          <button onClick={() => setSelectedScale("naturalMinor")}>NATURAL MINOR</button>
          {/* under construction */}
          {/* <button onClick={() => setSelectedScale("harmonicMinor")}>HARMONIC MINOR</button> */}
          <p>Selected scale is: <strong>{selectedScale}</strong></p>
        </section>
        <section>
          <h2>With your selection, here are the notes that exists in this scale</h2>
          <ul>
            {resultedNotesInKey.map((note, index) => {
              return (
                <li key={`${index + note}`}>{note}</li>
              );
            })}
          </ul>
        </section>
        <section>
          <h2>With your selection, here are the chords that exists in this scale</h2>
          <ul>
            {resultedTriadsInKey.map((chord, index) => {
              return (
                <li key={`${index + chord}`}>{chord}</li>
              );
            })}
          </ul>
        </section>
    </>
  );
}

export default App;
