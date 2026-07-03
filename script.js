document.addEventListener('DOMContentLoaded', () => {

    // Console ASCII Art
    console.log(`
  _____       _   _                             
 |_   _|     | \\ | |                            
   | |  _   _|  \\| | __ _ _   _ _   _  ___ _ __ 
   | | | | | | . \` |/ _\` | | | | | | |/ _ \\ '_ \\
   | | | |_| | |\\  | (_| | |_| | |_| |  __/ | | |
   \\_/  \\__,_\\_| \\_/\\__, |\\__,_|\\__, |\\___|_| |_|
                     __/ |       __/ |          
                    |___/       |___/           
    Welcome to my portfolio! 🚀 
    Looking for Easter Eggs? Try typing 'tune' or 'drop' 😉
    `);

    // 1. Preloader
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('preloader-hidden');
            setTimeout(() => preloader.remove(), 600);
        }, 1200); // Fake loading time for premium feel
    }

    // 2. Custom Cursor with Particles
    const cursor = document.querySelector('.custom-cursor');
    if (cursor) {
        let mouseX = 0, mouseY = 0;
        let lastParticleTime = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursor.style.left = mouseX + 'px';
            cursor.style.top = mouseY + 'px';

            const now = Date.now();
            if (now - lastParticleTime > 30) { // spawn particle every 30ms max
                createParticle(mouseX, mouseY);
                lastParticleTime = now;
            }
        });

        function createParticle(x, y) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Randomize size and color
            const size = Math.random() * 4 + 2;
            const colors = ['#6366f1', '#a855f7', '#ec4899', '#38bdf8']; // Accent colors
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            particle.style.background = color;
            particle.style.color = color; // For box-shadow
            particle.style.left = (x - size / 2) + (Math.random() * 10 - 5) + 'px'; // add slight random offset
            particle.style.top = (y - size / 2) + (Math.random() * 10 - 5) + 'px';
            
            document.body.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 800);
        }

        // Add hover effect on clickable elements
        const clickables = document.querySelectorAll('a, button, .card, .project-card, .gallery-item');
        clickables.forEach(el => {
            el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
            el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
        });
    }

    // 3. Typing Effect
    const typedTextSpan = document.getElementById("typed-text");
    if (typedTextSpan) {
        const textArray = [
            "Software Developer passionate about AI.",
            "Building practical digital solutions.",
            "Exploring the boundaries of Tech.",
            "Creating real-world value."
        ];
        const typingDelay = 100;
        const erasingDelay = 50;
        const newTextDelay = 2000;
        let textArrayIndex = 0;
        let charIndex = 0;

        function type() {
            if (charIndex < textArray[textArrayIndex].length) {
                typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
                charIndex++;
                setTimeout(type, typingDelay);
            } else {
                setTimeout(erase, newTextDelay);
            }
        }

        function erase() {
            if (charIndex > 0) {
                typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
                charIndex--;
                setTimeout(erase, erasingDelay);
            } else {
                textArrayIndex++;
                if (textArrayIndex >= textArray.length) textArrayIndex = 0;
                setTimeout(type, typingDelay + 500);
            }
        }
        setTimeout(type, 1500); // Start after preloader
    }

    // Reveal elements on scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.section-reveal');
    revealElements.forEach(el => observer.observe(el));

    // Mouse tracking for card glow effect
    document.querySelectorAll('.card, .project-card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // Back to Top Button
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Theme Toggle
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
        });
    }

    // Initialize Vanilla Tilt (3D Effect)
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll(".card, .project-card"), {
            max: 15,
            speed: 400,
            glare: true,
            "max-glare": 0.15,
            scale: 1.02
        });
        VanillaTilt.init(document.querySelectorAll(".gallery-item"), {
            max: 8,
            speed: 400,
            glare: true,
            "max-glare": 0.2
        });
    }

    // Initialize Lenis (Smooth Scroll)
    if (typeof Lenis !== 'undefined') {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            smooth: true
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
    }

    // Live Local Time Widget
    const timeDisplay = document.getElementById('live-time');
    if (timeDisplay) {
        function updateTime() {
            const now = new Date();
            // Lấy giờ Việt Nam
            const options = { timeZone: 'Asia/Ho_Chi_Minh', hour: '2-digit', minute: '2-digit', hour12: false };
            const timeString = new Intl.DateTimeFormat('vi-VN', options).format(now);
            timeDisplay.textContent = `📍 Vietnam • ${timeString} (Available)`;
        }
        updateTime();
        setInterval(updateTime, 60000); // Cập nhật mỗi phút
    }

    // Lightbox Logic
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (lightbox) {
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const imgSrc = item.querySelector('img').src;
                lightboxImg.src = imgSrc;
                lightbox.classList.add('active');
            });
        });

        lightboxClose.addEventListener('click', () => {
            lightbox.classList.remove('active');
        });

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove('active');
            }
        });
        
        // Add keyboard support for closing
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                lightbox.classList.remove('active');
            }
        });
    }

    // Magnetic Buttons
    const magnets = document.querySelectorAll('.btn');
    magnets.forEach(btn => {
        btn.addEventListener('mousemove', function(e) {
            const position = btn.getBoundingClientRect();
            const x = e.clientX - position.left - position.width / 2;
            const y = e.clientY - position.top - position.height / 2;
            
            btn.style.transition = 'transform 0.1s cubic-bezier(0.1, 1, 0.3, 1)';
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
        btn.addEventListener('mouseleave', function() {
            btn.style.transition = 'transform 0.5s cubic-bezier(0.1, 1, 0.3, 1)';
            btn.style.transform = 'translate(0px, 0px)';
        });
    });

    // Matrix Easter Egg (Konami Code style)
    let secretCode = ['t', 'u', 'n', 'e'];
    let codeIndex = 0;
    const canvas = document.getElementById('matrix-canvas');
    let matrixInterval = null;

    document.addEventListener('keydown', (e) => {
        if (e.key.toLowerCase() === secretCode[codeIndex]) {
            codeIndex++;
            if (codeIndex === secretCode.length) {
                activateMatrix();
                codeIndex = 0;
            }
        } else {
            codeIndex = 0;
            if (e.key.toLowerCase() === secretCode[0]) {
                codeIndex = 1;
            }
        }
        
        // Press Escape to stop
        if (e.key === 'Escape' && canvas && canvas.classList.contains('active')) {
            deactivateMatrix();
        }
    });

    function activateMatrix() {
        if (!canvas) return;
        canvas.classList.add('active');
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*";
        const fontSize = 16;
        const columns = canvas.width / fontSize;
        const drops = [];
        for (let x = 0; x < columns; x++) drops[x] = 1;

        if (matrixInterval) clearInterval(matrixInterval);
        
        matrixInterval = setInterval(() => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#0F0';
            ctx.font = fontSize + 'px monospace';

            for (let i = 0; i < drops.length; i++) {
                const text = letters.charAt(Math.floor(Math.random() * letters.length));
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }, 33);
    }

    function deactivateMatrix() {
        if (!canvas) return;
        canvas.classList.remove('active');
        setTimeout(() => {
            if (matrixInterval) clearInterval(matrixInterval);
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }, 2000);
    }

    // Gravity Easter Egg
    let dropCode = ['d', 'r', 'o', 'p'];
    let dropIndex = 0;
    
    document.addEventListener('keydown', (e) => {
        if (e.key.toLowerCase() === dropCode[dropIndex]) {
            dropIndex++;
            if (dropIndex === dropCode.length) {
                activateGravity();
                dropIndex = 0;
            }
        } else {
            dropIndex = 0;
            if (e.key.toLowerCase() === dropCode[0]) dropIndex = 1;
        }
    });

    let gravityActive = false;
    function activateGravity() {
        if (gravityActive || typeof Matter === 'undefined') return;
        gravityActive = true;
        
        document.body.style.overflow = 'hidden';

        const Engine = Matter.Engine,
              Runner = Matter.Runner,
              Bodies = Matter.Bodies,
              Composite = Matter.Composite;

        const engine = Engine.create();
        
        const allElements = Array.from(document.querySelectorAll('.card, .project-card, .btn, h1, h2, h3, p, img, .nav-links li'));
        const bodies = [];
        
        allElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.width === 0 || rect.height === 0) return;
            
            const body = Bodies.rectangle(
                rect.left + rect.width / 2, 
                rect.top + rect.height / 2, 
                rect.width, 
                rect.height, 
                { restitution: 0.6, friction: 0.1 }
            );
            
            el.style.position = 'fixed';
            el.style.left = rect.left + 'px';
            el.style.top = rect.top + 'px';
            el.style.width = rect.width + 'px';
            el.style.height = rect.height + 'px';
            el.style.margin = '0';
            el.style.zIndex = '100000';
            el.style.transition = 'none';
            
            bodies.push({ body, el });
            Composite.add(engine.world, body);
        });
        
        const floor = Bodies.rectangle(window.innerWidth / 2, window.innerHeight + 50, window.innerWidth, 100, { isStatic: true });
        const leftWall = Bodies.rectangle(-50, window.innerHeight / 2, 100, window.innerHeight, { isStatic: true });
        const rightWall = Bodies.rectangle(window.innerWidth + 50, window.innerHeight / 2, 100, window.innerHeight, { isStatic: true });
        
        Composite.add(engine.world, [floor, leftWall, rightWall]);

        const runner = Runner.create();
        Runner.run(runner, engine);

        function updateDOM() {
            bodies.forEach(b => {
                b.el.style.left = (b.body.position.x - b.el.offsetWidth / 2) + 'px';
                b.el.style.top = (b.body.position.y - b.el.offsetHeight / 2) + 'px';
                b.el.style.transform = `rotate(${b.body.angle}rad)`;
            });
            requestAnimationFrame(updateDOM);
        }
        updateDOM();
    }

    // WebGL Fluid Background
    if (typeof WebGLFluid !== 'undefined') {
        WebGLFluid(document.querySelector('#fluid-canvas'), {
            IMMEDIATE: true,
            TRIGGER: 'hover',
            SIM_RESOLUTION: 128,
            DYE_RESOLUTION: 1024,
            CAPTURE_RESOLUTION: 512,
            DENSITY_DISSIPATION: 1,
            VELOCITY_DISSIPATION: 0.2,
            PRESSURE: 0.8,
            PRESSURE_ITERATIONS: 20,
            CURL: 30,
            SPLAT_RADIUS: 0.25,
            SPLAT_FORCE: 6000,
            SHADING: true,
            COLORFUL: true,
            COLOR_UPDATE_SPEED: 10,
            PAUSED: false,
            BACK_COLOR: { r: 3, g: 3, b: 5 },
            TRANSPARENT: true,
            BLOOM: true,
            BLOOM_ITERATIONS: 8,
            BLOOM_RESOLUTION: 256,
            BLOOM_INTENSITY: 0.8,
            BLOOM_THRESHOLD: 0.6,
            BLOOM_SOFT_KNEE: 0.7,
            SUNRAYS: true,
            SUNRAYS_RESOLUTION: 196,
            SUNRAYS_WEIGHT: 1.0,
        });
    }

    // Lofi Music Player
    const lofiPlayer = document.getElementById('lofi-player');
    const lofiAudio = document.getElementById('lofi-audio');
    const lofiStatus = document.querySelector('.lofi-status');

    if (lofiPlayer && lofiAudio) {
        lofiAudio.volume = 0.4;
        lofiPlayer.addEventListener('click', () => {
            if (lofiAudio.paused) {
                lofiAudio.play().then(() => {
                    lofiPlayer.classList.add('playing');
                    lofiStatus.textContent = 'Playing...';
                }).catch(err => {
                    console.log("Audio play failed:", err);
                });
            } else {
                lofiAudio.pause();
                lofiPlayer.classList.remove('playing');
                lofiStatus.textContent = 'Click to Play';
            }
        });
    }

    // Asteroids Game Easter Egg
    let playCode = ['p', 'l', 'a', 'y'];
    let playIndex = 0;
    
    document.addEventListener('keydown', (e) => {
        if (e.key.toLowerCase() === playCode[playIndex]) {
            playIndex++;
            if (playIndex === playCode.length) {
                activateAsteroids();
                playIndex = 0;
            }
        } else {
            playIndex = 0;
            if (e.key.toLowerCase() === playCode[0]) playIndex = 1;
        }
    });

    function activateAsteroids() {
        if (document.getElementById('asteroids-script')) return;
        const script = document.createElement('script');
        script.id = 'asteroids-script';
        script.src = 'https://cdn.jsdelivr.net/gh/erkie/erkie.github.io/asteroids.min.js';
        document.body.appendChild(script);
        
        // Show a quick notification
        const notif = document.createElement('div');
        notif.textContent = "Use Arrow Keys to Move, SPACE to Shoot!";
        notif.style.position = 'fixed';
        notif.style.top = '20px';
        notif.style.left = '50%';
        notif.style.transform = 'translateX(-50%)';
        notif.style.background = 'var(--accent-3)';
        notif.style.color = '#fff';
        notif.style.padding = '10px 20px';
        notif.style.borderRadius = '20px';
        notif.style.zIndex = '1000000';
        notif.style.fontWeight = 'bold';
        document.body.appendChild(notif);
        setTimeout(() => notif.remove(), 4000);
    }

    // Chart.js Radar Chart
    const ctxRadar = document.getElementById('skills-radar');
    if (ctxRadar && typeof Chart !== 'undefined') {
        Chart.defaults.color = '#9ca3af';
        new Chart(ctxRadar, {
            type: 'radar',
            data: {
                labels: ['Python', 'JavaScript', 'HTML/CSS', 'SQL', 'AI Workflows', 'Computer Vision'],
                datasets: [{
                    label: 'Skill Level',
                    data: [90, 85, 80, 75, 85, 80],
                    backgroundColor: 'rgba(99, 102, 241, 0.2)',
                    borderColor: 'rgba(99, 102, 241, 1)',
                    pointBackgroundColor: 'rgba(219, 39, 119, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(219, 39, 119, 1)'
                }]
            },
            options: {
                scales: {
                    r: {
                        angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
                        grid: { color: 'rgba(255, 255, 255, 0.1)' },
                        pointLabels: { color: '#a855f7', font: { size: 12, family: 'Space Grotesk', weight: 'bold' } },
                        ticks: { display: false, min: 0, max: 100 }
                    }
                },
                plugins: {
                    legend: { display: false }
                }
            }
        });
    }

    // Virtual Pixel Pet Logic
    const pet = document.getElementById('virtual-pet');
    if (pet) {
        let petX = 10;
        let petDirection = 1;
        let isPaused = false;
        
        setInterval(() => {
            if (isPaused) {
                if (Math.random() < 0.05) isPaused = false;
                return;
            }
            
            const screenWidth = window.innerWidth;
            
            // 2% chance to change direction, 1% chance to pause
            const rand = Math.random();
            if (rand < 0.02) {
                petDirection *= -1;
            } else if (rand < 0.03) {
                isPaused = true;
            }
            
            petX += 2 * petDirection;
            
            if (petX <= 0) {
                petX = 0;
                petDirection = 1;
            } else if (petX >= screenWidth - 80) {
                petX = screenWidth - 80;
                petDirection = -1;
            }
            
            pet.style.left = petX + 'px';
            pet.style.transform = `scaleX(${petDirection})`;
        }, 50);
    }
});
