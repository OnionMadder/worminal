import { getHeatRatio } from './heatMeter.js';

const audioCache = {};

export function getAudio(src) {
  if (!audioCache[src]) {
    const a = new Audio(src);
    a.volume = 0.85;
    audioCache[src] = a;
  } else {
    audioCache[src].currentTime = 0;
  }
  return audioCache[src];
}

const TOTAL_AUDIO_CLIPS = 55;
let hasUnlockedHornyVoices = false;

const standardVoices = Array.from({ length: TOTAL_AUDIO_CLIPS }, (_, i) => `audio/${i + 1}.wav`);
const unlockedVoices = []; 

export function setHornyVoicesUnlocked(value) {
  hasUnlockedHornyVoices = value;
}

export function maybePlayRandomAudio() {
  if (typeof getHeatRatio !== 'function') {
    console.warn("getHeatRatio is not defined or not a function.");
    return;
  }

  let heatRatio = 0;
  try {
    heatRatio = getHeatRatio();
  } catch (e) {
    console.warn("Failed to retrieve heat ratio:", e);
    return;
  }

  const baseChance = 0.12;
  const scaledChance = baseChance + heatRatio * 0.24;

  if (Math.random() < scaledChance) {
    const pool = hasUnlockedHornyVoices
      ? [...standardVoices, ...unlockedVoices]
      : standardVoices;

    if (pool.length === 0) {
      console.warn("No audio clips available to play.");
      return;
    }

    const clip = pool[Math.floor(Math.random() * pool.length)];
    const audio = getAudio(clip);
    audio.play().catch(e => console.warn("Audio failed to play:", clip, e));
  }
}
