import React, { useState } from 'react';
import { Typography, Container, TextField, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import SongSearch from '../components/SongSearch';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useSpring, animated, easings } from 'react-spring';

function Home() {
  const theme = useTheme();
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [phase, setPhase] = useState(1);

  const handleCodeSubmit = (event) => {
    event.preventDefault();
    if (code.trim() !== '') {
      FadeCodeTrigger.start({
        opacity: 0,
        onRest: () => {
          setPhase(2);
          setTimeout(() => {
            FadeNameTrigger.start({
              opacity: 1,
            });
          },[200]);
        },
      });
    }
  };
  const handleNameSubmit = (event) => {
    event.preventDefault();
    if (name.trim() !== '') {
      FadeNameTrigger.start({
        opacity: 0,
        onRest: () => {
          setPhase(3);
        },
      });
    }
  };

  const [FadeCodeAnimation, FadeCodeTrigger] = useSpring(() => ({
    from: {
      opacity: 1,
    },
    config: { duration: 600, easing: easings.easeOutCirc },
    // Reset the mutation when the animation is complete
  }));
  const [FadeNameAnimation, FadeNameTrigger] = useSpring(() => ({
    from: {
      opacity: 0,
    },
    config: { duration: 600, easing: easings.easeOutCirc },
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
      {phase == 1 && (
        <animated.div style={{ ...FadeCodeAnimation }}>
          <Typography sx={{ color: theme.palette.background.paper, marginTop: '9px', marginBottom: '9px' }}>
            Enter Session Code
          </Typography>
          <form onSubmit={handleCodeSubmit}>
            <TextField
              placeholder="Enter Session Code"
              onChange={(event) => setCode(event.target.value)}
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
      )}
      {phase == 2 && (
        <animated.div style={{ ...FadeNameAnimation }}>
          <Typography sx={{ color: theme.palette.background.paper, marginTop: '9px', marginBottom: '9px' }}>
            Enter your name to begin
          </Typography>
          <form onSubmit={handleNameSubmit}>
            <TextField
              placeholder="Enter your name"
              variant="outlined"
              onChange={(event) => setName(event.target.value)}
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
      {phase == 3 && (
        <SongSearch/>
      )}
    </Container>
  );
}

export default Home;
