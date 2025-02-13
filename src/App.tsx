// App.tsx
import React, { useEffect, useRef, useState } from "react";
import { TimerItem } from "./dataFlow/TimerListModel.ts";
import { RoundListModel } from "./dataFlow/RoundListModel.ts";
import { MultiRoundProgressBar } from "./ui/MultiRoundProgressBar.tsx";
import { useMetronome } from "./hooks/useMetronome.ts";
import { playAllRoundsEndSound } from "./utils/audioUtils.ts";

export const App: React.FC = () => {
  // Состояния для отображения текущего раунда/таймера
  const [roundIndex, setRoundIndex] = useState(0);
  const [roundsTotal, setRoundsTotal] = useState(0);
  const [timerIndex, setTimerIndex] = useState(0);
  const [timersTotal, setTimersTotal] = useState(0);
  const [timerName, setTimerName] = useState("");
  const [timerRemaining, setTimerRemaining] = useState(0);

  // МЕТРОНОМ
  const [bpm, setBpm] = useState(120);
  const [isPlayingMetronome, setIsPlayingMetronome] = useState(false);

  // Пример 2-раундового набора
  const rounds: TimerItem[][] = [
    [
      { name: "Работаем (1)", duration: 3000 },
      { name: "Отдыхаем (1)", duration: 2000 },
    ],
    [
      { name: "Работаем (2)", duration: 6000 },
      { name: "Отдыхаем (2)", duration: 2000 },
    ],
  ];

  // Создаём RoundListModel (через useRef, чтобы не пересоздавался)
  const roundListRef = useRef<RoundListModel | null>(null);
  if (!roundListRef.current) {
    // При полном завершении всех раундов:
    const handleAllRoundsFinished = () => {
      alert("Все раунды завершены!");
      playAllRoundsEndSound();
      setIsPlayingMetronome(false); // выключаем метроном
    };

    roundListRef.current = new RoundListModel(rounds, handleAllRoundsFinished);
  }

  // Подписка на обновления RoundListModel
  useEffect(() => {
    const model = roundListRef.current;
    if (!model) return;

    const unsubscribe = model.subscribe(
      (rIndex, rTotal, tName, tRemaining, tIndex, tTotal) => {
        setRoundIndex(rIndex);
        setRoundsTotal(rTotal);
        setTimerName(tName);
        setTimerRemaining(tRemaining);
        setTimerIndex(tIndex);
        setTimersTotal(tTotal);
      },
    );

    return () => {
      unsubscribe();
    };
  }, []);

  // Включаем метроном, когда isPlayingMetronome = true
  useMetronome(bpm, isPlayingMetronome);

  // --- Кнопки ---

  const handleStart = () => {
    roundListRef.current?.start();
    setIsPlayingMetronome(true); // запустить метроном
  };

  const handleReset = () => {
    roundListRef.current?.reset();
    setIsPlayingMetronome(false); // остановить метроном

    // Сбросить состояния (по желанию)
    setRoundIndex(0);
    setTimerIndex(0);
    setTimerRemaining(0);
    setTimerName("");
  };

  // Для наглядности
  const secondsLeft = (timerRemaining / 1000).toFixed(1);

  return (
    <div>
      <h1>Таймеры + Звуки + Метроном</h1>

      <div style={{ marginBottom: "1rem" }}>
        <p>
          Раунд: <strong>{roundIndex + 1}</strong> / {roundsTotal}, Таймер:{" "}
          <strong>{timerName}</strong> (осталось {secondsLeft} c)
        </p>

        <MultiRoundProgressBar
          rounds={rounds}
          currentRoundIndex={roundIndex}
          currentTimerIndex={timerIndex}
          timerRemaining={timerRemaining}
        />
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <button onClick={handleStart}>Start</button>
        <button onClick={handleReset}>Reset</button>
      </div>

      <div>
        <label>
          BPM:{" "}
          <input
            type="number"
            value={bpm}
            onChange={(e) => setBpm(Number(e.target.value))}
            style={{ width: 60 }}
          />
        </label>
      </div>
    </div>
  );
};
