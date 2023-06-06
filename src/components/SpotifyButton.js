import { Button, Typography } from '@mui/material';
import React from 'react';

const SpotifyButton = () => {
  const openSpotify = () => {
    const userAgent = navigator.userAgent.toLowerCase();

    // Check if the Spotify app is installed
    const isSpotifyInstalled = userAgent.includes('spotify');

    // Determine the text to display based on the app installation status
    const buttonText = isSpotifyInstalled ? 'OPEN SPOTIFY' : 'GET SPOTIFY FREE';

    // Determine the URL based on the app installation status
    const url = isSpotifyInstalled ? 'spotify:' : 'https://www.spotify.com/';

    // Open the Spotify app or the Spotify website
    window.open(url, '_blank');
  };

  return (
    <div
      style={{
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '300px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '10px',
        borderWidth: '4px',
        borderStyle: 'solid',
        borderRadius: '4px',
        borderColor: 'white',
        backgroundColor: 'white',
        flexDirection: 'column',
        marginBottom: '12px',
      }}
    >
      <Typography textAlign={'center'} sx={{ color:"black" }}>
        All song content provided by spotify
      </Typography>
      <Button sx={{ color: 'black', textTransform: 'uppercase' }} onClick={openSpotify}>
        <img src="/Spotify_Icon_RGB_Green.png" alt="Spotify Logo" style={{ width: '35px', marginRight: '5px' }}></img>
        Open Spotify
      </Button>
    </div>
  );
};

export default SpotifyButton;
