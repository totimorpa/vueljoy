import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";

function Login({ onLogin }) {
  const [name, setName] = useState("");
  const [seat, setSeat] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    onLogin(name, seat);
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
          <TextField
            label="Name"
            variant="outlined"
            value={name}
            onChange={(event) => setName(event.target.value)}
            margin="dense"
            required
          />
          <TextField
            label="Seat"
            variant="outlined"
            value={seat}
            onChange={(event) => setSeat(event.target.value)}
            margin="dense"
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disableElevation
          >
            Join Game
          </Button>
        </Box>
      </form>
    </Box>
  );
}

export default Login;
