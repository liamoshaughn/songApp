import { React, useState } from 'react';

import { Typography, Container, TextField, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import SongSearch from '../components/SongSearch';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useSpring, animated } from 'react-spring';

function Home() {
  const theme = useTheme();
  const [name, setName] = useState('');
  const [enable, setEnable] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform your submit logic here
    if (inputValue.trim() !== '') {
      console.log('Submitted:', inputValue);
      // Reset the input value
      setName(inputValue);
      FadeOutTrigger.start({
        from: {
          opacity: 1,
        },
        to: {
          opacity: 0,
        },
      });
    }
  };

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSubmit(event);
    }
  };

  const [FadeOutAnimation, FadeOutTrigger] = useSpring(() => ({
    from: {
      opacity: 1,
    },
    config: { tension: 400, mass: 0.8, friction: 20 },
    // Reset the mutation when the animation is complete
    onRest: () => {
      setEnable(true);
      MoveNameTrigger.start({
        from: {
          top: '106px',
          marginRight: '175px',
        },
        to: {
          top: '-30px',
          marginRight: '0px',
        },
      });
      FadeInTrigger.start({
        from: {
          opacity: 0,
        },
        to: {
          opacity: 1,
        },
      });
    },
  }));
  const [MoveNameAnimation, MoveNameTrigger] = useSpring(() => ({
    from: {
      top: '106px',
      marginRight: '175px',
    },
    config: { tension: 230, mass: 0.8, friction: 90 },
    // Reset the mutation when the animation is complete
    onRest: () => {},
  }));

  const [FadeInAnimation, FadeInTrigger] = useSpring(() => ({
    from: {
      opacity: 0,
    },
    config: { tension: 500, mass: 20, friction: 220 },
    // Reset the mutation when the animation is complete
    onRest: () => {},
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
      {!enable && (
        <animated.div style={{ ...FadeOutAnimation }}>
          <Typography sx={{ color: theme.palette.background.paper, marginTop: '9px', marginBottom: '9px' }}>
            Enter your name to begin
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              placeholder="Enter your name"
              value={inputValue}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <IconButton type="submit" onClick={handleSubmit} disabled={inputValue.trim() === ''}>
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
      <animated.div style={{ position: 'absolute', ...MoveNameAnimation }}>
        <Typography
          sx={{
            color: theme.palette.background.paper,
          }}
        >
          {name}
        </Typography>
      </animated.div>
      <animated.div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', ...FadeInAnimation }}>
        <Typography sx={{ color: theme.palette.background.paper, marginTop: '9px', marginBottom: '9px' }}>
          Search below to request a song, once accepted it will be added to the queue
        </Typography>
        <SongSearch name={name} />
      </animated.div>
    </Container>
  );
}

export default Home;
