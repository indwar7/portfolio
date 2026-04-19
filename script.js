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

    let idleTimer   = null;
    let scrollTimer = null;
    let curState    = '';

    const messages = {
        idle: [
            'doom scrolling... 📱', 'reading Twitter 📱', 'checking notifs 📱',
            'bro replied 😭📱', 'reels got me 😶📱', 'just one more... 📱',
            'waiting for build 🥱', 'coffee break ☕', 'vibing fr 🎧',
        ],
        scrolling: [
            'wait, reading this! 👀', 'ooh this part →', 'interesting... 🤔',
            'keep going!! 📖', 'oooh nice 👁️', 'wait WHAT 😳', 'hold on hold on 🛑',
            'this is good ngl 👀', 'ok ok ok... 🤔', 'taking notes 📝',
        ],
        projects: [
            'I built this!! 🔥', 'TrackMatee was HARD 😅', 'Go backend goes brr 🚀',
            'SIH grind paid off 🏆', '50K trips daily btw 📍', 'real prod traffic 👀',
        ],
        achievements: [
            'national winner btw 🏆', 'no big deal 😎', 'AKGEC represent 🎓',
            'beat 1000s of teams 🔥', 'MoRTH said W 🏛️',
        ],
        contact: [
            'say hi!! 👋', 'I reply fast 😤', "let's build something!", 'i don\'t bite 😅',
        ],
    };

    const pick = arr => arr[Math.floor(Math.random() * arr.length)];

    function showBubble(msg, duration = 2600) {
        bubbleText.textContent = msg;
        bubble.classList.add('show');
        clearTimeout(bubble._hideTimer);
        bubble._hideTimer = setTimeout(() => bubble.classList.remove('show'), duration);
    }

    function setState(state) {
        if (curState === state) return;
        curState = state;
        guy.className = 'guy ' + state;
    }

    function goIdle() {
        clearInterval(idleTimer);
        setState('idle');
        showBubble(pick(messages.idle), 2800);
        idleTimer = setInterval(() => showBubble(pick(messages.idle), 2800), 4500);
    }

    function startScrolling() {
        clearInterval(idleTimer);
        clearTimeout(scrollTimer);
        if (curState !== 'scrolling') {
            setState('scrolling');
            showBubble(pick(messages.scrolling), 2000);
        }
        scrollTimer = setTimeout(goIdle, 1800);
    }

    // No throttle — curState guard prevents redundant work
    window.addEventListener('scroll', startScrolling, { passive: true });

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
                showBubble(pick(sectionMsgs[id]), 3000);
                if (id === 'achievements') {
                    guy.classList.add('excited');
                    setTimeout(() => guy.classList.remove('excited'), 2000);
                }
                if (id === 'contact') {
                    clearInterval(idleTimer);
                    clearTimeout(scrollTimer);
                    curState = '';
                    setState('wave');
                    showBubble(pick(messages.contact), 3000);
                    setTimeout(goIdle, 3200);
                }
            });
        }, { threshold: 0.4 }).observe(el);
    });

    setTimeout(goIdle, 600);
})();
