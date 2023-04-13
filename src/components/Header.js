import { Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
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
