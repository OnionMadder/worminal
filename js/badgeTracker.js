const badgeImages = {
  good: "images/good_boy.png",
  naughty: "naughty_boy.png",
  slut: "images/mommys_slut.png"
};

export function updateBadgeByHeatLevel(percentage) {
  const badgeImg = document.getElementById("player-badge-img");
  if (!badgeImg) return;

  let current = "good";

  if (percentage >= 100) {
    current = "slut";
  } else if (percentage >= 66) {
    current = "naughty";
  }

  const src = badgeImages[current];

  badgeImg.src = src;
  badgeImg.alt = `Badge: ${current}`;
  badgeImg.classList.add("changed");
  setTimeout(() => badgeImg.classList.remove("changed"), 800);
}
