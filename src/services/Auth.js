import React, { useState, useEffect } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
import Cookies from 'universal-cookie';
import { addToken, addUser, useStore } from '../store/store';
import { callback, getUser } from '../services/api';

async function getUserProfile(token) {
  const request = await getUser(token);

  addUser(request);
}

export default function Auth() {
  const cookies = new Cookies();


  const location = useLocation();
  useEffect(() => {
    if (location.pathname == '/auth/callback') {
      callback();
    }
    addToken(cookies.get('access_token'));
    getUserProfile(cookies.get('access_token'));
  }, []);
  return (
    <Container maxWidth="100%" sx={{ borderBottom: 1, height: '60px', display: 'flex', alignItems: 'center' }}>
      <Typography>Login Successful, Redirecting...</Typography>
    </Container>
  );
}
