import React from "react";

import { Typography, Container } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SongSearch from "../components/SongSearch";

function Home() {
  const theme = useTheme();
  console.log(theme);
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

export default Home;
