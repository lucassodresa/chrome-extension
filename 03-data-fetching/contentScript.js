const textArray = [];

const aTags = document.getElementsByTagName("a");

for (const tag of aTags) {
  textArray.push(tag.textContent);
}

chrome.storage.local.set({
  textArray,
});

chrome.runtime.sendMessage(null, textArray, (response) => {
  console.log("I'm fron the send response function " + response);
});

chrome.runtime.onMessage.addListener((message, sender) => {
  console.log({ message, sender });
});
