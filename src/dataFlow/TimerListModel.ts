// TimerListModel.ts

import TimerModel, { ITimerModel } from "./TimerModel.ts";

/** Описание одного таймера. */
export interface TimerItem {
  name: string;
  duration: number; // мс
}

/** Коллбэк, куда мы сообщаем о каждом тике текущего таймера. */
type TimerUpdateCallback = (
  name: string,
  remaining: number, // мс
  index: number, // индекс текущего таймера
  total: number, // всего таймеров
) => void;

/**
 * Коллбэки, которые TimerListModel будет вызывать:
 *  - onAllFinished: когда все таймеры (в массиве) отработали
 *  - onTimerFinished?: когда каждый таймер заканчивается (до перехода к следующему)
 */
interface TimerListCallbacks {
  onAllFinished: () => void;
  onTimerFinished?: (timerName: string, timerIndex: number) => void;
}

export interface ITimerListModel {
  start(): void;
  reset(): void;
  isRunning(): boolean;
  subscribe(callback: TimerUpdateCallback): () => void;
}

/**
 * TimerListModel — запускает массив таймеров (TimerItem[]) последовательно.
 */
export class TimerListModel implements ITimerListModel {
  private timerItems: TimerItem[];
  private callbackOnFinish: () => void;
  private callbackOnTimerFinished?: (
    timerName: string,
    timerIndex: number,
  ) => void;

  private currentIndex = 0;
  private listRunning = false;
  private checkIntervalId: ReturnType<typeof setInterval> | null = null;
  private timer: ITimerModel;
  private subscribers: TimerUpdateCallback[] = [];

  constructor(timerItems: TimerItem[], callbacks: TimerListCallbacks) {
    this.timerItems = timerItems;
    this.callbackOnFinish = callbacks.onAllFinished;
    this.callbackOnTimerFinished = callbacks.onTimerFinished;
    this.timer = new TimerModel();
  }

  public start(): void {
    if (this.listRunning || this.timerItems.length === 0) return;
    this.listRunning = true;
    this.currentIndex = 0;
    this.startNextTimer();
  }

  public reset(): void {
    this.stopChecking();
    this.timer.reset();
    this.listRunning = false;
    this.currentIndex = 0;
    // Уведомим подписчиков (обнуление)
    this.notifySubscribers("", 0, 0, this.timerItems.length);
  }

  public isRunning(): boolean {
    return this.listRunning;
  }

  public subscribe(callback: TimerUpdateCallback): () => void {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter((cb) => cb !== callback);
    };
  }

  // --- Вспомогательные методы ---

  private startNextTimer(): void {
    if (this.currentIndex >= this.timerItems.length) {
      this.finish();
      return;
    }

    // Сбрасываем внутренний TimerModel и стартуем
    this.timer.reset();
    this.timer.start();

    const currentItem = this.timerItems[this.currentIndex];
    this.checkIntervalId = setInterval(() => {
      const elapsed = this.timer.getElapsedTime();
      const remaining = currentItem.duration - elapsed;

      this.notifySubscribers(
        currentItem.name,
        Math.max(remaining, 0),
        this.currentIndex,
        this.timerItems.length,
      );

      if (remaining <= 0) {
        // Таймер закончился, оповестим (если коллбэк задан)
        if (this.callbackOnTimerFinished) {
          this.callbackOnTimerFinished(currentItem.name, this.currentIndex);
        }
        this.goToNextTimer();
      }
    }, 100);
  }

  private goToNextTimer() {
    this.stopChecking();
    this.currentIndex++;
    this.startNextTimer();
  }

  private finish() {
    this.listRunning = false;
    this.timer.reset();
    this.callbackOnFinish();
  }

  private stopChecking() {
    if (this.checkIntervalId) {
      clearInterval(this.checkIntervalId);
      this.checkIntervalId = null;
    }
  }

  private notifySubscribers(
    name: string,
    remaining: number,
    index: number,
    total: number,
  ) {
    for (const cb of this.subscribers) {
      cb(name, remaining, index, total);
    }
  }
}
