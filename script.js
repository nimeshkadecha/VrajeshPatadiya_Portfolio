// Preloader
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 1000);
});

// Navigation functionality
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Mobile menu toggle
hamburger.addEventListener('click', (e) => {
    e.preventDefault();
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Active navigation link highlighting
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Elements to animate on scroll
const animateElements = document.querySelectorAll('.skill-item, .project-card, .education-card, .timeline-item, .stat, .about-text, .contact-info, .contact-form');
animateElements.forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// Skill items hover effect
const skillItems = document.querySelectorAll('.skill-item');
skillItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-10px) scale(1.05)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0) scale(1)';
    });
});

// Project cards 3D tilt effect
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
});

// Typing animation for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize typing animation after page load
window.addEventListener('load', () => {
    setTimeout(() => {
        const heroName = document.querySelector('.title-name');
        if (heroName) {
            const originalText = heroName.textContent;
            typeWriter(heroName, originalText, 150);
        }
    }, 1500);
});

// Contact form handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate form submission
        showNotification('Thank you! Your message has been sent successfully.', 'success');
        this.reset();
    });
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10B981' : type === 'error' ? '#EF4444' : '#3B82F6'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        z-index: 10000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
        max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    
    // Show animation
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        hideNotification(notification);
    });
    
    // Auto hide after 5 seconds
    setTimeout(() => {
        hideNotification(notification);
    }, 5000);
}

function hideNotification(notification) {
    notification.style.opacity = '0';
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// Back to top button
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroShapes = document.querySelectorAll('.shape');
    
    heroShapes.forEach((shape, index) => {
        const speed = 0.5 + (index * 0.1);
        shape.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    }
    updateCounter();
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat h4');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.textContent);
                animateCounter(stat, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const aboutStats = document.querySelector('.about-stats');
if (aboutStats) {
    statsObserver.observe(aboutStats);
}

// Progressive skill bar animation (if you want to add skill bars later)
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        bar.style.width = progress + '%';
    });
}

// Theme switcher (optional feature)
function initThemeSwitch() {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
        });
        
        // Load saved theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
        }
    }
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initThemeSwitch();
    
    // Add loading class to body
    document.body.classList.add('loading');
    
    // Remove loading class after page is fully loaded
    window.addEventListener('load', () => {
        setTimeout(() => {
            document.body.classList.remove('loading');
        }, 1000);
    });
});

// Smooth reveal animations for timeline
const timelineItems = document.querySelectorAll('.timeline-item');
timelineItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.2}s`;
});

// Project filtering (if you want to add categories later)
function filterProjects(category) {
    const projects = document.querySelectorAll('.project-card');
    projects.forEach(project => {
        if (category === 'all' || project.classList.contains(category)) {
            project.style.display = 'block';
            project.classList.add('fade-in');
        } else {
            project.style.display = 'none';
        }
    });
}

// Lazy loading for images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
lazyLoadImages();

// Cursor trail effect (optional enhancement)
function createCursorTrail() {
    const trail = [];
    const trailLength = 20;
    
    for (let i = 0; i < trailLength; i++) {
        const dot = document.createElement('div');
        dot.className = 'cursor-trail';
        dot.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: #4A90E2;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            opacity: ${1 - i / trailLength};
            transition: all 0.1s ease;
        `;
        document.body.appendChild(dot);
        trail.push(dot);
    }
    
    document.addEventListener('mousemove', (e) => {
        trail.forEach((dot, index) => {
            setTimeout(() => {
                dot.style.left = e.clientX + 'px';
                dot.style.top = e.clientY + 'px';
            }, index * 10);
        });
    });
}

// Uncomment to enable cursor trail
// createCursorTrail();

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    // Your scroll event handlers here
}, 16)); // 60fps

// Add custom cursor for interactive elements
const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-item');
interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        document.body.style.cursor = 'pointer';
    });
    
    element.addEventListener('mouseleave', () => {
        document.body.style.cursor = 'default';
    });
});

// Mobile-specific improvements and touch handling
// Mobile-specific touch handling for project cards
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

if (isTouchDevice) {
    projectCards.forEach(card => {
        const overlay = card.querySelector('.project-overlay');
        let touchStartTime;
        
        card.addEventListener('touchstart', (e) => {
            touchStartTime = Date.now();
        });
        
        card.addEventListener('touchend', (e) => {
            const touchEndTime = Date.now();
            const touchDuration = touchEndTime - touchStartTime;
            
            // If it's a quick tap (not a scroll), toggle overlay
            if (touchDuration < 200) {
                e.preventDefault();
                overlay.style.opacity = overlay.style.opacity === '1' ? '0' : '1';
            }
        });
        
        // Remove 3D tilt effect on touch devices
        card.removeEventListener('mousemove', () => {});
        card.removeEventListener('mouseleave', () => {});
    });
} else {
    // Keep existing hover effects for non-touch devices
    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });
}

