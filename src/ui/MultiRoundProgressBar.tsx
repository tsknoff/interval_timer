// MultiRoundProgressBar.tsx

import React from "react";
import { Box } from "@mui/material";
import { TimerItem } from "../dataFlow/TimerListModel";

function sumRoundTimers(round: TimerItem[]): number {
  return round.reduce((acc, item) => acc + item.duration, 0);
}

function sumAllRounds(rounds: TimerItem[][]): number {
  return rounds.reduce((acc, round) => acc + sumRoundTimers(round), 0);
}

// Набор цветов для таймеров (выбираем по индексу)
const timerColors = ["#074799", "#009990", "#E1FFBB"];

interface MultiRoundProgressBarProps {
  rounds: TimerItem[][];
  currentRoundIndex: number;
  currentTimerIndex: number;
  timerRemaining: number;
}

export const MultiRoundProgressBar: React.FC<MultiRoundProgressBarProps> = ({
  rounds,
  currentRoundIndex,
  currentTimerIndex,
  timerRemaining,
}) => {
  const total = sumAllRounds(rounds);

  return (
    <Box
      sx={{
        maxWidth: "95vw",
        width: "100%", // ТУТ делаем "полноширинный" адаптивный блок
        height: 60,
        backgroundColor: "#eee",
        display: "flex",
        border: "4px solid white",
        borderRadius: 20,
        overflow: "hidden",
      }}
    >
      {rounds.map((round, rIndex) => {
        const roundDuration = sumRoundTimers(round);
        const roundWidthPct = (roundDuration / total) * 100;

        return (
          <Box
            key={rIndex}
            sx={{
              width: `${roundWidthPct}%`,
              display: "flex",
              borderRight:
                rIndex < rounds.length - 1 ? "5px solid #F95454" : "none",
              position: "relative",
            }}
          >
            {round.map((timer, tIndex) => {
              const timerWidthPct = (timer.duration / roundDuration) * 100;

              let fillPct = 0;
              if (rIndex < currentRoundIndex) {
                // Раунд завершён
                fillPct = 100;
              } else if (rIndex === currentRoundIndex) {
                // Текущий раунд
                if (tIndex < currentTimerIndex) {
                  fillPct = 100;
                } else if (tIndex === currentTimerIndex) {
                  const elapsed = timer.duration - timerRemaining;
                  fillPct = (elapsed / timer.duration) * 100;
                }
              }

              const baseColor = timerColors[tIndex % timerColors.length];

              return (
                <Box
                  key={tIndex}
                  sx={{
                    width: `${timerWidthPct}%`,
                    height: "100%",
                    backgroundColor: baseColor,
                    position: "relative",
                  }}
                >
                  {/* "Залитая" часть — overlay поверх базового цвета */}
                  <Box
                    sx={{
                      position: "absolute",
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: `${fillPct}%`,
                      backgroundColor: "rgba(0, 0, 0, 0.5)",
                      transition: "width 0.1s linear",
                    }}
                  />
                </Box>
              );
            })}
          </Box>
        );
      })}
    </Box>
  );
};
