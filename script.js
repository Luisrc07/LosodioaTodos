// --- FUNCIÓN PARA CARGAR PLANTILLAS (HEADER/FOOTER) ---
async function loadTemplate(elementId, filePath) {
    try {
        console.log(`Intentando cargar plantilla: ${filePath}`);
        const response = await fetch(filePath);

        if (!response.ok) {
            console.warn(`❌ Plantilla no encontrada: ${filePath}`);
            return;
        }

        const html = await response.text();
        const container = document.getElementById(elementId);

        if (!container) {
            console.error(`⚠️ No existe el contenedor con id: ${elementId}`);
            return;
        }

        container.innerHTML = html;
        console.log(`✅ Plantilla cargada en: #${elementId}`);

        // Configurar menú móvil después de insertar el header
        if (elementId === 'header-placeholder') {
            requestAnimationFrame(() => {
                console.log("🔧 Configurando menú móvil...");
                setupMobileMenu();
            });
        }

        // Configurar año del footer si aplica
        if (elementId === 'footer-placeholder') {
            const yearElement = document.getElementById('year');
            if (yearElement) {
                yearElement.textContent = new Date().getFullYear();
            }
        }

    } catch (error) {
        console.error("Error cargando plantilla:", error);
    }
}


// --- CONFIGURACIÓN DEL MENÚ MÓVIL ---
function setupMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIconOpen = document.getElementById('menu-icon-open');
    const menuIconClose = document.getElementById('menu-icon-close');

    console.log("mobileMenuButton:", mobileMenuButton);
    console.log("mobileMenu:", mobileMenu);

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            console.log("👉 Clic en botón móvil");
            const isOpen = mobileMenu.classList.toggle('mobile-menu-open');
            menuIconOpen.classList.toggle('hidden', isOpen);
            menuIconClose.classList.toggle('hidden', !isOpen);
        });

        // Cerrar el menú al hacer clic en un enlace
        document.querySelectorAll('#mobile-menu a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('mobile-menu-open');
                menuIconOpen.classList.remove('hidden');
                menuIconClose.classList.add('hidden');
            });
        });

        console.log("✅ Listeners configurados correctamente.");
    } else {
        console.warn("❌ No se encontró el botón o el menú móvil en el DOM.");
    }
}


// --- EJECUCIÓN AL CARGAR LA PÁGINA ---
document.addEventListener('DOMContentLoaded', () => {
    loadTemplate('header-placeholder', 'includes/navbar.html');
    loadTemplate('footer-placeholder', 'includes/footer.html');
});
// --- FIN DE LÓGICA REUTILIZABLE ---


document.addEventListener('DOMContentLoaded', function() {
    
    // CARGAR PLANTILLAS AL INICIO
    // Nota: Asume que tienes una estructura de carpetas como:
    // index.html
    // includes/navbar.html
    // includes/footer.html
    loadTemplate('header-placeholder', 'includes/navbar.html');
    loadTemplate('footer-placeholder', 'includes/footer.html');

    // --- Carga Condicional de la Sección de Citas ---
    if (document.getElementById('citas-placeholder')) {
        loadTemplate('citas-placeholder', 'includes/citas-section.html');
    }

    // --- LÓGICA DEL CARRUSEL ---
    const slidesContainer = document.getElementById('carousel-slides');
    if (slidesContainer) {
        const slides = document.querySelectorAll('.carousel-item');
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

        // Opcional: auto-play
        setInterval(() => {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateCarousel();
        }, 5000); 
    }
    // ... fin del código del carrusel ...

    // --- LÓGICA DEL DESPLIEGUE DE DOCTORES EN ESPECIALIDADES ---
    const specialtyCards = document.querySelectorAll('.specialty-card');

    specialtyCards.forEach(card => {
        card.addEventListener('click', (event) => {
            const doctorList = card.querySelector('.doctor-list');
            const arrowIcon = card.querySelector('.arrow-icon');
            
            // Si el clic fue en el botón de Agendar Cita, no hacer nada más
            if (event.target.tagName === 'A' && event.target.textContent.includes('Agendar Cita')) {
                return;
            }

            // Toggle de la visibilidad y estilos
            const isOpening = doctorList.classList.contains('hidden');

            // Cerramos cualquier otra tarjeta abierta (para efecto "acordeón")
            document.querySelectorAll('.doctor-list').forEach(list => list.classList.add('hidden'));
            document.querySelectorAll('.arrow-icon').forEach(icon => icon.classList.remove('rotate-180'));
            document.querySelectorAll('.specialty-card').forEach(c => c.classList.remove('shadow-xl'));

            if (isOpening) {
                doctorList.classList.remove('hidden');
                arrowIcon.classList.add('rotate-180');
                card.classList.add('shadow-xl');
            }
        });
    });
    // --- FIN LÓGICA DE DESPLIEGUE ---    

    // --- Lógica del Botón de Modo Oscuro --
    const themeToggleBtn = document.getElementById('theme-toggle');
    const darkIcon = document.getElementById('theme-toggle-dark-icon');
    const lightIcon = document.getElementById('theme-toggle-light-icon');
    
    function applyTheme(theme) {
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
    
    themeToggleBtn.addEventListener('click', () => {
        const newTheme = document.documentElement.classList.contains('dark') ? 'light' : 'dark';
        localStorage.setItem('theme', newTheme);
        applyTheme(newTheme);
    });

    // --- Lógica de Animación de Scroll para secciones (ejemplo) --
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
    
});