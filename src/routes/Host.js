//Lists songs and playlists uploaded by user

import { useEffect } from 'react';
import { Button, Typography, Container, Grid, Box } from '@mui/material';
import { useStore, addToken, addUser, addSession } from '../store/store';

import { login } from '../services/api';
import SongSearchHost from '../components/host/SongSearchHost';
import RequestSongDisplay from '../components/host/RequestSongDisplay';
import { useTheme } from '@mui/material/styles';
import Cookies from 'universal-cookie';
import { getUser } from '../services/api';

async function getUserProfile(token) {
  const request = await getUser(token);

  addUser(request);
}

export default function Host() {
  const theme = useTheme();
  const store = useStore();
  const user = store.userProfile;

  const cookies = new Cookies();

  useEffect(() => {
    addToken(cookies.get('access_token'));
    getUserProfile(cookies.get('access_token'));
    addSession(cookies.get('current_session'));
  }, []);

  return (
    <Container sx={{ height: '100vh', display: 'flex', flexFlow: 'column', alignItems: 'center' }} maxWidth="xl">
      {user ? (
        <div style={{ width: '100%' }}>
          <div style={{ display: 'flex' }}>
            <Typography variant="subtitle1">Your session code: {store.currentSession}</Typography>
            <Typography variant="subtitle1" sx={{marginLeft:'auto'}}>Current User: {user.display_name}</Typography>
          </div>

          <Typography variant="h1" textAlign={'center'} sx={{ marginBottom: '10vh' }}>
            Host Management
          </Typography>

          <Grid
            container
            spacing={4}
            sx={{ width: '100%', height: '100%', justifyContent: 'center', paddingY: '40px' }}
          >
            <Grid item xs={4} sx={{ minWidth: '400px' }}>
              <Box   sx={{
                  backgroundColor: theme.palette.background.paper,
                  textAlign: 'center',
                  padding: '10px',
                  height: '75vh',
                  overflow: 'auto',
                  borderRadius: '4px',
                }}>
              <RequestSongDisplay /></Box>
            </Grid>
            <Grid item xs={4} sx={{ minWidth: '400px' }}>
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
