const commandImages = [
  "kneel.png",
  "obey.png",
  "worship.png",
  "serve.png",
  "whimper.png",
  "cry.png",
  "suffer.png",
  "beg.png"
];

export function updateMommyCommand() {
  const label = document.getElementById("command-label");
  if (!label) return;

  const choice = commandImages[Math.floor(Math.random() * commandImages.length)];
  label.style.opacity = "0";

  setTimeout(() => {
    label.src = `images/${choice}`;  
    label.alt = choice.replace(".png", "").toUpperCase();
    label.style.opacity = "1";
  }, 200);
}
