    document.addEventListener('DOMContentLoaded', function () {
      const lightbox = document.getElementById('lightbox');
      const lightboxImg = document.getElementById('lightbox-img');
      const closeBtn = document.querySelector('.lightbox .close');
      const galleryImages = document.querySelectorAll('.gallery img');
      galleryImages.forEach(img => {
        img.addEventListener('click', () => {
          lightbox.style.display = 'flex';
          lightboxImg.src = img.src;
        });
      });
      closeBtn.addEventListener('click', () => {
        lightbox.style.display = 'none';
      });
      lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
          lightbox.style.display = 'none';
        }
      });
    });