//Lists songs and playlists uploaded by user

import { useEffect, useState } from 'react';
import { Button, Typography, Container, Grid } from '@mui/material';
import { addPlaylistId, useStore, addToken, addUser } from '../store/store';
import { DataGrid, GridToolbarQuickFilter } from '@mui/x-data-grid';
import PlaylistEdit from '../components/host/PlaylistEdit';
import { getUserPlaylists, login } from '../services/api';
import SongSearch from '../components/host/SongSearch';
import RequestSongDisplay from '../components/host/RequestSongDisplay';
import { useTheme } from '@mui/material/styles';
import Cookies from 'universal-cookie';
import { getUser } from '../services/api';

function SongList({ songs }) {
  const columns = [
    {
      field: 'name',
      headerName: 'Song Name',
      width: 250,
      valueGetter: (song) => {
        return song.row.name;
      },
    },
    {
      field: 'add',
      headerName: 'Add to list',
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

async function getUserProfile(token) {
  const request = await getUser(token);

  addUser(request);
}

export default function Host() {
  const theme = useTheme();
  const store = useStore();
  const user = store.userProfile;
  const [playlists, setPLaylists] = useState(null);
  const [chosen, setChosen] = useState('No Playlist Selected');
  const cookies = new Cookies();


  async function getPlaylists() {
    const playlistData = await getUserPlaylists(user.id, 0);

    setPLaylists(playlistData);
  }

  function setPlaylistData(data) {
    setChosen(data.name);
    addPlaylistId(data.id);
  }

  useEffect(() => {
    getPlaylists();
  }, [user]);

  useEffect(() => {
    addToken(cookies.get('access_token'));
    getUserProfile(cookies.get('access_token'));
  }, []);

  return (
    <Container
      sx={{ height: '100vh', display: 'flex', justifyContent: 'center', flexFlow: 'column', alignItems: 'center' }}
      maxWidth="xl"
    >
      {store.userProfile ? (
        <>
          <Typography variant="h3" textAlign={'center'}>
            Playlist Management
          </Typography>

          <Typography variant="subtitle1" textAlign={'center'}>
            Adding to: {chosen}
          </Typography>
          <Grid container spacing={4} sx={{ width: '100%', justifyContent: 'center', paddingY: '40px' }}>
            <Grid item xs={3} sx={{ minWidth: '300px', justifyContent: 'center' }}>
              {playlists ? <PlaylistEdit playlists={playlists} chosen={(item) => setPlaylistData(item)} /> : null}
            </Grid>
            <Grid item xs={4} sx={{ minWidth: '300px' }}>
              <RequestSongDisplay />
            </Grid>
            <Grid item xs={4} sx={{ minWidth: '300px' }}>
              <Typography variant={'h5'}>Search for a song</Typography>
              <SongSearch />
            </Grid>
          </Grid>
        </>
      ) : (
        <>
          <Typography sx={{ color: theme.palette.background.paper }}>Connect a Spotify account to begin</Typography>
          <Button variant="contained" onClick={login}>
            Login with Spotify
          </Button>
        </>
      )}
    </Container>
  );
}
