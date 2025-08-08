// set year
document.getElementById('year').textContent = new Date().getFullYear();

// copy IP / join button
const ipEl = document.getElementById('serverIp');
const joinBtn = document.getElementById('joinBtn');
joinBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const ip = ipEl.textContent.trim();
  navigator.clipboard?.writeText(ip).then(() => {
    joinBtn.textContent = 'IP copied!';
    setTimeout(() => joinBtn.textContent = 'Click to copy IP', 2000);
  }).catch(() => {
    // fallback: try prompt
    const ok = confirm('Copy server IP? Click OK to copy: ' + ip);
    if (ok) {
      try { navigator.clipboard.writeText(ip); } catch (_) {}
    }
  });
});
// Toggle seasonal note
const seasonalToggle = document.getElementById('seasonalToggle');
const seasonalNote = document.getElementById('seasonal-note');

seasonalToggle.addEventListener('click', (e) => {
  e.preventDefault();
  seasonalNote.classList.toggle('open');
  seasonalToggle.classList.toggle('open');
});
