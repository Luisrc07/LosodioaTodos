// ===================================================================
// --- DATOS DE SERVICIOS ---
// ===================================================================
const serviceData = {
    laboratorio: {
        title: "Laboratorio Clínico",
        prices: [
            { name: "Hematología Completa", price: "Bs. 50.000", code: "H-001" },
            { name: "Perfil Lipídico", price: "Bs. 75.000", code: "L-002" },
            { name: "Glicemia en Ayunas", price: "Bs. 30.000", code: "G-003" },
            { name: "Prueba de Orina", price: "Bs. 25.000", code: "U-004" },
        ],
        recommendations: [
            "Debe asistir en ayunas (mínimo 8 horas).",
            "Traer la orden médica si aplica.",
            "Informar sobre cualquier medicamento que esté tomando.",
        ],
        schedule: "Lunes a Viernes: 7:00 AM - 1:00 PM | Sábados: 8:00 AM - 12:00 PM",
    },
    odontologia: {
        title: "Odontología Preventiva",
        prices: [
            { name: "Consulta General", price: "Bs. 40.000", code: "O-010" },
            { name: "Limpieza Dental", price: "Bs. 90.000", code: "O-011" },
            { name: "Aplicación de Flúor", price: "Bs. 35.000", code: "O-012" },
        ],
        recommendations: [
            "Asistir a su cita con la boca limpia.",
            "Si tiene radiografías recientes, tráigalas.",
            "Para procedimientos, evite consumir alimentos 30 minutos antes.",
        ],
        schedule: "Lunes a Jueves: 8:00 AM - 4:00 PM | Viernes: 9:00 AM - 3:00 PM",
    },
    farmacia: {
        title: "Farmacia Cooperativa",
        prices: [
            { name: "Consulta de Medicamentos", price: "Gratuita", code: "F-020" },
            { name: "Inyectología", price: "Bs. 15.000", code: "F-021" },
            { name: "Toma de Tensión", price: "Bs. 10.000", code: "F-022" },
        ],
        recommendations: [
            "Presente la receta médica original para la dispensación de control.",
            "Consulte al farmacéutico sobre interacciones de medicamentos.",
            "Pregunte por nuestras marcas cooperativas con mejores precios.",
        ],
        schedule: "Lunes a Sábado: 7:00 AM - 5:00 PM",
    },
    imagenologia: {
        title: "Imagenología (Rayos X y Eco)",
        prices: [
            { name: "Rayos X de Tórax", price: "Bs. 120.000", code: "I-030" },
            { name: "Ecosonograma Abdominal", price: "Bs. 180.000", code: "I-031" },
            { name: "Mamografía", price: "Bs. 250.000", code: "I-032" },
        ],
        recommendations: [
            "Para ecosonogramas abdominales, asista con la vejiga llena.",
            "Evite joyas y objetos metálicos en la zona a examinar.",
            "Llegue 15 minutos antes de su cita para el registro.",
        ],
        schedule: "Lunes a Viernes: 8:00 AM - 12:00 PM y 2:00 PM - 4:00 PM",
    },
    medicinageneral: {
        title: "Medicina General",
        prices: [
            { name: "Consulta de Control", price: "Bs. 60.000", code: "M-040" },
            { name: "Certificado Médico Vial", price: "Bs. 80.000", code: "M-041" },
            { name: "Suturas Menores", price: "Bs. 150.000", code: "M-042" },
        ],
        recommendations: [
            "Traer un resumen de su historial médico reciente.",
            "Anote cualquier síntoma o preocupación antes de la consulta.",
            "Si es para control, traiga resultados de laboratorios previos.",
        ],
        schedule: "Lunes a Sábado: 7:30 AM - 5:00 PM",
    },
    saludmental: {
        title: "Salud Mental (Psicología)",
        prices: [
            { name: "Consulta Psicológica (1h)", price: "Bs. 90.000", code: "S-050" },
            { name: "Terapia de Pareja (1.5h)", price: "Bs. 150.000", code: "S-051" },
        ],
        recommendations: [
            "Llegue puntualmente para aprovechar el tiempo de la sesión.",
            "Busque un lugar tranquilo si la sesión es virtual.",
            "La confidencialidad es clave, siéntase libre de expresarse.",
        ],
        schedule: "Martes y Jueves: 1:00 PM - 6:00 PM | Sábados: 9:00 AM - 1:00 PM",
    },
    fisioterapia: {
        title: "Fisioterapia y Rehabilitación",
        prices: [
            { name: "Evaluación Inicial", price: "Bs. 85.000", code: "F-060" },
            { name: "Sesión de Terapia (45min)", price: "Bs. 65.000", code: "F-061" },
            { name: "Paquete 10 Sesiones", price: "Bs. 600.000", code: "F-062" },
        ],
        recommendations: [
            "Use ropa cómoda que permita el movimiento.",
            "Traer cualquier informe de imagenología o diagnóstico.",
            "Manténgase hidratado antes y después de la sesión.",
        ],
        schedule: "Lunes, Miércoles y Viernes: 7:00 AM - 12:00 PM",
    },
    nutricion: {
        title: "Consulta de Nutrición",
        prices: [
            { name: "Evaluación Nutricional", price: "Bs. 70.000", code: "N-070" },
            { name: "Plan de 4 Semanas", price: "Bs. 100.000", code: "N-071" },
        ],
        recommendations: [
            "Llevar un registro de comidas de los últimos 3 días.",
            "Traer resultados de laboratorio recientes.",
            "Sea honesto sobre sus hábitos alimenticios para un plan efectivo.",
        ],
        schedule: "Martes y Sábados: 8:00 AM - 1:00 PM",
    },
};

