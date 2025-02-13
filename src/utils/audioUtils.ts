// audioUtils.ts

/** Сигнал окончания таймера (короткий) */
export function playTimerEndSound() {
  playBeep(440, 0.15); // A4, 0.15 сек
}

/** Сигнал окончания раунда (чуть длиннее/выше) */
export function playRoundEndSound() {
  playBeep(660, 0.3); // E5, 0.3 сек
}

/** Сигнал окончания всех раундов (например, ещё другой) */
export function playAllRoundsEndSound() {
  playBeep(880, 0.5); // A5, 0.5 сек
}

/**
 * Мини-функция для воспроизведения короткого "бипа" через Web Audio API.
 */
function playBeep(frequency: number, durationSec: number) {
  const audioCtx = new AudioContext();
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.frequency.value = frequency;

  // Подключаем
  osc.connect(gain).connect(audioCtx.destination);

  // Запуск
  osc.start();
  // Останавливаем после durationSec
  osc.stop(audioCtx.currentTime + durationSec);

  // Затухание (экспоненциально)
  gain.gain.setValueAtTime(0.2, audioCtx.currentTime); // громкость
  gain.gain.exponentialRampToValueAtTime(
    0.0001,
    audioCtx.currentTime + durationSec,
  );
}
