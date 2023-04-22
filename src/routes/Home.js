import React, { useState, useEffect } from "react";

import { Grid, Button, Typography, Container } from "@mui/material";

import { sendMessage } from "../services/api";
import SongSearch from "../components/UserAdd/SongSearch";

function Home() {
  return (
    <Container>
      <Typography variant="h4">Request songs for PARTY NAME</Typography>
      <SongSearch addTracks={(song) => sendMessage(song.id)} />
    </Container>
  );
}

export default Home;
