// Settings.tsx
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TimerIcon from "@mui/icons-material/Timer";

import { FC } from "react";
import { TimerItem } from "../dataFlow/models/TimerListModel.ts";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
} from "@mui/material";

interface IProps {
  rounds: TimerItem[][];
  setRounds: (rounds: TimerItem[][]) => void;
}

export interface IWorkoutPreset {
  name: string;
  timers: TimerItem[][];
}

/**
 * Компонент для редактирования массива "раундов" (TimerItem[][]).
 * Позволяет добавлять/удалять раунды и таймеры, изменять name и duration.
 */
export const RoundsSettings: FC<IProps> = ({ rounds, setRounds }) => {
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

  const workoutPresets: IWorkoutPreset[] = [
    {
      name: "1m-2m-2m",
      timers: [
        [{ name: "Ready ?", duration: 5000 }],
        [
          { name: "Play", duration: 60000 },
          { name: "Relax", duration: 5000 },
        ],
        [
          { name: "Play", duration: 120000 },
          { name: "Relax", duration: 5000 },
        ],
        [
          { name: "Play", duration: 120000 },
          { name: "Relax", duration: 5000 },
        ],
      ],
    },
    {
      name: "Warm-up",
      timers: [
        [{ name: "Ready ?", duration: 5000 }],
        [
          { name: "Steps", duration: 300000 },
          { name: "Relax", duration: 5000 },
        ],
        [
          { name: "Chords", duration: 300000 },
          { name: "Relax", duration: 5000 },
        ],
        [
          { name: "Arpeggio-Legato", duration: 300000 },
          { name: "Relax", duration: 5000 },
        ],
      ],
    },
  ];

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
      // duration — число (cекунды), поэтому преобразуем из строки
      // Преобразуем из строки. Если пусто, ставим 0 или оставляем 0.
      // timer.duration = parseInt(value, 10) || 0;
      const seconds = parseInt(value, 10) || 0;
      timer.duration = seconds * 1000;
    }

    timers[timerIndex] = timer;
    newRounds[roundIndex] = timers;
    setRounds(newRounds);
  };

  return (
    <Accordion
      disableGutters={true}
      style={{
        fontFamily: "sans-serif",
        backgroundColor: "transparent",
        color: "white",
      }}
    >
      <AccordionSummary
        expandIcon={
          <ExpandMoreIcon
            style={{
              color: "white",
            }}
          />
        }
        aria-controls="panel1-content"
        id="panel1-header"
        style={{
          height: 50,
        }}
      >
        <Box
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 8,
            alignItems: "center",
          }}
        >
          <TimerIcon />
          <h3>Round's settings</h3>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel
              id="demo-simple-select-helper-label"
              style={{
                color: "white",
              }}
            >
              Presets
            </InputLabel>
            <Select
              variant={"outlined"}
              size={"small"}
              style={{
                color: "white",
              }}
              defaultValue={workoutPresets[0].name}
              onClick={(e) => e.stopPropagation()}
              onChange={(e) => {
                const preset = workoutPresets.find(
                  (p) => p.name === e.target.value,
                );
                if (preset) {
                  setRounds(preset.timers);
                }
              }}
            >
              {workoutPresets.map((preset) => (
                <MenuItem key={preset.name} value={preset.name}>
                  {preset.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Box>
          {rounds.map((round, roundIndex) => (
            <div
              key={roundIndex}
              style={{
                border: "1px solid #ccc",
                borderRadius: 4,
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

              <Box
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                {round.map((timer, timerIndex) => (
                  <Box
                    key={timerIndex}
                    style={{
                      display: "flex",
                      gap: 8,
                      alignItems: "center",
                    }}
                  >
                    <FormControl
                      style={{
                        flex: 3,
                      }}
                      variant="outlined"
                    >
                      <OutlinedInput
                        size={"small"}
                        value={timer.name}
                        onChange={(e) =>
                          handleTimerChange(
                            roundIndex,
                            timerIndex,
                            "name",
                            e.target.value,
                          )
                        }
                        style={{
                          color: "white",
                        }}
                      />
                    </FormControl>
                    <FormControl
                      style={{
                        flex: 2,
                      }}
                      variant="outlined"
                    >
                      <OutlinedInput
                        size={"small"}
                        type="number"
                        value={timer.duration / 1000}
                        style={{
                          color: "white",
                        }}
                        onChange={(e) =>
                          handleTimerChange(
                            roundIndex,
                            timerIndex,
                            "duration",
                            e.target.value,
                          )
                        }
                        id="outlined-adornment-weight"
                        endAdornment={
                          <InputAdornment position="end">
                            <Typography style={{ color: "white" }}>
                              sec
                            </Typography>
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                    <IconButton
                      aria-label="delete"
                      onClick={() => handleRemoveTimer(roundIndex, timerIndex)}
                      style={{ marginLeft: "auto" }}
                    >
                      <HighlightOffIcon color="error" />
                    </IconButton>
                  </Box>
                ))}
              </Box>
              <Button
                size={"small"}
                variant={"contained"}
                onClick={() => handleAddTimer(roundIndex)}
                style={{
                  color: "white",
                  marginTop: 8,
                  marginBottom: 8,
                }}
              >
                + Timer
              </Button>
            </div>
          ))}

          <Button
            onClick={handleAddRound}
            style={{
              color: "white",
            }}
          >
            + Round
          </Button>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};
