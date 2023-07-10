//Lists songs and playlists uploaded by user

import { useEffect, useState } from 'react';
import { Button, Typography, Container, Grid, Box, CircularProgress } from '@mui/material';
import { useStore, addToken, addUser, addSession } from '../store/store';

import { login } from '../services/api';
import SongSearchHost from '../components/host/SongSearchHost';
import RequestSongDisplay from '../components/host/RequestSongDisplay';
import { useTheme } from '@mui/material/styles';
import Cookies from 'universal-cookie';
import { getUser } from '../services/api';
import { useNavigate } from 'react-router-dom';
import SpotifyButton from '../components/SpotifyButton';

export default function Host() {
  const theme = useTheme();
  const store = useStore();
  const navigate = useNavigate();
  const user = store.userProfile;
  const [logginIn, setLogin] = useState(false);

  const cookies = new Cookies();
  async function getUserProfile() {
    const request = await getUser();
    addUser(request);
  }

  useEffect(() => {
    addToken(localStorage.getItem('access_token'));
    addSession(cookies.get('current_session'));
  }, []);

  useEffect(() => {
    if ((store.accessToken ?? '') !== '' && store.accessToken.length >= 10) {
      getUserProfile();
    }
  }, [store.accessToken]);

  return (
    <Container sx={{height: '93vh',display: 'flex', flexFlow: 'column', alignItems: 'center' }} maxWidth="xl">
      {user ? (
        <div style={{ width: '100%' }}>
          <div style={{ display: 'flex' }}>
            <Typography variant="subtitle1">
              Your session code: <Typography variant="h1">{store.currentSession}</Typography>
            </Typography>
            <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
              <Typography variant="subtitle1">Current User: </Typography>
              <Typography sx={{ marginBottom: '8px' }} variant="subtitle1">
                {user.display_name}
              </Typography>
              <Button
                variant="outlined"
                onClick={() => {
                  localStorage.removeItem('refresh_token');
                  localStorage.removeItem('access_token');
                  navigate('/');
                  window.location.reload();
                }}
                sx={{ color: theme.palette.background.paper }}
              >
                Logout
              </Button>
            </div>
          </div>

          <Typography variant="h1" textAlign={'center'} sx={{ marginBottom: '3vh' }}>
            Host Management
          </Typography>
          <SpotifyButton />
          <Grid
            container
            sx={{
              width: '100%',
              minHeight: '650',
              justifyContent: 'center',
              margin: 0,
              padding: 0,
              [theme.breakpoints.down('md')]: {
                minHeight: '1390px',
              },
            }}
          >
            <Grid
              item
              xs={5}
              sx={{
                minWidth: '300px',
                margin: 0,
                padding: '0px !important',
              }}
            >
              <Box
                sx={{
                  backgroundColor: theme.palette.background.paper,
                  textAlign: 'center',
                  padding: '10px',
                  height: '75vh',
                  overflow: 'auto',
                  borderRadius: '4px',
                }}
              >
                <RequestSongDisplay />
              </Box>
            </Grid>
            <Grid
              item
              xs={0.5}
              sx={{ margin: 0, padding: '0px !important', [theme.breakpoints.down(650)]: { display: 'none' } }}
            ></Grid>
            <Grid item xs={5} sx={{ minWidth: '300px', margin: 0, padding: '0px !important' }}>
              <Box
                sx={{
                  backgroundColor: theme.palette.background.paper,
                  textAlign: 'center',
                  padding: '10px',
                  height: '75vh',
                  overflow: 'auto',
                  borderRadius: '4px',
                }}
              >
                <Typography variant={'h5'}>Search for a song</Typography>
                <SongSearchHost />
              </Box>
            </Grid>
          </Grid>
        </div>
      ) : (
        <div
          style={{
            marginTop: 'auto',
            marginBottom: 'auto',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Button
            variant="contained"
            sx={{ marginBottom: '10px' }}
            onClick={() => {
              setLogin(true);
              login();
            }}
          >
            Login with Spotify
          </Button>
          {logginIn && <CircularProgress />}
        </div>
      )}
    </Container>
  );
}
