// Settings.tsx
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

import React from "react";
import { TimerItem } from "../dataFlow/TimerListModel.ts";
import { Box, Button, Icon, IconButton } from "@mui/material";

interface IProps {
  rounds: TimerItem[][];
  setRounds: (rounds: TimerItem[][]) => void;
}

/**
 * Компонент для редактирования массива "раундов" (TimerItem[][]).
 * Позволяет добавлять/удалять раунды и таймеры, изменять name и duration.
 */
export const Settings: React.FC<IProps> = ({ rounds, setRounds }) => {
  // Добавить новый раунд (пустой или с одним таймером — на ваш выбор)
  const handleAddRound = () => {
    const newRounds = [...rounds];
    // Добавим раунд с одним пустым таймером или вообще пустым массивом
    newRounds.push([]);
    setRounds(newRounds);
  };

  // Удалить весь раунд по индексу
  const handleRemoveRound = (roundIndex: number) => {
    const newRounds = [...rounds];
    newRounds.splice(roundIndex, 1);
    setRounds(newRounds);
  };

  // Добавить новый таймер в конкретный раунд
  const handleAddTimer = (roundIndex: number) => {
    const newRounds = [...rounds];
    const newTimer: TimerItem = { name: "Новый таймер", duration: 1000 };
    newRounds[roundIndex] = [...newRounds[roundIndex], newTimer];
    setRounds(newRounds);
  };

  // Удалить таймер в определённом раунде
  const handleRemoveTimer = (roundIndex: number, timerIndex: number) => {
    const newRounds = [...rounds];
    newRounds[roundIndex] = newRounds[roundIndex].filter(
      (_, i) => i !== timerIndex,
    );
    setRounds(newRounds);
  };

  // Изменить поле `name` или `duration` у конкретного таймера
  const handleTimerChange = (
    roundIndex: number,
    timerIndex: number,
    field: "name" | "duration",
    value: string,
  ) => {
    const newRounds = [...rounds];
    const timers = [...newRounds[roundIndex]];
    const timer = { ...timers[timerIndex] };

    if (field === "name") {
      timer.name = value;
    } else if (field === "duration") {
      // duration — число (мс).
      // Преобразуем из строки. Если пусто, ставим 0 или оставляем 0.
      timer.duration = parseInt(value, 10) || 0;
    }

    timers[timerIndex] = timer;
    newRounds[roundIndex] = timers;
    setRounds(newRounds);
  };

  return (
    <Box style={{ color: "white", fontFamily: "sans-serif" }}>
      <h2>Round's settings</h2>

      {rounds.map((round, roundIndex) => (
        <div
          key={roundIndex}
          style={{
            border: "1px solid #ccc",
            borderRadius: 2,
            paddingLeft: 16,
            paddingRight: 16,
            marginBottom: 8,
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <h3 style={{ marginRight: "auto" }}>Round #{roundIndex + 1}</h3>
            <IconButton
              onClick={() => handleRemoveRound(roundIndex)}
              style={{ marginLeft: "8px" }}
            >
              <RemoveCircleIcon color="error" />
            </IconButton>
          </div>

          {round.length === 0 && (
            <p style={{ fontStyle: "italic" }}>No timers yet</p>
          )}

          {round.map((timer, timerIndex) => (
            <div
              key={timerIndex}
              style={{
                display: "flex",
                gap: 8,
                alignItems: "center",
              }}
            >
              <label>
                <input
                  type="text"
                  value={timer.name}
                  onChange={(e) =>
                    handleTimerChange(
                      roundIndex,
                      timerIndex,
                      "name",
                      e.target.value,
                    )
                  }
                />
              </label>
              <label>
                Duration (ms):{" "}
                <input
                  type="number"
                  value={timer.duration}
                  onChange={(e) =>
                    handleTimerChange(
                      roundIndex,
                      timerIndex,
                      "duration",
                      e.target.value,
                    )
                  }
                  style={{ width: 80 }}
                />
              </label>
              <IconButton
                aria-label="delete"
                onClick={() => handleRemoveTimer(roundIndex, timerIndex)}
                style={{ marginLeft: "auto" }}
              >
                <HighlightOffIcon color="error" />
              </IconButton>
            </div>
          ))}

          <Button onClick={() => handleAddTimer(roundIndex)}>+ Timer</Button>
        </div>
      ))}

      <Button onClick={handleAddRound}>+ Round</Button>
    </Box>
  );
};
