import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    onLogin(username, password);
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
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            margin="dense"
            required
          />
          <TextField
            label="Seat"
            variant="outlined"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            margin="dense"
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disableElevation
          >
            Join
          </Button>
        </Box>
      </form>
    </Box>
  );
}

export default Login;
