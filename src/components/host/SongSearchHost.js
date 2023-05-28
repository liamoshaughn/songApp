//Lists songs and playlists uploaded by user

import { useState } from 'react';

import { Button, Typography, Container, Grid, TextField, InputAdornment, useTheme } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { searchBarSong } from '../../services/api';
import { DataGrid, GridToolbarQuickFilter } from '@mui/x-data-grid';
import { useStore } from '../../store/store';
import SongTileHost from './SongTileHost';

export default function SongSearchHost({ addTracks }) {
  const store = useStore();
  const theme = useTheme();
  const [rows, setRows] = useState([]);

  async function searchSong(song) {
    const response = await searchBarSong(song);
    setRows(response.tracks.items);
  }

  return (
    <Grid container spacing={2} sx={{margin:0, width:'100%', justifyContent:"center"}}>
      <Grid sx={{mb:'15px'}} item xs={12}>
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
      {rows.map((song, key) => {
        return <SongTileHost key={key} song={song} addTracks={addTracks} />;
      })}
    </Grid>
  );
}
