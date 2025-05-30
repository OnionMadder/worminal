export const squirmyState = {
  name: "SQUIRMY",
  memory: 0,
  lastTouched: 0,
  naughtyClicks: 0,
  overheardWords: []
};

export function onClick() {
  squirmyState.memory++;
  squirmyState.naughtyClicks++;

  if (squirmyState.memory >= 30) {
    logSquirmyMessage("he glows brighter when you notice him. like he's trying to bloom.");
  }

  if (squirmyState.naughtyClicks % 5 === 0) {
    logSquirmyMessage("he thinks you like his glow. he's right.");
  }

  updateSquirmyVisual();
}

export function observeInput(text) {
  if (text.includes("lonely") || text.includes("miss")) {
    squirmyState.overheardWords.push(text);
    logSquirmyMessage("he whimpered. not because he's sad—because he understands.");
  }
}

function logSquirmyMessage(msg) {
  if (typeof revealSecret === 'function') {
    revealSecret(msg, "SQUIRMY");
  } else {
    console.warn("revealSecret not available.", msg);
  }
}

function updateSquirmyVisual() {
  const btn = document.getElementById("btn-worm2");
  if (btn) {
    btn.classList.add("squirmy-glow");
  }
}
