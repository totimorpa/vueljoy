import React from "react";
import { CircularProgress, Typography, Box } from "@mui/material";

function LoadingScreen({ prompt }) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
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
