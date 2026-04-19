// ============================================
// CUSTOM CURSOR
// ============================================
const dot = document.createElement('div');
dot.className = 'cursor-dot';
const ring = document.createElement('div');
ring.className = 'cursor-ring';
document.body.appendChild(dot);
document.body.appendChild(ring);

let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top = my + 'px';
});

(function animRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(animRing);
})();

document.querySelectorAll('a, button, .proj-card, .about-chips span').forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('expand'));
    el.addEventListener('mouseleave', () => ring.classList.remove('expand'));
});

// ============================================
// NAV TOGGLE
// ============================================
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle?.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

// ============================================
// NAV SCROLL EFFECT
// ============================================
window.addEventListener('scroll', () => {
    document.querySelector('.nav')?.classList.toggle('scrolled', window.scrollY > 80);
});

// ============================================
// SKILL BARS ANIMATION
// ============================================
const fillBars = document.querySelectorAll('.fill');

const barObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const w = el.style.getPropertyValue('--w') || el.style.width;
            el.style.width = '0';
            requestAnimationFrame(() => {
                setTimeout(() => el.style.width = w, 80);
            });
            barObserver.unobserve(el);
        }
    });
}, { threshold: 0.4 });

fillBars.forEach(b => barObserver.observe(b));

// ============================================
// REVEAL ON SCROLL
// ============================================
document.querySelectorAll('.proj-card, .skill-category, .tl-item, .about-grid, .contact-inner').forEach(el => {
    el.classList.add('reveal');
});

const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ============================================
// CONTACT FORM
// ============================================
document.getElementById('contactForm')?.addEventListener('submit', e => {
    e.preventDefault();
    alert('Thanks for reaching out! I\'ll get back to you soon.');
    e.target.reset();
});
