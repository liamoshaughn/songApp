//Lists songs and playlists uploaded by user

import { useEffect, useState } from "react";

import { Button, Typography, Container, Grid, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { searchBarSong } from "../services/api";
import { DataGrid, GridToolbarQuickFilter } from "@mui/x-data-grid";
import { useStore } from "../store/store";

import { sendMessage } from "../services/api";
export default function SongSearch() {
  const store = useStore();
  const [rows, setRows] = useState([]);

  async function searchSong(song) {
    const response = await searchBarSong(song, store.accessToken);
    setRows(response.tracks.items);
  }

  function addTracks(song) {
    //add login here
    sendMessage(song);
  }

  return (
    <Grid container spacing={2} maxWidth={"500px"} width={"75vw"}>
      <Grid item xs={12}>
        <TextField
          placeholder="Search for a song"
          onChange={(event) => searchSong(event.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        ></TextField>
      </Grid>

      {rows.map((song) => {
        return (
          <>
            <Grid item xs={3}>
              <img style={{ maxWidth: "100%" }} alt="Album Cover" src={song.album.images[1].url} />
            </Grid>
            <Grid
              item
              xs={7}
              sx={{ display: "flex", justifyContent: "center", flexDirection: "column", textAlign: "left" }}
            >
              <Typography sx={{ typography: { sm: "body1", xs: "body2" } }}>{song.name}</Typography>
              <Typography sx={{ typography: { sm: "body1", xs: "body2" } }}>
                {song.artists
                  .map((artist) => {
                    return artist.name;
                  })
                  .join(", ")}
              </Typography>
            </Grid>
            <Grid item xs={2} sx={{ display: "flex", alignItems: "center" }}>
              <Button variant="contained" sx={{ height: "40px" }} size="small" onClick={() => addTracks(song)}>
                +
              </Button>
            </Grid>
          </>
        );
      })}
    </Grid>
  );
}
