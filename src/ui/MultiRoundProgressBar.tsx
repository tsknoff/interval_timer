// MultiRoundProgressBar.tsx
import React from "react";
import { TimerItem } from "../dataFlow/TimerListModel";

function sumRoundTimers(round: TimerItem[]): number {
  return round.reduce((acc, item) => acc + item.duration, 0);
}

function sumAllRounds(rounds: TimerItem[][]): number {
  return rounds.reduce((acc, round) => acc + sumRoundTimers(round), 0);
}

// Можно задать несколько цветов и идти по кругу
const timerColors = [
  "#ff9999",
  "#99ff99",
  "#9999ff",
  "#ffff99",
  "#ff99ff",
  "#99ffff",
];

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
    <div
      style={{
        width: "600px",
        height: "30px",
        background: "#eee",
        display: "flex",
        border: "1px solid #ccc",
      }}
    >
      {rounds.map((round, rIndex) => {
        const roundDuration = sumRoundTimers(round);
        const roundWidthPct = (roundDuration / total) * 100;

        return (
          <div
            key={rIndex}
            style={{
              width: `${roundWidthPct}%`,
              display: "flex",
              borderRight:
                rIndex < rounds.length - 1 ? "2px solid #000" : "none",
              position: "relative",
            }}
          >
            {round.map((timer, tIndex) => {
              const timerWidthPct = (timer.duration / roundDuration) * 100;

              let fillPct = 0;
              if (rIndex < currentRoundIndex) {
                // Раунд полностью завершён
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
                <div
                  key={tIndex}
                  style={{
                    width: `${timerWidthPct}%`,
                    height: "100%",
                    background: baseColor,
                    borderLeft: tIndex > 0 ? "1px solid #aaa" : "none",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: `${fillPct}%`,
                      backgroundColor: "rgba(0,0,0,0.2)", // затемнение
                      transition: "width 0.1s linear",
                    }}
                  />
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