// Improved mobile keyboard handling
const formInputs = document.querySelectorAll('input, textarea');
formInputs.forEach(input => {
    // Prevent zoom on iOS when focusing inputs
    input.addEventListener('touchstart', () => {
        if (window.innerWidth <= 768) {
            input.style.fontSize = '16px';
        }
    });
    
    // Handle virtual keyboard on mobile
    input.addEventListener('focus', () => {
        if (window.innerWidth <= 768) {
            setTimeout(() => {
                input.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 300);
        }
    });
});

// Improve scroll performance on mobile
let ticking = false;
function updateScrollEffects() {
    // Existing scroll effects here
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateScrollEffects);
        ticking = true;
    }
});

// Handle orientation change
window.addEventListener('orientationchange', () => {
    // Close mobile menu on orientation change
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = '';
    
    // Recalculate viewport height
    setTimeout(() => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }, 100);
});

// Set initial viewport height for mobile
const setVH = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
};

setVH();
window.addEventListener('resize', setVH);

// Improved touch feedback for buttons
const touchElements = document.querySelectorAll('.btn, .social-link, .project-link, .skill-item');
touchElements.forEach(element => {
    element.addEventListener('touchstart', () => {
        element.style.transform = 'scale(0.98)';
    });
    
    element.addEventListener('touchend', () => {
        element.style.transform = '';
    });
    
    element.addEventListener('touchcancel', () => {
        element.style.transform = '';
    });
});

// Fix iOS Safari viewport height issues
if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
    const updateIOSHeight = () => {
        document.documentElement.style.setProperty('--vh', `${window.innerHeight}px`);
    };
    
    updateIOSHeight();
    window.addEventListener('resize', updateIOSHeight);
    window.addEventListener('orientationchange', updateIOSHeight);
}

// Prevent elastic scroll on iOS
document.addEventListener('touchmove', (e) => {
    if (e.target.closest('.nav-menu') || e.target.closest('.contact-form')) {
        return; // Allow scrolling in menu and forms
    }
    
    const isScrollable = e.target.scrollHeight > e.target.clientHeight;
    if (!isScrollable) {
        e.preventDefault();
    }
}, { passive: false });

console.log('Portfolio loaded successfully! 🚀');

// Enhanced particle system for hero section
function createFloatingElements() {
    const hero = document.querySelector('.hero');
    const particleCount = 15;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 8 + 4}px;
            height: ${Math.random() * 8 + 4}px;
            background: rgba(237, 219, 205, 0.6);
            border-radius: 50%;
            pointer-events: none;
            animation: float ${Math.random() * 10 + 10}s ease-in-out infinite;
            animation-delay: ${Math.random() * 5}s;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            z-index: 1;
        `;
        hero.appendChild(particle);
    }
}

// Enhanced scroll animations
function enhancedScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    const animateElements = document.querySelectorAll('.skill-item, .project-card, .education-card, .timeline-item, .stat, .about-text, .contact-info, .contact-form');
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Magnetic effect for buttons
function addMagneticEffect() {
    const magneticElements = document.querySelectorAll('.btn, .project-link, .social-link');
    
    magneticElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            element.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) scale(1.05)`;
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'translate(0px, 0px) scale(1)';
        });
    });
}

// Enhanced typing animation with cursor
function enhancedTypeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    element.style.position = 'relative';
    
    // Add cursor
    const cursor = document.createElement('span');
    cursor.innerHTML = '|';
    cursor.style.cssText = `
        animation: blink 1s infinite;
        color: #A6B6CA;
        font-weight: 400;
    `;
    
    // Add cursor animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    function type() {
        if (i < text.length) {
            element.innerHTML = text.slice(0, i + 1);
            element.appendChild(cursor);
            i++;
            setTimeout(type, speed);
        } else {
            setTimeout(() => {
                cursor.remove();
            }, 2000);
        }
    }
    type();
}

