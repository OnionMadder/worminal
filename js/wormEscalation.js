import * as bobMemory from './char/bob/memory.js';
import * as wormyMemory from './char/wormy/memory.js';
import * as squirmyMemory from './char/squirmy/memory.js';
import { respondAsBob } from './char/bob/respond.js';
import { respondAsWormy } from './char/wormy/respond.js';
import { respondAsSquirmy } from './char/squirmy/respond.js';
import { respondToWormMisbehavior } from './char/mommy/wormMommy.js';


const escalationRules = [
  {
    id: 'wormy',
    condition: (m) => m.jealousy >= 10 && !m.scolded,
    action: () => respondToWormMisbehavior('wormy', 'punish'),
    flag: 'scolded',
    module: wormyMemory
  },
  {
    id: 'bob',
    condition: (m) => m.tattled >= 5 && !m.scolded,
    action: () => respondToWormMisbehavior('bob', 'punish'),
    flag: 'scolded',
    module: bobMemory
  },
  {
    id: 'squirmy',
    condition: (m) => m.affection >= 15 && !m.melted,
    action: () => respondToWormMisbehavior('squirmy', 'melt'),
    flag: 'melted',
    module: squirmyMemory
  }
];


export function checkWormMemoryEscalation(wormName) {
  const rule = escalationRules.find(r => r.id === wormName);
  if (!rule) return;

  const mem = rule.module.memory;
  if (rule.condition(mem)) {
    rule.action();
    mem[rule.flag] = true;
    rule.module.save();
  }
}


const wormList = ['wormy', 'squirmy', 'bob'];


function getRandomWorm() {
  return wormList[Math.floor(Math.random() * wormList.length)];
}


export function handleTerminalInput(inputText) {
  const chosenWorm = getRandomWorm();


  const label = document.getElementById('worm-terminal-label');
  if (label) {
    label.textContent = `Line open to: ${chosenWorm.toUpperCase()}`;
  }


  switch (chosenWorm) {
    case 'wormy':
      respondAsWormy(inputText);
      break;
    case 'squirmy':
      respondAsSquirmy(inputText);
      break;
    case 'bob':
    default:
      respondAsBob(inputText);
  }


  checkWormMemoryEscalation(chosenWorm);
}
