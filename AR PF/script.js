// ============================================
// ULTRA-MODERN PORTFOLIO - ALL ANIMATIONS
// ============================================

class PortfolioAnimator {
    constructor() {
        this.init();
    }

    init() {
        this.preloader();
        this.navbar();
        this.typingEffect();
        this.skillBars();
        this.scrollAnimations();
        this.backToTop();
        this.liveParticles();
        this.formHandler();
        this.customCursor();
        this.activeNav();
    }

    // 🔥 PRELOADER
    preloader() {
        window.addEventListener('load', () => {
            const preloader = document.querySelector('.preloader');
            preloader.style.opacity = '0';
            setTimeout(() => preloader.remove(), 800);
        });
    }

    // 📱 MOBILE NAVBAR
    navbar() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        const navbar = document.querySelector('.navbar');

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        });

        // Close mobile menu on link click
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // ⌨️ LIVE TYPING ANIMATION (CONTINUOUS)
    typingEffect() {
        const texts = [
            "BCA Student",
            "Data Analyst", 
            "Python Developer",
            "Power BI Expert"
        ];
        let index = 0;
        let charIndex = 0;
        let isDeleting = false;
        const typedText = document.querySelector('.typed-text');

        function type() {
            const currentText = texts[index];
            
            if (isDeleting) {
                typedText.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typedText.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 40 : 120;
            
            if (!isDeleting && charIndex === currentText.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                index = (index + 1) % texts.length;
                typeSpeed = 800;
            }

            setTimeout(type, typeSpeed);
        }

        type();
    }

    // 📊 ANIMATED SKILL BARS
    skillBars() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progress = entry.target;
                    const percent = progress.dataset.percent;
                    progress.style.width = percent + '%';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.7 });

        document.querySelectorAll('.skill-progress').forEach(bar => {
            observer.observe(bar);
        });
    }

    // ✨ SCROLL ANIMATIONS
    scrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('animate');
                    }, index * 100);
                }
            });
        }, { 
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        document.querySelectorAll('.section, .project-card, .skill-card, .about-card').forEach(el => {
            el.classList.add('fade-in-up');
            observer.observe(el);
        });
    }

    // ⬆️ BACK TO TOP
    backToTop() {
        const btn = document.getElementById('backToTop');
        
        window.addEventListener('scroll', () => {
            btn.classList.toggle('show', window.scrollY > 800);
        });

        btn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ✨ LIVE CONTINUOUS PARTICLES
    liveParticles() {
        // Background particles
        setInterval(() => {
            const particle = document.createElement('div');
            particle.className = 'bg-particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.setProperty('--duration', (15 + Math.random() * 15) + 's');
            particle.style.setProperty('--delay', Math.random() * 5 + 's');
            document.querySelector('.bg-animation').appendChild(particle);
            
            setTimeout(() => particle.remove(), 35000);
        }, 800);

        // Profile particles enhancement
        setInterval(() => {
            const particle = document.createElement('div');
            particle.className = 'particle extra';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.width = (2 + Math.random() * 4) + 'px';
            particle.style.height = particle.style.width;
            document.querySelector('.live-particles').appendChild(particle);
            
            setTimeout(() => particle.remove(), 4000);
        }, 500);
    }

    // 📧 CONTACT FORM
    formHandler() {
        document.querySelector('.contact-form').addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simulate sending
            const btn = e.target.querySelector('.submit-btn');
            const originalText = btn.innerHTML;
            
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            btn.disabled = true;
            
            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                btn.style.background = 'linear-gradient(135deg, #43e97b, #38f9d7)';
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                    btn.style.background = '';
                    e.target.reset();
                }, 2000);
            }, 1500);
            
            // Show success message
            alert('🎉 Message sent successfully! I\'ll reply within 24 hours.');
        });
    }

    // 🖱️ ULTRA-MODERN CUSTOM CURSOR
    customCursor() {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        document.body.appendChild(cursor);

        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        // Enhanced hover effects
        const hoverTargets = document.querySelectorAll('a, button, .project-card, .skill-card, .profile-image-container, .btn');
        hoverTargets.forEach(target => {
            target.addEventListener('mouseenter', () => cursor.classList.add('hover'));
            target.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
        });
    }

    // 🔗 ACTIVE NAVBAR HIGHLIGHTING
    activeNav() {
        window.addEventListener('scroll', () => {
            const sections = document.querySelectorAll('section[id]');
            const scrollY = window.scrollY + 200;

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                const sectionId = section.getAttribute('id');

                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    document.querySelectorAll('.nav-link').forEach(link => {
                        link.classList.remove('active');
                    });
                    document.querySelector(`a[href="#${sectionId}"]`).classList.add('active');
                }
            });
        });
    }
}

// 🚀 INITIALIZE EVERYTHING
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioAnimator();
});

// 🌟 PROFILE IMAGE FALLBACK
document.getElementById('profileImg').onerror = function() {
    this.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face';
};

// 📱 PERFECT RESPONSIVE HANDLING
window.addEventListener('resize', () => {
    // Handle any responsive recalculations
});