// Advanced parallax effect
function advancedParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        // Hero shapes parallax
        const shapes = document.querySelectorAll('.shape');
        shapes.forEach((shape, index) => {
            const speed = 0.3 + (index * 0.1);
            shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
        });
        
        // Hero background parallax
        const heroBackground = document.querySelector('.hero-background');
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Enhanced skill item interactions
function enhanceSkillItems() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-15px) scale(1.08) rotateZ(2deg)';
            item.style.boxShadow = '0 15px 35px rgba(78, 80, 95, 0.2)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0) scale(1) rotateZ(0deg)';
            item.style.boxShadow = '';
        });
    });
}

// Initialize enhanced animations
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        createFloatingElements();
        enhancedScrollAnimations();
        addMagneticEffect();
        advancedParallax();
        enhanceSkillItems();
    }, 1000);
});

// Enhanced hero name typing animation
window.addEventListener('load', () => {
    setTimeout(() => {
        const heroName = document.querySelector('.title-name');
        if (heroName) {
            const originalText = heroName.textContent;
            enhancedTypeWriter(heroName, originalText, 120);
        }
    }, 2000);
});

// Add smooth page transitions
function addPageTransitions() {
    document.body.style.opacity = '0';
    document.body.style.transform = 'translateY(20px)';
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            document.body.style.transition = 'all 0.8s ease';
            document.body.style.opacity = '1';
            document.body.style.transform = 'translateY(0)';
        }, 100);
    });
}

addPageTransitions();

// Professional Canvas Particle System
class ParticleSystem {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        this.connectionDistance = 150;
        this.maxParticles = 80;
        
        this.resize();
        this.createParticles();
        this.bindEvents();
        this.animate();
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createParticles() {
        this.particles = [];
        for (let i = 0; i < this.maxParticles; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 3 + 1,
                opacity: Math.random() * 0.8 + 0.2,
                color: this.getRandomColor(),
                pulse: Math.random() * Math.PI * 2,
                pulseSpeed: 0.02 + Math.random() * 0.02
            });
        }
    }
    
    getRandomColor() {
        const colors = [
            'rgba(237, 219, 205, 0.8)',
            'rgba(166, 182, 202, 0.6)',
            'rgba(139, 115, 85, 0.7)',
            'rgba(255, 255, 255, 0.5)'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    bindEvents() {
        window.addEventListener('resize', () => this.resize());
        
        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouse.x = e.clientX - rect.left;
            this.mouse.y = e.clientY - rect.top;
        });
        
        this.canvas.addEventListener('mouseleave', () => {
            this.mouse.x = -1000;
            this.mouse.y = -1000;
        });
    }
    
    drawParticle(particle) {
        this.ctx.save();
        this.ctx.globalAlpha = particle.opacity + Math.sin(particle.pulse) * 0.3;
        this.ctx.fillStyle = particle.color;
        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.restore();
    }
    
    drawConnections() {
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < this.connectionDistance) {
                    const opacity = (1 - distance / this.connectionDistance) * 0.3;
                    this.ctx.save();
                    this.ctx.globalAlpha = opacity;
                    this.ctx.strokeStyle = 'rgba(166, 182, 202, 0.4)';
                    this.ctx.lineWidth = 1;
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                    this.ctx.restore();
                }
            }
        }
    }
    
    drawMouseConnections() {
        if (this.mouse.x < 0 || this.mouse.y < 0) return;
        
        for (let particle of this.particles) {
            const dx = this.mouse.x - particle.x;
            const dy = this.mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 200) {
                const opacity = (1 - distance / 200) * 0.6;
                this.ctx.save();
                this.ctx.globalAlpha = opacity;
                this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
                this.ctx.lineWidth = 2;
                this.ctx.beginPath();
                this.ctx.moveTo(this.mouse.x, this.mouse.y);
                this.ctx.lineTo(particle.x, particle.y);
                this.ctx.stroke();
                this.ctx.restore();
                
                // Mouse attraction effect
                const force = (200 - distance) / 200;
                particle.vx += dx * force * 0.0001;
                particle.vy += dy * force * 0.0001;
            }
        }
        
        // Draw mouse glow
        this.ctx.save();
        this.ctx.globalAlpha = 0.6;
        const gradient = this.ctx.createRadialGradient(
            this.mouse.x, this.mouse.y, 0,
            this.mouse.x, this.mouse.y, 50
        );
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.3)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        this.ctx.fillStyle = gradient;
        this.ctx.beginPath();
        this.ctx.arc(this.mouse.x, this.mouse.y, 50, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.restore();
    }
    
    updateParticles() {
        for (let particle of this.particles) {
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.pulse += particle.pulseSpeed;
            
            // Apply gentle friction
            particle.vx *= 0.99;
            particle.vy *= 0.99;
            
            // Boundary collision with gentle bounce
            if (particle.x < 0 || particle.x > this.canvas.width) {
                particle.vx *= -0.5;
                particle.x = Math.max(0, Math.min(this.canvas.width, particle.x));
            }
            if (particle.y < 0 || particle.y > this.canvas.height) {
                particle.vy *= -0.5;
                particle.y = Math.max(0, Math.min(this.canvas.height, particle.y));
            }
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.updateParticles();
        this.drawConnections();
        
        for (let particle of this.particles) {
            this.drawParticle(particle);
        }
        
        this.drawMouseConnections();
        
        requestAnimationFrame(() => this.animate());
    }
}

