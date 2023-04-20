import React, { useState, useEffect } from "react";

import { Grid, Button, Typography, Container } from "@mui/material";

import { addToken, useStore } from "../store/store";
import { callback, getUser, sendMessage } from "../services/api";
import SongSearch from "../components/UserAdd/SongSearch";

function Home() {
  return (
    <Container>
      <Typography variant="h4">Request songs for PARTY NAME</Typography>
      <SongSearch addTracks={(song) => sendMessage(song.uri)} />
    </Container>
  );
}

export default Home;
