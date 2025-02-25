// RoundListModel.ts

import { TimerListModel, TimerItem } from "./TimerListModel.ts";
import {
  playRoundEndSound,
  playTimerEndSound,
} from "../../utils/audioUtils.ts";

/**
 * Тип коллбэка подписки:
 *   - roundIndex: номер текущего раунда (0-based)
 *   - roundsTotal: всего раундов
 *   - timerName: имя активного таймера
 *   - timerRemaining: сколько осталось (мс)
 *   - timerIndex: индекс активного таймера внутри раунда
 *   - timersTotal: всего таймеров в раунде
 */
export type RoundUpdateCallback = (
  roundIndex: number,
  roundsTotal: number,
  timerName: string,
  timerRemaining: number,
  timerIndex: number,
  timersTotal: number,
) => void;

export interface IRoundListModel {
  start(): void;
  reset(): void;
  isRunning(): boolean;
  subscribe(callback: RoundUpdateCallback): () => void;
}

export class RoundListModel implements IRoundListModel {
  private rounds: TimerItem[][]; // массив "раундов"
  private onAllRoundsFinished: () => void; // коллбэк после всех раундов
  private currentRoundIndex = 0;
  private currentRoundModel: TimerListModel | null = null;
  private roundsRunning = false;
  private subscribers: RoundUpdateCallback[] = [];

  constructor(rounds: TimerItem[][], onAllRoundsFinished: () => void) {
    this.rounds = rounds;
    this.onAllRoundsFinished = onAllRoundsFinished;
  }

  public start(): void {
    if (this.roundsRunning || this.rounds.length === 0) return;
    this.roundsRunning = true;
    this.currentRoundIndex = 0;
    this.startNextRound();
  }

  public reset(): void {
    if (this.currentRoundModel) {
      this.currentRoundModel.reset();
      this.currentRoundModel = null;
    }
    this.roundsRunning = false;
    this.currentRoundIndex = 0;
    // Оповестим подписчиков (обнуление)
    this.notifySubscribers({
      roundIndex: 0,
      timerName: "",
      timerRemaining: 0,
      timerIndex: 0,
      timersTotal: 0,
    });
  }

  public isRunning(): boolean {
    return this.roundsRunning;
  }

  public subscribe(callback: RoundUpdateCallback): () => void {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter((cb) => cb !== callback);
    };
  }

  // --- Внутренняя логика ---

  private startNextRound(): void {
    if (this.currentRoundIndex >= this.rounds.length) {
      // Все раунды завершены
      this.finishAllRounds();
      return;
    }
    const roundItems = this.rounds[this.currentRoundIndex];

    this.currentRoundModel = new TimerListModel(roundItems, {
      onAllFinished: () => {
        // текущий раунд (TimerListModel) завершён
        this.handleRoundFinished();
      },
      onTimerFinished: (timerName, timerIndex) => {
        console.log("Timer finished:", timerName);
        console.log("Timer index:", timerIndex);
        // завершился ОДИН таймер — проигрываем звук конца таймера
        playTimerEndSound();
      },
    });

    // Подписка, чтобы пробрасывать обновления наружу
    this.currentRoundModel.subscribe(
      (timerName, timerRemaining, timerIndex, timersTotal) => {
        this.notifySubscribers({
          roundIndex: this.currentRoundIndex,
          timerName,
          timerRemaining,
          timerIndex,
          timersTotal,
        });
      },
    );

    this.currentRoundModel.start();
  }

  private handleRoundFinished() {
    // Проигрываем звук конца раунда
    playRoundEndSound();

    // Переходим к следующему раунду
    this.currentRoundModel = null;
    this.currentRoundIndex++;
    this.startNextRound();
  }

  private finishAllRounds() {
    this.roundsRunning = false;
    // все раунды завершены
    this.onAllRoundsFinished();
  }

  private notifySubscribers(params: {
    roundIndex: number;
    timerName: string;
    timerRemaining: number;
    timerIndex: number;
    timersTotal: number;
  }) {
    const { roundIndex, timerName, timerRemaining, timerIndex, timersTotal } =
      params;
    const roundsTotal = this.rounds.length;

    for (const cb of this.subscribers) {
      cb(
        roundIndex,
        roundsTotal,
        timerName,
        timerRemaining,
        timerIndex,
        timersTotal,
      );
    }
  }
}
