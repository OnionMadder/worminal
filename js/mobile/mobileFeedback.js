let currentHeat = 0;
let heatDecayInterval = null;

export function playFeedback() {
  if (navigator.vibrate) navigator.vibrate(50);
}

export function pulseHeat(increment = 10) {
  const fill = document.getElementById("heat-fill");
  if (!fill) return;

  currentHeat = Math.min(currentHeat + increment, 100);
  fill.style.height = `${currentHeat}%`;

  startHeatDecay();
}

function startHeatDecay() {
  if (heatDecayInterval) return; 

  heatDecayInterval = setInterval(() => {
    const fill = document.getElementById("heat-fill");
    if (!fill) return;

    currentHeat = Math.max(currentHeat - 1, 0);
    fill.style.height = `${currentHeat}%`;

    if (currentHeat <= 0) {
      clearInterval(heatDecayInterval);
      heatDecayInterval = null;
    }
  }, 2000); 
}

export function pulseRage() {
  const overlay = document.getElementById("rage-overlay");
  if (!overlay) return;

  overlay.style.animation = 'none';
  overlay.offsetHeight;
  overlay.style.animation = 'ragePulse 1.2s ease-in-out';
}

export function handleAction(action) {
  switch (action) {
    case "mommy":
      if (typeof window.triggerRitual === 'function') window.triggerRitual();
      pulseRage();
      break;
    case "worm":
      if (typeof window.revealSecret === 'function') window.revealSecret("the worm hungers...");
      pulseHeat();
      break;
    case "secret":
      const secrets = [
        "i watched you sleep last night",
        "you’ve always been mine",
        "you were never supposed to leave",
        "i loved you before you were born"
      ];
      alert(secrets[Math.floor(Math.random() * secrets.length)]);
      break;
    default:
      console.warn(`Unknown action: ${action}`);
  }
}
