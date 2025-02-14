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

import { TimerItem } from "./dataFlow/TimerListModel";
import { RoundListModel } from "./dataFlow/RoundListModel";
import { MultiRoundProgressBar } from "./ui/MultiRoundProgressBar";
import { Settings } from "./ui/Settings";
import { JournalNote } from "./ui/JournalNote";
import { useMetronome } from "./hooks/useMetronome";
import { playAllRoundsEndSound } from "./utils/audioUtils";

export interface JournalRecord {
  date: string;
  technique: string;
  pattern: string;
  description?: string;
  bpm: number;
  rating: number;
  comment?: string;
}

function getFeedbackMessage(rating: number): string {
  if (rating <= 10) {
    return "I barely remembered the exercise; it was mostly just noise from the instrument.";
  } else if (rating <= 30) {
    return "Sometimes things clicked, but overall I fell out of tempo and the sound was quite rough.";
  } else if (rating <= 50) {
    return "Occasionally I stayed with the metronome, occasionally I didn't. I need more work on precision.";
  } else if (rating <= 70) {
    return "Overall not bad: I roughly kept the rhythm, but there were some flaws.";
  } else if (rating <= 90) {
    return "The tempo was quite good, the sound was almost always clean, with only a few slips.";
  } else {
    return "I kept perfect time with the metronome, each note lasted exactly as intended, and there were no extra noises.";
  }
}

export const App: React.FC = () => {
  // ----- RoundListModel states -----
  const [roundIndex, setRoundIndex] = useState(0);
  const [roundsTotal, setRoundsTotal] = useState(0);
  const [timerIndex, setTimerIndex] = useState(0);
  const [timersTotal, setTimersTotal] = useState(0);
  const [timerName, setTimerName] = useState("");
  const [timerRemaining, setTimerRemaining] = useState(0);

  // ----- Metronome -----
  const [bpm, setBpm] = useState(100);
  const [isPlayingMetronome, setIsPlayingMetronome] = useState(false);

  // ----- Rounds -----
  const [rounds, setRounds] = useState<TimerItem[][]>([
    [{ name: "Ready?", duration: 4000 }],
    [
      { name: "Practice", duration: 60000 },
      { name: "Relax", duration: 15000 },
    ],
  ]);

  // ----- Technique fields -----
  const [technique, setTechnique] = useState("Legato");
  const [pattern, setPattern] = useState("");
  const [description, setDescription] = useState("");

  // ----- Feedback after training -----
  const [showReviewDialog, setShowReviewDialog] = useState(false);
  const [trainingRating, setTrainingRating] = useState(50);
  const [trainingComment, setTrainingComment] = useState("");

  // ----- Journal -----
  const [journal, setJournal] = useState<JournalRecord[]>([]);

  // RoundListModel ref
  const roundListRef = useRef<RoundListModel | null>(null);

  // useMetronome
  useMetronome(bpm, isPlayingMetronome);

  // 1) Load from localStorage on mount
  useEffect(() => {
    const storedRounds = localStorage.getItem("rounds");
    if (storedRounds) {
      try {
        const parsed = JSON.parse(storedRounds);
        if (Array.isArray(parsed)) setRounds(parsed);
      } catch (e) {
        console.warn("Error parsing rounds from localStorage", e);
      }
    }

    const storedJournal = localStorage.getItem("journal");
    if (storedJournal) {
      try {
        const parsed = JSON.parse(storedJournal);
        if (Array.isArray(parsed)) setJournal(parsed);
      } catch (e) {
        console.warn("Error parsing journal from localStorage", e);
      }
    }
  }, []);

  // 2) Save to localStorage when rounds or journal change
  useEffect(() => {
    localStorage.setItem("rounds", JSON.stringify(rounds));
  }, [rounds]);

  useEffect(() => {
    localStorage.setItem("journal", JSON.stringify(journal));
  }, [journal]);

  // Start training
  const handleStart = () => {
    if (!pattern.trim()) {
      alert("Пожалуйста, заполните поле Pattern!");
      return;
    }

    if (roundListRef.current) {
      roundListRef.current.reset();
    }

    const handleAllRoundsFinished = () => {
      alert("Все раунды завершены!");
      playAllRoundsEndSound();
      setIsPlayingMetronome(false);
      setShowReviewDialog(true);
    };

    const newModel = new RoundListModel(rounds, handleAllRoundsFinished);
    newModel.subscribe((rIndex, rTotal, tName, tRemaining, tIndex, tTotal) => {
      setRoundIndex(rIndex);
      setRoundsTotal(rTotal);
      setTimerName(tName);
      setTimerRemaining(tRemaining);
      setTimerIndex(tIndex);
      setTimersTotal(tTotal);
    });

    roundListRef.current = newModel;
    newModel.start();
    setIsPlayingMetronome(true);
  };

  // Reset training
  const handleReset = () => {
    roundListRef.current?.reset();
    setIsPlayingMetronome(false);
    setRoundIndex(0);
    setTimerIndex(0);
    setTimerRemaining(0);
    setTimerName("");
  };

  // Submit review
  const handleSubmitReview = () => {
    const record: JournalRecord = {
      date: new Date().toLocaleString(),
      technique,
      pattern,
      description: description || undefined,
      bpm,
      rating: trainingRating,
      comment: trainingComment || undefined,
    };
    setJournal((prev) => [...prev, record]);

    setShowReviewDialog(false);
    setTrainingRating(50);
    setTrainingComment("");
  };

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

            {/* Technique / Pattern / Description */}
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
                </Select>
              </FormControl>

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

          <MultiRoundProgressBar
            rounds={rounds}
            currentRoundIndex={roundIndex}
            currentTimerIndex={timerIndex}
            timerRemaining={timerRemaining}
          />
        </Box>

        {/* Settings для редактирования rounds */}
        <Settings rounds={rounds} setRounds={setRounds} />

        {/* Journal */}
        <Box sx={{ color: "white", mt: 3 }}>
          <Typography variant="h6" sx={{ color: "white" }}>
            Training Journal
          </Typography>
          {journal.length === 0 && <p>No records yet.</p>}
          {journal.map((rec, i) => (
            <JournalNote key={i} journalRecord={rec} />
          ))}
        </Box>
      </Box>

      {/* Диалог после завершения (Review) */}
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

          {/* Отображаем динамическое сообщение */}
          <Typography sx={{ mt: 2, mb: 2 }}>
            {getFeedbackMessage(trainingRating)}
          </Typography>

          <TextField
            label="Comments (optional)"
            multiline
            rows={3}
            fullWidth
            value={trainingComment}
            onChange={(e) => setTrainingComment(e.target.value)}
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
