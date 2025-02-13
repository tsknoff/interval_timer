// useMetronome.ts
import { useEffect, useRef } from "react";

export function useMetronome(bpm: number, isRunning: boolean) {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Сначала очищаем старый интервал (если был)
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (isRunning) {
      const intervalMs = 60000 / bpm; // ms между ударами

      intervalRef.current = setInterval(() => {
        playMetronomeClick();
      }, intervalMs);
    }

    // Очистка при размонтировании или изменении зависимостей
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [bpm, isRunning]);
}

function playMetronomeClick() {
  const audioCtx = new AudioContext();

  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.frequency.value = 1000; // частота щелчка
  osc.connect(gain).connect(audioCtx.destination);

  // Короткий "пик"
  osc.start();
  gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.05);
  osc.stop(audioCtx.currentTime + 0.1);
}
