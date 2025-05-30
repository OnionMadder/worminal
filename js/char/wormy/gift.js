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
    respondToWormMisbehavior(wormName, "praise");
    return `[${worm.name.toUpperCase()}] squirmed happily. He loved the ${giftItem}.`;
  }

  if (worm.giftDislikes.includes(giftItem)) {
    worm.annoyance += 2;
    respondToWormMisbehavior(wormName, "punish");
    return `[${worm.name.toUpperCase()}] flinched. The ${giftItem} upset him.`;
  }

  worm.affection += 1;
  return `[${worm.name.toUpperCase()}] blinked at the ${giftItem}, unsure but grateful.`;
}
