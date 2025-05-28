let intervalId = null;

// ⬇️ After reload, scroll to bottom several times to override layout shifts
window.addEventListener("load", () => {
  if (localStorage.getItem("scrollToBottomAfterReload") === "true") {
    let count = 0;
    const scrollDownInterval = setInterval(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
      count++;
      if (count >= 10) { // Scroll for ~2.5 sec
        clearInterval(scrollDownInterval);
        localStorage.removeItem("scrollToBottomAfterReload");
      }
    }, 250);
  }
});

// 🔁 Auto-refresh every 15 seconds with scroll flag
function startAutoRefresh(interval) {
  if (intervalId) clearInterval(intervalId);

  intervalId = setInterval(() => {
    localStorage.setItem("scrollToBottomAfterReload", "true");
    location.reload();
  }, interval * 1000);
}

function stopAutoRefresh() {
  if (intervalId) clearInterval(intervalId);
  intervalId = null;
}

// ⏱ Load settings
chrome.storage.sync.get(["enabled", "interval"], (data) => {
  if (data.enabled) {
    startAutoRefresh(data.interval || 15);
  }
});

chrome.storage.onChanged.addListener(() => {
  chrome.storage.sync.get(["enabled", "interval"], (data) => {
    if (data.enabled) {
      startAutoRefresh(data.interval || 15);
    } else {
      stopAutoRefresh();
    }
  });
});
