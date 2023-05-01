//Lists songs and playlists uploaded by user

import { useEffect, useState } from 'react';

import { Button, Typography, Container, Grid, TextField, InputAdornment, useTheme } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { searchBarSong } from '../services/api';
import { DataGrid, GridToolbarQuickFilter } from '@mui/x-data-grid';
import { useStore } from '../store/store';
import { sendMessage } from '../services/api';

export default function SongSearch(props) {
  const store = useStore();
  const theme = useTheme();

  const [rows, setRows] = useState([]);
  const [butt, setButt] = useState([]);
  const [buttcol, setButtcol] = useState([]);

  async function searchSong(song) {
    if (props.enable) {
      const response = await searchBarSong(song, store.accessToken);
      setRows(response.tracks.items);
      var temp = Array(rows.length).fill('+');
      setButt(temp);
      temp = Array(rows.length).fill('lightblue');
      setButtcol(temp);
    }
  }

  function buttonCheck(index, test) {
    var temp;
    if (test) {
      temp = [...buttcol];
      temp[index] = 'lightgreen';
      setButtcol(temp);
      temp = [...butt];
      temp[index] = '✓';
      setButt(temp);
    } else {
      temp = [...buttcol];
      temp[index] = 'lightcoral';
      setButtcol(temp);
      temp = [...butt];
      temp[index] = '↺';
      setButt(temp);
    }
  }

  async function addTracks(song, index) {
    if (butt[index] === '✓') {
      console.log('This button has been already pressed');
    } else {
      //add login here
      var response = await sendMessage(song.id, props.name);
      console.log('printing status');

      //This logic is now going to have to be redone status is no longer returned as it is now an internal google call
      console.log(response.status);
      if (response.status === 200) {
        buttonCheck(index, 1);
      } else {
        buttonCheck(index, 0);
      }
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
        return (
          <>
            <Grid item xs={3}>
              <img style={{ maxWidth: '100%' }} alt="Album Cover" src={song.album.images[1].url} />
            </Grid>
            <Grid
              item
              xs={7}
              sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', textAlign: 'left' }}
            >
              <Typography sx={{ typography: { sm: 'body1', xs: 'body2' } }}>{song.name}</Typography>
              <Typography sx={{ typography: { sm: 'body1', xs: 'body2' } }}>
                {song.artists
                  .map((artist) => {
                    return artist.name;
                  })
                  .join(', ')}
              </Typography>
            </Grid>
            <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center' }}>
              <Button
                variant="contained"
                sx={{ height: '40px', backgroundColor: buttcol[index], color: 'black' }}
                size="small"
                onClick={() => addTracks(song, index)}
              >
                {butt[index]}
              </Button>
            </Grid>
          </>
        );
      })}
    </Grid>
  );
}
