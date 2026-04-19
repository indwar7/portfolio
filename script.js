// Nav toggle (mobile)
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle?.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

// Nav border on scroll
window.addEventListener('scroll', () => {
    document.querySelector('.nav')?.classList.toggle('scrolled', window.scrollY > 40);
});