// ===================================================================
// --- FUNCIONES ESPECÍFICAS DE SERVICIOS.HTML ---
// ===================================================================

// En tu archivo script.js:
function generatePriceTable(prices) {
    let tableHTML = `
        <table class="min-w-full divide-y divide-border dark:divide-primary/20">
            <thead class="bg-primary/10 dark:bg-primary/20">
                <tr>
                    <th class="px-4 py-2 text-left text-sm font-medium text-primary dark:text-primary uppercase tracking-wider">Servicio</th>
                    <th class="px-4 py-2 text-left text-sm font-medium text-primary dark:text-primary uppercase tracking-wider">Precio Estimado</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-border dark:divide-primary/20"> 
    `;
    prices.forEach(item => {
        tableHTML += `
            <tr class="hover:bg-primary/5 dark:hover:bg-primary/10 transition-colors duration-200">
                <td class="px-4 py-3 whitespace-nowrap text-sm">${item.name}</td>
                <td class="px-4 py-3 whitespace-nowrap text-sm font-semibold text-accent">${item.price}</td>
            </tr>
        `;
    });
    tableHTML += `
            </tbody>
        </table>
    `;
    return tableHTML;
}

function generateList(items) {
    let listHTML = '<ul class="list-disc pl-5 space-y-2 text-main dark:text-main/90">';
    items.forEach(item => {
        listHTML += `<li>${item}</li>`;
    });
    listHTML += '</ul>';
    return listHTML;
}

function setupServicesAccordion() {
    const serviceCards = document.querySelectorAll('.service-card');
    const detailsContainer = document.getElementById('service-details-container');
    const titleElement = document.getElementById('detail-service-title');
    const priceTableElement = document.getElementById('service-price-table-content');
    const recommendationsContent = document.getElementById('recommendations-content');
    const scheduleContent = document.getElementById('schedule-content');

    serviceCards.forEach(card => {
        card.addEventListener('click', function() {
            const serviceId = this.getAttribute('data-service-id');
            const data = serviceData[serviceId];

            if (data) {
                // 1. Actualizar Título
                titleElement.textContent = data.title;

                // 2. Actualizar Tabla de Precios
                priceTableElement.innerHTML = generatePriceTable(data.prices);

                // 3. Actualizar Recomendaciones
                recommendationsContent.innerHTML = generateList(data.recommendations);

                // 4. Actualizar Horario
                scheduleContent.innerHTML = `<p class="text-lg font-medium text-accent">${data.schedule}</p>`;

                // 5. Mostrar y hacer scroll al contenedor de detalles
                detailsContainer.classList.remove('hidden');
                detailsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
                
                // Efecto visual: Resaltar el botón activo (opcional, pero mejora UX)
                serviceCards.forEach(c => c.classList.remove('border-2', 'border-accent', 'shadow-primary/50'));
                this.classList.add('border-2', 'border-accent', 'shadow-primary/50');

            }
        });
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




if (document.querySelector('.service-card')) {
        setupServicesAccordion(); 
    }
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