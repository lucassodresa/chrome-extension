chrome.runtime.onInstalled.addListener((details) => {
  chrome.contextMenus.create({
    title: "Test Context Menu",
    id: "contextMenu1",
    contexts: ["page", "selection"],
  });

  chrome.contextMenus.create({
    title: "Read This Text",
    id: "contextMenu2",
    contexts: ["page", "selection"],
  });

  chrome.storage.local.set({
    shows: [],
  });

  chrome.contextMenus.onClicked.addListener((event) => {
    // chrome.tabs.create({
    //   url: `https://www.imdb.com/find/?q=${event.selectionText}&ref_=hm_nv_srb_sm`,
    // });

    if (event.menuItemId === "contextMenu1") {
      fetch(`https://api.tvmaze.com/search/shows?q=${event.selectionText}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          chrome.storage.local.set({
            shows: data,
          });
        });
    } else if (event.menuItemId === "contextMenu2") {
      chrome.tts.speak(event.selectionText);
    }
  });
});

chrome.storage.local.get(["textArray"], (res) => {
  console.log(res);
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log({ message, sender, sendResponse });
  sendResponse("received message from background");
  chrome.tabs.sendMessage(sender.tab.id, "Got your message from background");
});
