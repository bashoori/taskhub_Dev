/* ============================================
   CORE SCRIPT — Mobile Navigation Controller
============================================ */

document.addEventListener("DOMContentLoaded", () => {
  const openBtn = document.getElementById("openMenu");
  const closeBtn = document.getElementById("closeMenu");
  const mobileMenu = document.getElementById("mobileMenu");
  const menuLinks = document.querySelectorAll(".mobile-nav a");

  if (!openBtn || !closeBtn || !mobileMenu) return;

  const openMenu = () => {
    mobileMenu.classList.add("active");
    document.body.classList.add("menu-open");
  };

  const closeMenu = () => {
    mobileMenu.classList.remove("active");
    document.body.classList.remove("menu-open");
  };

  openBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    openMenu();
  });

  closeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    closeMenu();
  });

  // Close when clicking a nav link
  menuLinks.forEach(link => {
    link.addEventListener("click", closeMenu);
  });

  // Close when clicking outside menu
  document.addEventListener("click", (e) => {
    if (
      mobileMenu.classList.contains("active") &&
      !mobileMenu.contains(e.target) &&
      !openBtn.contains(e.target)
    ) {
      closeMenu();
    }
  });

  // Optional: Close on ESC key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeMenu();
    }
  });
});
