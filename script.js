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
    if (document.getElementById('carousel-container')) {
        setupMainCarousel();
        setupGalleryCarousel();
        setupScrollObserverForNav(); // Observador de scroll solo para el index
        setupFadeInAnimations();
    }

    // Lógica para la página de especialidades (especialidades.html)
    if (document.querySelector('.specialty-card')) {
        setupSpecialtiesAccordion(); // ¡RESTAURADO!
    }
});


// ===================================================================
// --- FUNCIONES DE CONFIGURACIÓN ---
// ===================================================================

/**
 * ¡NUEVO! Gestiona el estado activo de los enlaces del navbar.
 * Funciona tanto para la carga de página como para el scroll en el index.
 */
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

/**
 * ¡RESTAURADO! Configura el acordeón de especialidades.
 */
function setupSpecialtiesAccordion() {
    const specialtyCards = document.querySelectorAll('.specialty-card');
    specialtyCards.forEach(card => {
        card.addEventListener('click', (event) => {
            // Evita que el clic en el botón "Agendar" active el acordeón
            if (event.target.closest('a')) {
                return;
            }
            
            const doctorList = card.querySelector('.doctor-list');
            const arrowIcon = card.querySelector('.arrow-icon');
            const isOpening = doctorList.classList.contains('hidden');

            // Cierra todos los demás
            document.querySelectorAll('.doctor-list').forEach(list => list.classList.add('hidden'));
            document.querySelectorAll('.arrow-icon').forEach(icon => icon.classList.remove('rotate-180'));
            
            // Abre o cierra el actual
            if (isOpening) {
                doctorList.classList.remove('hidden');
                arrowIcon.classList.add('rotate-180');
            }
        });
    });
}


/**
 * Configura el menú desplegable de servicios en el navbar.
 */
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

/**
 * Configura el carrusel principal.
 */
function setupMainCarousel() {
    const slidesContainer = document.getElementById('carousel-slides');
    const slides = slidesContainer.querySelectorAll('.carousel-item');
    const prevButton = document.getElementById('carousel-prev');
    const nextButton = document.getElementById('carousel-next');
    let currentSlide = 0;
    const totalSlides = slides.length;

    function updateCarousel() {
        slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
    nextButton.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
    });
    prevButton.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateCarousel();
    });
    setInterval(() => {
        nextButton.click();
    }, 5000);
}

/**
 * Configura el carrusel de la galería de instalaciones.
 */
function setupGalleryCarousel() {
    const galleryContainer = document.getElementById('gallery-carousel-container');
    const gallerySlides = galleryContainer.querySelector('#gallery-slides');
    const galleryItems = galleryContainer.querySelectorAll('.gallery-item');
    const galleryPrevBtn = galleryContainer.querySelector('#gallery-prev');
    const galleryNextBtn = galleryContainer.querySelector('#gallery-next');
    let currentGallerySlide = 0;
    const totalGallerySlides = galleryItems.length;

    function updateGalleryCarousel() {
        gallerySlides.style.transform = `translateX(-${currentGallerySlide * 100}%)`;
        gallerySlides.style.transition = 'transform 0.5s ease-in-out';
    }

    const nextSlide = () => {
        currentGallerySlide = (currentGallerySlide + 1) % totalGallerySlides;
        updateGalleryCarousel();
    };

    galleryNextBtn.addEventListener('click', nextSlide);
    galleryPrevBtn.addEventListener('click', () => {
        currentGallerySlide = (currentGallerySlide - 1 + totalGallerySlides) % totalGallerySlides;
        updateGalleryCarousel();
    });
    setInterval(nextSlide, 5000);

    // Lógica de Swipe
    let startX, isDragging = false, moveX = 0;
    gallerySlides.addEventListener('touchstart', e => {
        startX = e.touches[0].clientX; isDragging = true; gallerySlides.style.transition = 'none';
    }, { passive: true });
    gallerySlides.addEventListener('touchmove', e => {
        if (!isDragging) return;
        moveX = e.touches[0].clientX - startX;
        gallerySlides.style.transform = `translateX(calc(-${currentGallerySlide * 100}% + ${moveX}px))`;
    }, { passive: true });
    gallerySlides.addEventListener('touchend', () => {
        if (!isDragging) return;
        isDragging = false;
        if (Math.abs(moveX) > 50) {
            if (moveX < 0) {
                currentGallerySlide = Math.min(currentGallerySlide + 1, totalGallerySlides - 1);
            } else {
                currentGallerySlide = Math.max(currentGallerySlide - 1, 0);
            }
        }
        updateGalleryCarousel();
        moveX = 0;
    });
}

/**
 * Configura el observador de scroll para actualizar el navbar en index.html.
 */
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