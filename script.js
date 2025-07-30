const themeToggleButton=document.getElementById('themeToggle')
const ctaButton=document.getElementById('ctaButton')
const hamburger=document.querySelector('.hamburger')
const navMenu=document.querySelector('.nav-menu')
const navLinks=document.querySelectorAll('.nav-links')
const serviceCards=document.querySelectorAll('.service-card')
const modal=document.getElementById('serviceModal')
const modalTitle=document.getElementById('modalTitle')
const modalBody=document.getElementById('modalBody')
const closeModal=document.querySelector('.close')
const contactForm=document.getElementById('contactForm')
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
function initTheme(){
    const savedTheme=localStorage.getItem('theme') || 'light'
    document.documentElement.setAttribute('data-theme',savedTheme)
    updateThemeName(savedTheme)
}
function updateThemeName(theme){
    themeToggleButton.textContent=theme==='light' ? 'dark' :'light'
}
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeName(newTheme);
}
function smoothScroll(target){
    const element=document.querySelector(target)
    if(element){
        const offsetTop=element.offsetTop-80
        window.scrollTo({
            top:offsetTop,
            behavior:'smooth'
        })
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
