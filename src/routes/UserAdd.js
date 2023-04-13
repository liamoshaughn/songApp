//Lists songs and playlists uploaded by user

import { useEffect, useState } from "react";
import allSongs from "../data/spotifyData.json";
import { Button, Typography, Container, Grid } from "@mui/material";
import { addPlaylistId, useSongStore, useStore } from "../store/store";
import { DataGrid, GridToolbarQuickFilter } from "@mui/x-data-grid";
import PlaylistEdit from "../components/UserAdd/PlaylistEdit";
import { getUserPlaylists, addToPlaylist } from "../services/api";
import SongSearch from "../components/UserAdd/SongSearch";

function SongList({ songs, addTracks }) {
  const columns = [
    {
      field: "name",
      headerName: "Song Name",
      width: 250,
      valueGetter: (song) => {
        return song.row.name;
      },
    },
    {
      field: "add",
      headerName: "Add to list",
      width: 90,
      renderCell: (song) => (
        <Button variant="contained" size="small" onClick={() => console.log(song.row)}>
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
      getRowId={(row) => {
        return row.id;
      }}
      slots={{ toolbar: GridToolbarQuickFilter }}
      autoHeight
    />
  );
}

export default function UserAdd() {
  const store = useStore();
  const songStore = useSongStore();
  const user = store.userProfile;
  const [playlists, setPLaylists] = useState(null);
  const [chosen, setChosen] = useState("No Playlist Selected");

  async function addTracks(song) {
    const response = await addToPlaylist(songStore.playlistId, song.uri, store.accessToken);
    console.log(response);
  }

  async function getPlaylists() {
    const playlistData = await getUserPlaylists(user.id, store.accessToken);
    setPLaylists(playlistData);
  }

  function setPlaylistData(data) {
    setChosen(data.name);
    addPlaylistId(data.id);
  }

  const [userSongs, setUserSongs] = useState(() => {
    var array = [];
    for (var song in allSongs) {
      if (allSongs[song]) {
        if (allSongs[song].tracks.total > 0) {
          array.push(allSongs[song].tracks.items[0]);
        }
      }
    }
    return array;
  });

  useEffect(() => {
    getPlaylists();
  }, []);

  return (
    <Container>
      <Typography variant="h1">Songs Requested</Typography>
      <Typography variant="h4">Adding to: {chosen}</Typography>
      <Grid container sx={{ width: "100%", height: "100%" }}>
        <Grid item xs={3}>
          {playlists ? <PlaylistEdit playlists={playlists} chosen={(item) => setPlaylistData(item)} /> : null}
        </Grid>
        <Grid item xs={4}>
          <SongList songs={userSongs} addTracks={(song) => addTracks(song)}></SongList>
        </Grid>
        <Grid item xs={4}>
          <SongSearch addTracks={(song) => addTracks(song)} />
        </Grid>
      </Grid>
    </Container>
  );
}
