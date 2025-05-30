import { respondToWormMisbehavior } from '../mommy/wormMommy.js';

const storageKey = "wormyMemory";

const defaultMemory = {
  name: "wormy",
  attention: 0,
  ignored: 0,
  clicks: 0,
  affection: 0,
  annoyance: 0,
  jealousy: 0,
  giftsReceived: [],
  giftLikes: ["lube", "shiny chip"],
  giftDislikes: ["discipline disk"],
  scolded: false,
  currentTier: "early",
  mood: "neutral"
};

export const memory = JSON.parse(localStorage.getItem(storageKey)) || structuredClone(defaultMemory);

export function save() {
  localStorage.setItem(storageKey, JSON.stringify(memory));
}

export function reset() {
  Object.assign(memory, structuredClone(defaultMemory));
  save();
}

export function getWormDisplayName(id) {
  switch (id) {
    case "wormy":
      return "Wormy";
    default:
      return "Unknown Worm";
  }
}

export function incrementStat(stat, amount = 1) {
  if (typeof memory[stat] === "number") {
    memory[stat] += amount;
    save();
  }
}

export function setMood(newMood) {
  memory.mood = newMood;
  save();
}

export function handleGift(giftItem) {
  memory.giftsReceived.push(giftItem);

  if (memory.giftLikes.includes(giftItem)) {
    incrementStat("affection", 3);
    incrementStat("attention", 1);
    return `[${memory.name.toUpperCase()}] squirmed happily around the ${giftItem}. it made him feel seen.`;
  }

  if (memory.giftDislikes.includes(giftItem)) {
    incrementStat("annoyance", 2);
    incrementStat("ignored", 1);
    respondToWormMisbehavior(memory.name);
    return `[${memory.name.toUpperCase()}] made a soft, glitchy sound. he didn’t like the ${giftItem}.`;
  }

  incrementStat("affection", 1);
  return `[${memory.name.toUpperCase()}] nuzzled the ${giftItem}, unsure but content.`;
}
