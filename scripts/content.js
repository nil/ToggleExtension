let isPanelCreated = false;
let panel = document.createElement("div");

function enablePanel() {
  if (!isPanelCreated) {
    isPanelCreated = true;

    panel.id = "te-panel";
    panel.innerHTML = "Panel";
  }
  document.body.appendChild(panel);
}

function disablePanel() {
  panel.remove();
}

browser.runtime.onMessage.addListener(status => {
  if (status) {
    enablePanel();
  } else {
    disablePanel();
  }
});
