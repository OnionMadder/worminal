import { checkWormMemoryEscalation } from './wormEscalation.js';
import { giveGiftToWorm } from './giftHandler.js';
import { respondToWormMisbehavior } from './char/mommy/wormMommy.js';
import { availableGifts } from './giftCatalog.js';
import { resetAllWormPals } from './wormReset.js';

import * as bobMemory from './char/bob/memory.js';
import * as wormyMemory from './char/wormy/memory.js';
import * as squirmyMemory from './char/squirmy/memory.js';

bobMemory.incrementStat("affection", 2);
bobMemory.setMood("curious");
bobMemory.save();

wormyMemory.incrementStat("trust", 2);
wormyMemory.setMood("shy");
wormyMemory.save();

squirmyMemory.incrementStat("trust", 2);
squirmyMemory.setMood("shy");
squirmyMemory.save();

const wormModules = {
  bob: bobMemory,
  wormy: wormyMemory,
  squirmy: squirmyMemory
};

document.addEventListener("DOMContentLoaded", () => {
  console.log("WormPals page loaded.");

  const returnWorm = document.getElementById("return-worm");

  if (returnWorm) {
    returnWorm.addEventListener("click", () => {
      const popup = document.createElement("img");
      popup.src = "images/hiddenworm.png";
      popup.alt = "Returning...";
      popup.className = "secret-worm-popup";
      document.body.appendChild(popup);

      const message = document.createElement("div");
      message.className = "worm-popup-text";
      message.textContent = "she’s calling you back...";
      document.body.appendChild(message);

      setTimeout(() => {
        window.location.href = "/worminal/";
      }, 2500);
    });
  }

  const input = document.getElementById("terminal-input");
  const log = document.getElementById("terminal-log");
  const inputCountDisplay = document.getElementById("input-count");
  let inputCount = 0;

  const analyzeInput = (text) => {
    const lower = text.toLowerCase();
    const sentiment = {
      tone: "neutral",
      mentions: [],
    };

    if (/good boy|love|sweet|thank|miss|please/i.test(lower)) {
      sentiment.tone = "positive";
    } else if (/shut up|stupid|bad worm|hate/i.test(lower)) {
      sentiment.tone = "negative";
    }

    for (const name in wormModules) {
      if (lower.includes(name)) {
        sentiment.mentions.push(name);
      }
    }

    return sentiment;
  };

  const updateEmotions = ({ tone, mentions }) => {
    for (const name in wormModules) {
      const worm = wormModules[name].memory;

      worm.ignored++;

      if (mentions.includes(name)) {
        worm.attention += 1;
        worm.ignored = 0;

        if (tone === "positive") worm.affection += 2;
        if (tone === "negative") worm.jealousy += 1;

        for (const other in wormModules) {
          if (other !== name) {
            wormModules[other].memory.jealousy += 1;
          }
        }
      } else {
        worm.jealousy += 0.5;
      }
    }
  };

  const getWormResponse = () => {
    const weights = Object.entries(wormModules).map(([name, mod]) => {
      const m = mod.memory;
      return {
        name,
        weight: 1 + m.attention + 0.5 * m.affection - m.jealousy
      };
    });

    const total = weights.reduce((sum, w) => sum + w.weight, 0);
    let pick = Math.random() * total;
    let chosen = weights[0].name;

    for (const w of weights) {
      if ((pick -= w.weight) <= 0) {
        chosen = w.name;
        break;
      }
    }

    const worm = wormModules[chosen].memory;

    let text = "";
    if (worm.jealousy > 5) {
      text = `[${chosen.toUpperCase()}] muttered something under his breath.`;
    } else if (worm.affection > 10) {
      text = `[${chosen.toUpperCase()}] leaned closer. ‘i really like when you say that.’`;
    } else if (worm.ignored > 6) {
      text = `[${chosen.toUpperCase()}] whined. ‘you forgot me again…’`;
    } else {
      const lines = {
        wormy: [
          "[WORMY] chirped and bounced off the glass. excited!!",
          "[WORMY] thinks about you at night. don’t ask why."
        ],
        squirmy: [
          "[SQUIRMY] built a tiny glowing nest out of your words.",
          "[SQUIRMY] is leaking a little. but he’s smiling."
        ],
        bob: [
          "[BOB] logged your message. it made his cheeks pink.",
          "[BOB] said thank you. then denied it. classic bob."
        ]
      };
      text = lines[chosen][Math.floor(Math.random() * lines[chosen].length)];
    }

    return { chosen, text };
  };

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && input.value.trim() !== "") {
      const playerInput = input.value.trim();
      input.value = "";
      inputCount++;

      // RESET trigger
      if (playerInput.toLowerCase() === "reset wormpals") {
        resetAllWormPals();
        const resetLine = document.createElement("p");
        resetLine.className = "system-message";
        resetLine.textContent = "[SYSTEM] WormPals reset. Memories wiped. Trust must be rebuilt.";
        log.appendChild(resetLine);
        log.scrollTop = log.scrollHeight;
        if (inputCountDisplay) inputCountDisplay.textContent = inputCount;
        return;
      }

      if (playerInput.startsWith("give ")) {
        const [, wormName, ...giftWords] = playerInput.split(" ");
        const gift = giftWords.join(" ");
        const response = giveGiftToWorm(wormName.toLowerCase(), gift.toLowerCase());

        const playerLine = document.createElement("p");
        playerLine.className = "player-input";
        playerLine.textContent = `> ${playerInput}`;
        log.appendChild(playerLine);

        const wormLine = document.createElement("p");
        wormLine.className = "worm-response";
        wormLine.textContent = response;
        log.appendChild(wormLine);

        if (inputCountDisplay) {
          inputCountDisplay.textContent = inputCount;
        }

        log.scrollTop = log.scrollHeight;
        return;
      }

      const sentiment = analyzeInput(playerInput);
      updateEmotions(sentiment);

      const { chosen, text } = getWormResponse();
      checkWormMemoryEscalation(chosen);
      const playerLine = document.createElement("p");
      playerLine.className = "player-input";
      playerLine.textContent = `> ${playerInput}`;
      log.appendChild(playerLine);

      const wormLine = document.createElement("p");
      wormLine.className = "worm-response";
      wormLine.textContent = text;
      log.appendChild(wormLine);

      if (inputCountDisplay) {
        inputCountDisplay.textContent = inputCount;
      }

      log.scrollTop = log.scrollHeight;
    }
  });
});
