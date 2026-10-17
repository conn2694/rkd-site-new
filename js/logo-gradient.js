// ---------------------------------------------------------------
// Logo gradient: the colors running across the RK-d logo, left to right.
// Every page loads this file, so changes here update the logo everywhere.
//
// Each line is one point in the gradient:
//   position  how far across the logo, from 0 (left edge) to 1 (right edge);
//             0.3 means 30% of the way across
//   color     the color at that point
// Colors blend smoothly between points. Two points with the same color
// make a solid band (like pink from 0 to 0.30 below).
// Keep the lines in order from left to right, with a comma after each.
// ---------------------------------------------------------------
const logoGradient = [
  { position: 0,    color: "#FF94B0" },  // pink
  { position: 0.50, color: "#FF94B0" },
  { position: 0.70, color: "#C2A7EC" },  // purple
  { position: 1.00, color: "#65CBFF" },  // blue
];

// Builds the gradient (and the logo-shaped mask it's clipped to) that the
// logos on the page point at with url(#logo-gradient) and url(#logo-mask).
document.addEventListener("DOMContentLoaded", function () {
  const NS = "http://www.w3.org/2000/svg";

  function el(name, attrs) {
    const node = document.createElementNS(NS, name);
    for (const key in attrs) node.setAttribute(key, attrs[key]);
    return node;
  }

  const gradient = el("linearGradient", { id: "logo-gradient" });
  logoGradient.forEach(function (point) {
    gradient.appendChild(el("stop", { offset: point.position, "stop-color": point.color }));
  });

  const mask = el("mask", { id: "logo-mask", style: "mask-type: alpha" });
  mask.appendChild(el("image", { href: "images/logo.png", width: 1700, height: 750 }));

  const defs = el("defs", {});
  defs.append(gradient, mask);

  const svg = el("svg", { width: 0, height: 0, style: "position: absolute", "aria-hidden": "true" });
  svg.appendChild(defs);
  document.body.prepend(svg);
});
