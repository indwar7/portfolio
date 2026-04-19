// ============================================
// PROGRESS BAR
// ============================================
const progressBar = document.getElementById('progressBar');
window.addEventListener('scroll', () => {
    const pct = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    if (progressBar) progressBar.style.width = pct + '%';
});

// ============================================
// ACTIVE NAV — scroll spy
// ============================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            navLinks.forEach(a => a.classList.remove('active'));
            const a = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
            if (a) a.classList.add('active');
        }
    });
}, { threshold: 0.35 }).observe && sections.forEach(s =>
    new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                navLinks.forEach(a => a.classList.remove('active'));
                const a = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
                if (a) a.classList.add('active');
            }
        });
    }, { threshold: 0.35 }).observe(s)
);

// ============================================
// NAV TOGGLE
// ============================================
document.getElementById('navToggle')?.addEventListener('click', () =>
    document.getElementById('navLinks')?.classList.toggle('open')
);
document.querySelectorAll('.nav-links a').forEach(a =>
    a.addEventListener('click', () => document.getElementById('navLinks')?.classList.remove('open'))
);

// ============================================
// SMOOTH SCROLL
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const t = document.querySelector(a.getAttribute('href'));
        if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
});

// ============================================
// CHARACTER
// ============================================
(function () {
    const guy        = document.getElementById('guy');
    const bubble     = document.getElementById('guyBubble');
    const bubbleText = document.getElementById('bubbleText');

    if (!guy || !bubble || !bubbleText) return;

    let idleTimer = null;
    let scrollTimer = null;
    let isIdle = true;

    const messages = {
        idle:         ['just chillin 📱', 'reading docs 📱', 'on Twitter 📱', 'checking notifs 📱', 'doom scrolling... 📱'],
        scrolling:    ['wait, reading this! 👀', 'this part is good →', 'interesting... 🤔', 'keep going! 📖', 'oooh nice 👁'],
        projects:     ['I built this!! 🔥', 'TrackMatee was hard 😅', 'Go backend goes brr 🚀', 'SIH grind paid off 🏆'],
        writing:      ['I wrote this! ✍️', 'technical writer mode on', '600 words later... 😮‍💨'],
        contact:      ['say hi!! 👋', 'I reply fast 😤', 'let\'s build something!'],
        achievements: ['national winner btw 🏆', 'no big deal 😎', 'AKGEC represent 🎓'],
    };

    const pick = arr => arr[Math.floor(Math.random() * arr.length)];

    function setState(state, msg) {
        guy.className = 'guy ' + state;
        if (msg) {
            bubbleText.textContent = msg;
            bubble.classList.add('show');
        }
    }

    function showBubble(msg, duration = 2800) {
        bubbleText.textContent = msg;
        bubble.classList.add('show');
        setTimeout(() => bubble.classList.remove('show'), duration);
    }

    function goIdle() {
        isIdle = true;
        setState('idle', pick(messages.idle));
        idleTimer = setInterval(() => {
            if (isIdle) {
                bubbleText.textContent = pick(messages.idle);
                bubble.classList.add('show');
            }
        }, 4000);
    }

    function onScrolling() {
        if (isIdle) {
            clearInterval(idleTimer);
            isIdle = false;
        }
        clearTimeout(scrollTimer);
        setState('scrolling', pick(messages.scrolling));
        scrollTimer = setTimeout(() => goIdle(), 1800);
    }

    window.addEventListener('scroll', onScrolling, { passive: true });

    const sectionMsgs = {
        work:         messages.projects,
        achievements: messages.achievements,
        contact:      messages.contact,
    };

    Object.keys(sectionMsgs).forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;
        new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (!e.isIntersecting) return;
                showBubble(pick(sectionMsgs[id]), 3200);
                if (id === 'achievements') {
                    guy.classList.add('excited');
                    setTimeout(() => guy.classList.remove('excited'), 2200);
                }
                if (id === 'contact') {
                    setState('wave', pick(messages.contact));
                    setTimeout(() => goIdle(), 3200);
                }
            });
        }, { threshold: 0.4 }).observe(el);
    });

    setTimeout(() => goIdle(), 800);
})();
