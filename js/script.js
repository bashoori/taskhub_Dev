/* =========================================================
📜 Bita Digital Hub – Global Script (v7)
Author: Bita Ashoori
Handles:
- Header/Footer auto-load (root + /tools/)
- Breadcrumbs for /tools/ pages
- Language dropdown
- Mobile nav toggle
- Smooth scrolling
- Lucide icon initialization
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const isToolPage = window.location.pathname.includes("/tools/");
  const basePath = isToolPage ? "../" : "";

  /* ==========================
     🧭 HEADER LOADER
  ========================== */
  fetch(`${basePath}components/header.html`)
    .then(res => res.text())
    .then(html => {
      const headerPlaceholder = document.getElementById("header-placeholder");
      if (!headerPlaceholder) return;
      headerPlaceholder.innerHTML = html;

      initNavbar();

      // 🧩 Add breadcrumb if this is a tool page
      if (isToolPage) createBreadcrumb();
    })
    .catch(err => console.error("Header load error:", err));

  /* ==========================
     🦶 FOOTER LOADER
  ========================== */
  fetch(`${basePath}components/footer.html`)
    .then(res => res.text())
    .then(html => {
      const footerPlaceholder = document.getElementById("footer-placeholder");
      if (!footerPlaceholder) return;
      footerPlaceholder.innerHTML = html;
      initFooterScroll();
    })
    .catch(err => console.error("Footer load error:", err));

  /* ==========================
     🌀 LUCIDE ICONS
  ========================== */
  document.addEventListener("readystatechange", () => {
    if (document.readyState === "complete" && window.lucide) {
      lucide.createIcons();
    }
  });

  /* =========================================================
     🌍 FUNCTIONS
  ========================================================= */

  // ---------- Initialize Navbar ----------
  function initNavbar() {
    const langBtn = document.getElementById("lang-btn");
    const langMenu = document.getElementById("lang-menu");
    const navLinks = document.querySelector(".nav-links");
    const menuToggle = document.querySelector(".menu-toggle");

    /* 🌐 Language Dropdown */
    if (langBtn && langMenu) {
      langBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        langMenu.classList.toggle("show");
      });
      document.addEventListener("click", (e) => {
        if (!langBtn.contains(e.target)) langMenu.classList.remove("show");
      });
    }

    /* 📱 Mobile Menu Toggle */
    if (menuToggle && navLinks) {
      menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("show");
        menuToggle.classList.toggle("open");
      });
    }

    /* 🧭 Smooth Scroll */
    document.querySelectorAll('.nav-links a[href^="#"], .get-started[href^="#"]').forEach(link => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute("href"));
        if (target) target.scrollIntoView({ behavior: "smooth" });

        if (navLinks && menuToggle) {
          navLinks.classList.remove("show");
          menuToggle.classList.remove("open");
        }
      });
    });
  }

  // ---------- Initialize Footer ----------
  function initFooterScroll() {
    document.querySelectorAll('.footer a[href^="#"]').forEach(link => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute("href"));
        if (target) target.scrollIntoView({ behavior: "smooth" });
      });
    });
  }

  // ---------- Breadcrumb Builder ----------
  function createBreadcrumb() {
    const pathParts = window.location.pathname.split("/");
    const fileName = pathParts[pathParts.length - 1].replace(".html", "");
    const prettyName = fileName
      .replace(/-/g, " ")
      .replace(/\b\w/g, c => c.toUpperCase());

    const breadcrumb = document.createElement("nav");
    breadcrumb.className = "breadcrumb-nav";
    breadcrumb.innerHTML = `
      <div class="breadcrumb">
        <a href="${basePath}index.html">🏠 Home</a>
        <span>›</span>
        <a href="${basePath}#tools">Tools</a>
        <span>›</span>
        <span class="current">${prettyName}</span>
      </div>
    `;

    // Insert breadcrumb just after header
    const header = document.querySelector(".navbar");
    if (header && header.parentNode) {
      header.insertAdjacentElement("afterend", breadcrumb);
    }
  }
});
