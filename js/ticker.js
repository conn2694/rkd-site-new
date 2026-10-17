// ---------------------------------------------------------------
// Turns the tagline bar under the banner into a scrolling ticker
// that loops forever. The phrases themselves are the <span>s inside
// <div class="tagline"> in each page's HTML.
// ---------------------------------------------------------------
const TICKER_SPEED = 50; // pixels per second

document.addEventListener("DOMContentLoaded", function () {
  const bars = Array.from(document.querySelectorAll(".tagline"));

  bars.forEach(function (bar) {
    bar._items = Array.from(bar.children);
    bar._track = document.createElement("div");
    bar._track.className = "tagline-track";
    bar.replaceChildren(bar._track);
    bar.classList.add("is-ticker");
  });

  // Fill each bar with enough copies of the phrases to cover its width,
  // then add one more identical copy so the loop wraps seamlessly.
  function build(bar) {
    if (!bar.offsetParent) return; // hidden (the other layout); built on resize
    const width = bar.clientWidth;
    if (Number(bar.dataset.builtFor) >= width) return;

    const track = bar._track;
    const group = document.createElement("div");
    group.className = "tagline-group";
    track.replaceChildren(group);

    bar._items.forEach(function (item) { group.appendChild(item.cloneNode(true)); });
    const sets = Math.ceil(width / group.offsetWidth);
    for (let i = 1; i < sets; i++) {
      bar._items.forEach(function (item) {
        const extra = item.cloneNode(true);
        extra.setAttribute("aria-hidden", "true");
        group.appendChild(extra);
      });
    }

    const copy = group.cloneNode(true);
    copy.setAttribute("aria-hidden", "true");
    track.appendChild(copy);

    track.style.animationDuration = group.offsetWidth / TICKER_SPEED + "s";
    bar.dataset.builtFor = width;
  }

  bars.forEach(build);
  window.addEventListener("resize", function () { bars.forEach(build); });
});
