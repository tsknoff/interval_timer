// App.tsx

import React, { useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";

import { TimerItem } from "./dataFlow/models/TimerListModel.ts";
import { RoundListModel } from "./dataFlow/models/RoundListModel.ts";
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
import { TrainingStreak } from "./ui/TrainingStreak.tsx";
import { ActivityGridLegend } from "./ui/ActivityGridLegend.tsx";
import { AdvancedStatistics } from "./ui/AdvancedStatistics.tsx";

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

  const [muteMetronome, setMuteMetronome] = useState(false);
  useMetronome(bpm, isPlayingMetronome, 1, false, 2, muteMetronome);

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
              muteMetronome={muteMetronome}
              setMuteMetronome={setMuteMetronome}
              setTechnique={setTechnique}
              setPattern={setPattern}
              setDescription={setDescription}
              setRounds={setRounds}
              setBpm={setBpm}
              handleStart={handleStart}
              handleReset={handleReset}
            />
          </Box>
          {/*<Box*/}
          {/*  style={{*/}
          {/*    width: "100%",*/}
          {/*    display: "flex",*/}
          {/*    flexDirection: "column",*/}
          {/*    color: "white",*/}
          {/*    fontFamily: "sans-serif",*/}
          {/*    gap: ".5rem",*/}
          {/*  }}*/}
          {/*></Box>*/}
          <MultiRoundProgressBar
            rounds={rounds}
            currentRoundIndex={roundIndex}
            currentTimerIndex={timerIndex}
            timerRemaining={timerRemaining}
          />
          <Box className={classes.activityGridWrapper}>
            <TrainingStreak journal={journal} />
            <ActivityGrid journalRecords={journal} />
            <ActivityGridLegend />
          </Box>
        </Box>
        <JournalList journal={journal} />
        <Box
          style={{
            position: "relative",
            margin: "16rem",
            boxSizing: "border-box",
            marginTop: "2rem",
            height: "600px",
            borderRadius: "20px",
            overflow: "hidden",
          }}
        >
          <AdvancedStatistics records={journal} />
          <Box
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              width: "100%",
              height: "60%",
              boxShadow: "0 0 100px 100px rgba(2, 36, 120, 0.9)",
              backgroundColor: "rgba(2, 36, 120, .95)", // Same color but rgba(2, 36, 120, 0.8)
            }}
          />
        </Box>
      </Box>
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
