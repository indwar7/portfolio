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
// REVEAL ANIMATIONS — content fades in on scroll
// ============================================
(function () {
    const revealObs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('revealed');
                revealObs.unobserve(e.target);
            }
        });
    }, { threshold: 0.12 });

    // Stagger cards/articles within their parent
    document.querySelectorAll('.dark-card, .art-item, .ach-item, .light-ach').forEach((el, i) => {
        el.classList.add('reveal-item');
        const siblings = el.parentElement.querySelectorAll('.dark-card, .art-item, .ach-item, .light-ach');
        let idx = 0;
        siblings.forEach((s, si) => { if (s === el) idx = si; });
        el.style.transitionDelay = (idx * 80) + 'ms';
        revealObs.observe(el);
    });

    // Fade in section headings
    document.querySelectorAll('.about-lead, .work-col-head h2, .contact-title').forEach(el => {
        el.classList.add('reveal-item');
        revealObs.observe(el);
    });
})();

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

    const M = {
        idle: [
            'doom scrolling... 📱', 'reading Twitter 📱', 'checking notifs 📱',
            'bro replied 😭📱', 'reels got me 😶📱', 'just one more... 📱',
            'waiting for build 🥱', 'coffee break ☕', 'vibing fr 🎧',
            'ok one more reel 😶', 'build succeeded 🎉', 'PR open btw 🔗',
        ],
        scrolling: [
            'wait, reading this! 👀', 'ooh this part →', 'interesting... 🤔',
            'keep going!! 📖', 'oooh nice 👁️', 'wait WHAT 😳', 'hold on hold on 🛑',
            'this is good ngl 👀', 'ok ok ok... 🤔', 'taking notes 📝',
            'don\'t skip this 🙏', 'read it properly!! 😤',
        ],
        hero: [
            'hey!! welcome 👋', 'scroll down fr 👇', 'don\'t leave yet 😭',
            'this is my portfolio btw 🫡',
        ],
        about: [
            '8.0 CGPA ngl 😤', 'SDE intern life 💼', 'that\'s literally me 🫡',
            'data science + mobile = me', 'AKGEC represent 🎓',
        ],
        trackmatee: [
            'this won SIH 2025 🏆', '50K daily trips 📍', 'offline-first was KEY 🔌',
            'MoRTH project fr 🏛️', '2K+ real users 📲',
        ],
        lucy: [
            'AI try-on, on-device 📱', '33 body landmarks 🦾', 'no cloud, no lag ☁️❌',
            '15-30 FPS on your phone 🔥', 'diffusion models in flutter 😳',
        ],
        safaipay: [
            'Go backend goes brr 🚀', 'Redis leaderboard ⚡', 'UPI payouts live 💸',
            '28 endpoints, all mine 💪', 'full-stack W right here',
        ],
        peanut: [
            'live trading, no lag 📈', 'WebSockets > REST here 🔌',
            '500 concurrent users 😮', '2K+ daily transactions 💰',
        ],
        artOffline: [
            'wrote this from real data ✍️', 'SQLite saved us 💾', 'offline = reliability',
        ],
        artBattery: [
            'adaptive GPS = 35% less drain 🔋', 'this one was painful to debug 😅',
            'battery % matters fr 📉',
        ],
        artWebsockets: [
            'REST would\'ve died here 💀', 'WebSockets carried 🔌',
            'wrote this after 2am debugging 😴',
        ],
        artRedis: [
            'O(log N) > SQL any day ⚡', 'Redis sorted sets = magic',
            'wrote this while optimising 🏎️',
        ],
        artJwt: [
            'token_version = my idea 🧠', 'stateless auth explained simply',
            'security nerds read this 🔐',
        ],
        artML: [
            'TFLite on phone, no server ☁️❌', 'GPU delegation = speed 🚀',
            'on-device AI is the future 🤖',
        ],
        artLandmarks: [
            '33 points, real-time 🦾', 'ML Kit + TFLite combo 🎯',
            'this article took longest ✍️',
        ],
        artPoints: [
            'gamification that works 🎮', 'psychology + code = this',
            'atomic transactions saved us ⚛️',
        ],
        artOtp: [
            'OTP → UPI in one flow 💸', 'built this end to end 💪',
            'RazorpayX integration 🏦',
        ],
        artTrading: [
            'SQLite offline cache 💾', 'fintech offline = hard 📈',
            'trading can\'t afford downtime 📡',
        ],
        achievements: [
            'national winner btw 🏆', 'no big deal 😎', 'beat 1000s of teams 🔥',
            'MoRTH literally picked us 🏛️', 'AKGEC represent 🎓',
        ],
        contact: [
            'say hi!! 👋', 'I reply fast 😤', "let's build something 🚀",
            'i don\'t bite 😅', 'seriously reach out 🙏',
        ],
    };

    const pick = arr => arr[Math.floor(Math.random() * arr.length)];

    function showBubble(msg, duration = 2800) {
        bubbleText.textContent = msg;
        bubble.classList.add('show');
        clearTimeout(bubble._t);
        bubble._t = setTimeout(() => bubble.classList.remove('show'), duration);
    }

    function setState(state) {
        if (curState === state) return;
        curState = state;
        guy.className = 'guy ' + state;
    }

    function goIdle() {
        clearInterval(idleTimer);
        setState('idle');
        showBubble(pick(M.idle), 2800);
        idleTimer = setInterval(() => showBubble(pick(M.idle), 2800), 4500);
    }

    function startScrolling() {
        clearInterval(idleTimer);
        clearTimeout(scrollTimer);
        if (curState !== 'scrolling') {
            setState('scrolling');
            showBubble(pick(M.scrolling), 1800);
        }
        scrollTimer = setTimeout(goIdle, 1800);
    }

    window.addEventListener('scroll', startScrolling, { passive: true });

    // ── Section reactions ──────────────────────────────
    function watchSection(id, msgs, opts = {}) {
        const el = document.getElementById(id);
        if (!el) return;
        new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (!e.isIntersecting) return;
                showBubble(pick(msgs), 3000);
                if (opts.excited) {
                    guy.classList.add('excited');
                    setTimeout(() => guy.classList.remove('excited'), 2000);
                }
                if (opts.wave) {
                    clearInterval(idleTimer); clearTimeout(scrollTimer);
                    curState = ''; setState('wave');
                    showBubble(pick(msgs), 3200);
                    setTimeout(goIdle, 3300);
                }
            });
        }, { threshold: 0.3 }).observe(el);
    }

    watchSection('home',         M.hero);
    watchSection('about',        M.about);
    watchSection('work',         M.trackmatee);
    watchSection('achievements', M.achievements, { excited: true });
    watchSection('contact',      M.contact,      { wave: true });

    // ── Per-project card reactions ─────────────────────
    const cardMap = [
        ['TrackMatee',          M.trackmatee],
        ['Lucy',                M.lucy],
        ['SafaiPay',            M.safaipay],
        ['Peanut',              M.peanut],
    ];
    document.querySelectorAll('.dark-card').forEach(card => {
        const name = card.querySelector('.proj-name')?.textContent || '';
        const entry = cardMap.find(([k]) => name.includes(k));
        if (!entry) return;
        new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (!e.isIntersecting) return;
                showBubble(pick(entry[1]), 3000);
            });
        }, { threshold: 0.5 }).observe(card);
    });

    // ── Per-article reactions ──────────────────────────
    const artMap = [
        ['offline-first',    M.artOffline],
        ['battery-drain',    M.artBattery],
        ['websockets',       M.artWebsockets],
        ['redis',            M.artRedis],
        ['jwt',              M.artJwt],
        ['on-device-ml',     M.artML],
        ['body-landmarks',   M.artLandmarks],
        ['points-economy',   M.artPoints],
        ['otp-to-payout',    M.artOtp],
        ['trading-app',      M.artTrading],
    ];
    document.querySelectorAll('.art-item').forEach(item => {
        const href = item.querySelector('a')?.getAttribute('href') || '';
        const entry = artMap.find(([k]) => href.includes(k));
        if (!entry) return;
        new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (!e.isIntersecting) return;
                showBubble(pick(entry[1]), 3000);
            });
        }, { threshold: 0.6 }).observe(item);
    });

    setTimeout(goIdle, 600);
})();
