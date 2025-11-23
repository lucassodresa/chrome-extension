chrome.alarms.create({
  periodInMinutes: 1 / 60,
});

chrome.alarms.onAlarm.addListener((alarm) => {
  chrome.storage.local.get(["timer", "isRunning"], (res) => {
    const time = res.timer ?? 0;
    const isRunning = res.isRunning ?? true;
    if (!isRunning) return;

    const incrementedTime = time + 1;
    chrome.storage.local.set({
      timer: incrementedTime,
    });

    chrome.action.setBadgeText({
      text: `${incrementedTime}`,
    });

    chrome.storage.sync.get(["notificationTime"], (res) => {
      const notificationTime = res.notificationTime ?? 1000;
      console.log({ notificationTime });
      if (time % notificationTime === 0) {
        this.registration.showNotification("Chrome Timer Extension", {
          body: `${notificationTime} second has passed!`,
          icon: "icon.png",
        });
      }
    });
  });
});
