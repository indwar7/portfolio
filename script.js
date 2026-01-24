// ============================================
// SAFE QUERY HELPERS
// ============================================
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// ============================================
// NAVIGATION
// ============================================
const navbar = $('.navbar');
const navToggle = $('#navToggle');
const navMenu = $('#navMenu');
const navLinks = $$('.nav-link');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (!navbar) return;
    navbar.classList.toggle('scrolled', window.scrollY > 100);
});

// Mobile toggle
if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Smooth scroll
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const target = $(targetId);

        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }

        navMenu?.classList.remove('active');
    });
});

// ============================================
// TYPING ANIMATION
// ============================================
const typingText = $('#typingText');
const texts = [
    'I Turn Data Into Insights',
    'I Build Mobile Apps',
    'I Create User Experiences',
    'I Solve Complex Problems'
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    if (!typingText) return;

    const currentText = texts[textIndex];
    typingText.textContent = currentText.slice(0, charIndex);

    if (!isDeleting) {
        charIndex++;
        if (charIndex > currentText.length) {
            setTimeout(() => isDeleting = true, 1500);
        }
    } else {
        charIndex--;
        if (charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
        }
    }

    setTimeout(typeEffect, isDeleting ? 50 : 100);
}
typeEffect();

// ============================================
// PARTICLES ANIMATION
// ============================================
const particlesContainer = $('#particles');

if (particlesContainer) {
    for (let i = 0; i < 40; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 10}s`;
        particle.style.animationDuration = `${10 + Math.random() * 10}s`;
        particlesContainer.appendChild(particle);
    }
}

// ============================================
// COUNTER ANIMATION
// ============================================
const counters = $$('.stat-number');

const animateCounter = (el) => {
    const target = Number(el.dataset.target);
    let current = 0;
    const step = Math.max(target / 100, 1);

    const update = () => {
        current += step;
        if (current < target) {
            el.textContent = Math.floor(current);
            requestAnimationFrame(update);
        } else {
            el.textContent = target;
        }
    };
    update();
};

const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

counters.forEach(counter => counterObserver.observe(counter));

// ============================================
// SKILL BARS ANIMATION
// ============================================
const skillBars = $$('.skill-fill');

const skillObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bar = entry.target;
            const finalWidth = bar.dataset.width || bar.style.width;
            bar.style.width = '0';
            setTimeout(() => bar.style.width = finalWidth, 100);
            skillObserver.unobserve(bar);
        }
    });
}, { threshold: 0.5 });

skillBars.forEach(bar => skillObserver.observe(bar));

// ============================================
// FORM SUBMISSION (DEMO)
// ============================================
const contactForm = $('#contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });
}

// ============================================
// SCROLL REVEAL ANIMATION
// ============================================
const revealElements = $$('.project-card, .skill-category, .timeline-item');

revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
});

const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => revealObserver.observe(el));

// ============================================
// CUSTOM CURSOR (DESKTOP ONLY)
// ============================================
if (window.innerWidth > 968) {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });

    const style = document.createElement('style');
    style.innerHTML = `
        body { cursor: none; }
        a, button { cursor: none; }

        .custom-cursor {
            width: 18px;
            height: 18px;
            border: 2px solid var(--primary);
            border-radius: 50%;
            position: fixed;
            pointer-events: none;
            z-index: 9999;
            transform: translate(-50%, -50%);
            transition: transform 0.08s ease;
        }
    `;
    document.head.appendChild(style);
}
