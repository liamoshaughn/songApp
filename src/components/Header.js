import { Button, Container } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getClientAuth } from "../services/api";
import { addToken, useStore } from "../store/store.js";

export default function Header() {
  const navigate = useNavigate();
  const store = useStore();
  async function getToken() {
    const token = await getClientAuth();
    addToken(token);
    return token;
  }

  useEffect(() => {
    getToken();
  }, []);
  return (
    <Container maxWidth="100%" sx={{ borderBottom: 1, height: "40px" }}>
      <Button
        onClick={() => {
          navigate("/");
        }}
      >
        Back
      </Button>
    </Container>
  );
}
