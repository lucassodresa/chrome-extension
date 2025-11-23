const timeElement = document.getElementById("time");
const nameElement = document.getElementById("name");
const timerElement = document.getElementById("timer");

function updateTimeElements() {
  chrome.storage.local.get(["timer"], (res) => {
    const time = res.timer ?? 0;
    timerElement.textContent = `The time is at: ${time} seconds`;
  });

  const currentTime = new Date().toLocaleTimeString();
  timeElement.textContent = `The time is: ${currentTime}`;
}

updateTimeElements();
setInterval(updateTimeElements, 1000);

chrome.storage.sync.get(["name"], ({ name }) => {
  const nameToShow = name ?? "???";
  nameElement.textContent = `Your name is: ${nameToShow}`;
});

const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const resetButton = document.getElementById("reset");

startButton.addEventListener("click", () => {
  chrome.storage.local.set({
    isRunning: true,
  });
});

stopButton.addEventListener("click", () => {
  chrome.storage.local.set({
    isRunning: false,
  });
});

resetButton.addEventListener("click", () => {
  chrome.storage.local.set({
    timer: 0,
    isRunning: false,
  });
});
