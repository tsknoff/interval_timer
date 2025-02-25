// TimerModel.ts
export interface ITimerModel {
  start(): void;
  pause(): void;
  reset(): void;
  getElapsedTime(): number;
  isRunning(): boolean;
}

class TimerModel implements ITimerModel {
  private startTimestamp: number | null = null;
  private accumulatedTime = 0;
  private running = false;

  public start(): void {
    if (!this.running) {
      this.running = true;
      this.startTimestamp = Date.now();
    }
  }

  public pause(): void {
    if (this.running && this.startTimestamp !== null) {
      this.accumulatedTime += Date.now() - this.startTimestamp;
      this.running = false;
      this.startTimestamp = null;
    }
  }

  public reset(): void {
    this.accumulatedTime = 0;
    this.startTimestamp = null;
    this.running = false;
  }

  public getElapsedTime(): number {
    if (this.running && this.startTimestamp !== null) {
      return this.accumulatedTime + (Date.now() - this.startTimestamp);
    }
    return this.accumulatedTime;
  }

  public isRunning(): boolean {
    return this.running;
  }
}

export default TimerModel;
