// ===== PORTFOLIO WEBSITE JAVASCRIPT =====
// Modern interactive portfolio with particle system and smooth animations

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== PARTICLE SYSTEM =====
    class ParticleSystem {
        constructor(canvas) {
            this.canvas = canvas;
            this.ctx = canvas.getContext('2d');
            this.particles = [];
            this.particleCount = 50;
            this.mouseX = 0;
            this.mouseY = 0;
            
            this.resize();
            this.init();
            this.animate();
            
            // Event listeners
            window.addEventListener('resize', () => this.resize());
            window.addEventListener('mousemove', (e) => this.updateMouse(e));
        }
        
        resize() {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        }
        
        updateMouse(e) {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        }
        
        init() {
            this.particles = [];
            for (let i = 0; i < this.particleCount; i++) {
                this.particles.push(new Particle(this.canvas));
            }
        }
        
        animate() {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            
            // Update and draw particles
            this.particles.forEach(particle => {
                particle.update(this.mouseX, this.mouseY);
                particle.draw(this.ctx);
            });
            
            // Draw connections
            this.drawConnections();
            
            requestAnimationFrame(() => this.animate());
        }
        
        drawConnections() {
            this.particles.forEach((particle, i) => {
                this.particles.slice(i + 1).forEach(otherParticle => {
                    const dx = particle.x - otherParticle.x;
                    const dy = particle.y - otherParticle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 100) {
                        this.ctx.strokeStyle = `rgba(99, 102, 241, ${0.15 * (1 - distance / 100)})`;
                        this.ctx.lineWidth = 1;
                        this.ctx.beginPath();
                        this.ctx.moveTo(particle.x, particle.y);
                        this.ctx.lineTo(otherParticle.x, otherParticle.y);
                        this.ctx.stroke();
                    }
                });
            });
        }
    }
    
    class Particle {
        constructor(canvas) {
            this.canvas = canvas;
            this.reset();
            this.vx = (Math.random() - 0.5) * 2;
            this.vy = (Math.random() - 0.5) * 2;
            this.radius = Math.random() * 3 + 1;
            this.opacity = Math.random() * 0.5 + 0.2;
        }
        
        reset() {
            this.x = Math.random() * this.canvas.width;
            this.y = Math.random() * this.canvas.height;
        }
        
        update(mouseX, mouseY) {
            // Mouse attraction
            const dx = mouseX - this.x;
            const dy = mouseY - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 150) {
                const force = (150 - distance) / 150;
                this.vx += (dx / distance) * force * 0.01;
                this.vy += (dy / distance) * force * 0.01;
            }
            
            // Update position
            this.x += this.vx;
            this.y += this.vy;
            
            // Boundary check
            if (this.x < 0 || this.x > this.canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > this.canvas.height) this.vy *= -1;
            
            // Keep within bounds
            this.x = Math.max(0, Math.min(this.canvas.width, this.x));
            this.y = Math.max(0, Math.min(this.canvas.height, this.y));
            
            // Friction
            this.vx *= 0.99;
            this.vy *= 0.99;
        }
        
        draw(ctx) {
            ctx.globalAlpha = this.opacity;
            ctx.fillStyle = '#6366f1';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1;
        }
    }
    
    // Initialize particle system
    const particleCanvas = document.getElementById('particleCanvas');
    if (particleCanvas) {
        new ParticleSystem(particleCanvas);
    }
    
    // ===== SMOOTH SCROLLING NAVIGATION =====
    class SmoothNavigation {
        constructor() {
            this.navLinks = document.querySelectorAll('.nav-link');
            this.sections = document.querySelectorAll('section[id]');
            this.nav = document.querySelector('.morphing-nav');
            
            this.init();
        }
        
        init() {
            // Smooth scroll for navigation links
            this.navLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const targetId = link.getAttribute('href').substring(1);
                    const targetSection = document.getElementById(targetId);
                    
                    if (targetSection) {
                        targetSection.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            });
            
            // Update active navigation on scroll
            window.addEventListener('scroll', () => this.updateActiveNav());
            
            // Add scroll effect to navigation
            window.addEventListener('scroll', () => this.handleNavScroll());
        }
        
        updateActiveNav() {
            let current = '';
            
            this.sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionBottom = sectionTop + section.offsetHeight;
                
                if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
                    current = section.getAttribute('id');
                }
            });
            
            this.navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        }
        
        handleNavScroll() {
            if (window.scrollY > 100) {
                this.nav.style.background = 'rgba(15, 23, 42, 0.95)';
                this.nav.style.backdropFilter = 'blur(20px)';
            } else {
                this.nav.style.background = 'rgba(15, 23, 42, 0.8)';
                this.nav.style.backdropFilter = 'blur(20px)';
            }
        }
    }
    
    new SmoothNavigation();
    
    // ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
    class AnimationObserver {
        constructor() {
            this.observer = new IntersectionObserver(
                (entries) => this.handleIntersection(entries),
                { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
            );
            
            this.init();
        }
        
        init() {
            // Observe elements for animation
            const animateElements = document.querySelectorAll(
                '.glass-card, .skill-category, .project-card, .contact-card, .profile-card'
            );
            
            animateElements.forEach(el => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
                this.observer.observe(el);
            });
        }
        
        handleIntersection(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }
    }
    
    new AnimationObserver();
    
    // ===== SKILL BARS ANIMATION =====
    class SkillBars {
        constructor() {
            this.skillBars = document.querySelectorAll('.skill-progress');
            this.init();
        }
        
        init() {
            const observer = new IntersectionObserver(
                (entries) => this.animateSkills(entries),
                { threshold: 0.5 }
            );
            
            document.querySelectorAll('.skill-category').forEach(category => {
                observer.observe(category);
            });
        }
        
        animateSkills(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skillBars = entry.target.querySelectorAll('.skill-progress');
                    
                    skillBars.forEach(bar => {
                        const skillItem = bar.closest('.skill-item');
                        const level = skillItem.getAttribute('data-level');
                        
                        setTimeout(() => {
                            bar.style.width = `${level}%`;
                        }, 200);
                    });
                }
            });
        }
    }
    
    new SkillBars();
    
    // ===== COUNTER ANIMATION =====
    class CounterAnimation {
        constructor() {
            this.counters = document.querySelectorAll('.stat-number');
            this.init();
        }
        
        init() {
            const observer = new IntersectionObserver(
                (entries) => this.animateCounters(entries),
                { threshold: 0.5 }
            );
            
            this.counters.forEach(counter => {
                observer.observe(counter);
            });
        }
        
        animateCounters(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                }
            });
        }
        
        animateCounter(element) {
            const target = parseInt(element.getAttribute('data-count'));
            const increment = target / 100;
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                element.textContent = Math.floor(current);
                
                if (current >= target) {
                    element.textContent = target;
                    clearInterval(timer);
                }
            }, 20);
        }
    }
    
    new CounterAnimation();
    
    // ===== FORM HANDLING =====
    class ContactForm {
        constructor() {
            this.form = document.querySelector('.contact-form');
            this.init();
        }
        
        init() {
            if (this.form) {
                this.form.addEventListener('submit', (e) => this.handleSubmit(e));
                
                // Add floating label effect
                const inputs = this.form.querySelectorAll('input, textarea');
                inputs.forEach(input => {
                    input.addEventListener('focus', () => this.handleInputFocus(input));
                    input.addEventListener('blur', () => this.handleInputBlur(input));
                });
            }
        }
        
        handleSubmit(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this.form);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });
            
            // Show success message (in a real app, you'd send this to a server)
            this.showMessage('Thank you for your message! I\'ll get back to you soon.', 'success');
            this.form.reset();
        }
        
        handleInputFocus(input) {
            input.parentElement.classList.add('focused');
        }
        
        handleInputBlur(input) {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        }
        
        showMessage(message, type) {
            // Create message element
            const messageEl = document.createElement('div');
            messageEl.className = `form-message ${type}`;
            messageEl.textContent = message;
            messageEl.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 1rem 2rem;
                background: ${type === 'success' ? '#10b981' : '#ef4444'};
                color: white;
                border-radius: 0.5rem;
                z-index: 9999;
                animation: slideIn 0.3s ease-out;
            `;
            
            document.body.appendChild(messageEl);
            
            // Remove message after 3 seconds
            setTimeout(() => {
                messageEl.style.animation = 'slideOut 0.3s ease-out';
                setTimeout(() => messageEl.remove(), 300);
            }, 3000);
        }
    }
    
    new ContactForm();
    
    // ===== RESUME MODAL =====
    class ResumeModal {
        constructor() {
            this.modal = document.getElementById('resumeModal');
            this.resumeBtn = document.getElementById('resumeBtn');
            this.closeBtn = document.getElementById('closeModal');
            this.downloadBtn = document.getElementById('downloadResumeBtn');
            this.overlay = document.querySelector('.modal-overlay');
            
            this.init();
        }
        
        init() {
            if (this.resumeBtn) {
                this.resumeBtn.addEventListener('click', () => this.openModal());
            }
            
            if (this.closeBtn) {
                this.closeBtn.addEventListener('click', () => this.closeModal());
            }
            
            if (this.overlay) {
                this.overlay.addEventListener('click', () => this.closeModal());
            }
            
            if (this.downloadBtn) {
                this.downloadBtn.addEventListener('click', () => this.downloadResume());
            }
            
            // Close modal on escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                    this.closeModal();
                }
            });
        }
        
        openModal() {
            this.modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Analytics tracking
            if (window.analytics) {
                window.analytics.trackEvent('resume_viewed');
            }
        }
        
        closeModal() {
            this.modal.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        downloadResume() {
            // Create a downloadable PDF version
            this.generatePDF();
            
            // Analytics tracking
            if (window.analytics) {
                window.analytics.trackEvent('resume_downloaded');
            }
        }
        
        generatePDF() {
            // This is a simplified version - in a real application,
            // you would use a library like jsPDF or send the request to a server
            
            // For now, we'll show a message and simulate a download
            this.showMessage('PDF generation feature coming soon! For now, you can print this page (Ctrl+P) and save as PDF.', 'info');
            
            // Optional: You can also trigger the browser's print dialog
            setTimeout(() => {
                window.print();
            }, 1000);
        }
        
        showMessage(message, type) {
            const messageEl = document.createElement('div');
            messageEl.className = `resume-message ${type}`;
            messageEl.textContent = message;
            messageEl.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 1rem 2rem;
                background: ${type === 'info' ? '#06b6d4' : '#10b981'};
                color: white;
                border-radius: 0.5rem;
                z-index: 10000;
                max-width: 300px;
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
                animation: slideIn 0.3s ease-out;
            `;
            
            document.body.appendChild(messageEl);
            
            setTimeout(() => {
                messageEl.style.animation = 'slideOut 0.3s ease-out';
                setTimeout(() => messageEl.remove(), 300);
            }, 4000);
        }
    }
    
    new ResumeModal();
    
    // ===== MOBILE NAVIGATION =====
    class MobileNavigation {
        constructor() {
            this.toggle = document.querySelector('.nav-toggle');
            this.navLinks = document.querySelector('.nav-links');
            this.init();
        }
        
        init() {
            if (this.toggle) {
                this.toggle.addEventListener('click', () => this.toggleMenu());
            }
        }
        
        toggleMenu() {
            this.toggle.classList.toggle('active');
            
            if (this.navLinks.style.display === 'flex') {
                this.navLinks.style.display = 'none';
            } else {
                this.navLinks.style.display = 'flex';
                this.navLinks.style.flexDirection = 'column';
                this.navLinks.style.position = 'absolute';
                this.navLinks.style.top = '100%';
                this.navLinks.style.left = '0';
                this.navLinks.style.right = '0';
                this.navLinks.style.background = 'rgba(15, 23, 42, 0.95)';
                this.navLinks.style.padding = '2rem';
                this.navLinks.style.backdropFilter = 'blur(20px)';
            }
        }
    }
    
    new MobileNavigation();
    
    // ===== CURSOR EFFECTS =====
    class CursorEffects {
        constructor() {
            this.cursor = document.createElement('div');
            this.cursor.className = 'custom-cursor';
            this.cursor.style.cssText = `
                position: fixed;
                width: 20px;
                height: 20px;
                background: radial-gradient(circle, rgba(99, 102, 241, 0.8) 0%, transparent 70%);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                transition: transform 0.1s ease-out;
                display: none;
            `;
            
            document.body.appendChild(this.cursor);
            this.init();
        }
        
        init() {
            // Only show on desktop
            if (window.innerWidth > 768) {
                this.cursor.style.display = 'block';
                
                document.addEventListener('mousemove', (e) => {
                    this.cursor.style.left = e.clientX - 10 + 'px';
                    this.cursor.style.top = e.clientY - 10 + 'px';
                });
                
                // Scale on hover over interactive elements
                const interactiveElements = document.querySelectorAll(
                    'a, button, .btn-primary, .btn-secondary, .project-card, .skill-category'
                );
                
                interactiveElements.forEach(el => {
                    el.addEventListener('mouseenter', () => {
                        this.cursor.style.transform = 'scale(2)';
                    });
                    
                    el.addEventListener('mouseleave', () => {
                        this.cursor.style.transform = 'scale(1)';
                    });
                });
            }
        }
    }
    
    new CursorEffects();
    
    // ===== THEME SWITCHING =====
    class ThemeManager {
        constructor() {
            this.currentTheme = localStorage.getItem('portfolio-theme') || 'dark';
            this.init();
        }
        
        init() {
            // Apply saved theme
            document.documentElement.setAttribute('data-theme', this.currentTheme);
            
            // Create theme toggle button
            this.createThemeToggle();
        }
        
        createThemeToggle() {
            const toggle = document.createElement('button');
            toggle.className = 'theme-toggle';
            toggle.innerHTML = '<i class="fas fa-moon"></i>';
            toggle.style.cssText = `
                position: fixed;
                top: 50%;
                right: 2rem;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background: var(--bg-glass);
                backdrop-filter: blur(20px);
                border: 1px solid rgba(255, 255, 255, 0.1);
                color: var(--text-white);
                cursor: pointer;
                z-index: 999;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                justify-content: center;
            `;
            
            toggle.addEventListener('click', () => this.toggleTheme());
            document.body.appendChild(toggle);
        }
        
        toggleTheme() {
            this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', this.currentTheme);
            localStorage.setItem('portfolio-theme', this.currentTheme);
            
            const icon = document.querySelector('.theme-toggle i');
            icon.className = this.currentTheme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
        }
    }
    
    new ThemeManager();
    
    // ===== PERFORMANCE OPTIMIZATIONS =====
    class PerformanceOptimizer {
        constructor() {
            this.init();
        }
        
        init() {
            // Lazy load images
            this.lazyLoadImages();
            
            // Debounce scroll events
            this.debounceScrollEvents();
            
            // Preload critical resources
            this.preloadResources();
        }
        
        lazyLoadImages() {
            const images = document.querySelectorAll('img[data-src]');
            
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            images.forEach(img => imageObserver.observe(img));
        }
        
        debounceScrollEvents() {
            let scrollTimeout;
            
            window.addEventListener('scroll', () => {
                if (scrollTimeout) {
                    clearTimeout(scrollTimeout);
                }
                
                scrollTimeout = setTimeout(() => {
                    // Dispatch custom debounced scroll event
                    window.dispatchEvent(new Event('debouncedscroll'));
                }, 16); // ~60fps
            });
        }
        
        preloadResources() {
            // Preload critical fonts
            const fontLinks = [
                'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
                'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap'
            ];
            
            fontLinks.forEach(href => {
                const link = document.createElement('link');
                link.rel = 'preload';
                link.as = 'style';
                link.href = href;
                document.head.appendChild(link);
            });
        }
    }
    
    new PerformanceOptimizer();
    
    // ===== ACCESSIBILITY ENHANCEMENTS =====
    class AccessibilityManager {
        constructor() {
            this.init();
        }
        
        init() {
            // Add keyboard navigation support
            this.addKeyboardNavigation();
            
            // Add focus indicators
            this.enhanceFocusIndicators();
            
            // Add screen reader support
            this.addScreenReaderSupport();
            
            // Respect reduced motion preference
            this.respectReducedMotion();
        }
        
        addKeyboardNavigation() {
            document.addEventListener('keydown', (e) => {
                // Handle escape key for modals/menus
                if (e.key === 'Escape') {
                    const activeModal = document.querySelector('.modal.active');
                    if (activeModal) {
                        activeModal.classList.remove('active');
                    }
                }
                
                // Handle tab navigation
                if (e.key === 'Tab') {
                    document.body.classList.add('keyboard-navigation');
                }
            });
            
            document.addEventListener('mousedown', () => {
                document.body.classList.remove('keyboard-navigation');
            });
        }
        
        enhanceFocusIndicators() {
            const style = document.createElement('style');
            style.textContent = `
                .keyboard-navigation *:focus {
                    outline: 2px solid var(--primary-color) !important;
                    outline-offset: 2px;
                }
            `;
            document.head.appendChild(style);
        }
        
        addScreenReaderSupport() {
            // Add proper ARIA labels
            const interactiveElements = document.querySelectorAll('button, a, input, textarea');
            
            interactiveElements.forEach(el => {
                if (!el.getAttribute('aria-label') && !el.textContent.trim()) {
                    // Add appropriate ARIA label based on context
                    const context = el.closest('section')?.id || 'navigation';
                    el.setAttribute('aria-label', `Interactive element in ${context} section`);
                }
            });
        }
        
        respectReducedMotion() {
            const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
            
            if (mediaQuery.matches) {
                // Disable animations for users who prefer reduced motion
                const style = document.createElement('style');
                style.textContent = `
                    *, *::before, *::after {
                        animation-duration: 0.01ms !important;
                        animation-iteration-count: 1 !important;
                        transition-duration: 0.01ms !important;
                        scroll-behavior: auto !important;
                    }
                `;
                document.head.appendChild(style);
            }
        }
    }
    
    new AccessibilityManager();
    
    // ===== EASTER EGGS =====
    class EasterEggs {
        constructor() {
            this.konami = [];
            this.konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // Up Up Down Down Left Right Left Right B A
            this.init();
        }
        
        init() {
            document.addEventListener('keydown', (e) => this.handleKonami(e));
            
            // Secret click combination on logo
            let clickCount = 0;
            const logo = document.querySelector('.logo');
            
            if (logo) {
                logo.addEventListener('click', () => {
                    clickCount++;
                    
                    if (clickCount === 5) {
                        this.activateMatrixMode();
                        clickCount = 0;
                    }
                    
                    setTimeout(() => { clickCount = 0; }, 2000);
                });
            }
        }
        
        handleKonami(e) {
            this.konami.push(e.keyCode);
            
            if (this.konami.length > this.konamiCode.length) {
                this.konami.shift();
            }
            
            if (this.konami.length === this.konamiCode.length) {
                if (this.konami.every((val, index) => val === this.konamiCode[index])) {
                    this.activateRainbowMode();
                    this.konami = [];
                }
            }
        }
        
        activateRainbowMode() {
            document.body.classList.add('rainbow-mode');
            
            const style = document.createElement('style');
            style.textContent = `
                .rainbow-mode {
                    animation: rainbow 3s linear infinite;
                }
                
                @keyframes rainbow {
                    0% { filter: hue-rotate(0deg); }
                    100% { filter: hue-rotate(360deg); }
                }
            `;
            
            document.head.appendChild(style);
            
            setTimeout(() => {
                document.body.classList.remove('rainbow-mode');
                style.remove();
            }, 10000);
            
            console.log('🌈 Rainbow mode activated! You found the Konami code!');
        }
        
        activateMatrixMode() {
            const matrixCanvas = document.createElement('canvas');
            matrixCanvas.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 9998;
                pointer-events: none;
                background: rgba(0, 0, 0, 0.1);
            `;
            
            document.body.appendChild(matrixCanvas);
            
            const ctx = matrixCanvas.getContext('2d');
            matrixCanvas.width = window.innerWidth;
            matrixCanvas.height = window.innerHeight;
            
            const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
            const matrixArray = matrix.split("");
            
            const fontSize = 10;
            const columns = matrixCanvas.width / fontSize;
            const drops = [];
            
            for (let x = 0; x < columns; x++) {
                drops[x] = 1;
            }
            
            function drawMatrix() {
                ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
                ctx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
                
                ctx.fillStyle = '#0F0';
                ctx.font = fontSize + 'px monospace';
                
                for (let i = 0; i < drops.length; i++) {
                    const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
                    ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                    
                    if (drops[i] * fontSize > matrixCanvas.height && Math.random() > 0.975) {
                        drops[i] = 0;
                    }
                    
                    drops[i]++;
                }
            }
            
            const interval = setInterval(drawMatrix, 35);
            
            setTimeout(() => {
                clearInterval(interval);
                matrixCanvas.remove();
            }, 5000);
            
            console.log('🕶️ Matrix mode activated! The cake is a lie...');
        }
    }
    
    new EasterEggs();
    
    // ===== ANALYTICS TRACKING (PRIVACY-FRIENDLY) =====
    class Analytics {
        constructor() {
            this.events = [];
            this.init();
        }
        
        init() {
            // Track page views
            this.trackEvent('page_view', { page: window.location.pathname });
            
            // Track interactions
            document.addEventListener('click', (e) => this.handleClick(e));
            
            // Track time on page
            this.startTime = Date.now();
            window.addEventListener('beforeunload', () => this.trackTimeOnPage());
        }
        
        trackEvent(eventName, data = {}) {
            const event = {
                name: eventName,
                data: data,
                timestamp: Date.now(),
                userAgent: navigator.userAgent,
                url: window.location.href
            };
            
            this.events.push(event);
            
            // In a real application, you'd send this to your analytics service
            console.log('Analytics Event:', event);
        }
        
        handleClick(e) {
            const element = e.target.closest('a, button, .btn-primary, .btn-secondary');
            
            if (element) {
                this.trackEvent('click', {
                    element: element.tagName.toLowerCase(),
                    text: element.textContent.trim(),
                    href: element.href || null
                });
            }
        }
        
        trackTimeOnPage() {
            const timeOnPage = Date.now() - this.startTime;
            this.trackEvent('time_on_page', { duration: timeOnPage });
        }
    }
    
    new Analytics();
    
    // ===== CONSOLE EASTER EGG =====
    console.log(`
    🚀 Welcome to my portfolio!
    
    ╔══════════════════════════════════════╗
    ║  Thanks for checking out the code!   ║
    ║                                      ║
    ║  Built with:                         ║
    ║  • Vanilla JavaScript               ║
    ║  • CSS3 with custom properties       ║
    ║  • Modern web APIs                   ║
    ║  • Lots of ☕ and 💪                ║
    ║                                      ║
    ║  Try the Konami code: ↑↑↓↓←→←→BA     ║
    ║  Or click the logo 5 times quickly!  ║
    ╚══════════════════════════════════════╝
    
    Want to work together? Let's talk! 📧
    `);
    
});

// ===== CSS ANIMATIONS (ADDED DYNAMICALLY) =====
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .theme-toggle:hover {
        transform: scale(1.1);
        box-shadow: var(--shadow-lg);
    }
    
    .form-message {
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    }
`;

document.head.appendChild(additionalStyles);
