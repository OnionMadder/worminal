import * as bobMemory from './char/bob/memory.js';
import * as wormyMemory from './char/wormy/memory.js';
import * as squirmyMemory from './char/squirmy/memory.js';

import { pokeResponses as bobPokes } from './char/bob/poke.js';
import { pokeResponses as wormyPokes } from './char/wormy/poke.js';
import { pokeResponses as squirmyPokes } from './char/squirmy/poke.js';

import { getWormDisplayName, updateWormStats } from './statsUI.js';

const wormModules = {
  bob: { memory: bobMemory, responses: bobPokes },
  wormy: { memory: wormyMemory, responses: wormyPokes },
  squirmy: { memory: squirmyMemory, responses: squirmyPokes }
};

function displayWormLog(text) {
  const log = document.getElementById("terminal-log");
  if (!log) return;
  const line = document.createElement("p");
  line.className = "worm-response";
  line.textContent = text;
  log.appendChild(line);
  log.scrollTop = log.scrollHeight;
}

export function handleWormBehaviorPoke(buttonEl) {
  const wormId = buttonEl.getAttribute("data-worm");
  const worm = wormModules[wormId];

  if (!worm || !worm.memory.memory || !worm.responses) {
    console.warn("Invalid worm or missing data:", wormId);
    return;
  }

  const mem = worm.memory.memory;
  mem.annoyance = (mem.annoyance || 0) + 1;

  const tier = Math.min(mem.annoyance, worm.responses.length - 1);
  const response = worm.responses[tier];

  displayWormLog(`${getWormDisplayName(wormId)} ${response}`);
  worm.memory.save();
  updateWormStats(wormId);
}

window.handleWormBehaviorPoke = handleWormBehaviorPoke;
