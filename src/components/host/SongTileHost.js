import { Button, Typography, Grid, Box, useTheme, Card } from '@mui/material';
import React, { useEffect } from 'react';
import { useQueueMutation } from '../../services/api';
import { useSpring, animated, easings } from 'react-spring';
import MusicWave from '../animations/MusicWave';

export default function SongTileHost({ song, reset, names, removeSong }) {
  const addQueue = useQueueMutation();
  const theme = useTheme();

  console.log(song.name == "Test & Recognise - Flume Re-work" ? addQueue : null);

  const [SendAnimation, SendAnimationTrigger] = useSpring(() => ({
    left: '87%',
    config: { tension: 300, mass: 1, friction: 50 },
  }));

  function handleSend() {
    addQueue.mutate(song.uri);
    SendAnimationTrigger.start({
      to: { left: '0%' },
    });
  }

  useEffect(() => {
    const animation = SendAnimationTrigger.start({
      to: { left: '87%' },
      delay: 1000,
    });
    if (addQueue.isError) {
      
      animation.reverse(); // Reverse the animation after it completes
    }
    if (addQueue.isSuccess) {
      setTimeout(() => {
        addQueue.reset();
        if (removeSong) removeSong(song);
        else reset();
      }, 1500);
    }
  }, [addQueue.isError, addQueue.isSuccess]);

  return (
    <Grid
      item
      xs={12}
      sx={{ maxWidth: '400px !important', marginTop: '33px !important', padding: '0px !important', height: 'auto' }}
    >
      {removeSong && (
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', textAlign: 'center' }}>
          <Button
            variant="outlined"
            onClick={() => removeSong()}
            sx={{
              boxShadow: 3,
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              width: '15%',
              height: '30px',
            }}
          >
            Deny
          </Button>
          <Typography sx={{ marginLeft: '5%' }}>
            Requested by:{' '}
            {names
              .slice(0, 2)
              .map((name) => (name.length > 9 ? name.slice(0, 9) + '...' : name))
              .join(', ')}
            {names.length > 3 && `, + ${names.length - 2} other(s)`}
          </Typography>
        </div>
      )}
      <Card
        sx={{
          boxShadow: 6,
          borderRadius: '4px',
          padding: '10px',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          height: '100px',
          marginTop: '10px',
          marginBottom: '10px',
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
              Queue
            </Button>
            {addQueue.isLoading && (
              <div style={{ maxWidth: '100%', overflowX: 'clip', paddingLeft: '40px' }}>
                <MusicWave />
              </div>
            )}
            {addQueue.isSuccess && <Typography>Success!!</Typography>}
            {addQueue.isError && <Typography>Error!</Typography>}
          </animated.div>
        </Box>
      </Card>
    </Grid>
  );
}
