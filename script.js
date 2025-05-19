document.addEventListener('DOMContentLoaded', () => {
    // GSAP Animations
    gsap.registerPlugin(ScrollTrigger);

    // Hero Section Typewriter Effect
    const typewriterText = "Paul Joseph Adame";
    const typewriterElement = document.querySelector(".typewriter");
    let i_typewriter_idx = 0;
    function runTypewriterEffect() {
        if (typewriterElement && i_typewriter_idx < typewriterText.length) {
            typewriterElement.textContent += typewriterText.charAt(i_typewriter_idx);
            i_typewriter_idx++;
            setTimeout(runTypewriterEffect, 100);
        }
    }
    if (typewriterElement) {
        runTypewriterEffect();
    }

    // Scroll Animations
    gsap.from(".hero-content", { opacity: 0, y: 50, duration: 1, delay: 0.5 });
    gsap.from(".project-card", { opacity: 0, y: 50, duration: 0.8, stagger: 0.15, scrollTrigger: { trigger: ".projects", start: "top 80%", toggleActions: "play none none none" }});
    gsap.from(".timeline-item", { opacity: 0, y: 50, duration: 1, stagger: 0.2, scrollTrigger: { trigger: ".experience", start: "top 80%" }});
    gsap.from(".education-card", { opacity: 0, y: 50, duration: 1, stagger: 0.2, scrollTrigger: { trigger: ".education", start: "top 80%" }});

    document.addEventListener('DOMContentLoaded', () => {
    // ... (all existing JS code inside DOMContentLoaded) ...

    // GSAP Animation for Contact Me Section
    gsap.from(".contact-section h2, .contact-intro, .contact-links > .contact-btn", {
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.15, // Animate elements one after another
        scrollTrigger: {
            trigger: ".contact-section",
            start: "top 85%", // Start animation when 85% of the section is visible
            toggleActions: "play none none none", // Play animation once
        }
    });

    // ... (rest of the JS code inside DOMContentLoaded, like Lightbox, Footer Year, etc.) ...
});
    // Smooth Scroll for Nav Links
    const headerOffset = document.querySelector('header')?.offsetHeight || 70;
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href");
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - headerOffset,
                    behavior: "smooth"
                });
            }
        });
    });

    // --- Header Hide/Show on Scroll ---
    const mainHeader = document.getElementById('main-header');
    let lastScrollTop = 0;
    const scrollThreshold = 50; // Pixels to scroll before hiding header

    if (mainHeader) {
        window.addEventListener('scroll', () => {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollTop > lastScrollTop && scrollTop > scrollThreshold) {
                // Scroll Down
                mainHeader.classList.add('header-hidden');
            } else {
                // Scroll Up or at the top
                if (scrollTop + window.innerHeight < document.documentElement.scrollHeight || scrollTop === 0) {
                     mainHeader.classList.remove('header-hidden');
                }
            }
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
        }, false);
    }


    // --- CAROUSEL SCRIPT ---
    function initializeCarousel(carouselId, options = {}) {
        const carousel = document.getElementById(carouselId);
        if (!carousel) return;

        const track = carousel.querySelector('.carousel-track');
        const slides = Array.from(track.children);
        const nextButton = carousel.querySelector('.carousel-button.next');
        const prevButton = carousel.querySelector('.carousel-button.prev');

        if (!track || !nextButton || !prevButton || slides.length === 0) return;

        let slideWidth = slides[0].getBoundingClientRect().width;
        let currentIndex = 0;
        const loop = options.loop || false; // Get loop option, default to false

        const moveToSlide = (targetIndex) => {
            if (loop) {
                if (targetIndex >= slides.length) {
                    targetIndex = 0;
                } else if (targetIndex < 0) {
                    targetIndex = slides.length - 1;
                }
            } else {
                targetIndex = Math.max(0, Math.min(targetIndex, slides.length - 1));
            }
            track.style.transform = `translateX(-${slideWidth * targetIndex}px)`;
            currentIndex = targetIndex;
            updateButtonVisibility();
        };

        const updateButtonVisibility = () => {
            if (!loop) {
                prevButton.style.display = currentIndex === 0 ? 'none' : 'flex';
                nextButton.style.display = currentIndex === slides.length - 1 ? 'none' : 'flex';
            } else if (slides.length <= 1) {
                 prevButton.style.display = 'none';
                 nextButton.style.display = 'none';
            } else {
                prevButton.style.display = 'flex';
                nextButton.style.display = 'flex';
            }
        };

        nextButton.addEventListener('click', () => moveToSlide(currentIndex + 1));
        prevButton.addEventListener('click', () => moveToSlide(currentIndex - 1));

        const handleResize = () => {
            if (slides.length > 0) {
                slideWidth = slides[0].getBoundingClientRect().width;
                track.style.transition = 'none'; // Disable transition during resize adjustment
                moveToSlide(currentIndex);
                track.offsetHeight; // Trigger reflow to apply transform immediately
                track.style.transition = 'transform 0.5s ease-in-out'; // Re-enable transition
                updateButtonVisibility();
            }
        };
        window.addEventListener('resize', handleResize);

        if (slides.length > 0) slideWidth = slides[0].getBoundingClientRect().width;
        moveToSlide(0);
    }

    // Initialize Carousels
    initializeCarousel('photos-carousel', { loop: true });       // Loop for photos
    initializeCarousel('infographics-carousel', { loop: true }); // Loop for infographics
    initializeCarousel('projects-carousel', { loop: false });    // No loop for projects (or true if desired)


    // --- Scroll-to-Top Button Logic ---
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    const heroSection = document.getElementById('home');
    if (scrollTopBtn && heroSection) {
        const heroSectionHeight = heroSection.offsetHeight;
        window.addEventListener('scroll', () => {
            if (window.scrollY > heroSectionHeight) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- Lightbox Functionality ---
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = lightbox.querySelector('.lightbox-close');

    if (lightbox && lightboxImg && lightboxClose) {
        document.querySelectorAll('.lightbox-trigger').forEach(image => {
            image.addEventListener('click', (e) => {
                e.preventDefault();
                lightboxImg.src = image.src;
                lightboxCaption.textContent = image.alt; // Use alt text as caption
                lightbox.classList.add('visible');
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            });
        });

        const closeLightbox = () => {
            lightbox.classList.remove('visible');
            document.body.style.overflow = 'auto'; // Restore background scrolling
        };

        lightboxClose.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            // Close if clicked on the overlay itself, not the image
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
        // Optional: Close lightbox with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('visible')) {
                closeLightbox();
            }
        });
    }

    // --- Dynamic Year for Footer ---
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

});