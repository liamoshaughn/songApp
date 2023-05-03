//Lists songs and playlists uploaded by user

import { useEffect, useState } from 'react';

import { Typography, Grid, TextField, InputAdornment, useTheme } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { shadows } from '@mui/system';
import { searchBarSong } from '../services/api';
import { useStore } from '../store/store';
import SongTile from './SongTile';

export default function SongSearch(props) {
  const store = useStore();
  const theme = useTheme();

  const [rows, setRows] = useState([]);

  async function searchSong(song) {
    if (props.enable) {
      const response = await searchBarSong(song, store.accessToken);

      setRows(response.tracks.items);
    }
  }

  return (
    <Grid container spacing={2} maxWidth={'500px'} width={'75vw'}>
      <Grid item xs={12}>
        <TextField
          fullWidth
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
        {!props.enable && (
          <Typography variant="subtitle2" color={theme.palette.error.main}>
            Please enter name before searching
          </Typography>
        )}
      </Grid>
      {rows.map((song, index) => {
        return <SongTile key={index} song={song} name={props.name} />;
      })}
    </Grid>
  );
}
