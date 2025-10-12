
  document.addEventListener('DOMContentLoaded', function () {
    if (/iPhone/.test(navigator.userAgent) && !window.MSStream) {
      document.documentElement.classList.add('is-iphone');
    }
  });
