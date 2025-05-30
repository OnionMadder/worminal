import * as bobMemory from './char/bob/memory.js';
import * as wormyMemory from './char/wormy/memory.js';
import * as squirmyMemory from './char/squirmy/memory.js';
import * as secretDogMemory from './char/secret_dog/memory.js';


const wormMemory = {
  bob: bobMemory,
  wormy: wormyMemory,
  squirmy: squirmyMemory,
  secret_dog: secretDogMemory
};




export function updateWormStats(wormId) {
  const worm = wormMemory[wormId];
  if (!worm || !worm.memory) return;

  const mem = worm.memory;

  const affectionEl = document.getElementById(`${wormId}-affection`);
  const annoyanceEl = document.getElementById(`${wormId}-annoyance`);
  const giftsEl     = document.getElementById(`${wormId}-gifts`);
  const moodEl      = document.getElementById(`${wormId}-mood`);

  if (affectionEl) {
    affectionEl.textContent = mem.affection ?? 0;
    pulseStat(affectionEl);
  }

  if (annoyanceEl) {
    annoyanceEl.textContent = mem.annoyance ?? 0;
    pulseStat(annoyanceEl);
  }

  if (giftsEl) {
    giftsEl.textContent = mem.giftsReceived?.length ?? 0;
    pulseStat(giftsEl);
  }

  if (moodEl) {
    moodEl.textContent = mem.mood ?? 'neutral';
    pulseStat(moodEl);
  }
}

export function updateAllWormStats() {
  Object.keys(wormMemory).forEach(updateWormStats);
}

function pulseStat(el) {
  if (!el) return;
  el.classList.add("stat-updated");
  setTimeout(() => el.classList.remove("stat-updated"), 300);
}

export function decayMood(wormId, delay = 86400000) {
  const worm = wormMemory[wormId];
  if (!worm || !worm.memory || worm.memory.mood === 'neutral') return;

  setTimeout(() => {
    worm.memory.mood = 'neutral';
    worm.save();
    updateWormStats(wormId);
  }, delay);
}

export function initWormUI() {
  updateAllWormStats();
}

export function getWormDisplayName(wormId = '') {
  switch (wormId.toLowerCase()) {
    case "bob": return "Bob";
    case "wormy": return "Wormy";
    case "squirmy": return "Squirmy";
    case "secret_dog": return "Secret Dog";
    default: return "Unknown Worm";
  }

}
