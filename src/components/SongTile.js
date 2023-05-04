import { Button, Typography, Grid, Box, useTheme, CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { addToQueue } from '../services/api';
import { usePostMessageMutation } from '../services/api';
import { useStore } from '../store/store';
import { useSpring, animated, easings } from 'react-spring';

export default function SongTile({ song, name }) {
  const sendMessage = usePostMessageMutation();
  const store = useStore();
  const theme = useTheme();

  const AnimatedBox = animated(Box);
  const SuccessFadeAnimation = useSpring({
    from: { opacity: sendMessage.isSuccess ? 0.96 : 0 },
    to: { opacity: sendMessage.isSuccess ? 0 : 0.96 },
    config: { duration: 6000, easing: easings.easeInExpo },
    // Reset the mutation when the animation is complete
    onRest: () => {
      if (sendMessage.isSuccess) {
        sendMessage.reset();
      }
    },
  });

  function handleSend() {
    sendMessage.mutate({ message: song.id, name: name });
  }

  return (
    <Grid sx={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }} item xs={12}>
      {/* Check if sendMessage.isSuccess is truthy */}
      {sendMessage.isSuccess ? (
        // Apply fadeAnimation to AnimatedBox
        <AnimatedBox
          style={{
            width: 500 * 0.9 + 'px',
            height: 120 * 0.9 + 'px',
            position: 'absolute',
            backgroundColor: theme.palette.success.main,
            zIndex: '100',
            boxShadow: '0 0 10px 10px ' + theme.palette.success.main,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            ...SuccessFadeAnimation,
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            Song Sent
          </Typography>
        </AnimatedBox>
      ) : null}
      {sendMessage.isLoading ? (
        // Apply fadeAnimation to AnimatedBox
        <AnimatedBox
          style={{
            width: 400 * 0.9 + 'px',
            height: 120 * 0.9 + 'px',
            position: 'absolute',
            backgroundColor: theme.palette.info.dark,
            zIndex: '100',
            boxShadow: '0 0 10px 10px ' + theme.palette.info.dark,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            opacity: 0.95,
          }}
        >
          <CircularProgress color="info"/>
        </AnimatedBox>
      ) : null}
      <Box
        sx={{
          width: '350px',
          height: '120px',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img style={{ maxWidth: '100px' }} alt="Album Cover" src={song.album.images[1].url} />
        <div style={{ paddingLeft: '15px', width: '220px' }}>
          <Box>
            <Typography sx={{ fontWeight: 'bold' }}>
              {new Date(song.album.release_date).toLocaleString('en-AU', {
                year: 'numeric',
              })}
            </Typography>
          </Box>

          <Typography sx={{ typography: { sm: 'body2', xs: 'body2' } }}>{song.name}</Typography>
          <Typography sx={{ fontWeight: 'bold' }}>
            {song.artists
              .map((artist) => {
                return artist.name;
              })
              .join(', ')}
          </Typography>
        </div>
        <div>
          <Button
            variant="contained"
            sx={{ height: '30px', margin: '10px' }}
            onClick={() => {
              handleSend();
            }}
          >
            Request
          </Button>
        </div>
      </Box>
    </Grid>
  );
}
