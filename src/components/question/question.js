import React, { useState, useEffect } from "react";
import { Typography, Button, Box, Grid } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";

function Question({ question, answers, onAnswer }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  function handleAnswer(answer) {
    setSelectedAnswer(answer);
    onAnswer(answer);
  }

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      height="100vh"
      m={2}
    >
      <Box mb={4}>
        <Typography variant="h4">{question}</Typography>
      </Box>
      <Box mb={4}>
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
      <Box sx={{ width: "100%" }}>
        <LinearProgress variant="determinate" value={progress} />
      </Box>
    </Box>
  );
}

export default Question;
