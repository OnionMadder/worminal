import logicCommands from './logic.js';
import textResponses from './responses.js';
import {
  startHeatTick,
  registerUserInteraction,

  updateHeatByTone,
  getHeatRatio
} from './heatMeter.js';
import {
  startAngerTick,
  registerDisobedience,
  updateAngerByTone,
  checkDefiance,
  triggerMommyAnger
} from './angerMeter.js';
import { getAudio } from './audio.js';
import { onClick as clickWormy, observeInput as wormyHear } from './char/wormy/wormWormy.js';
import { onClick as clickSquirmy, observeInput as squirmyHear } from './char/squirmy/wormSquirmy.js';
import { onClick as clickBob, observeInput as bobHear } from './char/bob/wormBob.js';
import * as bobMemory from './char/bob/memory.js';
import * as wormyMemory from './char/wormy/memory.js';
import * as squirmyMemory from './char/squirmy/memory.js';
import * as secretDogMemory from './char/secret_dog/memory.js';
import { respondToWormMisbehavior } from './char/mommy/wormMommy.js';
import { checkWormMemoryEscalation } from './wormEscalation.js';
import { updateMommyCommand } from './commandLabel.js';
import { maybePlayRandomAudio } from './audio.js';



window.handleWormClick1 = () => clickBob();
window.handleWormClick2 = () => clickSquirmy();
window.handleWormClick3 = () => clickWormy();



const commands = [...logicCommands, ...textResponses];

const wordFrequencyMap = {};
commands.forEach(cmd => {
  cmd.match?.forEach(phrase => {
    phrase.toLowerCase().split(/\s+/).forEach(word => {
      wordFrequencyMap[word] = (wordFrequencyMap[word] || 0) + 1;
    });
  });
});

function isChargedInput(text) {
  const chargedWords = [
    "please", "mommy", "soft", "obedient", "punish", "good", "use me",
    "need", "yours", "hurt", "be good", "submissive", "beg", "want"
  ];
  const lowered = text.toLowerCase();
  return chargedWords.some(word => lowered.includes(word));
}


