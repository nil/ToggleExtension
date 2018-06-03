let isScriptExecuted = false;
let isExtensionActive = false;

function sendStatusToTab(tabs) {
  for (let tab of tabs) {
    browser.tabs.sendMessage(
      tab.id,
      isExtensionActive
    )
  }
}

browser.browserAction.onClicked.addListener((tab) => {
  isExtensionActive = !isExtensionActive

  if (!isScriptExecuted) {
    isScriptExecuted = true;

    browser.tabs.executeScript({
      file: "scripts/content.js"
    });

    browser.tabs.insertCSS({
      file: "styles/content.css"
    })
  };

  if (isExtensionActive) {
    browser.browserAction.setIcon({
      tabId: tab.id,
      path: {
        16: "icons/enabled-16.png",
        32: "icons/enabled-32.png",
        48: "icons/enabled-48.png"
      }
    });
  } else {
    browser.browserAction.setIcon({
      tabId: tab.id,
      path: {
        16: "icons/disabled-16.png",
        32: "icons/disabled-32.png",
        48: "icons/disabled-48.png"
      }
    });
  }

  browser.tabs.query({
    currentWindow: true,
    active: true
  }).then(sendStatusToTab);
});

// This is necessary as Firefox doesn't
// support backrground persistent.
browser.tabs.onUpdated.addListener(() => {
  isScriptExecuted = false;
})
