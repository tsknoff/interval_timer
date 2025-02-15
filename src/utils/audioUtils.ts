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
 * Храним один общий контекст, который создаём только когда реально нужно.
 */
let audioCtx: AudioContext | null = null;

/**
 * Возвращает (и при необходимости создаёт) единый AudioContext.
 * Если контекст ещё не был создан, создаём его в момент явного пользовательского действия.
 * Можно также вызывать audioCtx.resume(), если контекст «заморожен».
 */
function getSharedAudioContext(): AudioContext {
  if (!audioCtx) {
    audioCtx = new AudioContext();
  }

  // На всякий случай "будим" контекст (особенно в mobile Safari)
  if (audioCtx.state === "suspended") {
    audioCtx.resume().catch((err) => {
      console.warn("Failed to resume AudioContext:", err);
    });
  }

  return audioCtx;
}

/**
 * Мини-функция для воспроизведения короткого "бипа" через общий AudioContext.
 */
function playBeep(frequency: number, durationSec: number) {
  const ctx = getSharedAudioContext();

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.frequency.value = frequency;

  // Подключаем к AudioContext
  osc.connect(gain).connect(ctx.destination);

  // Запускаем генерацию
  osc.start();
  // Останавливаем через durationSec
  osc.stop(ctx.currentTime + durationSec);

  // Затухание (экспоненциально)
  gain.gain.setValueAtTime(0.2, ctx.currentTime); // громкость
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + durationSec);
}
