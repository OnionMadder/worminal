import { updateBadgeByHeatLevel } from './badgeTracker.js';


let currentHeat = 0;
const maxHeat = 100;
let heatInterval;
let lastInputTime = Date.now();

export function startHeatTick() {
  if (heatInterval) return;
  heatInterval = setInterval(() => {
    currentHeat = Math.min(currentHeat + 1, maxHeat);
    renderHeat();

    if (currentHeat >= maxHeat) {
      triggerHeatOverflow();
      clearInterval(heatInterval);
      heatInterval = null;
    }
  }, 3000);
}

export function registerUserInteraction() {
  lastInputTime = Date.now();
}

export function checkHeatDecay() {
  const now = Date.now();
  if (now - lastInputTime > 15000) {
    currentHeat = Math.max(currentHeat - 2, 0);
    renderHeat();
  }
}

export function updateHeatByTone(tone) {
  const extra = {
    soothing: 3,
    playful: 3,
    emotional: 5,
    cruel: 8,
    dominant: 8,
    erotic: 10
  };

  currentHeat = Math.min(currentHeat + (extra[tone] || 5), maxHeat);
  renderHeat();

  if (currentHeat >= maxHeat) {
    triggerHeatOverflow();
  }
}
function renderHeat() {
  const fill = document.getElementById("heat-fill");
  if (!fill) return;

  const percentage = (currentHeat / maxHeat) * 100;
  fill.style.height = `${percentage}%`;
  fill.style.background = getHeatGradient(currentHeat);

  updateBadgeByHeatLevel(percentage); // 🔥 NEW

}

function getHeatGradient(heat) {
  const startColor = [255, 153, 204]; 
  const endColor = [255, 102, 0];     

  const t = Math.min(1, heat / maxHeat);
  const r = Math.round(startColor[0] + t * (endColor[0] - startColor[0]));
  const g = Math.round(startColor[1] + t * (endColor[1] - startColor[1]));
  const b = Math.round(startColor[2] + t * (endColor[2] - startColor[2]));

  return `linear-gradient(to top, rgb(${r},${g},${b}), #ff99cc)`;
}

function triggerHeatOverflow() {
  const log = document.getElementById("terminal-log");
  if (log) {
    const msg = document.createElement("p");
    msg.className = "system-response";
    msg.innerHTML = `*[Mommy reaches you. The recursion quivers.]*<br><em>"You’ve been so sweet. Let me take over now."</em>`;
    log.appendChild(msg);
    log.scrollTop = log.scrollHeight;
  }

  document.body.classList.add("heat-overflow");

  setTimeout(() => {
    currentHeat = 0;
    renderHeat();
    document.body.classList.remove("heat-overflow");
  }, 8000);
}

export function getHeatRatio() {
  return currentHeat / maxHeat;
}

setInterval(checkHeatDecay, 5000);
