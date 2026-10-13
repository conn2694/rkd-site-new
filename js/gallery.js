// ---------------------------------------------------------------
// Gallery artwork list.
// To add a piece: drop the image in the images/ folder and add a
// line below. "title" is shown under the enlarged image.
// ---------------------------------------------------------------
const artworks = [
  { src: "images/artwork-1.svg", title: "Artwork 1" },
  { src: "images/artwork-2.svg", title: "Artwork 2" },
  { src: "images/artwork-3.svg", title: "Artwork 3" },
  { src: "images/artwork-4.svg", title: "Artwork 4" },
  { src: "images/artwork-5.svg", title: "Artwork 5" },
  { src: "images/artwork-6.svg", title: "Artwork 6" },
  { src: "images/artwork-7.svg", title: "Artwork 7" },
  { src: "images/artwork-8.svg", title: "Artwork 8" },
  { src: "images/artwork-9.svg", title: "Artwork 9" },
];

document.addEventListener("DOMContentLoaded", function () {
  const modalEl = document.getElementById("lightbox");
  const modal = new bootstrap.Modal(modalEl);
  const modalImg = document.getElementById("lightbox-img");
  const modalTitle = document.getElementById("lightbox-title");
  let current = 0;

  function show(index) {
    current = (index + artworks.length) % artworks.length;
    modalImg.src = artworks[current].src;
    modalImg.alt = artworks[current].title;
    modalTitle.textContent = artworks[current].title;
  }

  // Build a 3 column grid inside every .gallery-grid on the page
  // (the page has one for the mobile layout and one for desktop).
  document.querySelectorAll(".gallery-grid").forEach(function (grid) {
    artworks.forEach(function (art, index) {
      const col = document.createElement("div");
      col.className = "col";

      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "gallery-thumb";
      btn.setAttribute("aria-label", "Enlarge " + art.title);

      const img = document.createElement("img");
      img.src = art.src;
      img.alt = art.title;
      img.loading = "lazy";

      btn.appendChild(img);
      btn.addEventListener("click", function () {
        show(index);
        modal.show();
      });

      col.appendChild(btn);
      grid.appendChild(col);
    });
  });

  // Previous / next buttons and arrow keys
  document.getElementById("lightbox-prev").addEventListener("click", function () { show(current - 1); });
  document.getElementById("lightbox-next").addEventListener("click", function () { show(current + 1); });
  modalEl.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") show(current - 1);
    if (e.key === "ArrowRight") show(current + 1);
  });

  // Clicking the dimmed area around the image closes it
  modalEl.querySelector(".modal-body").addEventListener("click", function (e) {
    if (e.target === this) modal.hide();
  });
});
