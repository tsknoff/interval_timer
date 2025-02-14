// App.tsx

import React, { useRef, useState } from "react";
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
} from "@mui/material";
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
import { JournalNote } from "./ui/JournalNote.tsx";

export interface JournalRecord {
  date: string;
  technique: string;
  pattern: string;
  description?: string;
  bpm: number;
  rating: number;
  comment?: string;
}

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

  // ----- Поле предмета тренировки (subject) -----
  const [practiceSubject, setPracticeSubject] = useState("");

  // ----- Оценка после окончания -----
  const [showReviewDialog, setShowReviewDialog] = useState(false);
  const [trainingRating, setTrainingRating] = useState(50); // 0..100
  const [trainingComment, setTrainingComment] = useState("");

  // ----- "Журнал" тренировок -----
  const [journal, setJournal] = useState<JournalRecord[]>([
    {
      date: "2021-10-01",
      subject: "Guitar",
      bpm: 120,
      rating: 80,
      comment: "Good practice today!",
    },
    {
      date: "2021-10-02",
      subject: "Piano",
      bpm: 100,
      rating: 60,
      comment: "Need to practice more.",
    },
    {
      date: "2021-10-03",
      subject: "Drums",
      bpm: 140,
      rating: 90,
      comment: "Great job!",
    },
  ]);

  // RoundListModel будет пересоздаваться при нажатии Start
  const roundListRef = useRef<RoundListModel | null>(null);

  // ----- МЕТРОНОМ -----
  useMetronome(bpm, isPlayingMetronome);

  // ----- Хендлеры -----

  // Создаём/запускаем новую модель, чтобы учесть изменения "rounds"
  const handleStart = () => {
    // Проверяем, заполнил ли пользователь поле subject
    if (!practiceSubject.trim()) {
      alert("Пожалуйста, укажите предмет/название тренировки (Subject)!");
      return;
    }

    // Если вдруг у нас осталась старая модель, сбросим её
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

  // Для отображения в секундах (округляем)
  const secondsLeft = Math.floor(timerRemaining / 1000);

  // ----- Когда пользователь завершил оценку -----
  const handleSubmitReview = () => {
    // Создадим запись в журнале
    const record: JournalRecord = {
      date: new Date().toLocaleString(), // или .toISOString()
      subject: practiceSubject,
      bpm,
      rating: trainingRating,
      comment: trainingComment || undefined,
    };

    setJournal((prev) => [...prev, record]);
    // Скрыть диалог
    setShowReviewDialog(false);

    // Сброс значений оценки
    setTrainingRating(50);
    setTrainingComment("");
  };

  // ----- Рендер -----
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

            {/* Ввод "Practice subject" */}
            <Box
              sx={{
                mb: 2,
                display: "flex",
                flexDirection: "row",
                gap: 2,
                alignItems: "center",
              }}
            >
              <Typography sx={{ color: "white", fontFamily: "sans-serif" }}>
                Subject:
              </Typography>
              <TextField
                variant="outlined"
                size="small"
                value={practiceSubject}
                onChange={(e) => setPracticeSubject(e.target.value)}
                sx={{
                  backgroundColor: "white",
                  borderRadius: 1,
                  width: 200,
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

        {/* Компонент редактирования rounds */}
        <Settings rounds={rounds} setRounds={setRounds} />

        {/* Отобразим журнал (опционально) */}
        <Box sx={{ color: "white" }}>
          <h2 style={{ color: "white", fontFamily: "sans-serif" }}>
            Training journal
          </h2>
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
