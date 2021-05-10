import { createElement } from 'react';

class TrainLevel {
  constructor(level, progress, active) {
    this.level = level;
    this.progress = progress;
    this.active = active;
  }

  divCreator() {
    return createElement('div', { className: `train${this.level}` });
  }
}

const Train1 = new TrainLevel(1, 0, false);
const Train2 = new TrainLevel(2, 0, false);
const Train3 = new TrainLevel(3, 0, false);
const Train4 = new TrainLevel(4, 0, false);
const Train5 = new TrainLevel(5, 0, false);

export const TrainLevels = [Train1, Train2, Train3, Train4, Train5];
