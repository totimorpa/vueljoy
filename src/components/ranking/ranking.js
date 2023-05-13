import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

function Ranking({ players }) {
  const colors = ["#FFD700", "#C0C0C0", "#CD7F32", "#bada55", "#FF69B4"];
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

  return (
    <Box
      flexDirection="column"
      alignItems="center"
      m={3}
      p={2}
      sx={{ backgroundColor: "#f5f5f5" }}
    >
      <Box m={2} mt={2}>
        {sortedPlayers.map((player, index) => (
          <Card
            key={player.id}
            variant="outlined"
            sx={{
              width: "100%",
              my: 1,
              bgcolor: colors[index % colors.length],
            }}
          >
            <CardContent>
              <Typography variant="h6" component="div">
                {player.name}
              </Typography>
              <Typography sx={{ fontSize: 14 }} color="text.secondary">
                Score: {player.score}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}

export default Ranking;
