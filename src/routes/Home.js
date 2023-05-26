import React, { useState } from 'react';
import { Typography, Container, TextField, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import SongSearch from '../components/SongSearch';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useSpring, animated } from 'react-spring';

function Home() {
  const theme = useTheme();
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [enable, setEnable] = useState(false);

  const handleCodeSubmit = (event) => {
    event.preventDefault();
    // Perform your submit logic here
    if (code.trim() !== '') {
      FadeTrigger.start({
        from: {
          opacity: 1,
        },
        to: {
          opacity: 0,
        },
      });
    }
  };
  const handleNameSubmit = (event) => {
    event.preventDefault();
    // Perform your submit logic here
    if (name.trim() !== '') {
      FadeTrigger.start({
        from: {
          opacity: 1,
        },
        to: {
          opacity: 0,
        },
      });
    }
  };

  const [FadeAnimation, FadeTrigger] = useSpring(() => ({
    from: {
      opacity: 1,
    },
    config: { tension: 400, mass: 0.8, friction: 20 },
    // Reset the mutation when the animation is complete
    onRest: () => {
      setEnable(true);
      FadeTrigger.start({
        from: {
          opacity: 0,
        },
        to: {
          opacity: 1,
        },
      });
    },
  }));

  return (
    <Container
      sx={{
        display: 'flex',
        flexFlow: 'column',
        alignItems: 'center',
        textAlign: 'center',
        position: 'relative',
      }}
    >
      <Typography variant="h1">Request songs</Typography>
      {!enable ? (
        <animated.div style={{ ...FadeAnimation }}>
          <Typography sx={{ color: theme.palette.background.paper, marginTop: '9px', marginBottom: '9px' }}>
            Enter Session Code
          </Typography>
          <form onSubmit={handleCodeSubmit}>
            <TextField
              placeholder="Enter Session Code"
              onChange={() => (event) => setCode(event.target.value)}
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <IconButton type="submit" onClick={handleCodeSubmit} disabled={code.trim() === ''}>
                    <ArrowForwardIcon />
                  </IconButton>
                ),
              }}
              sx={{
                backgroundColor: theme.palette.secondary.main,
                borderRadius: '4px',
                marginTop: '9px',
              }}
            />
          </form>
        </animated.div>
      ) : (
        <animated.div style={{ ...FadeAnimation }}>
          <Typography sx={{ color: theme.palette.background.paper, marginTop: '9px', marginBottom: '9px' }}>
            Enter your name to begin
          </Typography>
          <form onSubmit={handleNameSubmit}>
            <TextField
              placeholder="Enter your name"
              variant="outlined"
              onChange={() => (event) => setName(event.target.value)}
              InputProps={{
                endAdornment: (
                  <IconButton type="submit" onClick={handleNameSubmit} disabled={name.trim() === ''}>
                    <ArrowForwardIcon />
                  </IconButton>
                ),
              }}
              sx={{
                backgroundColor: theme.palette.secondary.main,
                borderRadius: '4px',
                marginTop: '9px',
              }}
            />
          </form>
        </animated.div>
      )}
    </Container>
  );
}

export default Home;