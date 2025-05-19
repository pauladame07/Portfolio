// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Hero Section Typewriter Effect
const typewriterText = "Paul Joseph Adame"; // Use a unique constant name
const typewriterElement = document.querySelector(".typewriter");

let i_typewriter_idx = 0; // Use a unique variable name for the index
function runTypewriterEffect() { // Use a unique function name
    if (typewriterElement && i_typewriter_idx < typewriterText.length) {
        typewriterElement.textContent += typewriterText.charAt(i_typewriter_idx);
        i_typewriter_idx++;
        setTimeout(runTypewriterEffect, 100);
    }
}
// Start typewriter only if the element exists
if (typewriterElement) {
    runTypewriterEffect();
}


// Scroll Animations
gsap.from(".hero-content", {
    opacity: 0,
    y: 50,
    duration: 1,
    delay: 0.5,
});

// Animate project cards when the .projects section comes into view
// This will animate all project cards, even if they are in different slides of a carousel
gsap.from(".project-card", { // Target all project cards directly
    opacity: 0,
    y: 50,
    duration: 0.8, // Slightly faster for individual cards
    stagger: 0.15, // Stagger them
    scrollTrigger: {
        trigger: ".projects", // The entire projects section
        start: "top 80%", // Start animation when 80% of the section is visible
        toggleActions: "play none none none", // Play animation once
    },
});


gsap.from(".timeline-item", {
    opacity: 0,
    y: 50,
    duration: 1,
    stagger: 0.2,
    scrollTrigger: {
        trigger: ".experience",
        start: "top 80%",
    },
});

gsap.from(".education-card", { // Added animation for education cards
    opacity: 0,
    y: 50,
    duration: 1,
    stagger: 0.2,
    scrollTrigger: {
        trigger: ".education",
        start: "top 80%",
    },
});


// Smooth Scroll for Nav Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const targetId = this.getAttribute("href");
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            const headerOffset = document.querySelector('header')?.offsetHeight || 70; // Get header height or fallback
            window.scrollTo({
                top: targetElement.offsetTop - headerOffset, // Adjust offset for fixed header
                behavior: "smooth"
            });
        }
    });
});


// --- CAROUSEL SCRIPT ---
function initializeCarousel(carouselId) {
    const carousel = document.getElementById(carouselId);
    if (!carousel) {
        // console.warn(`Carousel with ID "${carouselId}" not found.`);
        return;
    }

    const track = carousel.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const nextButton = carousel.querySelector('.carousel-button.next');
    const prevButton = carousel.querySelector('.carousel-button.prev');

    if (!track || !nextButton || !prevButton || slides.length === 0) {
        // console.warn(`Carousel "${carouselId}" is missing essential elements (track, buttons, or slides).`);
        return;
    }

    let slideWidth = slides[0].getBoundingClientRect().width;
    let currentIndex = 0;

    const moveToSlide = (targetIndex) => {
        // Ensure track width is correctly calculated especially if slides have margins/paddings affecting offset
        const slideRect = slides[targetIndex].getBoundingClientRect();
        const trackRect = track.getBoundingClientRect();
        // The offsetLeft of the target slide relative to the track is what we need.
        // slideWidth approach works if all slides are exactly the same width and no complex margins.
        // For more robustness, using offsetLeft would be better if slides have varying widths/margins.
        // However, with min-width: 100% on slides, slideWidth should be consistent.
        track.style.transform = `translateX(-${slideWidth * targetIndex}px)`;
        currentIndex = targetIndex;
    };

    const updateButtonVisibility = () => {
        if (slides.length <= 1) { // Hide buttons if only one slide or no slides
            prevButton.style.display = 'none';
            nextButton.style.display = 'none';
        } else {
            prevButton.style.display = currentIndex === 0 ? 'none' : 'flex'; // Use flex for centered icon
            nextButton.style.display = currentIndex === slides.length - 1 ? 'none' : 'flex';
        }
    };

    nextButton.addEventListener('click', () => {
        if (currentIndex < slides.length - 1) {
            moveToSlide(currentIndex + 1);
        }
        updateButtonVisibility();
    });

    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            moveToSlide(currentIndex - 1);
        }
        updateButtonVisibility();
    });

    const handleResize = () => {
        // Recalculate slideWidth based on the first slide's current width
        if (slides.length > 0) {
            slideWidth = slides[0].getBoundingClientRect().width;
            moveToSlide(currentIndex); // Re-adjust position based on new width
            updateButtonVisibility(); // Re-check button visibility
        }
    };

    // Use ResizeObserver for more reliable updates if available and needed,
    // but window resize is generally sufficient for this type of carousel.
    window.addEventListener('resize', handleResize);

    // Initial setup
    if (slides.length > 0) {
         slideWidth = slides[0].getBoundingClientRect().width; // Ensure slideWidth is set initially
    }
    moveToSlide(0); // Go to the first slide
    updateButtonVisibility(); // Set initial button states
}

// Initialize all carousels on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeCarousel('photos-carousel');
    initializeCarousel('infographics-carousel');
    initializeCarousel('projects-carousel');
});
// --- Scroll-to-Top Button Logic ---
document.addEventListener('DOMContentLoaded', () => {
    // Initialize carousels first (if not already done)
    // initializeCarousel('photos-carousel');
    // initializeCarousel('infographics-carousel');
    // initializeCarousel('projects-carousel');

    const scrollTopBtn = document.getElementById('scrollTopBtn');
    const heroSection = document.getElementById('home'); // Your hero section

    if (!scrollTopBtn || !heroSection) {
        // console.warn('Scroll top button or hero section not found.');
        return;
    }

    // Calculate the point after which the button should appear
    const heroSectionHeight = heroSection.offsetHeight;

    window.addEventListener('scroll', () => {
        if (window.scrollY > heroSectionHeight) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});