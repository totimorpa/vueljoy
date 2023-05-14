import React from "react";
import { Typography, Box } from "@mui/material";
import "./loading.css";
import banana from "./banana.png";

function LoadingScreen({ prop }) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <img src={banana} className="App-logo" alt="logo"></img>
      <Box mt={2}>
        <Typography variant="h6" align="center">
          {prop}
        </Typography>
      </Box>
    </Box>
  );
}

export default LoadingScreen;
