import React, { useState, useEffect } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import { Grid, Button } from "@mui/material";
import DevelopButtons from "../components/DevelopButtons";
import Cookies from "universal-cookie";
import { addToken, addUser, useStore } from "../store/store";
import { callback, getUser } from "../services/api";

async function getUserProfile(token) {
  const request = await getUser(token);

  addUser(request);
}

function Home() {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const store = useStore();

  const location = useLocation();
  useEffect(() => {
    if (location.pathname == "/auth/callback") {
      callback();
    }
    addToken(cookies.get("access_token"));
    getUserProfile(cookies.get("access_token"));
  }, []);

  return (
    <div className="App">
      <DevelopButtons />
      <Grid spacing={3} container direction="row" justifyContent="center" alignItems="center" sx={{ marginY: "auto" }}>
        <Grid item>
          <Button
            variant="contained"
            onClick={() => {
              navigate("/list");
            }}
          >
            Go to List
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            onClick={() => {
              navigate("/spotifyAdd");
            }}
          >
            Go to Spotify Add
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;
