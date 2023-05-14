import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import gold from "./gold.png";
import silver from "./silver.png";
import bronze from "./bronze.png";

function Ranking({ players }) {
  const colors = ["#FFD700", "#C0C0C0", "#CD7F32", "#bada55", "#FF69B4"];

  const jsonArray = Object.values(players).map((obj) => obj);
  console.log(jsonArray);

  const results = {};

  jsonArray.forEach(function (i) {
    console.log(i.seat);
    if (i.seat.slice(0, -1) in results === false) {
      results[i.seat.slice(0, -1)] = i.score;
    } else {
      results[i.seat.slice(0, -1)] += i.score;
    }
  });

  console.log(results);

  const sortedPlayers = Object.entries(results);

  sortedPlayers.sort((a, b) => b[1] - a[1]);

  console.log(sortedPlayers);

  //sort a json like this by values {11: 20, 12: 9, 9:15} to {11: 20, 9: 15, 12:9}

  return (
    <Box
      flexDirection="column"
      alignItems="center"
      m={3}
      p={2}
      sx={{ backgroundColor: "#f5f5f5" }}
      borderRadius={2}
    >
      <Box m={2} mt={2}>
        {sortedPlayers.map((player, index) => (
          <Card
            key={player}
            variant="outlined"
            sx={{
              width: "100%",
              my: 1,
              bgcolor: colors[index % colors.length],
            }}
          >
            <CardContent sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                variant="h5"
                component="div"
                sx={{ flex: "1 1 auto", minWidth: 0 }}
              >
                Row: {player[0]}
                <Typography
                  variant="body1"
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                >
                  Score: {player[1]}
                </Typography>
              </Typography>
              <Box sx={{ width: 80 }}>
                {index === 0 && (
                  <img src={gold} alt="gold" style={{ width: "100%" }} />
                )}
                {index === 1 && (
                  <img src={silver} alt="silver" style={{ width: "100%" }} />
                )}
                {index === 2 && (
                  <img src={bronze} alt="bronze" style={{ width: "100%" }} />
                )}
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}

export default Ranking;
