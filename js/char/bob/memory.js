import { respondToWormMisbehavior } from '../mommy/wormMommy.js';

const storageKey = "bobMemory";

const defaultMemory = {
  name: "bob",
  clicks: 0,
  affection: 0,
  annoyance: 0,
  suspicion: 0,
  tattled: 0,
  jealousy: 0,
  giftsReceived: [],
  giftLikes: ["rulebook", "error logs"],
  giftDislikes: ["candy"],
  heatSnitch: false,
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
    case "bob":
      return "Bob";
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
    return `[${memory.name.toUpperCase()}] lit up at the ${giftItem}. it meant something.`;
  }

  if (memory.giftDislikes.includes(giftItem)) {
    incrementStat("annoyance", 2);
    respondToWormMisbehavior(memory.name);
    return `[${memory.name.toUpperCase()}] recoiled from the ${giftItem}. it didn’t feel right.`;
  }

  incrementStat("affection", 1);
  return `[${memory.name.toUpperCase()}] accepted the ${giftItem}, unsure what it meant.`;
}
