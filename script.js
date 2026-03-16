// ============================================
// PRELOADER
// ============================================

document.body.classList.add('loading');

window.addEventListener('load', () => {
    setTimeout(() => {
        const preloader = document.getElementById('preloader');
        preloader.classList.add('done');
        document.body.classList.remove('loading');
    }, 3500);
});

// ============================================
// INTERACTIVE CANVAS PARTICLES
// ============================================

const canvas = document.getElementById('heroCanvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouse = { x: -500, y: -500 };
    const particleCount = window.innerWidth < 768 ? 40 : 80;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    document.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    class Particle {
        constructor() {
            this.reset();
        }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = Math.random() * 2 + 0.5;
            this.opacity = Math.random() * 0.4 + 0.1;
            this.baseOpacity = this.opacity;
        }
        update() {
            // Mouse interaction - attract gently
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 200) {
                const force = (200 - dist) / 200;
                this.vx += dx * force * 0.0003;
                this.vy += dy * force * 0.0003;
                this.opacity = this.baseOpacity + force * 0.3;
            } else {
                this.opacity += (this.baseOpacity - this.opacity) * 0.05;
            }

            this.x += this.vx;
            this.y += this.vy;

            // Damping
            this.vx *= 0.99;
            this.vy *= 0.99;

            // Wrap around
            if (this.x < 0) this.x = canvas.width;
            if (this.x > canvas.width) this.x = 0;
            if (this.y < 0) this.y = canvas.height;
            if (this.y > canvas.height) this.y = 0;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(100, 255, 218, ${this.opacity})`;
            ctx.fill();
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function drawLines() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 120) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(100, 255, 218, ${0.06 * (1 - dist / 120)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw(); });
        drawLines();
        requestAnimationFrame(animateParticles);
    }
    animateParticles();
}

// ============================================
// CURSOR TRAIL EFFECT
// ============================================

const trailCanvas = document.getElementById('cursorTrail');
if (trailCanvas && window.innerWidth > 768) {
    const tCtx = trailCanvas.getContext('2d');
    let trail = [];

    function resizeTrail() {
        trailCanvas.width = window.innerWidth;
        trailCanvas.height = window.innerHeight;
    }
    resizeTrail();
    window.addEventListener('resize', resizeTrail);

    document.addEventListener('mousemove', (e) => {
        trail.push({ x: e.clientX, y: e.clientY, life: 1 });
        if (trail.length > 30) trail.shift();
    });

    function drawTrail() {
        tCtx.clearRect(0, 0, trailCanvas.width, trailCanvas.height);
        trail = trail.filter(p => p.life > 0);
        trail.forEach((p, i) => {
            p.life -= 0.03;
            const size = p.life * 3;
            tCtx.beginPath();
            tCtx.arc(p.x, p.y, size, 0, Math.PI * 2);
            tCtx.fillStyle = `rgba(100, 255, 218, ${p.life * 0.3})`;
            tCtx.fill();
        });
        requestAnimationFrame(drawTrail);
    }
    drawTrail();
}

// ============================================
// CUSTOM CURSOR
// ============================================

const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursorFollower');

if (cursor && follower && window.innerWidth > 768) {
    let cx = 0, cy = 0, fx = 0, fy = 0;

    document.addEventListener('mousemove', (e) => {
        cx = e.clientX;
        cy = e.clientY;
    });

    function updateCursor() {
        cursor.style.left = cx + 'px';
        cursor.style.top = cy + 'px';

        fx += (cx - fx) * 0.12;
        fy += (cy - fy) * 0.12;
        follower.style.left = fx + 'px';
        follower.style.top = fy + 'px';

        requestAnimationFrame(updateCursor);
    }
    updateCursor();

    const hoverTargets = document.querySelectorAll('a, button, .project-card, .skill-card, .magnetic-wrap, .tilt');
    hoverTargets.forEach(el => {
        el.addEventListener('mouseenter', () => { cursor.classList.add('hover'); follower.classList.add('hover'); });
        el.addEventListener('mouseleave', () => { cursor.classList.remove('hover'); follower.classList.remove('hover'); });
    });
}

// ============================================
// MAGNETIC BUTTONS
// ============================================

document.querySelectorAll('.magnetic-area').forEach(area => {
    const strength = parseInt(area.dataset.strength) || 20;

    area.addEventListener('mousemove', (e) => {
        const rect = area.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        area.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });

    area.addEventListener('mouseleave', () => {
        area.style.transform = 'translate(0, 0)';
        area.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
    });

    area.addEventListener('mouseenter', () => {
        area.style.transition = 'transform 0.1s ease-out';
    });
});

// ============================================
// TILT EFFECT ON CARDS
// ============================================

document.querySelectorAll('.tilt').forEach(el => {
    const maxTilt = parseInt(el.dataset.tiltMax) || 8;

    el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        const tiltX = (maxTilt * (0.5 - y)).toFixed(2);
        const tiltY = (maxTilt * (x - 0.5)).toFixed(2);
        el.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;

        // Move glow
        const glow = el.querySelector('.skill-card-glow, .project-card-glow');
        if (glow) {
            glow.style.left = (e.clientX - rect.left - 100) + 'px';
            glow.style.top = (e.clientY - rect.top - 100) + 'px';
        }
    });

    el.addEventListener('mouseleave', () => {
        el.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        el.style.transition = 'transform 0.5s ease';
    });

    el.addEventListener('mouseenter', () => {
        el.style.transition = 'transform 0.1s ease-out';
    });
});

// ============================================
// TYPEWRITER EFFECT
// ============================================

const typewriterEl = document.getElementById('typewriter');
if (typewriterEl) {
    const phrases = [
        'architect systems that scale.',
        'build products people love.',
        'turn ideas into production.',
        'lead engineering teams.',
        'create immersive VR experiences.',
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    // Add cursor
    const cursorSpan = document.createElement('span');
    cursorSpan.className = 'typewriter-cursor';
    typewriterEl.parentNode.insertBefore(cursorSpan, typewriterEl.nextSibling);

    function type() {
        const current = phrases[phraseIndex];

        if (isDeleting) {
            typewriterEl.textContent = current.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typewriterEl.textContent = current.substring(0, charIndex + 1);
            charIndex++;
        }

        let speed = isDeleting ? 30 : 60;

        if (!isDeleting && charIndex === current.length) {
            speed = 2000; // Pause before deleting
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            speed = 500;
        }

        setTimeout(type, speed);
    }

    // Start after hero reveals
    setTimeout(type, 1500);
}

// ============================================
// SCROLL REVEAL (IntersectionObserver)
// ============================================

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal, .reveal-up').forEach(el => revealObserver.observe(el));

// ============================================
// COUNTING ANIMATION FOR STATS
// ============================================

const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const numbers = entry.target.querySelectorAll('.stat-number');
            numbers.forEach(num => {
                const target = parseInt(num.dataset.target);
                if (!target) return;
                let current = 0;
                const increment = target / 60;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        num.textContent = target;
                        clearInterval(timer);
                    } else {
                        num.textContent = Math.floor(current);
                    }
                }, 25);
            });
            statObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const ticker = document.querySelector('.stats-ticker');
if (ticker) statObserver.observe(ticker);

// ============================================
// SKILL BAR ANIMATION
// ============================================

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const width = entry.target.dataset.width;
            entry.target.style.width = width;
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.skill-fill').forEach(el => skillObserver.observe(el));

// ============================================
// SCROLL PROGRESS BAR
// ============================================

const scrollProgress = document.getElementById('scrollProgress');
if (scrollProgress) {
    window.addEventListener('scroll', () => {
        const winScroll = document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        scrollProgress.style.width = ((winScroll / height) * 100) + '%';
    });
}

// ============================================
// NAVIGATION
// ============================================

const header = document.querySelector('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (currentScroll > 50) header.classList.add('scrolled');
    else header.classList.remove('scrolled');

    if (currentScroll > lastScroll && currentScroll > 200) header.classList.add('hidden');
    else header.classList.remove('hidden');

    lastScroll = currentScroll;
});

// ============================================
// MOBILE MENU
// ============================================

const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');

if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// ============================================
// SMOOTH SCROLL
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

// ============================================
// HERO ENTRANCE ANIMATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.querySelectorAll('.hero .reveal-up').forEach(el => {
            el.classList.add('active');
        });
    }, 2400); // After preloader
});
