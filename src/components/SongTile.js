import { Button, Typography, Grid, Box, useTheme, CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { usePostMessageMutation } from '../services/api';
import { useStore } from '../store/store';
import { useSpring, animated, easings } from 'react-spring';

const animatedBoxStyles = {
  width: '90%',
  height: '85%',
  position: 'absolute',
  zIndex: '100',
  boxShadow: '0 0 14px 14px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

export default function SongTile({ song, name }) {
  const sendMessage = usePostMessageMutation();
  const theme = useTheme();
  console.log(theme);

  const AnimatedBox = animated(Box);
  const SuccessFadeAnimation = useSpring({
    from: {
      opacity: sendMessage.isSuccess || sendMessage.isError ? 0.9 : 0,
    },
    to: {
      opacity: sendMessage.isSuccess || sendMessage.isError ? 0 : 0.9,
    },
    config: { duration: 6000, easing: easings.easeInExpo },
    // Reset the mutation when the animation is complete
    onRest: () => {
      if (sendMessage.isSuccess || sendMessage.isError) {
        sendMessage.reset();
      }
    },
  });

  function handleSend() {
    sendMessage.mutate({ message: song.id, name: name });
  }

  return (
    <Grid
      sx={{
        boxShadow: 3,
        borderRadius: '16px',
        padding: '16px',
        mt: '15px',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "rgba(255, 255, 255, 0.12)"
      }}
      item
      xs={12}
    >
      {/* Check if sendMessage.isSuccess is truthy */}
      {sendMessage.isSuccess ? (
        // Apply fadeAnimation to AnimatedBox
        <AnimatedBox
          style={{
            ...animatedBoxStyles,
            backgroundColor: theme.palette.success.main,
            boxShadow: `${animatedBoxStyles.boxShadow} ${theme.palette.success.main}`,
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
            ...animatedBoxStyles,
            backgroundColor: theme.palette.info.dark,
            boxShadow: `${animatedBoxStyles.boxShadow} ${theme.palette.info.dark}`,
            ...SuccessFadeAnimation,
          }}
        >
          <CircularProgress color="info" />
        </AnimatedBox>
      ) : null}

      {sendMessage.isError ? (
        // Apply fadeAnimation to AnimatedBox
        <AnimatedBox
          style={{
            ...animatedBoxStyles,
            backgroundColor: theme.palette.error.main,
            boxShadow: `${animatedBoxStyles.boxShadow} ${theme.palette.error.main}`,
            ...SuccessFadeAnimation,
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            Error, refresh page and try again
          </Typography>
        </AnimatedBox>
      ) : null}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img style={{ width: '25%' }} alt="Album Cover" src={song.album.images[1].url} />
        <div style={{ }}>
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
