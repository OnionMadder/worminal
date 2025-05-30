import * as bobMemory from './char/bob/memory.js';
import * as wormyMemory from './char/wormy/memory.js';
import * as squirmyMemory from './char/squirmy/memory.js';

const wormModules = {
  bob: bobMemory,
  wormy: wormyMemory,
  squirmy: squirmyMemory
};

export function giveGiftToWorm(wormName, giftItem) {
  const worm = wormModules[wormName];

  if (!worm || typeof worm.handleGift !== 'function') {
    return `[SYSTEM] Unknown or improperly loaded worm: ${wormName}`;
  }

  return worm.handleGift(giftItem);
}
