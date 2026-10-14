// ---------------------------------------------------------------
// Fills in the About Me page text.
// The text itself lives in js/about-text.js.
// ---------------------------------------------------------------
const aboutParagraphs = aboutText.paragraphs;

document.addEventListener("DOMContentLoaded", function () {
  // Fill every .about-text on the page
  // (the page has one for the mobile layout and one for desktop).
  document.querySelectorAll(".about-text").forEach(function (box) {
    aboutParagraphs.forEach(function (text) {
      const p = document.createElement("p");
      p.textContent = text;
      box.appendChild(p);
    });
  });
});
