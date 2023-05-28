import {  useState } from 'react';
import {  Grid, TextField, InputAdornment, useTheme } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useTransition, animated } from 'react-spring';
import { searchBarSong } from '../../services/api';
import { useStore } from '../../store/store';
import SongTile from './SongTile';

export default function SongSearch(props) {
  const store = useStore();
  const theme = useTheme();

  const [search, setSearch] = useState('');
  const [rows, setRows] = useState([]);


  const transitions = useTransition(rows, {
    keys: (item) => item.id,
    from: { opacity: 0, right: '100%' },
    enter: { opacity: 1, right: '0' },
    leave: { opacity: 0, right: '100%', display: 'none' },
    config: { mass: 4, tension: 320, friction: 54 },
    expires:true,
    trail: 130,
  });

  async function searchSong(song) {
    if(song === '') return;
    const response = await searchBarSong(song, store.accessToken);
    setRows(response.tracks.items);
  }

  function reset() {
    setRows([]);
    setSearch('');
  }



  const handleSubmit = (event) => {
    event.preventDefault();
     searchSong(search);
  };

  const handleSearchChange = (event) => {
    const newSearch = event.target.value;
    if (rows.length > 0) {
      setRows([]);
    }
    setSearch(newSearch);
  };

  return (
    <Grid container spacing={2} sx={{ margin: 0 }}>
      <Grid item xs={12} sx={{ paddingLeft: '0 !important' }}>
      <form onSubmit={handleSubmit}>
        <TextField
          sx={{ backgroundColor: theme.palette.secondary.main, borderRadius: '4px' }}
          fullWidth
          value={search}
          placeholder="Search for a song"
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        ></TextField></form>
      </Grid>
      {transitions((style, item, index) => (
        <animated.div key={item.key} style={{ ...style, width: '100%', position: 'relative',display: 'block'}}>
          {item && <SongTile song={item} reset={reset} />}
        </animated.div>
      ))}
    </Grid>
  );
}
