const copyButton = document.getElementById("copyButton");
const slideBox = document.getElementById("slideBox");

copyButton.addEventListener("click", () => {
  const ip = "PLAY.SOLOMC.FUN";

  navigator.clipboard.writeText(ip).then(() => {
    slideBox.textContent = "Copied To Clipboard: " + ip;
    slideBox.style.backgroundColor = "#99EEF0";
    slideBox.style.color = "#000";
    slideBox.classList.add("show");

    setTimeout(() => {
      slideBox.classList.remove("show");
    }, 2000);
  }).catch(err => {
    slideBox.textContent = "Failed to copy!";
    slideBox.style.backgroundColor = "#FFCCCC";
    slideBox.style.color = "#000";
    slideBox.classList.add("show");

    setTimeout(() => {
      slideBox.classList.remove("show");
      slideBox.style.backgroundColor = "#99EEF0";
      slideBox.textContent = "Copied To Clipboard: " + ip;
    }, 2000);
  });
});

const storePopup = document.getElementById('storePopup');
const openStorePopup = document.getElementById('openStorePopup');
const closeStorePopup = document.getElementById('closeStorePopup');

openStorePopup.addEventListener('click', (e) => {
  e.preventDefault();
  storePopup.style.display = 'flex';
});

closeStorePopup.addEventListener('click', () => {
  storePopup.style.display = 'none';
});

window.addEventListener('click', (e) => {
  if (e.target === storePopup) {
    storePopup.style.display = 'none';
  }
});

