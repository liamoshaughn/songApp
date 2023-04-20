//Lists songs and playlists uploaded by user

import { useEffect, useState } from "react";

import { Button, Typography, Container, Grid, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { searchBarSong } from "../../services/api";
import { DataGrid, GridToolbarQuickFilter } from "@mui/x-data-grid";
import { useStore } from "../../store/store";

export default function SongSearch({ addTracks }) {
  const store = useStore();
  const [rows, setRows] = useState([]);

  async function searchSong(song) {
    const response = await searchBarSong(song, store.accessToken);
    setRows(response.tracks.items);
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        <TextField
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
            <Grid item xs={4}>
              <img style={{ maxWidth: "100px" }} alt="Album Cover" src={song.album.images[1].url} />
            </Grid>
            <Grid item xs={6}>
              <Typography>{song.name}</Typography>
              <Typography>
                {song.artists
                  .map((artist) => {
                    return artist.name;
                  })
                  .join(", ")}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Button variant="contained" size="small" onClick={() => addTracks(song)}>
                +
              </Button>
            </Grid>
          </>
        );
      })}
    </Grid>
  );
}
