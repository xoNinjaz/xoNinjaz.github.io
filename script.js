document.addEventListener('DOMContentLoaded', () => {
  /* ====== Copy / SlideBox logic ====== */
  const copyButton = document.getElementById('copyButton');
  const slideBox = document.getElementById('slideBox');
  const IP_TEXT = 'PLAY.SOLOMC.FUN';

  function showSlideBox(line1, line2, bgColor = '#4ED6C5', duration = 2000) {
    if (!slideBox) return;
    slideBox.innerHTML = line2 ? `${line1}<br><strong>${line2}</strong>` : line1;
    slideBox.style.backgroundColor = bgColor;
    slideBox.style.color = '#000';
    slideBox.classList.add('show');
    if (slideBox._hideTimeout) clearTimeout(slideBox._hideTimeout);
    slideBox._hideTimeout = setTimeout(() => {
      slideBox.classList.remove('show');
    }, duration);
  }

  if (copyButton) {
    copyButton.addEventListener('click', () => {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(IP_TEXT).then(() => {
          showSlideBox('Copied IP To Clipboard:', IP_TEXT, '#4ED6C5', 2000);
        }).catch(() => {
          showSlideBox('Failed to copy!', '', '#FFCCCC', 2000);
        });
      } else {
        const ta = document.createElement('textarea');
        ta.value = IP_TEXT;
        ta.style.position = 'fixed';
        ta.style.left = '-9999px';
        document.body.appendChild(ta);
        ta.select();
        try {
          const ok = document.execCommand('copy');
          if (ok) {
            showSlideBox('Copied IP To Clipboard:', IP_TEXT, '#4ED6C5', 2000);
          } else {
            showSlideBox('Failed to copy!', '', '#FFCCCC', 2000);
          }
        } catch (e) {
          showSlideBox('Failed to copy!', '', '#FFCCCC', 2000);
        } finally {
          document.body.removeChild(ta);
        }
      }
    });
  }

  /* ====== Crazy Highlight Animation ====== */
  function highlightIPButtonWithEffects() {
    const ipButton = document.getElementById('copyButton');
    if (!ipButton) return;

    ipButton.style.position = 'relative';
    ipButton.classList.add('highlight');

    const helper = document.createElement('div');
    helper.classList.add('helper-text');
    helper.textContent = 'Click here to copy the IP!';
    ipButton.appendChild(helper);

    // Lightning flash
    const flash = document.createElement('div');
    flash.classList.add('flash-overlay');
    document.body.appendChild(flash);
    setTimeout(() => flash.remove(), 500);

    // Page shake
    document.body.classList.add('shake');
    setTimeout(() => document.body.classList.remove('shake'), 500);

    // Floating balls thump
    document.querySelectorAll('canvas[data-particles="true"]').forEach(canvas => {
      canvas.style.animation = 'thump 0.5s infinite';
      setTimeout(() => canvas.style.animation = '', 3000);
    });

    // Remove effects
    const removeHighlight = () => {
      ipButton.classList.remove('highlight');
      if (helper && helper.parentNode) helper.remove();
      ipButton.removeEventListener('click', removeHighlight);
    };
    ipButton.addEventListener('click', removeHighlight);
    setTimeout(removeHighlight, 5000);
  }

  /* ====== Trigger crazy effect on CTA button click ====== */
  const getStartedBtn = document.querySelector('.cta-btn');
  if (getStartedBtn) {
    getStartedBtn.addEventListener('click', (e) => {
      e.preventDefault();
      highlightIPButtonWithEffects();
      const ipButton = document.getElementById('copyButton');
      if (ipButton) {
        ipButton.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }

  /* ====== Scroll fade-in animation ====== */
  document.addEventListener('scroll', () => {
    document.querySelectorAll('.fade-in').forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) el.classList.add('visible');
    });
  });

  /* ====== Particle background ====== */
  (function initParticles() {
    const existing = document.querySelector('canvas[data-particles="true"]');
    if (existing) return;

    const canvas = document.createElement('canvas');
    canvas.setAttribute('data-particles', 'true');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '-1';
    canvas.style.pointerEvents = 'none';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let particles = [];

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    function createParticles() {
      particles = [];
      for (let i = 0; i < 40; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * 3 + 1,
          dx: (Math.random() - 0.5) * 0.5,
          dy: (Math.random() - 0.5) * 0.5,
          color: Math.random() > 0.5 ? '#b88cff' : '#ffffff'
        });
      }
    }

    function drawParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      });
    }

    function animateParticles() {
      drawParticles();
      requestAnimationFrame(animateParticles);
    }

    createParticles();
    animateParticles();
  })();

  /* ====== Store popup handlers (safe) ====== */
  const storeLink = document.querySelector('.nav a[href="#store"], .store-link');
  const storePopup = document.getElementById('storeUnavailablePopup');

  if (storeLink && storePopup) {
    const popupClose = storePopup.querySelector('.popup-close');

    storeLink.addEventListener('click', (e) => {
      e.preventDefault();
      storePopup.style.display = 'flex';
    });

    if (popupClose) {
      popupClose.addEventListener('click', () => {
        storePopup.style.display = 'none';
      });
    }

    storePopup.addEventListener('click', (e) => {
      if (e.target === storePopup) {
        storePopup.style.display = 'none';
      }
    });
  }

