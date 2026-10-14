// ---------------------------------------------------------------
// Fills in the Commissions page text and images.
// The content itself lives in js/commissions-text.js.
// ---------------------------------------------------------------
const commissionsSections = commissionsText.sections;

document.addEventListener("DOMContentLoaded", function () {
  // Fill every .commissions-content on the page
  // (the page has one for the mobile layout and one for desktop).
  document.querySelectorAll(".commissions-content").forEach(function (box) {
    commissionsSections.forEach(function (section) {
      if (section.image) {
        const img = document.createElement("img");
        img.className = "commissions-img";
        img.src = section.image;
        img.alt = section.alt || "";
        box.appendChild(img);
      } else if (section.text) {
        const p = document.createElement("p");
        p.textContent = section.text;
        box.appendChild(p);
      }
    });
  });
});
