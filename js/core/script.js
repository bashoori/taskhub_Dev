/* ============================================
   CORE SCRIPT — Minimal Slide Mobile Nav
============================================ */

document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".menu-toggle");
  const mobileNav = document.querySelector("#mobileNav");

  if (!toggle || !mobileNav) return;

  toggle.addEventListener("click", () => {
    const isOpen = mobileNav.classList.toggle("open");

    document.body.style.overflow = isOpen ? "hidden" : "auto";
  });

  // Close menu if clicked outside
  document.addEventListener("click", (e) => {
    if (
      mobileNav.classList.contains("open") &&
      !mobileNav.contains(e.target) &&
      !toggle.contains(e.target)
    ) {
      mobileNav.classList.remove("open");
      document.body.style.overflow = "auto";
    }
  });
});
