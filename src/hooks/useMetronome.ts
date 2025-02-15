// useMetronome.ts

import { useEffect, useRef } from "react";

/**
 * Общий AudioContext, чтобы не плодить новый на каждый тик.
 */
let sharedAudioCtx: AudioContext | null = null;

/**
 * Функция, возвращающая один и тот же AudioContext.
 * Если нужно — создаёт его.
 */
function getSharedAudioContext(): AudioContext {
  if (!sharedAudioCtx) {
    sharedAudioCtx = new AudioContext();
  }

  // если контекст «заморожен» (suspended), попробуем возобновить
  if (sharedAudioCtx.state === "suspended") {
    sharedAudioCtx.resume().catch((err) => {
      console.warn("Failed to resume audio context", err);
    });
  }

  return sharedAudioCtx;
}

/**
 * Хук для метронома с учётом subdivision, акцента, mute, громкости
 *
 * @param bpm - темп (ударов в минуту)
 * @param isRunning - флаг, включён ли метроном
 * @param subdivision - число долей в такте (3,4,8 и т.д.)
 * @param accentFirstBeat - нужно ли акцентировать (выделять) первую долю
 * @param volume - громкость 0..1 (или шире)
 * @param isMuted - выключать ли звук
 */
export function useMetronome(
  bpm: number,
  isRunning: boolean,
  subdivision: number = 4,
  accentFirstBeat: boolean = true,
  volume: number = 1.0,
  isMuted: boolean = false,
) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const beatIndexRef = useRef<number>(0); // счётчик долей

  useEffect(() => {
    // Сначала очищаем предыдущий интервал
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    beatIndexRef.current = 0;

    if (isRunning) {
      // Период: bpm «ударов в минуту». Но мы учитываем subdivision,
      // т.е. subdivision ударов на один «такт»?
      // Классический подход: при BPM = 120 и subdivision=4,
      // хотим 2 удара в секунду, но на subdivision=4 → 8 тиков в секунду
      // => частота в ms = (60_000 / bpm) / subdivision
      const msPerBeat = 60000 / bpm;
      const intervalMs = msPerBeat / subdivision;

      intervalRef.current = setInterval(() => {
        beatIndexRef.current += 1;

        // Определяем — это первая доля в такте или нет
        // Если beatIndexRef.current % subdivision === 1, значит это начало такта
        const isFirstBeat = beatIndexRef.current % subdivision === 1;

        playMetronomeClick(isFirstBeat && accentFirstBeat, volume, isMuted);
      }, intervalMs);
    }

    return () => {
      // Очистка при размонтировании
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [bpm, isRunning, subdivision, accentFirstBeat, volume, isMuted]);
}

/**
 * Воспроизведение щелчка метронома.
 * Если isAccent=true → воспроизводим другой звук (высота/громкость),
 * если isMuted=true → ничего не делаем.
 */
function playMetronomeClick(
  isAccent: boolean,
  volume: number,
  isMuted: boolean,
) {
  // Если метроном заглушён, не воспроизводим звук
  if (isMuted) {
    return;
  }

  const audioCtx = getSharedAudioContext();

  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  // Например, для акцента частота 1500, иначе 1000
  osc.frequency.value = isAccent ? 1500 : 1000;

  osc.connect(gain).connect(audioCtx.destination);

  // Рассчитаем громкость:
  // базовое значение 0.3, умноженное на volume,
  // плюс ещё небольшой коэффициент для акцента (например, *1.2)
  let baseAmplitude = 0.3 * volume;
  if (isAccent) {
    baseAmplitude *= 1.2;
  }

  osc.start();
  // Короткое затухание
  gain.gain.setValueAtTime(baseAmplitude, audioCtx.currentTime);
  // Затухаем за 0.05 сек
  gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.05);
  osc.stop(audioCtx.currentTime + 0.1);
}
