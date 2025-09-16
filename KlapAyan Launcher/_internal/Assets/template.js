(function () {
  'use strict';

  const multiIconMode = false; // true = row of icons, false = single evolving icon

  const killStreakSounds = [
  /* BEGIN_KILL_STREAK_SOUNDS (auto-filled by builder.py) */
  /* add nothing here; this file is a template. */
  /* END_KILL_STREAK_SOUNDS */
];

  const streakIcons = [
  /* BEGIN_STREAK_ICONS (auto-filled by builder.py) */
  /* add nothing here; this file is a template. */
  /* END_STREAK_ICONS */
];

  let streakCount = 0;
  let lastKillId = null;
  let streakTimeout = null;
  let fadeTimeout = null; // 👈 new for auto-hide

  function createOverlay() {
    let overlay = document.querySelector('#killStreakOverlay');
    if (overlay) return overlay;

    overlay = document.createElement('div');
    overlay.id = 'killStreakOverlay';
    Object.assign(overlay.style, {
      position: 'fixed',
      bottom: '30px',
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      gap: multiIconMode ? '10px' : '0px',
      pointerEvents: 'none',
      zIndex: '999999',
      justifyContent: 'center',
      alignItems: 'center',
    });

    if (multiIconMode) {
      streakIcons.forEach((url, i) => {
        const img = document.createElement('img');
        img.src = url;
        img.dataset.index = i;
        img.style.width = '48px';
        img.style.height = '48px';
        img.style.opacity = '0.0';
        img.style.transition = 'opacity 0.4s ease, transform 0.3s ease';
        overlay.appendChild(img);
      });
    } else {
      const img = document.createElement('img');
      img.id = 'streakSingleIcon';
      img.src = streakIcons[0];
      img.style.width = '200px';
      img.style.height = '200px';
      img.style.opacity = '0.0';
      img.style.transition = 'opacity 0.4s ease, transform 0.3s ease';
      overlay.appendChild(img);
    }

    document.body.appendChild(overlay);
    console.log("✅ Kill streak overlay injected.");
    return overlay;
  }
  
  let overlay;
  document.addEventListener("DOMContentLoaded", () => {
    overlay = createOverlay();
  });

  function animateFadeIn(img) {
    if (!img) return;
    img.style.transform = 'scale(1.3)';
    img.style.opacity = '1.0';
    setTimeout(() => {
      img.style.transform = 'scale(1.0)';
    }, 250);
  }

  function updateOverlay() {
    if (multiIconMode) {
      [...overlay.children].forEach((img, i) => {
        if (i < streakCount) {
          if (img.style.opacity === '0' || img.style.opacity === '0.0') {
            animateFadeIn(img);
          }
        } else {
          img.style.opacity = '0.0';
        }
      });
    } else {
      const img = overlay.querySelector('#streakSingleIcon');
      if (!img) return;
      if (streakCount > 0) {
        img.src = streakIcons[Math.min(streakCount - 1, streakIcons.length - 1)];
        animateFadeIn(img);

        // 👇 fade out after 3 seconds
        clearTimeout(fadeTimeout);
        fadeTimeout = setTimeout(() => {
          img.style.opacity = '0.0';
        }, 3000);
      } else {
        img.style.opacity = '0.0';
      }
    }
  }

  function playStreakSound(index) {
    if (index < 0 || index >= killStreakSounds.length) return;
    const audio = new Audio(killStreakSounds[index]);
    audio.volume = 0.3;
    audio.play().catch(() => { });
  }

  function resetStreak(reason = '') {
    if (streakCount > 0) {
      console.log(`🔁 Streak reset${reason ? ` due to ${reason}` : ''}`);
    }
    streakCount = 0;
    updateOverlay();
    clearTimeout(streakTimeout);
    clearTimeout(fadeTimeout);
  }

  function initObserver() {
    const chatList = document.querySelector('#chatList');
    if (!chatList) {
      console.warn('⚠️ chatList not found. Retrying...');
      setTimeout(initObserver, 1000);
      return;
    }

    const observer = new MutationObserver(mutations => {
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (!(node instanceof HTMLElement)) continue;
          const chatMsgSpan = node.querySelector('.chatMsg');
          if (!chatMsgSpan) continue;

          const spans = chatMsgSpan.querySelectorAll('span');
          if (spans.length < 2) continue;

          const first = spans[0];
          const last = spans[spans.length - 1];

          const isYouKilling = first.textContent.trim() === 'You' && first.style.color === 'rgb(255, 255, 255)';
          const isYouKilled = last.textContent.trim() === 'You' && last.style.color === 'rgb(255, 255, 255)';

          const killId = node.id;

          if (isYouKilling && killId !== lastKillId) {
            lastKillId = killId;
            streakCount++;
            console.log(`✅ Kill #${streakCount}`);
            playStreakSound(Math.min(streakCount - 1, killStreakSounds.length - 1));
            updateOverlay();

            clearTimeout(streakTimeout);
            streakTimeout = setTimeout(() => resetStreak('inactivity'), 10000);
          }

          if (isYouKilled) {
            resetStreak('death');
          }
        }
      }
    });

    observer.observe(chatList, { childList: true });
    console.log('✅ Kill streak tracker running. Resets on death or inactivity.');
  }

  window.addEventListener('load', () => {
    setTimeout(initObserver, 2000);
  });
})();