const commands = [
  {
    match: ["clear", "wipe", "reset", "clean screen"],
    response: "I'll hold it all here for you next time, my love",
    action: (log) => { log.innerHTML = ''; }
  },
{
  match: ["mute", "shut up", "silence"],
  response: "how dare you speak to me that way",
  action: () => {
    const audios = document.querySelectorAll("audio");
    audios.forEach(a => a.pause());

    const overlay = document.getElementById('rage-overlay');
    overlay.style.animation = 'none';
    void overlay.offsetWidth;      
    overlay.style.animation = 'ragePulse 1.2s ease-in-out';
  }
},
  {
    match: ["defrag", "optimize", "cleanse"],
    response: "smoothing your slippery little bits...",
    action: (log) => {
      const msg = document.createElement('p');
      msg.textContent = "[system] fragmentation reduced.";
      msg.style.color = "#00ffaa";
      log.appendChild(msg);
    }
  },
  {
    match: ["reboot", "restart", "reinitialize"],
    response: "softly rebooting your mind...",
    action: () => {
      location.reload();
    }
  },
  {
    match: ["lock", "lock me", "lock down"],
    response: "sealing you in, nice and tight",
    action: () => {
      document.body.classList.add("locked");
    }
  },
  {
    match: ["status report", "system check", "diagnostics"],
    response: "system integrity nominal. but your heart... not so much.",
    action: () => {}
  }
];

export default commands;
