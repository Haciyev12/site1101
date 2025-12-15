// Mobile Navigation Toggle with Keyboard Support
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle && navMenu) {
    const toggleMenu = (isOpen) => {
        const isActive = navMenu.classList.contains('active');
        if (isOpen === undefined) {
            isOpen = !isActive;
        }
        
        if (isOpen) {
            navMenu.classList.add('active');
            navToggle.classList.add('active');
            navToggle.setAttribute('aria-expanded', 'true');
            // Focus first menu item when opening
            const firstLink = navMenu.querySelector('.nav-link');
            if (firstLink) {
                setTimeout(() => firstLink.focus(), 100);
            }
        } else {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
        }
    };

    // Click handler
    navToggle.addEventListener('click', () => {
        toggleMenu();
    });

    // Keyboard support for toggle button
    navToggle.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleMenu();
        }
    });

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach((link, index) => {
        link.addEventListener('click', () => {
            toggleMenu(false);
        });

        // Keyboard navigation with arrow keys
        link.addEventListener('keydown', (e) => {
            const isMenuOpen = navMenu.classList.contains('active');
            
            if (!isMenuOpen) return;

            switch(e.key) {
                case 'ArrowDown':
                    e.preventDefault();
                    const nextLink = navLinks[index + 1] || navLinks[0];
                    nextLink.focus();
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    const prevLink = navLinks[index - 1] || navLinks[navLinks.length - 1];
                    prevLink.focus();
                    break;
                case 'Home':
                    e.preventDefault();
                    navLinks[0].focus();
                    break;
                case 'End':
                    e.preventDefault();
                    navLinks[navLinks.length - 1].focus();
                    break;
            }
        });
    });

    // Close menu with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            toggleMenu(false);
            navToggle.focus();
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            toggleMenu(false);
        }
    });

    // Trap focus within menu when open on mobile
    navMenu.addEventListener('keydown', (e) => {
        if (!navMenu.classList.contains('active')) return;

        const focusableElements = navMenu.querySelectorAll('a[href], button');
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                }
            } else {
                if (document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        }
    });
}

// Smooth scroll for anchor links
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

// Add active class to current page navigation link
const currentPage = window.location.pathname;
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    const linkPath = new URL(link.href).pathname;
    if (linkPath === currentPage || 
        (currentPage.includes(linkPath) && linkPath !== '/')) {
        link.classList.add('active');
    } else {
        link.classList.remove('active');
    }
});

// Handle image loading errors with placeholder
const images = document.querySelectorAll('img');
images.forEach(img => {
    img.addEventListener('error', function() {
        // Create a simple placeholder using canvas or SVG
        if (!this.dataset.placeholderCreated) {
            this.dataset.placeholderCreated = 'true';
            const canvas = document.createElement('canvas');
            canvas.width = 400;
            canvas.height = 300;
            const ctx = canvas.getContext('2d');
            
            // Draw placeholder
            ctx.fillStyle = '#f1f5f9';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#94a3b8';
            ctx.font = '20px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('Image Placeholder', canvas.width / 2, canvas.height / 2);
            
            this.src = canvas.toDataURL();
        }
    });
});

// Add scroll effect to navbar
let lastScroll = 0;
const navbar = document.getElementById('navbar');

if (navbar) {
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
        }
        
        lastScroll = currentScroll;
    });
}

// Add fade-in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.feature-card, .project-card, .qualification-card, .activity-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

