import { Button, Typography, Grid, Box, useTheme, CircularProgress, Card, Paper } from '@mui/material';
import React from 'react';
import { usePostMessageMutation } from '../services/api';
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
        }}
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
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
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
            <Typography sx={{ fontWeight: 'bold' }}>
              {song.artists
                .map((artist) => {
                  return artist.name;
                })
                .join(', ')}
            </Typography>
          </div>

          <Button
            variant="contained"
            sx={{
              minWidth: '30px',
              width: '40px',
              margin: '10px',
              marginLeft: 'auto',
              writingMode: 'sideways-lr',
              textOrientation: 'mixed',
            }}
            onClick={() => {
              handleSend();
            }}
          >
            Request
          </Button>
        </Box>
      </Card>
    </Grid>
  );
}
