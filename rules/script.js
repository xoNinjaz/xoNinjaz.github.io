// ====== Footer Year ======
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// ====== Tab Functionality ======
const buttons = document.querySelectorAll('.tab-btn');
const contents = document.querySelectorAll('.tab-content');

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    buttons.forEach(b => b.classList.remove('active'));
    contents.forEach(c => c.classList.remove('active'));

    btn.classList.add('active');
    document.getElementById(btn.dataset.tab).classList.add('active');
  });
});

// ====== IP Copy Button ======
const copyButton = document.getElementById('copyButton');
const slideBox = document.getElementById('slideBox');
const IP_TEXT = 'PLAY.SOLOMC.FUN';

function showSlideBox(line1, line2, bgColor = '#4ED6C5', duration = 2000) {
  if (!slideBox) return;
  slideBox.innerHTML = line2 ? `${line1}<br><strong>${line2}</strong>` : line1;
  slideBox.style.backgroundColor = bgColor;
  slideBox.classList.add('show');
  if (slideBox._hideTimeout) clearTimeout(slideBox._hideTimeout);
  slideBox._hideTimeout = setTimeout(() => {
    slideBox.classList.remove('show');
  }, duration);
}

if (copyButton) {
  copyButton.addEventListener('click', () => {
    navigator.clipboard.writeText(IP_TEXT).then(() => {
      showSlideBox('Copied IP To Clipboard:', IP_TEXT);
    }).catch(() => {
      showSlideBox('Failed to copy!', '', '#FFCCCC');
    });
  });
}

// ====== Email Click-to-Copy ======
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

// ====== Store Popup ======
const storeLink = document.querySelector('.store-link');
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
