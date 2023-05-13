import React, { useState, useEffect } from "react";
import { Typography, Button, Box, Grid, Card } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import AirplaneIcon from "./AirplaneIcon.png";

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

  const buttonColors = [
    "#f44336","blue","green","purple"];

  const answerHeight = Math.max(
    ...answers.map((answer) =>
      typeof answer === "string" ? answer.length : answer.toString().length
    )
  ) * 10;

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      m={2}
    >
      <Box
        sx={{
          position: "relative",
          display: "inline-flex",
          alignItems: "center",
        }}
      >
        <Box
          component="img"
          src={AirplaneIcon}
          alt="Airplane"
          sx={{
            width: 40,
            height: 40,
            position: "absolute",
            zIndex: 1,
            left: `${progress}%`,
            transform: `translateX(-${progress / 2}%)`,
          }}
        />
        <LinearProgress variant="determinate" value={progress} sx={{ width: "100%" }} />
      </Box>
      <Card sx={{ p: 2 }}>
        <Typography variant="h4" align="center">
          {question}
        </Typography>
        <Box mt={4}>
          <Grid container spacing={2} justifyContent="center">
            {answers.map((answer, index) => (
              <Grid item xs={6} key={answer}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  disableElevation
                  sx={{
                    height: answerHeight,
                    backgroundColor: buttonColors[index],
                    "&:hover": {
                      backgroundColor: index === 0 ? "#ffcc00" :
                        index === 1 ? "#ffcc00" :
                        index === 2 ? "#ffcc00" :
                        index === 3 ? "#ffcc00" : null,
                    },
                  }}
                  onClick={() => handleAnswer(answer)}
                >
                  <Typography variant="h5">{answer}</Typography>
                </Button>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Card>
    </Box>
  );
}

export default Question;
