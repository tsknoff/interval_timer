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
  AccordionDetails,
  Accordion,
  AccordionSummary,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import EventNoteIcon from "@mui/icons-material/EventNote";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { TimerItem } from "./dataFlow/TimerListModel";
import { RoundListModel } from "./dataFlow/RoundListModel";
import { MultiRoundProgressBar } from "./ui/MultiRoundProgressBar";
import { Settings } from "./ui/Settings";
import { JournalNote } from "./ui/JournalNote";
import { useMetronome } from "./hooks/useMetronome";
import { playAllRoundsEndSound } from "./utils/audioUtils";
import { ActivityGrid } from "./ui/ActivityGrid.tsx";

export interface JournalRecord {
  date: string;
  technique: string;
  pattern: string;
  description?: string;
  bpm: number;
  rating: number;
  comment?: string;
  rounds: TimerItem[][];
  /** Новое поле — суммарная продолжительность (мс) */
  duration: number;
}

/** Хелпер-функция для подсчёта общей длительности. */
function calcTotalDuration(rounds: TimerItem[][]) {
  return rounds.reduce(
    (acc, round) => acc + round.reduce((s, item) => s + item.duration, 0),
    0,
  );
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

  useMetronome(bpm, isPlayingMetronome, 1, true, 0.8, false);

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
      rounds: rounds,
      duration: calcTotalDuration(rounds),
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
        alignItems: "flex-start",
        background:
          "linear-gradient(to right top, #001a6e, #002579, #013184, #033c8f, #074799)",
        overflow: "auto",
      }}
    >
      <Box
        sx={{
          padding: "4rem",
          marginBottom: "2rem",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "flex-end",
          width: "100%",
          gap: 10,
          flexWrap: "wrap-reverse",
        }}
      >
        {/* Journal */}
        <Box
          style={{
            color: "white",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            fontFamily: "sans-serif",
            border: "1px solid white",
            borderRadius: 16,
            height: "calc(100vh - 10rem)",
            overflowY: "scroll",
            gap: 10,
          }}
        >
          <Box
            style={{
              alignContent: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: 48,
              backgroundColor: "#023385",
              width: "100%",
              position: "sticky",
              top: 0,
              gap: 8,
              zIndex: 1,
            }}
          >
            <EventNoteIcon />
            <h2>Practice journal</h2>
          </Box>

          <Box
            style={{
              padding: "8px",
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            {journal.length === 0 && <p>No records yet.</p>}
            {journal
              .sort((a, b) => b.date.localeCompare(a.date))
              .map((rec, i) => (
                <JournalNote key={i} journalRecord={rec} />
              ))}
          </Box>
        </Box>
        <Box
          sx={{
            marginBottom: "1rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 16,
            }}
          >
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
                border: "1px solid white",
                borderRadius: 4,
                fontFamily: "sans-serif",
                color: "white",
                paddingLeft: 3,
                paddingRight: 3,
              }}
            >
              <h2>Workout details</h2>
              <Box
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 8,
                }}
              >
                <FormControl fullWidth>
                  <InputLabel
                    style={{
                      color: "white",
                      backgroundColor: "transparent",
                    }}
                  >
                    Technique
                  </InputLabel>
                  <Select
                    value={technique}
                    label="Technique"
                    onChange={(e) => setTechnique(e.target.value as string)}
                    sx={{
                      backgroundColor: "white",
                    }}
                    variant="outlined"
                    size={"small"}
                    style={{
                      color: "white",
                      backgroundColor: "transparent",
                    }}
                  >
                    <MenuItem value="Warmup">Warmup</MenuItem>
                    <MenuItem value="Steps">Steps</MenuItem>
                    <MenuItem value="Steps">Chords</MenuItem>
                    <MenuItem value="Steps">Legato-arpeggio</MenuItem>
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
                  InputLabelProps={{
                    style: { color: "#fff" },
                  }}
                  sx={{
                    input: { color: "white" },
                  }}
                />
              </Box>

              <TextField
                label="Description (optional)"
                variant="outlined"
                size="small"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                InputLabelProps={{
                  style: { color: "#fff" },
                }}
                sx={{
                  input: { color: "white" },
                }}
              />
              {/* Settings для редактирования rounds */}
              <Settings rounds={rounds} setRounds={setRounds} />
              {/* BPM */}
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
                    <img
                      src={"assets/metronome.svg"}
                      alt={"metronome"}
                      style={{ width: 20, height: 20, marginRight: 5 }}
                    />
                    <h3 style={{ color: "white", width: "100px" }}>
                      <strong>BPM: {bpm}</strong>
                    </h3>
                    <Slider
                      value={bpm}
                      onChange={(e, newValue) => setBpm(newValue as number)}
                      min={50}
                      max={200}
                      step={1}
                      onClick={(e) => e.stopPropagation()}
                      sx={{
                        width: 200,
                      }}
                    />
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget.
                </AccordionDetails>
              </Accordion>
              {/* Кнопки Start/Reset */}
              <Box
                sx={{
                  marginBottom: 2,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
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
                  {/* Прервать тренировку на английском будет "Cancel" */}
                  Cancel
                </Button>
              </Box>
            </Box>
          </Box>

          <MultiRoundProgressBar
            rounds={rounds}
            currentRoundIndex={roundIndex}
            currentTimerIndex={timerIndex}
            timerRemaining={timerRemaining}
          />
          <ActivityGrid journalRecords={journal} />
        </Box>
      </Box>

      {/* Диалог после завершения (Review) */}
      <Dialog
        open={showReviewDialog}
        onClose={() => setShowReviewDialog(false)}
      >
        <DialogTitle>Training Review</DialogTitle>
        <DialogContent
          style={{
            width: 500,
            height: 300,
          }}
        >
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
