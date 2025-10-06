// ===========================
// Responsive Lightbox mit Swipe & Fullscreen
// ===========================

document.addEventListener("DOMContentLoaded", () => {
  const galleryImages = document.querySelectorAll(".gallery img");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeBtn = document.querySelector(".lightbox .close");

  let currentIndex = 0;

  // Bilder in Array umwandeln
  const images = Array.from(galleryImages).map(img => img.src);

  // Klick auf Bild öffnet Lightbox
  galleryImages.forEach((img, index) => {
    img.addEventListener("click", () => {
      openLightbox(index);
    });
  });

  function openLightbox(index) {
    currentIndex = index;
    lightboxImg.src = images[index];
    lightbox.style.display = "flex";
    document.body.style.overflow = "hidden"; // Kein Scrollen im Hintergrund
  }

  function closeLightbox() {
    lightbox.style.display = "none";
    document.body.style.overflow = "auto";
  }

  // Navigation mit Tastatur
  document.addEventListener("keydown", (e) => {
    if (lightbox.style.display === "flex") {
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "Escape") closeLightbox();
    }
  });

  // Klick auf X oder Hintergrund schließt
  closeBtn.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Swipe-Funktion (mobil)
  let touchStartX = 0;
  let touchEndX = 0;

  lightbox.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  lightbox.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleGesture();
  });

  function handleGesture() {
    const diff = touchEndX - touchStartX;
    if (Math.abs(diff) < 50) return; // Nur echte Swipes
    if (diff > 0) showPrev();
    else showNext();
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % images.length;
    lightboxImg.src = images[currentIndex];
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    lightboxImg.src = images[currentIndex];
  }
});
