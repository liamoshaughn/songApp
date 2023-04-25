import React from "react";

import { Typography, Container } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SongSearch from "../components/SongSearch";
import { useStore } from "../store/store"

function Search() {
    const theme = useTheme();
    const store = useStore();
    console.log(theme);
    const name = store.name;
    return (
      <Container
        sx={{
          display: "flex",
          flexFlow: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Typography variant="h4">Request songs for Jacobs 21st</Typography>
        <Typography variant="subtitle1">Press the "+" once to add a song</Typography>
        <SongSearch />
      </Container>
    );
  }

export default Search;