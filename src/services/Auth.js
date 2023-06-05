import React, {  useEffect } from 'react';

import { useLocation } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
import Cookies from 'universal-cookie';
import { addToken, addUser, addSession } from '../store/store';
import { callback, getUser } from '../services/api';

async function getUserProfile(token) {
  const request = await getUser(token);

  addUser(request);
}

export default function Auth() {
  const cookies = new Cookies();


  const location = useLocation();
  useEffect(() => {
    addToken(cookies.get('access_token'));
    getUserProfile(cookies.get('access_token'));
    addSession(cookies.get('current_session'))
    if (location.pathname == '/auth/callback') {
      callback();
    }

  }, []);
  return (
    <Container maxWidth="100%" sx={{ borderBottom: 1, height: '60px', display: 'flex', alignItems: 'center' }}>
      <Typography>Login Successful, Redirecting...</Typography>
    </Container>
  );
}
