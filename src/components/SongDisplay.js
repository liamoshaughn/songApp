//View of the lists of songs

import { useState } from "react";

import SelectList from "./songDisplay/SelectList";
import SpotifyList from "./songDisplay/SpotifyList";

export default function SongDisplay() {
  const [addedTracks, setTracks] = useState(new Set());

  function modifyTracks(song, remove) {
    if (remove) {
      console.log(song);
      setTracks((prevTracks) => {
        const newTracks = new Set(prevTracks);
        newTracks.delete(song);
        return newTracks;
      });
    } else {
      setTracks((prevTracks) => new Set([...prevTracks, song]));
    }
  }

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      <SelectList addTracks={(song) => modifyTracks(song, false)} />
      <SpotifyList addedTracks={addedTracks} removeTracks={(song) => modifyTracks(song, true)} />
    </div>
  );
}
