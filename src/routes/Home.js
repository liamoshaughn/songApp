import React, { useState, useEffect } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import { Grid, Button, Typography, Container } from "@mui/material";
import DevelopButtons from "../components/DevelopButtons";
import Cookies from "universal-cookie";
import { addToken, addUser, useStore } from "../store/store";
import { callback, getUser } from "../services/api";
import SongSearch from "../components/UserAdd/SongSearch";

async function getUserProfile(token) {
  const request = await getUser(token);

  addUser(request);
}

function Home() {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const store = useStore();

  async function addTracks(song) {
    const response = "add track I guess"
    console.log(response);
  }

  const location = useLocation();
  useEffect(() => {
    if (location.pathname == "/auth/callback") {
      callback();
    }
    addToken(cookies.get("access_token"));
    getUserProfile(cookies.get("access_token"));
  }, []);

  return (
    <Container>
      <Typography variant="h4">Request songs for PARTY NAME</Typography>
      <SongSearch addTracks={(song) => addTracks(song)} />
    </Container>
  );
}

export default Home;
