// Load header and footer dynamically
document.addEventListener("DOMContentLoaded", () => {
  fetch("header.html")
    .then(res => res.text())
    .then(html => (document.getElementById("header-placeholder").innerHTML = html));

  fetch("footer.html")
    .then(res => res.text())
    .then(html => (document.getElementById("footer-placeholder").innerHTML = html));
});

// Smooth scroll for anchors
document.addEventListener("click", (e) => {
  if (e.target.matches('a[href^="#"]')) {
    e.preventDefault();
    const target = document.querySelector(e.target.getAttribute("href"));
    if (target) target.scrollIntoView({ behavior: "smooth" });
  }
});
