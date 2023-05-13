import React, { useState, useEffect } from "react";
import { Typography, Button, Box, Grid, Card } from "@mui/material";
import LinearProgress, { linearProgressClasses } from "@mui/material/LinearProgress";
import AirplaneImg from "./Airplane.png";

function Question({ question, answers, onAnswer }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  function handleAnswer(answer) {
    setSelectedAnswer(answer);
    onAnswer(answer);
  }

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return oldProgress + 10;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  const buttonColors = ["#f44336", "blue", "green", "purple"];

  const answerHeight =
    Math.max(
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
      <Card sx={{ p: 2 }}>
        <Typography variant="h5" align="center">
          {question}
        </Typography>
        <Box mt={4}>
          <Grid container spacing={2} justifyContent="center">
            {answers.map((answer, index) => (
              <Grid item xs={6} sm={6} md={6} lg={6} key={answer}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  disableElevation
                  sx={{
                    height: answerHeight,
                    backgroundColor: buttonColors[index],
                    "&:hover": {
                      backgroundColor:
                        index === 0
                          ? "#ffcc00"
                          : index === 1
                          ? "#ffcc00"
                          : index === 2
                          ? "#ffcc00"
                          : index === 3
                          ? "#ffcc00"
                          : null,
                    },
                  }}
                  onClick={() => handleAnswer(answer)}
                >
                  <Typography variant="h5" sx={{ overflowWrap: "anywhere" }}>
                    {answer}
                  </Typography>
                </Button>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Card>
      <Box sx={{ width: "100%", mt: 2, position: "relative" }}>
        <LinearProgress
          classes={{ bar: linearProgressClasses.dashed }}
          variant="determinate"
          value={progress}
        />
        <Box
          sx={{
            position: "absolute",
            right: `${100 - progress}%`,
            top: "-30px",
          }}
        >
          <img src={AirplaneImg} alt="Airplane" height="80px" />
        </Box>
      </Box>
    </Box>
  );
}

export default Question;
