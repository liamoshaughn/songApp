import React, { useState } from 'react';
import { Typography, Container, TextField, IconButton, Button, CircularProgress, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import SongSearch from '../components/user/SongSearch';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useSpring, animated, easings } from 'react-spring';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';

function Home() {
  const queryParameters = new URLSearchParams(window.location.search);
  const theme = useTheme();
  const navigate = useNavigate();
  const [name, setName] = useState(queryParameters.get('name') ? queryParameters.get('name') : '');
  const [code, setCode] = useState(queryParameters.get('session') ? queryParameters.get('session') : '');
  const [phase, setPhase] = useState(queryParameters.get('session') ? 3 : 1);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);

  const handleCodeSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    if (code.trim() !== '') {
      const messageRef = doc(db, 'sessions', code);
      const docSnapshot = await getDoc(messageRef);
      if (docSnapshot._document !== null) {
        FadeCodeTrigger.start({
          opacity: 0,
          onRest: () => {
            setPhase(2);
            setTimeout(() => {
              FadeNameTrigger.start({
                opacity: 1,
              });
            }, [200]);
          },
        });
      } else {
        setSubmitting(false);
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 3000);
      }
    }
  };
  const handleNameSubmit = (event) => {
    event.preventDefault();
    const newURL = `?session=${code}&name=${name}`; // Modify the URL string as needed
    navigate(newURL);
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
        paddingTop: '20px',
      }}
    >
      {' '}
      <Button
        onClick={() => {
          navigate('/');
          window.location.reload();
        }}
        variant="outlined"
        sx={{
          borderColor: theme.palette.background.paper,
          color: theme.palette.background.paper,
          position: 'absolute',
          left: '10px',
        }}
      >
        restart
      </Button>
      {phase === 3 ? <Typography variant="subtitle1">Current Session: {code}</Typography> : null}
      <Typography variant="h1">Request songs</Typography>
      {phase === 1 && (
        <animated.div style={{ ...FadeCodeAnimation }}>
          <Typography sx={{ color: theme.palette.background.paper, marginTop: '9px', marginBottom: '9px' }}>
            Enter Session Code
          </Typography>
          <form onSubmit={handleCodeSubmit}>
            <TextField
              placeholder="Enter Session Code"
              onChange={(event) => setCode(event.target.value)}
              variant="outlined"
              error={error}
              InputProps={{
                endAdornment: submitting ? (
                  <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                  </Box>
                ) : (
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
          <Button
            onClick={() => {
              navigate('/host');
            }}
            sx={{ color: theme.palette.background.paper }}
          >
            Are you the host? Click here to start a session
          </Button>
        </animated.div>
      )}
      {phase === 2 && (
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
      {phase === 3 && <SongSearch />}
    </Container>
  );
}

export default Home;
