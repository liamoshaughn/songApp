import { useEffect, useState } from 'react';
import { Typography, Grid, TextField, InputAdornment, useTheme } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useTransition, animated } from 'react-spring';
import { searchBarSong } from '../services/api';
import { useStore } from '../store/store';
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
    leave: { opacity: 0, right: '100%' },
    config: { mass: 4, tension: 320, friction: 54 },
    trail: 130,
  });

  async function searchSong(song) {
    const response = await searchBarSong(song, store.accessToken);
    setRows(response.tracks.items);
  }

  function reset() {
    setRows([]);
    setSearch('');
  }

  useEffect(() => {
    if (search !== '') {
      const delayDebounceFn = setTimeout(() => {
        searchSong(search);
      }, 1400);
      return () => clearTimeout(delayDebounceFn);
    } else {
      reset();
    }
  }, [search]);

  const handleSearchChange = (event) => {
    const newSearch = event.target.value;
    if (rows.length > 0) {
      setRows([]);
    }
    setSearch(newSearch);
  };

  return (
    <Grid container spacing={2} maxWidth="500px" width="80vw" sx={{ margin: 0 }}>
      <Grid item xs={12} sx={{ paddingLeft: '0 !important' }}>
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
        ></TextField>
      </Grid>
      {transitions((style, item, index) => (
        <animated.div key={item.key} style={{ ...style, width: '100%', position: 'relative' }}>
          {item && <SongTile song={item} name={props.name} reset={reset} />}
        </animated.div>
      ))}
    </Grid>
  );
}
