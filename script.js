document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio Loaded Successfully');

    // --- Interactive Background Logic ---
    const canvas = document.getElementById('bg-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    const particleCount = 100;
    const mouse = { x: null, y: null, radius: 150 };
    let lastScrollY = window.scrollY;

    window.addEventListener('mousemove', (event) => {
        mouse.x = event.x;
        mouse.y = event.y;
    });

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.baseX = this.x;
            this.baseY = this.y;
            this.size = Math.random() * 2 + 1;
            this.density = (Math.random() * 30) + 1;
        }

        draw() {
            ctx.fillStyle = '#000000';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
        }

        update() {
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            let maxDistance = mouse.radius;

            if (distance < maxDistance) {
                // Calculate force that decreases as it gets very close to avoid jitter
                // We use a smoother seeking behavior
                let force = (maxDistance - distance) / maxDistance;

                // Add a "relaxed" factor: move a fraction of the way towards the target
                // This creates a damping effect
                let targetX = (dx / distance) * force * this.density;
                let targetY = (dy / distance) * force * this.density;

                this.x += targetX * 0.05; // Reduced multiplier for "relaxed" feel
                this.y += targetY * 0.05;
            }

            // --- Scroll reaction ---
            const currentScrollY = window.scrollY;
            const scrollDelta = currentScrollY - lastScrollY;
            if (scrollDelta !== 0) {
                // Apply a slight push based on scroll
                this.y -= scrollDelta * 0.5;
            }

            // Return to base position with easing
            let dxBase = this.x - this.baseX;
            let dyBase = this.y - (this.baseY - (window.scrollY * 0.1)); // Parallax effect on base position
            this.x -= dxBase / 20;
            this.y -= dyBase / 20;
        }
    }

    function init() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particles.length; i++) {
            particles[i].draw();
            particles[i].update();
        }
        lastScrollY = window.scrollY; // Update scroll tracker
        requestAnimationFrame(animate);
    }

    init();
    animate();

    // --- Smooth Scroll for Navigation Links ---
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Simple Intersection Observer for Fade-in effects
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 0.6s ease-out';
        observer.observe(section);
    });
});
