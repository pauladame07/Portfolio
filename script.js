// === NAVBAR HIDE ON SCROLL ===
let lastScrollTop = 0;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', function () {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  if (scrollTop > lastScrollTop) {
    // scroll down
    navbar.classList.add('hide');
  } else {
    // scroll up
    navbar.classList.remove('hide');
  }
  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// === SCROLL TO TOP BUTTON ===
const scrollBtn = document.getElementById('scrollToTopBtn');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    scrollBtn.style.display = 'block';
  } else {
    scrollBtn.style.display = 'none';
  }
});

scrollBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// === IMAGE CAROUSEL SCROLL ===
const gallery = document.querySelector('.gallery');

if (gallery) {
  gallery.addEventListener('wheel', (evt) => {
    evt.preventDefault();
    gallery.scrollLeft += evt.deltaY;
  });
}

// === ZOOM IMAGE ON CLICK ===
document.querySelectorAll('.zoomable').forEach((img) => {
  img.addEventListener('click', function () {
    if (this.style.transform === 'scale(1.5)') {
      this.style.transform = 'scale(1)';
      this.style.cursor = 'zoom-in';
    } else {
      this.style.transform = 'scale(1.5)';
      this.style.cursor = 'zoom-out';
    }
  });
});
