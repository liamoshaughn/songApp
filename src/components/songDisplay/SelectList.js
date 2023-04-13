//Lists songs and playlists uploaded by user

import { useState } from "react";
import allSongs from "../../data/songData.json";
import playlist from "../../data/playlistData.json";
import { Button, Accordion, AccordionSummary, AccordionDetails, Typography, Container } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { DataGrid, GridToolbarQuickFilter } from "@mui/x-data-grid";
import FilterPlaylist from "./filterPlaylist";

function UserSongs({ songs, addTracks }) {
  const columns = [
    { field: "_Name", headerName: "Song Name", width: 250 },
    {
      field: "spotifyId",
      headerName: "In Spotify?",
      width: 120,
    },
    {
      field: "add",
      headerName: "Add to list",
      width: 90,
      renderCell: (song) => (
        <Button variant="contained" size="small" onClick={() => addTracks(song.row)}>
          +
        </Button>
      ),
    },
  ];

  return (
    <DataGrid
      disableColumnMenu
      disableColumnFilter
      disableColumnSelector
      disableDensitySelector
      rows={songs}
      columns={columns}
      getRowId={(row) => row._TrackID}
      slots={{ toolbar: GridToolbarQuickFilter }}
      autoHeight
    />
  );
}

export default function SelectList({ addTracks }) {
  const [userSongs, setUserSongs] = useState(allSongs);

  function findSongs(list) {
    const songs = list.map((songId) => {
      for (var song in allSongs) {
        if (allSongs[song]._TrackID == songId._Key) {
          return allSongs[song];
        }
      }
    });
    setUserSongs(songs);
  }

  return (
    <div>
      <Typography variant="h1">Song Display</Typography>
      <div style={{ display: "flex" }}>
        <FilterPlaylist allSongs={() => setUserSongs(allSongs)} listOfSongs={(songs) => findSongs(songs)} />
        <UserSongs songs={userSongs} addTracks={addTracks} />{" "}
      </div>
    </div>
  );
}
