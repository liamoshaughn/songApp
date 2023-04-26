import { React, useState } from "react";

import { Typography, Container, TextField } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SongSearch from "../components/SongSearch";

function Home() {
  const theme = useTheme();
  const [name, setName] = useState("");
  const [enable, setEnable] = useState(false);

  console.log(theme);

  function changeName(val) {
    
    if (val == "") {
      setName("")
      setEnable(false)
    } else {
      setName(val)
      setEnable(true)
    }
  }

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
      <TextField 
        placeholder="Enter your name"
        onChange={(event) => changeName(event.target.value)}
      />
      <SongSearch name = {name} enable = {enable} />
    </Container>
  );
}

export default Home;