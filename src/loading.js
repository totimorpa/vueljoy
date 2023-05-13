import React from "react";
import { CircularProgress, Typography, Box } from "@mui/material";
import { Banana } from "./banana.png";
import "./loading.css";

function LoadingScreen({ prompt }) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <img src={Banana} className="App-logo" alt="logo" />
      <CircularProgress size={64} thickness={4} />
      <Box mt={2}>
        <Typography variant="h6" align="center">
          {prompt}
        </Typography>
      </Box>
    </Box>
  );
}

export default LoadingScreen;
