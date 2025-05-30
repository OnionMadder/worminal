import { wormMemory } from './wormMemoryTracker.js';
import { respondToWormMisbehavior } from './wormMommy.js';

export function giveGiftToWorm(wormName, giftItem) {
  const worm = wormMemory[wormName];
  if (!worm) {
    return `[SYSTEM] Unknown worm: ${wormName}`;
  }

  worm.giftsReceived.push(giftItem);

  if (worm.giftLikes.includes(giftItem)) {
    worm.affection += 2;
    return `[${worm.name.toUpperCase()}] lit up at the ${giftItem}. it meant something.`;
  }

  if (worm.giftDislikes.includes(giftItem)) {
    worm.jealousy += 2;
    respondToWormMisbehavior(wormName, "punish");
    return `[${worm.name.toUpperCase()}] narrowed his eyes. He dropped the ${giftItem}.`;
  }

  worm.affection += 1;
  return `[${worm.name.toUpperCase()}] accepted the ${giftItem}, unsure what it meant.`;
}
