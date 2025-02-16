// App.tsx

import React, { useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";

import { TimerItem } from "./dataFlow/TimerListModel";
import { RoundListModel } from "./dataFlow/RoundListModel";
import { MultiRoundProgressBar } from "./ui/MultiRoundProgressBar";
import { useMetronome } from "./hooks/useMetronome";
import { playAllRoundsEndSound } from "./utils/audioUtils";
import { ActivityGrid } from "./ui/ActivityGrid.tsx";
import { WorkoutDetails } from "./ui/WorkoutDetails.tsx";
import { TimerCircle } from "./ui/TimerCircle.tsx";
import { JournalList } from "./ui/JournalList.tsx";
import { DialogWorkoutReview } from "./ui/DialogWorkoutReview.tsx";
import { useLayoutStyles } from "./ui/styles.ts";
import { ResponsiveAppBar } from "./ui/ResponsiveAppBar.tsx";

export interface JournalRecord {
  date: string;
  technique: string;
  pattern: string;
  description?: string;
  bpm: number;
  rating: number;
  comment?: string;
  rounds: TimerItem[][];
  duration: number;
}

/** Хелпер-функция для подсчёта общей длительности. */
function calcTotalDuration(rounds: TimerItem[][]) {
  return rounds.reduce(
    (acc, round) => acc + round.reduce((s, item) => s + item.duration, 0),
    0,
  );
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

  useMetronome(bpm, isPlayingMetronome, 1, false, 2, false);

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
    newModel.subscribe((rIndex, rTotal, tName, tRemaining, tIndex) => {
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

  const { classes } = useLayoutStyles();

  return (
    <Box className={classes.root}>
      <ResponsiveAppBar />
      <Box className={classes.twoColumnsWrapper}>
        <Box className={classes.secondColumnWrapper}>
          <Box className={classes.circleAndDetailsWrapper}>
            <TimerCircle
              roundIndex={roundIndex}
              roundsTotal={roundsTotal}
              timerName={timerName}
              secondsLeft={secondsLeft}
            />
            <WorkoutDetails
              technique={technique}
              pattern={pattern}
              description={description}
              rounds={rounds}
              bpm={bpm}
              setTechnique={setTechnique}
              setPattern={setPattern}
              setDescription={setDescription}
              setRounds={setRounds}
              setBpm={setBpm}
              handleStart={handleStart}
              handleReset={handleReset}
            />
          </Box>

          <MultiRoundProgressBar
            rounds={rounds}
            currentRoundIndex={roundIndex}
            currentTimerIndex={timerIndex}
            timerRemaining={timerRemaining}
          />
          <ActivityGrid journalRecords={journal} />
        </Box>
        <JournalList journal={journal} />
      </Box>
      {/* Диалог после завершения (Review) */}
      <DialogWorkoutReview
        showReviewDialog={showReviewDialog}
        trainingRating={trainingRating}
        trainingComment={trainingComment}
        setShowReviewDialog={setShowReviewDialog}
        setTrainingRating={setTrainingRating}
        setTrainingComment={setTrainingComment}
        handleSubmitReview={handleSubmitReview}
      />
    </Box>
  );
};
