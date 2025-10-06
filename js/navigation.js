// ===========================
// Responsive Navigation Script
// ===========================

document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");
  const dropdowns = document.querySelectorAll(".dropdown");

  // --- Burger Menü: öffnen/schließen ---
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    navToggle.classList.toggle("open");

    // Animate burger icon
    const burger = navToggle.querySelector(".hamburger");
    if (navToggle.classList.contains("open")) {
      burger.style.transform = "rotate(45deg)";
      burger.before.style.transform = "translateY(0) rotate(90deg)";
      burger.after.style.transform = "translateY(0) rotate(90deg)";
    }
  });

  // --- Automatisch schließen nach Klick auf Link (auf Mobil) ---
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 768) {
        navLinks.classList.remove("active");
        navToggle.classList.remove("open");
      }
    });
  });

  // --- Dropdowns auf Touch-Geräten ---
  dropdowns.forEach((dropdown) => {
    const link = dropdown.querySelector("a");
    const content = dropdown.querySelector(".dropdown-content");

    // Ersten Tap öffnet, zweiten Tap klickt
    let tappedOnce = false;
    link.addEventListener("touchend", (e) => {
      if (window.innerWidth > 768) return;
      if (!tappedOnce) {
        tappedOnce = true;
        e.preventDefault();
        content.style.display =
          content.style.display === "block" ? "none" : "block";
        setTimeout(() => (tappedOnce = false), 400);
      }
    });
  });

  // --- Schließt Menü beim Scrollen ---
  window.addEventListener("scroll", () => {
    if (window.innerWidth <= 768 && navLinks.classList.contains("active")) {
      navLinks.classList.remove("active");
      navToggle.classList.remove("open");
    }
  });
});
