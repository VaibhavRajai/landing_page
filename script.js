// Theme toggle functionality
let isDarkMode = false;

function toggleTheme() {
    const body = document.body;
    const themeToggle = document.querySelector('.theme-toggle');
    
    isDarkMode = !isDarkMode;
    
    if (isDarkMode) {
        body.setAttribute('data-theme', 'dark');
        themeToggle.textContent = '☀️';
    } else {
        body.removeAttribute('data-theme');
        themeToggle.textContent = '🌙';
    }
}

// Mobile menu toggle
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('active');
}

// Smooth scrolling function
function smoothScroll(target) {
    const element = document.querySelector(target);
    const navHeight = document.querySelector('.navbar').offsetHeight;
    const elementPosition = element.offsetTop - navHeight;
    
    window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
    });
}

// Navigation link click handling
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('href');
            smoothScroll(target);
            
            // Close mobile menu if open
            document.querySelector('.nav-menu').classList.remove('active');
        });
    });
});

// Modal functionality
const modalContent = {
    'web-dev': {
        title: 'Web Development Services',
        content: `
            <p>Our web development team specializes in creating modern, scalable, and high-performance web applications. We use the latest technologies including React, Vue.js, Node.js, and cloud infrastructure to build solutions that grow with your business.</p>
            <p><strong>What we offer:</strong></p>
            <p>• Custom web application development<br>
            • E-commerce platforms<br>
            • Content management systems<br>
            • API development and integration<br>
            • Performance optimization<br>
            • SEO-friendly development</p>
            <p>Our development process follows industry best practices with thorough testing, documentation, and ongoing support to ensure your web application performs flawlessly.</p>
        `
    },
    'mobile-dev': {
        title: 'Mobile Development Solutions',
        content: `
            <p>Transform your ideas into powerful mobile applications that engage users across iOS and Android platforms. Our mobile development expertise spans native development and cross-platform solutions using React Native and Flutter.</p>
            <p><strong>Our mobile services include:</strong></p>
            <p>• Native iOS and Android development<br>
            • Cross-platform app development<br>
            • UI/UX design for mobile<br>
            • App store optimization<br>
            • Mobile app testing and QA<br>
            • Maintenance and updates</p>
            <p>We focus on creating intuitive, fast, and secure mobile experiences that users love and that drive business results.</p>
        `
    },
    'ai-solutions': {
        title: 'AI & Machine Learning Solutions',
        content: `
            <p>Harness the power of artificial intelligence to automate processes, gain insights from data, and create intelligent user experiences. Our AI solutions are tailored to solve real business challenges and drive innovation.</p>
            <p><strong>AI services we provide:</strong></p>
            <p>• Machine learning model development<br>
            • Natural language processing<br>
            • Computer vision solutions<br>
            • Predictive analytics<br>
            • Chatbots and virtual assistants<br>
            • AI strategy consulting</p>
            <p>We work with cutting-edge frameworks like TensorFlow, PyTorch, and cloud AI services to deliver robust, scalable AI solutions that provide measurable business value.</p>
        `
    }
};

// Open modal function
function openModal(service) {
    const modal = document.getElementById('serviceModal');
    const content = document.getElementById('modalContent');
    const serviceData = modalContent[service];
    
    content.innerHTML = `
        <h2>${serviceData.title}</h2>
        ${serviceData.content}
    `;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close modal function
function closeModal() {
    const modal = document.getElementById('serviceModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('serviceModal');
    if (event.target === modal) {
        closeModal();
    }
}

// Form validation and submission
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');
        const successMessage = document.getElementById('successMessage');
        
        let isValid = true;
        
        // Clear previous errors
        document.querySelectorAll('.form-group').forEach(group => {
            group.classList.remove('error');
        });
        
        // Validate name
        if (!name.value.trim()) {
            name.parentElement.classList.add('error');
            isValid = false;
        }
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value.trim() || !emailRegex.test(email.value)) {
            email.parentElement.classList.add('error');
            isValid = false;
        }
        
        // Validate message
        if (!message.value.trim()) {
            message.parentElement.classList.add('error');
            isValid = false;
        }
        
        if (isValid) {
            // Simulate form submission
            const submitBtn = document.querySelector('.submit-btn');
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            
            setTimeout(() => {
                successMessage.style.display = 'block';
                this.reset();
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send Message';
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 5000);
            }, 1500);
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = isDarkMode ? 
            'rgba(26, 32, 44, 0.98)' : 'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.style.background = isDarkMode ? 
            'rgba(26, 32, 44, 0.95)' : 'rgba(255, 255, 255, 0.95)';
    }
});

