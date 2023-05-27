import { Button, Typography, Grid, Box, useTheme, CircularProgress, Card } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { usePostMessageMutation } from '../services/api';
import { useSpring, animated, easings } from 'react-spring';
import MusicWave from './animations/MusicWave';

export default function SongTile({ song, name, reset }) {
  const sendMessage = usePostMessageMutation();
  const theme = useTheme();


  const [SendAnimation, SendAnimationTrigger] = useSpring(() => ({
    from: {
      left: '87%',
    },
    config: { tension: 300, mass: 1, friction: 50 },
    // Reset the mutation when the animation is complete
  }));

  function handleSend() {
    sendMessage.mutate({ message: song.id, name: name });
    SendAnimationTrigger.start({
      from: {
        left: '87%',
      },
      to: {
        left: '0%',
      },
    });
  }

  useEffect(() => {
    if (sendMessage.isError) {
      SendAnimationTrigger.start({
        from: {
          left: '0%',
        },
        to: {
          left: '87%',
        },
        delay: 1000,
      });
    }
    if (sendMessage.isSuccess) {
      setTimeout(() => {
        reset();
      }, 1500);
    }
  }, [sendMessage]);



  return (
    <Grid item xs={12} sx={{ marginTop: '33px !important', padding: '0px !important', height: '115px' }}>
      <Card
        sx={{
          boxShadow: 6,
          borderRadius: '4px',
          padding: '10px',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          height: '90%',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            position: 'relative',
          }}
        >
          <img
            style={{ width: '75px', justifySelf: 'left', marginRight: '10px' }}
            alt="Album Cover"
            src={song.album.images[1].url}
          />
          <div style={{ textAlign: 'left' }}>
            <Box>
              <Typography sx={{ fontWeight: 'bold' }}>
                {new Date(song.album.release_date).toLocaleString('en-AU', {
                  year: 'numeric',
                })}
              </Typography>
            </Box>

            <Typography
              sx={{
                width: '80%',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: '2',
                WebkitBoxOrient: 'vertical',
              }}
            >
              {song.name}
            </Typography>
            <Typography
              sx={{
                fontWeight: 'bold',
                width: '165px',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
              }}
            >
              {song.artists
                .map((artist) => {
                  return artist.name;
                })
                .join(', ')}
            </Typography>
          </div>
          <animated.div
            style={{
              position: 'absolute',
              height: '100%',
              display: 'flex',
              backgroundColor: theme.palette.background.paper,
              alignItems: 'center',
              width: '100%',
              textAlign: 'center',
              justifyContent: 'center',
              ...SendAnimation,
            }}
          >
            <Button
              variant="contained"
              sx={{
                position: 'absolute',
                width: '85px',
                minWidth: '85px',
                transform: 'rotate(90deg)',
                height: '35px',
                left: '-23px',
              }}
              onClick={() => {
                handleSend();
              }}
            >
              Request
            </Button>
            {sendMessage.isLoading && (
              <div style={{ maxWidth: '100%', overflowX: 'clip', paddingLeft: '40px' }}>
                <MusicWave />
              </div>
            )}
            {sendMessage.isSuccess && <Typography>Success!!</Typography>}
            {sendMessage.isError && <Typography>Error!</Typography>}
          </animated.div>
        </Box>
      </Card>
    </Grid>
  );
}