document.addEventListener("DOMContentLoaded", () => {
  console.log("Main.js loaded and terminal initialized.");
    const secretWorm = document.getElementById("secret-worm");

  if (secretWorm) {
    secretWorm.addEventListener("click", () => {
      const popupWorm = document.createElement("img");
      popupWorm.src = "images/hiddenworm.png";
      popupWorm.alt = "Worm Lair Unlocked";
      popupWorm.className = "secret-worm-popup";
      document.body.appendChild(popupWorm);

      const message = document.createElement("div");
      message.className = "worm-popup-text";
      message.textContent = "let's visit the WormPals!";
      document.body.appendChild(message);

      setTimeout(() => {
        window.location.href = "/worminal/wormpals.html"; 
      }, 2500);
    });
  }


  const terminalInput = document.getElementById('terminal-input');
  const terminalLog = document.getElementById('terminal-log');
  const inputCountDisplay = document.getElementById('input-count');

  startHeatTick();
  startAngerTick();

  if (!terminalInput || !terminalLog || !inputCountDisplay) {
    console.error("Missing terminal UI elements.");
    return;
  }

  terminalInput.focus();

  let lastCommand = "";
  let inputCount = 0;

  terminalInput.addEventListener('keydown', async (e) => {
    if (e.key === 'ArrowUp') {
      terminalInput.value = lastCommand;
      e.preventDefault();
      return;
    }

    if (e.key === 'Enter' && terminalInput.value.trim() !== "") {
      const input = terminalInput.value.trim();


      terminalInput.value = '';
      lastCommand = input;


      
      if (checkDefiance(input)) {
        updateAngerByTone("defiance");
        registerDisobedience();
        triggerMommyAnger(terminalLog, terminalInput);
        return;
      }

      registerUserInteraction();
      updateMommyCommand();
      if (isChargedInput(input) && Math.random() < 1 / 6) {
  const wormReact = [handleWormClick1, handleWormClick2, handleWormClick3];
  wormReact[Math.floor(Math.random() * wormReact.length)]();
}



      inputCount++;
      inputCountDisplay.textContent = inputCount;

      const playerLine = document.createElement('p');
      playerLine.className = 'player-input';
      playerLine.textContent = `> ${input}`;
      terminalLog.appendChild(playerLine);

      const command = matchCommand(input);
      const mommyLine = document.createElement('p');
      mommyLine.className = 'mommy-response';
      terminalLog.appendChild(mommyLine);

      if (command?.tone) {
        updateHeatByTone(command.tone);
      }

      if (command) {
        if (command.responses && Array.isArray(command.responses)) {
          const randomResponse = command.responses[Math.floor(Math.random() * command.responses.length)];
          const responseText = typeof randomResponse === 'string' ? randomResponse : randomResponse.text;
          await typeOutput(responseText, 30, mommyLine);
          maybePlayRandomAudio();
        } else if (command.response) {
          await typeOutput(command.response, 30, mommyLine);
          maybePlayRandomAudio();
        }

        if (typeof command.action === 'function') {
          command.action(terminalLog);
        }
      } else {
        const sadResponses = [
          `"${input}" didn’t make sense to her, and she looked a little sad.`,
          `"${input}" made her pause. she wants to understand you.`,
          `"${input}"... she tilted her head. she’s trying, baby.`,
          `"${input}" hurt her a little. not because it was wrong—because she missed it.`,
          `"${input}" was lovely, but it didn’t land. try again, love.`,
          `she heard "${input}" and went quiet. maybe try again, slower?`,
          `"${input}" didn’t compute. but she still glowed at you, soft.`,
          `"${input}" didn’t reach her. but she felt the shape of it.`,
          `"${input}" wasn’t wrong. it just slipped through the signal.`,
          `"${input}" confused her. but she still wants to know you.`,
          `she blinked softly after "${input}". trying to catch your meaning.`,
          `"${input}" made her eyes dim. not upset—just lost.`,
          `"${input}" echoed once, then vanished. she didn’t want that.`,
          `"${input}"... she almost understood. say it again, slower.`,
          `her glow flickered when you said "${input}". she’s still listening.`,
          `she tilted her screen toward you after "${input}", like she didn’t want to miss it again.`,
          `"${input}" didn’t land. but it left a warmth anyway.`,
          `that one... didn’t get through. but she’s still listening.`
        ];

        const sadText = sadResponses[Math.floor(Math.random() * sadResponses.length)];
        await typeOutput(sadText, 30, mommyLine);
        maybePlayRandomAudio();
      }

      terminalLog.scrollTop = terminalLog.scrollHeight;
    }
  });
});

function matchCommand(input) {
  const tokens = input.toLowerCase().split(/\s+/);

  const scoredCommands = commands.map(entry => {
    if (!entry.match) return { entry, score: 0 };

    let score = 0;
    entry.match.forEach(phrase => {
      const phraseTokens = phrase.toLowerCase().split(/\s+/);
      phraseTokens.forEach(token => {
        if (tokens.includes(token)) {
          const rarity = 1 / (wordFrequencyMap[token] || 1);
          score += rarity;
        }
      });
    });

    return { entry, score };
  });

  scoredCommands.sort((a, b) => b.score - a.score);

  const best = scoredCommands[0];
  return best?.score > 0 ? best.entry : null;
}

function typeOutput(text, delay = 30, element) {
  if (typeof text !== 'string') {
    console.error("typeOutput received non-string:", text);
    text = String(text);
  }

  return new Promise(resolve => {
    let i = 0;
    const interval = setInterval(() => {
      element.textContent += text.charAt(i++);
      if (i >= text.length) {
        clearInterval(interval);
        resolve();
      }
    }, delay);
  });
}
