let tasks = [];

function updateTime() {
  chrome.storage.local.get(["timer", "timeOption"], (res) => {
    const time = document.getElementById("time");
    const minutes = res.timeOption - Math.ceil(res.timer / 60);
    const seconds = 60 - (res.timer % 60);
    const isZeroSeconds = res.timer % 60 === 0;
    const minutesText = String(minutes).padStart(2, "0");
    const secondsText = isZeroSeconds ? "00" : String(seconds).padStart(2, "0");
    time.textContent = `${minutesText}:${secondsText}`;
  });
}

updateTime();
setInterval(updateTime, 1000);

const startTimerBtn = document.getElementById("start-timer-btn");
startTimerBtn.addEventListener("click", () => {
  chrome.storage.local.get(["isRunning"], (res) => {
    chrome.storage.local.set(
      {
        isRunning: !res.isRunning,
      },
      () => {
        startTimerBtn.textContent = !res.isRunning
          ? "Pause Timer"
          : "Start Timer";
      }
    );
  });
});

const resetTimerBtn = document.getElementById("reset-timer-btn");
resetTimerBtn.addEventListener("click", () => {
  chrome.storage.local.set(
    {
      timer: 0,
      isRunning: false,
    },
    () => {
      startTimerBtn.textContent = "Start Timer";
    }
  );
});

const addTaskBtn = document.getElementById("add-task-btn");
addTaskBtn.addEventListener("click", () => addTask());

chrome.storage.sync.get(["tasks"], (res) => {
  tasks = res.tasks ?? [];
  renderTasks();
});

function saveTasks() {
  chrome.storage.sync.set({
    tasks,
  });
}

function renderTask(taskNumber) {
  const taskRow = document.createElement("div");

  const text = document.createElement("input");
  text.type = "text";
  text.placeholder = "Enter a task...";
  text.value = tasks[taskNumber];
  text.className = "task-input";
  text.addEventListener("change", () => {
    tasks[taskNumber] = text.value;
    saveTasks();
  });

  const deleteBtn = document.createElement("input");
  deleteBtn.type = "button";
  deleteBtn.value = "x";
  deleteBtn.className = "task-delete";

  deleteBtn.addEventListener("click", () => {
    deleteTask(taskNumber);
  });

  taskRow.appendChild(text);
  taskRow.appendChild(deleteBtn);

  const taskContainer = document.getElementById("task-container");
  taskContainer.appendChild(taskRow);
}

function addTask() {
  const taskNumber = tasks.length;
  tasks.push("");
  renderTask(taskNumber);
  saveTasks();
}

function deleteTask(taskNumber) {
  tasks.splice(taskNumber, 1);
  renderTasks();
  saveTasks();
}

function renderTasks() {
  const taskContainer = document.getElementById("task-container");
  taskContainer.textContent = "";
  tasks.forEach((_, taskNumber) => renderTask(taskNumber));
}