// Enhanced Mouse Trail Effect
class MouseTrail {
    constructor() {
        this.trail = [];
        this.maxTrailLength = 15;
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '9999';
        this.canvas.style.opacity = '0.8';
        
        document.body.appendChild(this.canvas);
        this.resize();
        this.bindEvents();
        this.animate();
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    bindEvents() {
        window.addEventListener('resize', () => this.resize());
        
        document.addEventListener('mousemove', (e) => {
            this.trail.push({
                x: e.clientX,
                y: e.clientY,
                time: Date.now()
            });
            
            if (this.trail.length > this.maxTrailLength) {
                this.trail.shift();
            }
        });
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        const now = Date.now();
        this.trail = this.trail.filter(point => now - point.time < 1000);
        
        for (let i = 0; i < this.trail.length; i++) {
            const point = this.trail[i];
            const age = now - point.time;
            const life = 1 - age / 1000;
            const size = 8 * life;
            const opacity = life * 0.6;
            
            this.ctx.save();
            this.ctx.globalAlpha = opacity;
            
            const gradient = this.ctx.createRadialGradient(
                point.x, point.y, 0,
                point.x, point.y, size
            );
            gradient.addColorStop(0, 'rgba(166, 182, 202, 0.8)');
            gradient.addColorStop(0.5, 'rgba(139, 115, 85, 0.4)');
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
            
            this.ctx.fillStyle = gradient;
            this.ctx.beginPath();
            this.ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.restore();
        }
        
        requestAnimationFrame(() => this.animate());
    }
}

// Enhanced Typography Animation
function enhancedTypeWriter(element, text, speed = 80) {
    let i = 0;
    element.innerHTML = '';
    element.style.position = 'relative';
    
    const cursor = document.createElement('span');
    cursor.innerHTML = '|';
    cursor.style.cssText = `
        animation: blink 1s infinite;
        color: #A6B6CA;
        font-weight: 400;
        margin-left: 2px;
    `;
    
    function type() {
        if (i < text.length) {
            const char = text.charAt(i);
            const span = document.createElement('span');
            span.textContent = char;
            span.style.opacity = '0';
            span.style.transform = 'translateY(20px)';
            span.style.transition = 'all 0.3s ease';
            
            element.appendChild(span);
            element.appendChild(cursor);
            
            setTimeout(() => {
                span.style.opacity = '1';
                span.style.transform = 'translateY(0)';
            }, 50);
            
            i++;
            setTimeout(type, speed + Math.random() * 50);
        } else {
            setTimeout(() => {
                cursor.remove();
            }, 2000);
        }
    }
    type();
}

// Magnetic Button Effect
function addMagneticButtons() {
    const magneticElements = document.querySelectorAll('.btn, .social-link');
    
    magneticElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            const distance = Math.sqrt(x * x + y * y);
            const maxDistance = 50;
            
            if (distance < maxDistance) {
                const strength = (maxDistance - distance) / maxDistance;
                const moveX = x * strength * 0.3;
                const moveY = y * strength * 0.3;
                
                element.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
            }
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'translate(0px, 0px) scale(1)';
        });
    });
}

// Initialize Professional Effects
document.addEventListener('DOMContentLoaded', () => {
    // Initialize canvas particle system
    const heroCanvas = document.getElementById('heroCanvas');
    if (heroCanvas) {
        new ParticleSystem(heroCanvas);
    }
    
    // Initialize mouse trail effect (only on desktop)
    if (window.innerWidth > 768) {
        new MouseTrail();
    }
    
    // Add magnetic button effects
    setTimeout(() => {
        addMagneticButtons();
    }, 1000);
});

// Enhanced hero name typing animation
window.addEventListener('load', () => {
    setTimeout(() => {
        const heroName = document.querySelector('.name-highlight');
        if (heroName) {
            const originalText = heroName.textContent;
            enhancedTypeWriter(heroName, originalText, 100);
        }
    }, 2500);
});
