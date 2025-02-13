// App.tsx

import React, { useRef, useState } from "react";
import { Box, Button, Input, Typography } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

// Модели / типы
import { TimerItem } from "./dataFlow/TimerListModel";
import { RoundListModel } from "./dataFlow/RoundListModel";

// UI-компоненты
import { MultiRoundProgressBar } from "./ui/MultiRoundProgressBar";
import { Settings } from "./ui/Settings";

// Хук метронома
import { useMetronome } from "./hooks/useMetronome";

// Звуки
import { playAllRoundsEndSound } from "./utils/audioUtils";

export const App: React.FC = () => {
  // ----- Состояния, связанные с текущим прогрессом -----
  const [roundIndex, setRoundIndex] = useState(0);
  const [roundsTotal, setRoundsTotal] = useState(0);
  const [timerIndex, setTimerIndex] = useState(0);
  const [timersTotal, setTimersTotal] = useState(0);
  const [timerName, setTimerName] = useState("");
  const [timerRemaining, setTimerRemaining] = useState(0);

  // ----- Метроном -----
  const [bpm, setBpm] = useState(100);
  const [isPlayingMetronome, setIsPlayingMetronome] = useState(false);

  // ----- РАУНДЫ (редактируемые) -----
  const [rounds, setRounds] = useState<TimerItem[][]>([
    [{ name: "Ready?", duration: 4000 }],
    [
      { name: "Practice", duration: 60000 },
      { name: "Relax", duration: 15000 },
    ],
    [
      { name: "Practice", duration: 120000 },
      { name: "Relax", duration: 15000 },
    ],
    [
      { name: "Practice", duration: 120000 },
      { name: "Relax", duration: 15000 },
    ],
  ]);

  // RoundListModel будет пересоздаваться при нажатии Start
  const roundListRef = useRef<RoundListModel | null>(null);

  // ----- МЕТРОНОМ: подписываем, если isPlayingMetronome = true -----
  useMetronome(bpm, isPlayingMetronome);

  // ----- Хендлеры -----

  // Создаём/запускаем новую модель, чтобы учесть изменения "rounds"
  const handleStart = () => {
    // Если вдруг у нас осталась старая модель, сбросим её
    if (roundListRef.current) {
      roundListRef.current.reset();
    }

    // Коллбэк при полном завершении ВСЕХ раундов
    const handleAllRoundsFinished = () => {
      alert("Все раунды завершены!");
      playAllRoundsEndSound();
      setIsPlayingMetronome(false); // выключаем метроном
    };

    // Создаём новую модель
    const newModel = new RoundListModel(rounds, handleAllRoundsFinished);

    // Подписываемся на обновления, чтобы получать прогресс
    newModel.subscribe((rIndex, rTotal, tName, tRemaining, tIndex, tTotal) => {
      setRoundIndex(rIndex);
      setRoundsTotal(rTotal);
      setTimerName(tName);
      setTimerRemaining(tRemaining);
      setTimerIndex(tIndex);
      setTimersTotal(tTotal);
    });

    // Запоминаем новую модель в ref
    roundListRef.current = newModel;

    // Запуск + метроном
    newModel.start();
    setIsPlayingMetronome(true);
  };

  // Сброс модели и состояний
  const handleReset = () => {
    roundListRef.current?.reset();
    setIsPlayingMetronome(false);

    setRoundIndex(0);
    setTimerIndex(0);
    setTimerRemaining(0);
    setTimerName("");
  };

  // Для отображения в секундах (округляем)
  const secondsLeft = Math.floor(timerRemaining / 1000);

  // ----- Рендер -----
  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
        overflow: "auto",
        display: "flex",
        background:
          "linear-gradient(to right top, #001a6e, #002579, #013184, #033c8f, #074799)",
      }}
    >
      <Box sx={{ width: "60vw", padding: "1rem" }}>
        <Box sx={{ marginBottom: "1rem" }}>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              gap: 2,
            }}
          >
            {/* Круглый блок с текущим таймером */}
            <Box
              sx={{
                borderRadius: "50%",
                width: 200,
                height: 200,
                border: "1px solid #ccc",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Typography sx={{ color: "white", fontSize: 20 }}>
                <strong>{timerName}</strong>
              </Typography>
              <Typography sx={{ color: "white", fontSize: 20 }}>
                <strong>{secondsLeft} sec</strong>
              </Typography>
            </Box>

            <Typography sx={{ color: "white" }}>
              <strong>Round {roundIndex + 1}</strong> / {roundsTotal}
            </Typography>

            {/* BPM */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography sx={{ color: "white" }}>
                <strong>BPM</strong>
              </Typography>
              <Input
                type="number"
                value={bpm}
                onChange={(e) => setBpm(Number(e.target.value))}
                sx={{ width: 60, color: "white" }}
              />
            </Box>

            {/* Кнопки Start/Reset */}
            <Box
              sx={{
                marginBottom: 2,
                display: "flex",
                flexDirection: "row",
                gap: 2,
              }}
            >
              <Button
                startIcon={<PlayArrowIcon />}
                variant="contained"
                sx={{ backgroundColor: "#001A6E" }}
                onClick={handleStart}
              >
                Start
              </Button>
              <Button
                startIcon={<RestartAltIcon />}
                variant="outlined"
                sx={{ backgroundColor: "white" }}
                onClick={handleReset}
              >
                Reset
              </Button>
            </Box>
          </Box>

          {/* Прогресс-бар (сегментированный) */}
          <MultiRoundProgressBar
            rounds={rounds}
            currentRoundIndex={roundIndex}
            currentTimerIndex={timerIndex}
            timerRemaining={timerRemaining}
          />
        </Box>
      </Box>
      {/* Компонент редактирования rounds */}
      <Settings rounds={rounds} setRounds={setRounds} />
    </Box>
  );
};
