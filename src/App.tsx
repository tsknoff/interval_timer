// App.tsx

import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Slider,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

// Модели / типы
import { TimerItem } from "./dataFlow/TimerListModel";
import { RoundListModel } from "./dataFlow/RoundListModel";

// UI-компоненты
import { MultiRoundProgressBar } from "./ui/MultiRoundProgressBar";
import { Settings } from "./ui/Settings";
import { JournalNote } from "./ui/JournalNote";

// Хук метронома
import { useMetronome } from "./hooks/useMetronome";

// Звуки
import { playAllRoundsEndSound } from "./utils/audioUtils";

// Описание записи в журнале
export interface JournalRecord {
  date: string;

  // Реквизиты, которые пользователь вводит перед тренировкой
  technique: string; // из списка (Legato, Alternate picking, Downstroke...)
  pattern: string; // короткая строка (обязательная)
  description?: string; // описание упражнения (опционально)

  bpm: number; // темп, с которым тренировались
  rating: number; // субъективная оценка (0..100)
  comment?: string; // комментарий по окончании
}

export const App: React.FC = () => {
  // ----- Состояния, связанные с текущим прогрессом (RoundListModel) -----
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

  // ----- Поля тренировки: technique, pattern, description -----
  const [technique, setTechnique] = useState("Legato"); // по умолчанию "Legato"
  const [pattern, setPattern] = useState("");
  const [description, setDescription] = useState("");

  // ----- Завершение тренировки (оценка, комментарий) -----
  const [showReviewDialog, setShowReviewDialog] = useState(false);
  const [trainingRating, setTrainingRating] = useState(50); // 0..100
  const [trainingComment, setTrainingComment] = useState("");

  // ----- "Журнал" тренировок -----
  const [journal, setJournal] = useState<JournalRecord[]>([]);

  // RoundListModel будет пересоздаваться при нажатии Start
  const roundListRef = useRef<RoundListModel | null>(null);

  // ----- МЕТРОНОМ: запускаем/останавливаем -----
  useMetronome(bpm, isPlayingMetronome);

  // ---------------------- Local Storage -----------------------
  // 1) При МОНТИРОВАНИИ читаем из LocalStorage (если есть)
  useEffect(() => {
    const storedRounds = localStorage.getItem("rounds");
    if (storedRounds) {
      try {
        const parsed = JSON.parse(storedRounds);
        // Убедимся, что это массив массивов, или обрабатываем как нужно
        if (Array.isArray(parsed)) {
          setRounds(parsed);
        }
      } catch (e) {
        console.warn("Error parsing rounds from localStorage", e);
      }
    }

    const storedJournal = localStorage.getItem("journal");
    if (storedJournal) {
      try {
        const parsed = JSON.parse(storedJournal);
        if (Array.isArray(parsed)) {
          setJournal(parsed);
        }
      } catch (e) {
        console.warn("Error parsing journal from localStorage", e);
      }
    }
  }, []);

  // 2) При КАЖДОМ изменении rounds — сохраняем в localStorage
  useEffect(() => {
    localStorage.setItem("rounds", JSON.stringify(rounds));
  }, [rounds]);

  // 3) При КАЖДОМ изменении journal — сохраняем в localStorage
  useEffect(() => {
    localStorage.setItem("journal", JSON.stringify(journal));
  }, [journal]);

  // ---------------------- ЛОГИКА -------------------------

  // Создаём/запускаем новую модель, чтобы учесть изменения "rounds"
  const handleStart = () => {
    // Проверяем обязательные поля: pattern не должен быть пустым
    if (!pattern.trim()) {
      alert("Пожалуйста, заполните поле Pattern (название упражнения)!");
      return;
    }

    // Если была старая модель, сбросим
    if (roundListRef.current) {
      roundListRef.current.reset();
    }

    // Коллбэк при полном завершении ВСЕХ раундов
    const handleAllRoundsFinished = () => {
      alert("Все раунды завершены!");
      playAllRoundsEndSound();
      setIsPlayingMetronome(false); // выключаем метроном

      // Показываем диалог оценки
      setShowReviewDialog(true);
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

  // Когда пользователь завершил оценку (OK)
  const handleSubmitReview = () => {
    const record: JournalRecord = {
      date: new Date().toLocaleString(), // В реальном случае .toISOString() или иное
      technique,
      pattern,
      description: description || undefined,
      bpm,
      rating: trainingRating,
      comment: trainingComment || undefined,
    };

    // Добавляем в журнал (и это автоматически сохранится в localStorage через useEffect)
    setJournal((prev) => [...prev, record]);

    // Скрываем диалог и сбрасываем оценку
    setShowReviewDialog(false);
    setTrainingRating(50);
    setTrainingComment("");
  };

  // Для отображения оставшегося времени в секундах
  const secondsLeft = Math.floor(timerRemaining / 1000);

  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        display: "flex",
        width: "100%",
        height: "100vh",
        justifyContent: "center",
        alignItems: "flex-start",
        background:
          "linear-gradient(to right top, #001a6e, #002579, #013184, #033c8f, #074799)",
        overflow: "auto",
      }}
    >
      <Box sx={{ width: "60vw", padding: "1rem", marginBottom: "2rem" }}>
        {/* Основной блок с таймером / настройками */}
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
            {/* "Шар" со временем и именем таймера */}
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

            {/* Блок: Technique (Select), Pattern (TextField), Description (TextField опциональный) */}
            <Box
              sx={{
                mb: 2,
                display: "flex",
                flexDirection: "column",
                gap: 2,
                alignItems: "stretch",
                width: "100%",
                maxWidth: 400,
              }}
            >
              {/* Technique - select */}
              <FormControl fullWidth>
                <InputLabel sx={{ backgroundColor: "#fff" }}>
                  Technique
                </InputLabel>
                <Select
                  value={technique}
                  label="Technique"
                  onChange={(e) => setTechnique(e.target.value as string)}
                  sx={{
                    backgroundColor: "white",
                  }}
                >
                  <MenuItem value="Legato">Legato</MenuItem>
                  <MenuItem value="Alternate picking">
                    Alternate picking
                  </MenuItem>
                  <MenuItem value="Downstroke">Downstroke</MenuItem>
                  <MenuItem value="Sweep picking">Sweep picking</MenuItem>
                  {/* Можно добавить свои варианты */}
                </Select>
              </FormControl>

              {/* Pattern (обязательное поле) */}
              <TextField
                label="Pattern"
                variant="outlined"
                size="small"
                value={pattern}
                onChange={(e) => setPattern(e.target.value)}
                sx={{
                  backgroundColor: "white",
                }}
              />

              {/* Description (опциональное) */}
              <TextField
                label="Description (optional)"
                variant="outlined"
                size="small"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                sx={{
                  backgroundColor: "white",
                }}
              />
            </Box>

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
                <strong>BPM: {bpm}</strong>
              </Typography>
              <Slider
                value={bpm}
                onChange={(e, newValue) => setBpm(newValue as number)}
                min={70}
                max={150}
                step={1}
                sx={{ width: 200 }}
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

        {/* Компонент редактирования rounds (внизу) */}
        <Settings rounds={rounds} setRounds={setRounds} />

        {/* Отобразим журнал */}
        <Box sx={{ color: "white", mt: 3 }}>
          <Typography
            variant="h6"
            sx={{ color: "white", fontFamily: "sans-serif" }}
          >
            Training Journal
          </Typography>
          {journal.length === 0 && <p>No records yet.</p>}
          {journal.map((rec, i) => (
            <JournalNote key={i} journalRecord={rec} />
          ))}
        </Box>
      </Box>

      {/* Диалог для оценки после окончания тренировки */}
      <Dialog
        open={showReviewDialog}
        onClose={() => setShowReviewDialog(false)}
      >
        <DialogTitle>Training Review</DialogTitle>
        <DialogContent>
          <Typography>How was your performance?</Typography>
          <Slider
            value={trainingRating}
            onChange={(e, newVal) => setTrainingRating(newVal as number)}
            min={0}
            max={100}
            step={1}
            sx={{ width: 200, mt: 2 }}
          />

          <TextField
            label="Comments (optional)"
            multiline
            rows={3}
            fullWidth
            value={trainingComment}
            onChange={(e) => setTrainingComment(e.target.value)}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowReviewDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmitReview}>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
