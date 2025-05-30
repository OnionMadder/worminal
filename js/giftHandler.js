
import * as bobMemory from './char/bob/memory.js';
import * as wormyMemory from './char/wormy/memory.js';
import * as squirmyMemory from './char/squirmy/memory.js';
import * as secretDogMemory from './char/secret_dog/memory.js';

import { respondToWormMisbehavior } from './char/mommy/wormMommy.js';


const wormMemory = {
  bob: bobMemory,
  wormy: wormyMemory,
  squirmy: squirmyMemory
};


export function giveGiftToWorm(wormName, giftItem) {
  const worm = wormMemory[wormName];

  if (!worm || !worm.memory) {
    return `[SYSTEM] Unknown or improperly loaded worm: ${wormName}`;
  }


  worm.memory.giftsReceived.push(giftItem);


  if (worm.memory.giftLikes.includes(giftItem)) {
    worm.incrementStat("affection", 3);
    return `[${worm.memory.name.toUpperCase()}] lit up at the ${giftItem}. it meant something.`;
  }

  if (worm.memory.giftDislikes.includes(giftItem)) {
    worm.incrementStat("annoyance", 2);
    respondToWormMisbehavior(wormName);
    return `[${worm.memory.name.toUpperCase()}] recoiled from the ${giftItem}. it didn’t feel right.`;
  }


  worm.incrementStat("affection", 1);
  return `[${worm.memory.name.toUpperCase()}] accepted the ${giftItem}, unsure what it meant.`;
}
