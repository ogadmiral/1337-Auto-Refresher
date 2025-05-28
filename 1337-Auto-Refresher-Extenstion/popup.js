const toggle = document.getElementById('toggle');
const intervalInput = document.getElementById('interval');

chrome.storage.sync.get(["enabled", "interval"], (data) => {
  toggle.checked = data.enabled || false;
  intervalInput.value = data.interval || 15;
});

toggle.addEventListener('change', () => {
  chrome.storage.sync.set({ enabled: toggle.checked });
});

intervalInput.addEventListener('change', () => {
  const val = parseInt(intervalInput.value, 10);
  if (!isNaN(val) && val > 0) {
    chrome.storage.sync.set({ interval: val });
  }
});
