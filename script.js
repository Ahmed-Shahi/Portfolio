/**
 * AHMED SHAHI — PORTFOLIO SCRIPT
 * Handles Canvas Background, Ship-Log vs Grid Toggle, Project Modal, and Smooth Scrolling
 */

document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // 1. Projects Data Store (From CV & Portfolio)
    // ==========================================
    const projectsData = {
        'video-chat': {
            title: 'Cloud-Deployed Real-Time Video Platform',
            date: 'July 2026',
            image: 'assets/VideoChat.png',
            tech: ['WebSockets', 'WebRTC', 'Node.js', 'Docker', 'AWS EC2', 'Nginx', 'SSL/TLS'],
            bullets: [
                'Engineered low-latency peer-to-peer audio/video communication platform serving sub-100ms connection latency via WebSockets and WebRTC.',
                'Deployed multi-container environment on AWS EC2 using Docker and Nginx reverse proxy with automated SSL/TLS certificate renewal.',
                'Built responsive client UI with connection heartbeat handling and media stream toggles.'
            ],
            liveUrl: null,
            repoUrl: 'https://github.com/Ahmed-Shahi/PROJECTS-2025/tree/main/VIDEO-CHAT'
        },
        'multivendor': {
            title: 'Smart Multi-Vendor Marketplace & E-Commerce Platform',
            date: 'April 2026',
            image: 'assets/Mutlvendor.png',
            tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Redux Toolkit', 'Docker', 'JWT', 'Cloudinary'],
            bullets: [
                'Built scalable storefront and multi-tier vendor portals supporting 1,000+ catalog SKUs, JWT authentication, and automated real-time inventory synchronization.',
                'Engineered granular Role-Based Access Control (RBAC) across three custom dashboards (Admin, Seller, Customer) and containerized backend services via Docker.',
                'Integrated Cloudinary media pipelines with Multer for secure and optimized multi-image product catalog uploads.'
            ],
            liveUrl: 'https://market-place-frontend-inky.vercel.app/',
            repoUrl: 'https://github.com/Ahmed-Shahi/Multi-Vendor-E-Commerce-Marketplace-'
        },
        'clinic': {
            title: 'AI-Powered Healthcare & Clinic Management System',
            date: 'May 2026',
            image: 'assets/Clinic.png',
            tech: ['React.js', 'Express.js', 'MongoDB', 'Google Gemini API', 'Tailwind CSS', 'Node.js'],
            bullets: [
                'Integrated Google Gemini LLM API to triage patient symptoms 24/7, reducing routine inquiry bottlenecks for clinic reception by 50%.',
                'Engineered end-to-end appointment booking and electronic medical records workflows with intuitive, accessible UI components.',
                'Features distinct dashboards tailored for Patients, Doctors, and Clinic Administrators with real-time status management.'
            ],
            liveUrl: 'https://clinic-frontend-nu.vercel.app/',
            repoUrl: 'https://github.com/Ahmed-Shahi/Clinic-Project'
        },
        'whatsapp-bot': {
            title: 'WhatsApp Business Cloud Bot Automation',
            date: 'June 2026 – July 2026',
            image: 'assets/Chatbot.png',
            tech: ['Meta Graph API', 'Webhooks', 'Node.js', 'Express', 'MongoDB', 'CSV Engine'],
            bullets: [
                'Architected an automated WhatsApp Business Cloud Bot using Node.js/Express, Meta Graph API, and Webhooks, achieving 99.9% uptime for 24/7 doctor inquiries.',
                'Engineered an automated end-to-end pharmaceutical order pipeline, cutting order placement confirmation time from 4+ hours to under 30 seconds.',
                'Integrated real-time instant alert dispatching to sales managers on incoming high-priority leads, boosting deal conversion rates by ~35%.',
                'Designed and deployed a centralized management dashboard to monitor real-time customer orders, transaction lifecycles, and account details.',
                'Implemented automated multi-parameter filtering and high-speed CSV export functionality, cutting reporting and order reconciliation time by over 80%.'
            ],
            liveUrl: null,
            repoUrl: 'https://github.com/Ahmed-Shahi/PROJECTS-2025/tree/main/AI-CHATBOT'
        },
        'ec2-portal': {
            title: 'AWS EC2 Self-Service Automation Portal',
            date: '2026',
            image: 'assets/EC2-AWS.png',
            tech: ['FastAPI', 'AWS CLI', 'Docker', 'Python', 'Boto3'],
            bullets: [
                'A powerful, lightweight FastAPI-based portal for self-service AWS EC2 instance management.',
                'Designed for dev teams to provision temporary resources with automated cleanup to keep cloud costs at zero.',
                'Features intuitive web-based instance start/stop controls, automated scheduling, and AWS credential security.'
            ],
            liveUrl: null,
            repoUrl: 'https://github.com/Ahmed-Shahi/EC2-Automation-Website'
        },
        'sms-agent': {
            title: 'Remote Desktop Control Agent via SMS Automation',
            date: 'Feb 2026',
            image: 'assets/hero-balustrade-bg.jpg',
            tech: ['Python', 'Android Debug Bridge (ADB)', 'Windows API', 'Bash'],
            bullets: [
                'Constructed lightweight background agent executing secure Windows OS administrative tasks remotely via SMS protocol triggers.',
                'Utilized ADB listeners and cryptographic hash checks to ensure unauthorized commands are discarded immediately.'
            ],
            liveUrl: null,
            repoUrl: 'https://github.com/Ahmed-Shahi'
        }
    };

    // ==========================================
    // 2. Project View Switcher (Ship-Log vs Grid)
    // ==========================================
    const btnToggleList = document.getElementById('view-toggle-list');
    const btnToggleGrid = document.getElementById('view-toggle-grid');
    const projectsListView = document.getElementById('projects-list-view');
    const projectsGridView = document.getElementById('projects-grid-view');

    if (btnToggleList && btnToggleGrid && projectsListView && projectsGridView) {
        btnToggleList.addEventListener('click', () => {
            btnToggleList.classList.add('active');
            btnToggleGrid.classList.remove('active');
            projectsListView.classList.remove('hidden');
            projectsGridView.classList.add('hidden');
        });

        btnToggleGrid.addEventListener('click', () => {
            btnToggleGrid.classList.add('active');
            btnToggleList.classList.remove('active');
            projectsGridView.classList.remove('hidden');
            projectsListView.classList.add('hidden');
        });
    }

    // ==========================================
    // 3. Project Details Modal
    // ==========================================
    const projectModal = document.getElementById('project-modal');
    const modalBackdrop = document.getElementById('modal-backdrop');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const modalBody = document.getElementById('modal-body');

    function openProjectModal(projectId) {
        const data = projectsData[projectId];
        if (!data) return;

        const techPills = data.tech.map(t => `<span>${t}</span>`).join('');
        const bulletsHtml = data.bullets.map(b => `<li>${b}</li>`).join('');

        let actionsHtml = '';
        if (data.liveUrl) {
            actionsHtml += `<a href="${data.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">Visit Live Site ↗</a>`;
        }
        if (data.repoUrl) {
            actionsHtml += `<a href="${data.repoUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-outline">View GitHub Repository ↗</a>`;
        }

        modalBody.innerHTML = `
            <div class="modal-media-wrap">
                <img src="${data.image}" alt="${data.title}" class="modal-media-img">
            </div>
            <h3 class="modal-title">${data.title}</h3>
            <div class="modal-tech-pills">${techPills}</div>
            <ul class="modal-bullets">${bulletsHtml}</ul>
            <div class="modal-actions">${actionsHtml}</div>
        `;

        projectModal.classList.add('active');
        projectModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        projectModal.classList.remove('active');
        projectModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    // Ship-log item click triggers
    document.querySelectorAll('.ship-log-item').forEach(item => {
        item.addEventListener('click', () => {
            const projectId = item.getAttribute('data-project');
            openProjectModal(projectId);
        });
    });

    // Gallery card click triggers
    document.querySelectorAll('.gallery-card').forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.tagName === 'A' || e.target.closest('a')) return;
            const projectId = card.getAttribute('data-project');
            openProjectModal(projectId);
        });
    });

    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
    if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && projectModal.classList.contains('active')) {
            closeModal();
        }
    });

    // ==========================================
    // 4. Contact Form Handling
    // ==========================================
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            const firstName = document.getElementById('first-name').value.trim();
            const lastName = document.getElementById('last-name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!firstName || !email || !message) {
                return; // Let standard HTML5 validation handle missing fields
            }

            // Construct mailto link
            const subject = encodeURIComponent(`Portfolio Inquiry from ${firstName} ${lastName}`);
            const body = encodeURIComponent(
                `Name: ${firstName} ${lastName}\nEmail: ${email}\nPhone/Subject: ${phone}\n\nMessage:\n${message}`
            );
            
            // Show status
            if (formStatus) {
                formStatus.className = 'form-status-msg success';
                formStatus.textContent = 'Opening your email client...';
                setTimeout(() => {
                    formStatus.textContent = 'Message drafted! Thank you for connecting.';
                }, 2500);
            }

            window.location.href = `mailto:ahmedshahi038@gmail.com?subject=${subject}&body=${body}`;
            e.preventDefault();
        });
    }

    // ==========================================
    // 5. Interactive Canvas Particle Background
    // ==========================================
    const canvas = document.getElementById('bg-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        const particleCount = 40;
        const mouse = { x: null, y: null, radius: 120 };

        window.addEventListener('mousemove', (event) => {
            mouse.x = event.clientX;
            mouse.y = event.clientY;
        });

        window.addEventListener('mouseleave', () => {
            mouse.x = null;
            mouse.y = null;
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
                this.density = Math.random() * 20 + 2;
                this.alpha = Math.random() * 0.35 + 0.15;
            }

            draw() {
                ctx.fillStyle = `rgba(18, 18, 18, ${this.alpha})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fill();
            }

            update() {
                if (mouse.x !== null && mouse.y !== null) {
                    let dx = mouse.x - this.x;
                    let dy = mouse.y - this.y;
                    let distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < mouse.radius) {
                        let force = (mouse.radius - distance) / mouse.radius;
                        let dirX = (dx / distance) * force * this.density;
                        let dirY = (dy / distance) * force * this.density;
                        this.x -= dirX * 0.6;
                        this.y -= dirY * 0.6;
                    }
                }

                // Return gently to base position
                this.x += (this.baseX - this.x) * 0.04;
                this.y += (this.baseY - this.y) * 0.04;
            }
        }

        function initParticles() {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        }

        function animateCanvas() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particles.length; i++) {
                particles[i].draw();
                particles[i].update();
            }
            requestAnimationFrame(animateCanvas);
        }

        initParticles();
        animateCanvas();
    }

    // ==========================================
    // 6. Smooth Scroll & Active Nav Indicator
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                e.preventDefault();
                targetEl.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    console.log('Ahmed Shahi Portfolio — Ready & Interactive');
});
