import { FC } from "react";
import { Box, Typography } from "@mui/material";

interface ITimerCircle {
  roundIndex: number;
  roundsTotal: number;
  timerName: string;
  secondsLeft: number;
}

export const TimerCircle: FC<ITimerCircle> = ({
  roundIndex,
  roundsTotal,
  timerName,
  secondsLeft,
}) => {
  return (
    <Box
      sx={{
        borderRadius: "50%",
        width: 300,
        height: 300,
        border: "10px solid #ccc",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Typography sx={{ color: "white" }}>
        <strong>Round {roundIndex + 1}</strong> / {roundsTotal}
      </Typography>
      <Typography sx={{ color: "white", fontSize: 30 }}>
        <strong>{timerName}</strong>
      </Typography>
      <Typography sx={{ color: "white", fontSize: 40 }}>
        <strong>{secondsLeft} sec</strong>
      </Typography>
    </Box>
  );
};
