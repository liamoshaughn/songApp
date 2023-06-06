import React, { useEffect } from 'react';

import { useLocation } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
import Cookies from 'universal-cookie';
import { addToken, addUser, addSession } from '../store/store';
import { callback, getUser } from '../services/api';
import { useStore } from '../store/store';

async function getUserProfile(token) {
  const request = await getUser(token);

  addUser(request);
}

export default function Auth() {
  const cookies = new Cookies();
  const store = useStore();

 
  useEffect(() => {
    if (localStorage.getItem('access_token')) {
      addToken(localStorage.getItem('access_token'));
      getUserProfile(localStorage.getItem('access_token'));
    }
    addSession(cookies.get('current_session'));


  }, []);
  return (
    <Container maxWidth="100%" sx={{ borderBottom: 1, height: '60px', display: 'flex', alignItems: 'center' }}>
      <Typography>Login Successful, Redirecting...</Typography>
    </Container>
  );
}
