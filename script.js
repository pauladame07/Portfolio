// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Hero Section Typewriter Effect
const typewriterText = "Paul Joseph Adame";
const typewriterElement = document.querySelector(".typewriter");

let i = 0;
const typewriter = () => {
    if (i < typewriterText.length) {
        typewriterElement.textContent += typewriterText.charAt(i);
        i++;
        setTimeout(typewriter, 100);
    }
};
typewriter();

// Scroll Animations
gsap.from(".hero-content", {
    opacity: 0,
    y: 50,
    duration: 1,
    delay: 0.5,
});

gsap.from(".project-card", {
    opacity: 0,
    y: 50,
    duration: 1,
    stagger: 0.2,
    scrollTrigger: {
        trigger: ".projects",
        start: "top 80%",
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
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));

        if (target) {
            window.scrollTo({
                top: target.offsetTop - 50, // Adjust offset if needed
                behavior: "smooth"
            });
        }
    });
});
});