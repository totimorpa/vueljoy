import React, { useState } from "react";
import { Typography, Button, Box, Grid } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";

function Question({ question, answers, onAnswer }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  function handleAnswer(answer) {
    setSelectedAnswer(answer);
    onAnswer(answer);
  }

  const [progress, setProgress] = React.useState(0);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      height="100vh"
      m={2}
    >
      <LinearProgress color="inherit" />
      <Box mb={4}>
        <Typography variant="h4">{question}</Typography>
      </Box>
      <Grid container spacing={2} justify="center">
        {answers.map((answer) => (
          <Grid item xs={6} sm={6} md={3} key={answer}>
            <Button
              variant={selectedAnswer === answer ? "contained" : "outlined"}
              color="primary"
              fullWidth
              disableElevation
              onClick={() => handleAnswer(answer)}
            >
              {answer}
            </Button>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Question;
