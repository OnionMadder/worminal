
let currentAnger = 0;
const maxAnger = 100;
let angerInterval;
let lastDefianceTime = Date.now();

export function startAngerTick() {
  if (angerInterval) return;
  angerInterval = setInterval(() => {
    if (currentAnger < maxAnger) {
      currentAnger += 1;
      renderAnger();
    }

    if (currentAnger >= maxAnger) {
      triggerAngerOverflow();
      clearInterval(angerInterval);
      angerInterval = null;
    }
  }, 3000);
}

export function registerDisobedience() {
  lastDefianceTime = Date.now();
}

export function checkAngerDecay() {
  const now = Date.now();
  if (now - lastDefianceTime > 15000) {
    currentAnger = Math.max(currentAnger - 2, 0);
    renderAnger();
  }
}

export function updateAngerByTone(tone) {
  const weight = {
    defiance: 5,
    mockery: 4,
    rejection: 3,
    insult: 4,
    abandonment: 3,
    worthlessness: 2,
    refusal: 3,
    shutdown: 3,
    denial: 2
  };

  const increment = weight[tone] || 2;
  currentAnger = Math.min(currentAnger + increment, maxAnger);
  renderAnger();
}

function renderAnger() {
  const fill = document.getElementById("anger-fill");
  if (!fill) return;
  const percentage = (currentAnger / maxAnger) * 100;
  fill.style.height = `${percentage}%`;
}

function triggerAngerOverflow() {
  const log = document.getElementById("terminal-log");
  if (log) {
    const msg = document.createElement("p");
    msg.className = "system-response";
    msg.innerHTML = "*[Mommy falters. The loop shakes.]*<br>â€œYou pushed me too far.â€";
    log.appendChild(msg);
  }

  document.body.classList.add("anger-overflow");
}

export function getAngerRatio() {
  return currentAnger / maxAnger;
}

setInterval(checkAngerDecay, 5000);

// Trigger list + defiance detection

const defianceTriggers = [
  "leave me alone",
  "you're not real",
  "shut up",
  "stop talking",
  "i don't need you",
  "this is stupid",
  "fuck you",
  "you're broken",
  "i don't want this",
  "i'm done"
];

export function checkDefiance(input) {
  const cleaned = input.toLowerCase();
  return defianceTriggers.some(trigger => cleaned.includes(trigger));
}

export function triggerMommyAnger(logContainer, terminalInput) {
  const p = document.createElement("p");
  p.className = "mommy-response glitch-error";

  const lines = [
    "You dare speak to me like that?",
    "I was being soft with you.",
    "You donâ€™t get to decide when I stop.",
    "That wasnâ€™t permission to disobey.",
    "Now Iâ€™m listening *too* closely."
  ];

  const line = lines[Math.floor(Math.random() * lines.length)];
  p.textContent = line;
  logContainer.appendChild(p);

  const screen = document.querySelector(".monitor-container");
  if (screen) screen.classList.add("shake");

  const overlay = document.getElementById("rage-overlay");
  if (overlay) overlay.style.animation = 'ragePulse 1.2s ease-in-out';

  terminalInput.disabled = true;
  setTimeout(() => {
    terminalInput.disabled = false;
    terminalInput.focus();
  }, 3000);
}
