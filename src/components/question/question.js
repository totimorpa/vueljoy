import React, { useState, useEffect } from "react";
import { Typography, Button, Box, Grid, Card } from "@mui/material";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import AirplaneImg from "./Airplane.png";

function Question({ question, answers, onAnswer }) {
  function handleAnswer(answer) {
    onAnswer(answer);
  }

  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          clearInterval(interval);
          handleAnswer(null);
          return 50;
        }
        return oldProgress + 1;
      });
    }, 50);

    answers.sort(() => Math.random() - 0.5);

    return () => clearInterval(interval);
  }, []);

  const buttonColors = ["#f44336", "blue", "green", "purple"];

  const answerHeight =
    Math.max(
      ...answers.map((answer) =>
        typeof answer === "string" ? answer.length : answer.toString().length
      )
    ) * 7;

  // Shuffle the answers randomly

  return (
    <Box
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
            top: "-15px",
          }}
        >
          <img src={AirplaneImg} alt="Airplane" height="40px" />
        </Box>
      </Box>
    </Box>
  );
}

export default Question;
