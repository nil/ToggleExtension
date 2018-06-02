let isTootlipCreated = false;

function enableTooltip() {
  if (!isTootlipCreated) {
    isTootlipCreated = true;
    let tooltip = document.createElement("div");

    tooltip.id = "et-tooltip";
    tooltip.innerHTML = "Tooltip";

    document.body.appendChild(tooltip)
  }
  document.getElementById("et-tooltip").style.display = "inline-block";
}

function disableTooltip() {
  document.getElementById("et-tooltip").style.display = "none";
}

window.onmousemove = function(e) {
  document.getElementById("et-tooltip").style.left = e.pageX + "px";
  document.getElementById("et-tooltip").style.top = e.pageY + "px";
}

browser.runtime.onMessage.addListener(status => {
  if (status) {
    enableTooltip();
  } else {
    disableTooltip();
  }
});
