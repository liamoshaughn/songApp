import { React, useState } from 'react';

import { Typography, Container, TextField } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import SongSearch from '../components/SongSearch';

function Home() {
  const theme = useTheme();
  const [name, setName] = useState('');
  const [enable, setEnable] = useState(false);


  return (
    <Container
      sx={{
        display: 'flex',
        flexFlow: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      {/* <TextField
        placeholder="Enter your name"
        onChange={(event) => changeName(event.target.value)}
         sx={{backgroundColor:theme.palette.secondary.main, borderRadius: '4px', marginTop:'9px'}}
      />  */}
      <Typography variant="h1">Request songs</Typography>
      <Typography sx={{color: theme.palette.background.paper, marginTop:'9px', marginBottom: '9px'}}>Search below to request a song, once accepted it will be added to the queue</Typography>
      
      <SongSearch name={name} />
    </Container>
  );
}

export default Home;
