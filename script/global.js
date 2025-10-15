// --- FUNCIONES AUXILIARES (Sin cambios mayores) ---

function setupMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIconOpen = document.getElementById('menu-icon-open');
    const menuIconClose = document.getElementById('menu-icon-close');
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', () => {
            const isOpen = mobileMenu.classList.toggle('mobile-menu-open');
            menuIconOpen.classList.toggle('hidden', isOpen);
            menuIconClose.classList.toggle('hidden', !isOpen);
        });
    }
}

function setupThemeToggle() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const darkIcon = document.getElementById('theme-toggle-dark-icon');
    const lightIcon = document.getElementById('theme-toggle-light-icon');
    
    const applyTheme = (theme) => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
            darkIcon.classList.remove('hidden');
            lightIcon.classList.add('hidden');
        } else {
            document.documentElement.classList.remove('dark');
            darkIcon.classList.add('hidden');
            lightIcon.classList.remove('hidden');
        }
    };
    
    const currentTheme = localStorage.getItem('theme') || 'light';
    applyTheme(currentTheme);

    themeToggleBtn.addEventListener('click', () => {
        const newTheme = document.documentElement.classList.contains('dark') ? 'light' : 'dark';
        localStorage.setItem('theme', newTheme);
        applyTheme(newTheme);
    });
}

function setupFadeInAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.fade-in-section').forEach(section => observer.observe(section));
}

async function loadTemplate(elementId, filePath) {
    try {
        const response = await fetch(filePath);
        if (response.ok) {
            const html = await response.text();
            document.getElementById(elementId).innerHTML = html;
        }
    } catch (error) {
        console.error("Error cargando plantilla:", error);
    }
}

function updateActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('#desktop-nav a.nav-link');

    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href').split('#')[0]; // Ignora los hashes
        if (linkPage === currentPage) {
            // Elimina la clase de todos para empezar de cero
            navLinks.forEach(l => l.classList.remove('active'));
            // Añade la clase al enlace correcto
            link.classList.add('active');
        }
    });
}
document.addEventListener('DOMContentLoaded', function() {
    
    
    
    // --- 1. CONFIGURACIÓN GENERAL (Se ejecuta en todas las páginas) ---
    setupMobileMenu();
    loadTemplate('footer-placeholder', 'includes/footer.html');
    setupThemeToggle();
    setupServicesDropdown();
    updateActiveNavLink(); // ¡NUEVO! Función para el navbar dinámico

    // --- 2. LÓGICA ESPECÍFICA DE CADA PÁGINA ---
    // Se ejecuta solo si encuentra los elementos correspondientes en la página actual.

    // Lógica para la página principal (index.html)
  

    // Lógica para la página de especialidades (especialidades.html)
  
});

function setupScrollObserverForNav() {
    const sections = document.querySelectorAll('main section[id]');
    const navLinks = document.querySelectorAll('#desktop-nav a.nav-link');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    // Comprueba si el href del enlace (la parte después del #) coincide con el id
                    if (link.getAttribute('href').substring(1) === id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { rootMargin: '-40% 0px -60% 0px', threshold: 0 });

    sections.forEach(section => observer.observe(section));
}


function updateActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('#desktop-nav a.nav-link');

    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href').split('#')[0]; // Ignora los hashes
        if (linkPage === currentPage) {
            // Elimina la clase de todos para empezar de cero
            navLinks.forEach(l => l.classList.remove('active'));
            // Añade la clase al enlace correcto
            link.classList.add('active');
        }
    });
}

function setupServicesDropdown() {
    const servicesButton = document.getElementById('services-menu-button');
    const servicesMenu = document.getElementById('services-menu');
    const servicesArrow = document.getElementById('services-arrow');

    if (servicesButton && servicesMenu) {
        servicesButton.addEventListener('click', (event) => {
            event.stopPropagation();
            const isOpen = servicesMenu.classList.toggle('open');
            servicesArrow.style.transform = isOpen ? 'rotate(180deg)' : 'rotate(0deg)';
        });
        window.addEventListener('click', () => {
            if (servicesMenu.classList.contains('open')) {
                servicesMenu.classList.remove('open');
                servicesArrow.style.transform = 'rotate(0deg)';
            }
        });
    }
}

function setupFadeInAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.fade-in-section').forEach(section => observer.observe(section));
}

  if (document.getElementById('carousel-container')) {
        setupMainCarousel();
        setupGalleryCarousel();
        setupScrollObserverForNav(); // Observador de scroll solo para el index
        setupFadeInAnimations();
    }