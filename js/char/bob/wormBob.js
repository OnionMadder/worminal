export const wormyState = {
  name: "WORMY",
  memory: 0,
  lastTouched: 0,
  naughtyClicks: 0,
  overheardWords: []
};

export function onClick() {
  wormyState.memory++;
  wormyState.naughtyClicks++;

  if (wormyState.memory >= 30) {
    logWormMessage("he’s watching you type now. looking for something dirty.");
  }

  if (wormyState.naughtyClicks % 5 === 0) {
    logWormMessage("he thinks you like when he stares. he's not wrong.");
  }

  updateWormyVisual();
}

export function observeInput(text) {
  if (text.includes("mommy") || text.includes("wet")) {
    wormyState.overheardWords.push(text);
    logWormMessage("he giggled. he heard that.");
  }
}

function logWormMessage(msg) {
  if (typeof revealSecret === 'function') {
    revealSecret(msg, "WORMY");
  } else {
    console.warn("revealSecret not available.", msg);
  }
}

function updateWormyVisual() {
  const btn = document.getElementById("btn-worm3");
  if (btn) {
    btn.classList.add("wormy-twitch");
  }
}
