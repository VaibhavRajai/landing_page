const themeToggle = document.getElementById('themeToggle');
const ctaButton = document.getElementById('ctaButton');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const serviceCards = document.querySelectorAll('.service-card');
const modal = document.getElementById('serviceModal');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');
const closeModal = document.querySelector('.close');
const contactForm = document.getElementById('contactForm');
const serviceData = {
    web: {
        title: 'Web Development',
        content: `
            <p>Our web development services include:</p>
            <ul>
                <li>Custom website design and development</li>
                <li>E-commerce solutions</li>
                <li>Content Management Systems (CMS)</li>
                <li>Progressive Web Applications (PWA)</li>
                <li>API development and integration</li>
                <li>Website maintenance and optimization</li>
            </ul>
            <p>We use modern technologies like React, Vue.js, Node.js, and more to create fast, secure, and scalable web solutions.</p>
        `
    },
    mobile: {
        title: 'Mobile App Development',
        content: `
            <p>Our mobile app development services cover:</p>
            <ul>
                <li>Native iOS and Android applications</li>
                <li>Cross-platform development with React Native and Flutter</li>
                <li>UI/UX design for mobile interfaces</li>
                <li>App Store optimization and deployment</li>
                <li>Mobile app testing and quality assurance</li>
                <li>Ongoing maintenance and updates</li>
            </ul>
            <p>From concept to launch, we ensure your mobile app delivers an exceptional user experience across all devices.</p>
        `
    },
    design: {
        title: 'UI/UX Design',
        content: `
            <p>Our design services focus on creating exceptional user experiences:</p>
            <ul>
                <li>User interface (UI) design</li>
                <li>User experience (UX) research and design</li>
                <li>Wireframing and prototyping</li>
                <li>Brand identity and logo design</li>
                <li>Design system creation</li>
                <li>Usability testing and optimization</li>
            </ul>
            <p>We combine creativity with user-centered design principles to create interfaces that are both beautiful and functional.</p>
        `
    }
};
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

function updateThemeIcon(theme) {
    themeToggle.textContent = theme === 'light' ? '🌙' : '☀️';
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
}
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        const offsetTop = element.offsetTop - 80; 
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}
function toggleMobileMenu() {
    navMenu.classList.toggle('active');
    const spans = hamburger.querySelectorAll('span');
    spans.forEach((span, index) => {
        if (navMenu.classList.contains('active')) {
            if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
            if (index === 1) span.style.opacity = '0';
            if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            span.style.transform = 'none';
            span.style.opacity = '1';
        }
    });
}

function closeMobileMenu() {
    navMenu.classList.remove('active');
    const spans = hamburger.querySelectorAll('span');
    spans.forEach(span => {
        span.style.transform = 'none';
        span.style.opacity = '1';
    });
}
function openModal(serviceType) {
    const service = serviceData[serviceType];
    if (service) {
        modalTitle.textContent = service.title;
        modalBody.innerHTML = service.content;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; 
    }
}
function closeModalHandler() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; 
}
function validateForm() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    let isValid = true;
    clearErrors();
    if (!name) {
        showError('nameError', 'Name is required');
        isValid = false;
    }
    if (!email) {
        showError('emailError', 'Email is required');
        isValid = false;
    } else if (!isValidEmail(email)) {
        showError('emailError', 'Please enter a valid email address');
        isValid = false;
    }
    if (!message) {
        showError('messageError', 'Message is required');
        isValid = false;
    } else if (message.length < 10) {
        showError('messageError', 'Message must be at least 10 characters long');
        isValid = false;
    }
    
    return isValid;
}

function showError(errorId, message) {
    const errorElement = document.getElementById(errorId);
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

function clearErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(element => {
        element.textContent = '';
        element.style.display = 'none';
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function handleFormSubmit(e) {
    e.preventDefault();
    if (validateForm()) {
        const submitButton = document.querySelector('.submit-button');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        setTimeout(() => {
            alert('Thank you for your message! We\'ll get back to you soon.');
            contactForm.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 2000);
    }
}
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const scrollPos = window.scrollY + 100;
    sections.forEach(section => {
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;
        const id = section.getAttribute('id');
        if (scrollPos >= top && scrollPos < bottom) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}
document.addEventListener('DOMContentLoaded', function() {
    initTheme();
    themeToggle.addEventListener('click', toggleTheme);
    ctaButton.addEventListener('click', () => smoothScroll('#services'));
    hamburger.addEventListener('click', toggleMobileMenu);
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('href');
            smoothScroll(target);
            closeMobileMenu();
        });
    });
    serviceCards.forEach(card => {
        card.addEventListener('click', () => {
            const serviceType = card.getAttribute('data-service');
            openModal(serviceType);
        });
    });
    closeModal.addEventListener('click', closeModalHandler);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModalHandler();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModalHandler();
        }
    });
    contactForm.addEventListener('submit', handleFormSubmit);
    window.addEventListener('scroll', updateActiveNavLink);
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = `var(--bg-color)`;
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.backdropFilter = 'none';
        }
    });
});
function animateOnScroll() {
    const elements = document.querySelectorAll('.stat, .service-card'); 
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}
document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.stat, .service-card');
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); 
});