// --- FUNCIÓN PARA CARGAR PLANTILLAS (HEADER/FOOTER) ---
// Retorna una Promesa para que la función principal pueda usar 'await'.
function loadTemplate(elementId, filePath) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(filePath);
            if (!response.ok) {
                reject(new Error(`Plantilla no encontrada: ${filePath}`));
                return;
            }

            const html = await response.text();
            const container = document.getElementById(elementId);

            if (!container) {
                reject(new Error(`Contenedor no encontrado: ${elementId}`));
                return;
            }

            container.innerHTML = html;
            
            // Usamos requestAnimationFrame para asegurar que el DOM ha procesado la inserción
            requestAnimationFrame(() => { 
                resolve();
            });

        } catch (error) {
            console.error("Error cargando plantilla:", error);
            reject(error);
        }
    });
}


// --- CONFIGURACIÓN DEL MENÚ MÓVIL ---
// La lógica esencial para mostrar/ocultar el menú.
function setupMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIconOpen = document.getElementById('menu-icon-open');
    const menuIconClose = document.getElementById('menu-icon-close');

    // CRÍTICO: Si no se encuentran los elementos, salimos inmediatamente.
    if (!mobileMenuButton || !mobileMenu) {
        console.warn("❌ CRÍTICO: El botón o el menú móvil no se encontraron. La carga de la plantilla falló o es asíncrona.");
        return;
    }

    mobileMenuButton.addEventListener('click', () => {
        // Alternar la clase que controla la visibilidad en CSS
        const isOpen = mobileMenu.classList.toggle('mobile-menu-open');

        // Alternar los íconos (hamburguesa <-> X)
        if (menuIconOpen && menuIconClose) {
            menuIconOpen.classList.toggle('hidden', isOpen);
            menuIconClose.classList.toggle('hidden', !isOpen);
        }
    });

    // Cerrar el menú al hacer clic en cualquier enlace interno
    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('mobile-menu-open');
            if (menuIconOpen && menuIconClose) {
                menuIconOpen.classList.remove('hidden');
                menuIconClose.classList.add('hidden');
            }
        });
    });
    
    console.log("✅ Menú móvil configurado y listo.");
}


// --- LÓGICA DE EJECUCIÓN PRINCIPAL (ASYNC) ---
document.addEventListener('DOMContentLoaded', async () => {
    // 1. CARGAR EL NAVBAR Y ESPERAR
    try {
        // Asegúrate de que esta ruta sea correcta para tu servidor
        await loadTemplate('header-placeholder', 'includes/navbar.html'); 
        
        // 2. CONFIGURAR EL MENÚ MÓVIL *SOLO DESPUÉS DE LA ESPERA*
        setupMobileMenu(); 
        
        // (Llamar a setupThemeToggle() aquí si el botón de tema está en navbar.html)
        
    } catch (e) {
        console.error("Error al cargar la plantilla del Header:", e);
    }
    
    // 3. Cargar el resto de plantillas (sin bloquear la ejecución)
    loadTemplate('footer-placeholder', 'includes/footer.html').catch(e => console.error(e));
    
    // 4. Iniciar otras funcionalidades (carrusel, acordeón, etc.) aquí...
});


// --- Lógica del Botón de Modo Oscuro ---
function setupThemeToggle() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const darkIcon = document.getElementById('theme-toggle-dark-icon');
    const lightIcon = document.getElementById('theme-toggle-light-icon');
    
    function applyTheme(theme) {
        if (!darkIcon || !lightIcon) {
            if (theme === 'dark') document.documentElement.classList.add('dark');
            else document.documentElement.classList.remove('dark');
            return;
        }

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
    
    const currentTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    applyTheme(currentTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const newTheme = document.documentElement.classList.contains('dark') ? 'light' : 'dark';
            localStorage.setItem('theme', newTheme);
            applyTheme(newTheme);
        });
    }
}


// --- LÓGICA DEL CARRUSEL ---
function setupCarousel() {
    const slidesContainer = document.getElementById('carousel-slides');
    if (!slidesContainer) return;

    const slides = document.querySelectorAll('.carousel-item');
    const prevButton = document.getElementById('carousel-prev');
    const nextButton = document.getElementById('carousel-next');
    
    let currentSlide = 0;
    const totalSlides = slides.length || 1;

    function updateCarousel() {
        slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
    }

    if (nextButton) {
        nextButton.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateCarousel();
        });
    }
    if (prevButton) {
        prevButton.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            updateCarousel();
        });
    }

    // Opcional: auto-play (si hay más de 1 slide)
    if (totalSlides > 1) {
        setInterval(() => {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateCarousel();
        }, 5000);
    }
}

// --- LÓGICA DE DESPLIEGUE DE DOCTORES (Acordeón) ---
function setupDoctorAccordion() {
    const specialtyCards = document.querySelectorAll('.specialty-card');

    specialtyCards.forEach(card => {
        // Adjuntar listener a la tarjeta, no solo al encabezado
        card.addEventListener('click', (event) => {
            const doctorList = card.querySelector('.doctor-list');
            const arrowIcon = card.querySelector('.arrow-icon');
            
            // Si el clic fue en el botón/enlace 'Agendar Cita', detenemos la función de acordeón
            if (event.target.tagName === 'A' || event.target.closest('a')) {
                return;
            }

            // Toggle de la visibilidad y estilos
            const isOpening = doctorList.classList.contains('hidden');

            // Cerramos cualquier otra tarjeta abierta (efecto "acordeón")
            document.querySelectorAll('.doctor-list').forEach(list => list.classList.add('hidden'));
            document.querySelectorAll('.arrow-icon').forEach(icon => icon.classList.remove('rotate-180'));
            document.querySelectorAll('.specialty-card').forEach(c => c.classList.remove('shadow-xl'));

            if (isOpening) {
                doctorList.classList.remove('hidden');
                if (arrowIcon) arrowIcon.classList.add('rotate-180');
                card.classList.add('shadow-xl');
            }
        });
    });
}

// --- Lógica de Animación de Scroll para secciones ---
function setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in-section').forEach(section => {
        observer.observe(section);
    });
}


// ----------------------------
// ÚNICO DOMCONTENTLOADED (Consolidado y ASYNC/AWAIT)
// ----------------------------
document.addEventListener('DOMContentLoaded', async function() {
    // 1. CARGAR NAVBAR Y ESPERAR A QUE TERMINE (AWAIT es la clave)
    try {
        // La ruta 'includes/navbar.html' debe ser correcta.
        await loadTemplate('header-placeholder', 'includes/navbar.html'); 
        console.log("🔧 Configurando header (Menú móvil y tema) después de la carga...");
        setupMobileMenu(); // Solo se llama si la carga fue exitosa
        setupThemeToggle(); 
    } catch (e) {
        console.error("Error crítico al cargar el Navbar:", e);
    }
    
    // 2. CARGAR FOOTER
    try {
        await loadTemplate('footer-placeholder', 'includes/footer.html');
        // Configurar año del footer
        const yearElement = document.getElementById('year');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    } catch (e) {
        console.error("Error al cargar el Footer:", e);
    }

    // 3. Carga Condicional de la Sección de Citas
    if (document.getElementById('citas-placeholder')) {
        // No necesita 'await' si no hay lógica subsiguiente que dependa de esto
        loadTemplate('citas-placeholder', 'includes/citas-section.html');
    }
    
    // 4. Configurar otros componentes que dependen del DOM estático
    setupCarousel();
    setupDoctorAccordion();
    setupScrollAnimations();
});