// Intersection Observer for scroll animations
document.addEventListener('DOMContentLoaded', function() {
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
    document.querySelectorAll('.service-card, .about-content, .contact-form').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Close mobile menu when clicking on overlay or resize
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        document.querySelector('.nav-menu').classList.remove('active');
    }
});

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const navMenu = document.querySelector('.nav-menu');
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navbar = document.querySelector('.navbar');
    
    if (!navbar.contains(event.target) && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
    }
});

// Escape key functionality
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        // Close modal if open
        const modal = document.getElementById('serviceModal');
        if (modal.style.display === 'block') {
            closeModal();
        }
        
        // Close mobile menu if open
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
        }
    }
});

// Add active state to navigation links based on scroll position
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// Parallax effect for hero background
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroHeight = hero.offsetHeight;
    
    if (scrolled < heroHeight) {
        const parallaxSpeed = 0.5;
        hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    }
});

// Add loading states and animations
document.addEventListener('DOMContentLoaded', function() {
    // Add stagger animation to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
    });
    
    // Add hover sound effect simulation (visual feedback)
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

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
const throttledScrollHandler = throttle(function() {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = isDarkMode ? 
            'rgba(26, 32, 44, 0.98)' : 'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.style.background = isDarkMode ? 
            'rgba(26, 32, 44, 0.95)' : 'rgba(255, 255, 255, 0.95)';
    }
}, 16); // ~60fps

window.addEventListener('scroll', throttledScrollHandler);

// Form enhancement: Real-time validation
document.addEventListener('DOMContentLoaded', function() {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    
    // Real-time validation for name
    nameInput.addEventListener('blur', function() {
        const formGroup = this.parentElement;
        if (!this.value.trim()) {
            formGroup.classList.add('error');
        } else {
            formGroup.classList.remove('error');
        }
    });
    
    emailInput.addEventListener('blur', function() {
        const formGroup = this.parentElement;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!this.value.trim() || !emailRegex.test(this.value)) {
            formGroup.classList.add('error');
        } else {
            formGroup.classList.remove('error');
        }
    });
    messageInput.addEventListener('blur', function() {
        const formGroup = this.parentElement;
        if (!this.value.trim()) {
            formGroup.classList.add('error');
        } else {
            formGroup.classList.remove('error');
        }
    });
    [nameInput, emailInput, messageInput].forEach(input => {
        input.addEventListener('input', function() {
            const formGroup = this.parentElement;
            if (formGroup.classList.contains('error') && this.value.trim()) {
                formGroup.classList.remove('error');
            }
        });
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.querySelector('.theme-toggle');
    themeToggle.setAttribute('aria-label', 'Toggle dark/light theme');
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    mobileToggle.setAttribute('aria-label', 'Toggle mobile menu');
    const modal = document.getElementById('serviceModal');
    const closeButton = document.querySelector('.close');
    const originalOpenModal = window.openModal;
    window.openModal = function(service) {
        originalOpenModal(service);
        closeButton.focus();
    };
    modal.addEventListener('keydown', function(event) {
        if (event.key === 'Tab') {
            const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            
            if (event.shiftKey && document.activeElement === firstElement) {
                event.preventDefault();
                lastElement.focus();
            } else if (!event.shiftKey && document.activeElement === lastElement) {
                event.preventDefault();
                firstElement.focus();
            }
        }
    });
});