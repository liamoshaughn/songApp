import { React, useState } from 'react';

import { Typography, Container, TextField } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import SongSearch from '../components/SongSearch';

function Home() {
  const theme = useTheme();
  const [name, setName] = useState('');
  const [enable, setEnable] = useState(false);

  function changeName(val) {
    if (val == '') {
      setName('');
      setEnable(false);
    } else {
      setName(val);
      setEnable(true);
    }
  }

  return (
    <Container
      sx={{
        display: 'flex',
        flexFlow: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <Typography variant="h4">Request songs</Typography>
      <Typography variant="subtitle2">Search below to request a song, once accepted it will be added to the queue</Typography>
      <TextField
        placeholder="Enter your name"
        onChange={(event) => changeName(event.target.value)}
        sx={{ my: '20px' }}
      />
      <SongSearch name={name} enable={enable} />
    </Container>
  );
}

export default Home;
