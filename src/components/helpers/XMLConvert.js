import { useState } from "react";
import axios from "axios";
import X2JS from "x2js";
import XMLData from "../../data/collection_all.xml";
import songs from "../../data/songData.json";

export default function XMLConvert() {
  //const [songData, setSongData] = useState(songs);

  //gonna have to write a backend for this to be able to modify files, probably can also use this file to cut down on file length

  function convertXML() {
    axios
      .get(XMLData, {
        "Content-Type": "application/xml; charset=utf-8",
      })
      .then((response) => {
        // console.log("Your xml file as string", response.data);
        const collection = response.data;
        var xtojs = new X2JS();
        var xmlText = collection;
        var jsonObj = xtojs.xml2js(xmlText);
        extractData(jsonObj);
        //setSongData(extractData(jsonObj));
      });
  }
  function extractData(json) {
    console.log(json);
    const tracks = json.DJ_PLAYLISTS.COLLECTION.TRACK;
    const playlists = json.DJ_PLAYLISTS.PLAYLISTS.NODE.NODE.NODE;
    console.log(playlists);
    console.log(tracks);
    return tracks;
  }

  return (
    <div>
      <button onClick={() => convertXML()}>Convert XML</button>
    </div>
  );
}