/* ====== Gamemodes: infinite scroll + click-to-expand details ====== */
  (function initGamemodes() {
    const gmTrack = document.querySelector('.gamemodes-track');
    const gamemodeCards = document.querySelectorAll('.gamemode-card');
    const detailsSection = document.getElementById('gamemodeDetails');
    const detailsTitle = document.getElementById('detailsTitle');
    const detailsDescription = document.getElementById('detailsDescription');
    const detailsIcon = document.getElementById('detailsIcon');
    const closeDetails = document.getElementById('closeDetails');

    // content data
    const gamemodeData = {
      "Lifesteal": {
        desc: "Survive by stealing hearts from your opponents! Every kill grants you a heart. Fight smart and stay alive.",
        image: "images/lifesteal-icon.png",
        glowClass: "lifesteal-glow"
      },
      "Practice PvP": {
        desc: "Sharpen your combat skills in controlled arenas. Practice duels, warm-ups, and ranked matches.",
        image: "images/practice-icon.png",
        glowClass: "practice-glow"
      },
      "SkyBattle": {
        desc: "Fight on floating islands — use bridges, knock opponents off, and claim the sky crown.",
        image: "images/skybattle-icon.png",
        glowClass: "skybattle-glow"
      },
      "Coming Soon": {
        desc: "An exciting new gamemode is on the way. Stay tuned for special events, features, and rewards.",
        image: "images/comingsoon-icon.png",
        glowClass: "comingsoon-glow"
      }
    };

    // ensure each card has data-title (fallback) and icon src
    gamemodeCards.forEach(card => {
      if (!card.dataset.title) {
        const label = card.querySelector('.card-label');
        card.dataset.title = label ? label.textContent.trim() : card.textContent.trim();
      }
      const iconImg = card.querySelector('.card-icon');
      if (iconImg && card.dataset.image && !iconImg.src) iconImg.src = card.dataset.image;
    });

    // basic infinite scroll if gmTrack exists: move transform left and reset
    if (gmTrack) {
      let speed = window.innerWidth <= 768 ? 0.35 : 0.6;
      let pos = 0;
      let paused = false;

      function frame() {
        if (!paused) {
          pos -= speed;
          if (Math.abs(pos) >= gmTrack.scrollWidth / 2) pos = 0;
          gmTrack.style.transform = `translateX(${pos}px)`;
        }
        requestAnimationFrame(frame);
      }

      gmTrack.addEventListener('mouseenter', () => paused = true);
      gmTrack.addEventListener('mouseleave', () => paused = false);
      // start loop (in case CSS animation isn't desired or to ensure robustness)
      requestAnimationFrame(frame);
    }

    // details panel toggling
    let currentGlowClass = '';
    let activeCardTitle = '';

    function hideDetails() {
      if (!detailsSection.classList.contains('show')) return;
      detailsSection.classList.remove('show');
      detailsSection.classList.add('hide');
      setTimeout(() => {
        detailsSection.style.display = 'none';
        detailsSection.classList.remove('hide');
        if (currentGlowClass) {
          detailsSection.classList.remove(currentGlowClass);
          currentGlowClass = '';
        }
      }, 360);
      activeCardTitle = '';
    }

    gamemodeCards.forEach(card => {
      card.addEventListener('click', () => {
        const title = card.dataset.title;
        const data = gamemodeData[title] || { desc: "More details coming soon.", image: "", glowClass: "" };

        // toggle on same clicked card
        if (activeCardTitle === title && detailsSection.classList.contains('show')) {
          hideDetails();
          return;
        }

        // remove old glow
        if (currentGlowClass) detailsSection.classList.remove(currentGlowClass);
        // set new glow
        if (data.glowClass) {
          detailsSection.classList.add(data.glowClass);
          currentGlowClass = data.glowClass;
        }

        // set content into details
        detailsTitle.textContent = title;
        detailsDescription.textContent = data.desc || "";
        detailsIcon.src = data.image || "";
        detailsIcon.alt = title + " icon";

        // show details
        detailsSection.style.display = 'block';
        requestAnimationFrame(() => detailsSection.classList.add('show'));
        activeCardTitle = title;

        // scroll into view smoothly
        detailsSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
    });

    if (closeDetails) closeDetails.addEventListener('click', hideDetails);

    // auto-close on large scroll away
    window.addEventListener('scroll', () => {
      if (!detailsSection.classList.contains('show')) return;
      const rect = detailsSection.getBoundingClientRect();
      if (rect.top < -300 || rect.bottom > window.innerHeight + 300) hideDetails();
    });

    // close with Escape
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') hideDetails();
    });

  })(); // end gamemodes init

// Email click-to-copy
const emailTextEl = document.getElementById('emailText');
const emailTooltip = document.getElementById('emailTooltip');
const emailValue = "support@solomc.fun";

if (emailTextEl && emailTooltip) {
  emailTextEl.addEventListener('click', () => {
    navigator.clipboard.writeText(emailValue).then(() => {
      emailTooltip.textContent = "Copied!";
      emailTooltip.style.opacity = "1";
      setTimeout(() => {
        emailTooltip.textContent = "Click To Copy";
        emailTooltip.style.opacity = "";
      }, 2000);
    });
  });
}

}); // DOMContentLoaded
