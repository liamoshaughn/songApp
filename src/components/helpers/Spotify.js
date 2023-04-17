import React, { useState, useEffect } from "react";
import { useStore, addToken, addUser } from "../../store/store";
import { login, getToken, callback, getUser } from "../../services/api";
// import spotifyData from "../../data/spotifyData.json";
// import djData from "../../data/songData.json";

var SpotifyWebApi = require("spotify-web-api-js");

export default function Spotify() {
  // const store = useStore();
  // var spotifyApi = new SpotifyWebApi();

  // function LoginButton() {
  //   return (
  //     <div>
  //       {/* <a href="http://localhost:3005/auth/login">Login with Spotify</a> */}
  //       <button onClick={login}>Login with Spotify</button>
  //     </div>
  //   );
  // }

  // function parseSpotify(tracks) {
  //   const parsedTracks = [];
  //   const idMap = new Map();
  //   tracks.forEach((track) => {
  //     try {
  //       var id = track.tracks.items[0].id;
  //       var parsedTrack = track.tracks.items[0].name
  //         .toLowerCase()
  //         .replace(/[^\w\s]/gi, "")
  //         .trim();
  //       parsedTracks.push(parsedTrack);
  //       idMap.set(parsedTrack, id);
  //     } catch (e) {}
  //   });

  //   return { idMap, parsedTracks };
  // }

  // function parseSongs(tracks) {
  //   const parsedTracks = [];
  //   tracks.forEach((track) => {
  //     var parsedTrack = track._Name
  //       .toLowerCase()
  //       .replace(/[^\w\s]/gi, "")
  //       .trim();
  //     parsedTracks.push(parsedTrack);
  //   });

  //   return parsedTracks;
  // }

  // function songMatch() {
  //   // Parse JSON files into objects

  //   const { idMap, parsedTracks } = parseSpotify(spotifyData);
  //   const songs2 = parseSongs(djData);

  //   const normalizedSongs1 = new Set(parsedTracks);

  //   // Find intersecting songs
  //   songs2.forEach((song, index) => {
  //     if (normalizedSongs1.has(song)) {
  //       djData[index].spotifyId = idMap.get(song);
  //     }
  //   });

  //   console.log(djData);

  //   return djData;
  // }

  return (
    <div>
    </div>
  //     <LoginButton />

  //     <button onClick={() => songMatch()}>find spotify matches</button>

  );
}

// loginUrl = "https://accounts.spotify.com/authorize?client_id=YourClientId&response_type=code&redirect_uri=https://localhost:3000/&scope=streaming%20user-read-email%20user-read-private"
