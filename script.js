// JavaScript code
window.addEventListener('scroll', function () {
    var scrollButton = document.querySelector('.scroll-up-button');
    if (window.scrollY > 0) {
        scrollButton.classList.add('show');
    } else {
        scrollButton.classList.remove('show');
    }
});

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function zoomImage(src) {
    var imageZoom = document.createElement('div');
    imageZoom.classList.add('image-zoom');

    var image = document.createElement('img');
    image.src = src;

    var closeButton = document.createElement('span');
    closeButton.classList.add('close-button');
    closeButton.innerHTML = '&times;';
    closeButton.addEventListener('click', function () {
        document.body.removeChild(imageZoom);
    });

    imageZoom.appendChild(image);
    imageZoom.appendChild(closeButton);
    document.body.appendChild(imageZoom);
}

function showGallery(galleryId) {
    var sections = document.querySelectorAll('section');
    sections.forEach(function (section) {
        section.style.display = 'none';
    });

    var activeLink = document.querySelector('.nav-links .active');
    activeLink.classList.remove('active');

    var targetSection = document.getElementById(galleryId);
    targetSection.style.display = 'block';

    var targetLink = document.querySelector('.nav-links a[href="#' + galleryId + '"]');
    targetLink.classList.add('active');
}