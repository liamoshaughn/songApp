import React from "react";

import { Grid, Button, TextField } from "@mui/material";
import { Typography, Container } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Navigate, useNavigate } from "react-router-dom";
import { useStore } from "../store/store"


function Home() {
  const navigate = useNavigate();
  const theme = useTheme();
  console.log(theme);
  const store = useStore();
  var uname = "";

  function changeval(val) {
    uname = val;
  }

  function navsearch() {
    store.setName(uname);
    navigate("/search");
  }

  return (
    <Container
      sx={{
        display: "flex",
        flexFlow: "column",
        alignItems: "center",
        textAlign: "center",
      }}>
    
      <Typography 
        variant="h4" 
        sx={{padding: "10px"}}>
          Enter your name
      </Typography>

      <TextField 
        id="name-entry" 
        label="name" 
        variant="filled" 
        sx={{padding: "10px"}} 
        onChange={(event) => {
          changeval(event.target.value);
        }}/>

      <Button  
        variant="contained" 
        sx={{padding: "10px"}} 
        onClick={() => {
          navsearch()
      }}>
        Go!
      </Button>
    </Container>
  );
}

export default Home;
