const ritualSequence = [
  "audio/whisper1.wav",
  "audio/whisper2.wav",
  "audio/whisper3.wav",
  "audio/whisper4.wav",
  "audio/whisper5.wav",
  "audio/whisper6.wav"
];

function vibrate(ms = 40) {
  if (navigator.vibrate) navigator.vibrate(ms);
}

window.revealSecret = function(text) {
  vibrate(30);
  const log = document.getElementById("terminal-log");
  const p = document.createElement("p");
  p.className = "secret-reveal";
  p.innerHTML = `<span class="prefix">[access]</span> <span class="message">${text}</span>`;
  log.appendChild(p);
  log.scrollTop = log.scrollHeight;
};

window.triggerRitual = function () {
  vibrate(100);

  const log = document.getElementById("terminal-log");
  const p = document.createElement("p");
  p.className = "ritual-start";
  p.innerHTML = `<span class="prefix">[ritual]</span> sequence engaged. hold still.`;
  log.appendChild(p);
  log.scrollTop = log.scrollHeight;

  const screen = document.querySelector(".monitor-container");
 document.body.classList.add("ritual-active"); 


  const fill = document.getElementById("heat-fill");
  if (fill) fill.style.height = "100%";
  const overlay = document.getElementById("rage-overlay");
  if (overlay) overlay.style.animation = 'ragePulse 1.2s ease-in-out';



  setTimeout(() => {
    screen.classList.remove("ritual-anim", "ritual-flash", "ritual-glitch");
    if (fill) fill.style.height = "0%";
  }, 4000);
};

window.startWhisperRitual = async function () {
  const screen = document.querySelector(".monitor-container");
  const log = document.getElementById("terminal-log");

  document.body.classList.add("ritual-active");
  screen.classList.add("ritual-anim", "ritual-glitch");

  for (let i = 0; i < ritualSequence.length; i++) {
    const audio = new Audio(ritualSequence[i]);
    audio.play();

    const p = document.createElement("p");
    p.className = "ritual-step";
    p.innerHTML = `<span class="prefix">[whisper]</span> phase ${i + 1}...`;
    log.appendChild(p);
    log.scrollTop = log.scrollHeight;

    screen.style.filter = `brightness(${1 + i * 0.2}) saturate(${1 + i * 0.1})`;
    vibrate(30 + i * 10);

    await new Promise(resolve => {
      audio.onended = () => resolve();
    });
  }

  screen.classList.remove("ritual-anim", "ritual-glitch");
  screen.style.filter = "";
  document.body.classList.remove("ritual-active");

  window.revealSecret("you have reached the inner sanctum. she's listening now.");
};

let ritualTapCount = 0;

document.getElementById("hotspot-2").addEventListener("click", () => {
  ritualTapCount++;
  if (ritualTapCount >= 6) {
    ritualTapCount = 0;
    startWhisperRitual();
  }
});
