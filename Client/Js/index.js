// Add smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetElement = document.querySelector(this.getAttribute('href'));
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
    });
});

// Add navbar background on scroll
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Add animation class to elements when they come into view
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        } else {
            entry.target.classList.remove('animate-in');
        }
    });
}, observerOptions);

document.querySelectorAll('.panda-content, .panda-image, .feature-content, .feature-description, .porque-card')
    .forEach(el => observer.observe(el));


/* INICIO MENU HAMBURGUESA */

const menuIcon = document.getElementById('menu-icon');
const navLinks = document.querySelector('.nav-links');
const body = document.querySelector('body');

// Toggle menu function
function toggleMenu() {
    navLinks.classList.toggle('show');
    menuIcon.classList.toggle('active');
    document.body.classList.toggle('menu-open');
}

// Event Listeners
menuIcon.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
});

// Close menu when clicking links
document.querySelectorAll('.nav-links a, .nav-links button').forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('show');
        menuIcon.classList.remove('active');
        document.body.classList.remove('menu-open');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (event) => {
    const isClickInsideMenu = navLinks.contains(event.target);
    const isClickOnMenuIcon = menuIcon.contains(event.target);

    if (!isClickInsideMenu && !isClickOnMenuIcon && navLinks.classList.contains('show')) {
        toggleMenu();
    }
});
// Desplazamiento suave para los enlaces del navbar
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetElement = document.querySelector(this.getAttribute('href'));
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
    });
});

// Cambiar el fondo del navbar al hacer scroll
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});


/* FIN MENU HAMBURGUESA */

/* Seccion Escuiela */

