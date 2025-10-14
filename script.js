// --- FUNCIÓN PARA CARGAR PLANTILLAS (Solo para el Footer) ---
async function loadTemplate(elementId, filePath) {
    // Solo cargaremos si el ID es 'footer-placeholder'
    if (elementId !== 'footer-placeholder') {
        console.warn(`Función loadTemplate omitida para: #${elementId}. El contenido debe estar en el HTML.`);
        return;
    }

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
        
        // Configurar año del footer
        const yearElement = document.getElementById('year');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }

    } catch (error) {
        console.error("Error cargando plantilla:", error);
    }
}


// -----------------------------------------------
// --- CONFIGURACIÓN DEL MENÚ MÓVIL (CORREGIDO) ---
// -----------------------------------------------
function setupMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIconOpen = document.getElementById('menu-icon-open');
    const menuIconClose = document.getElementById('menu-icon-close');

    if (mobileMenuButton && mobileMenu) {
        console.log("✅ Elementos de Menú Móvil encontrados. Configurando listeners.");

        mobileMenuButton.addEventListener('click', () => {
            console.log("👉 Clic en botón móvil: Toggling menu");
            
            // 1. Alterna la clase CSS 'mobile-menu-open' (definida en styles.css)
            const isOpen = mobileMenu.classList.toggle('mobile-menu-open');
            
            // 2. Alterna los iconos de hamburguesa a 'X' (y viceversa)
            menuIconOpen.classList.toggle('hidden', isOpen);
            menuIconClose.classList.toggle('hidden', !isOpen);
        });

        // Opcional: Cerrar el menú al hacer clic en un enlace
        document.querySelectorAll('#mobile-menu a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('mobile-menu-open');
                menuIconOpen.classList.remove('hidden');
                menuIconClose.classList.add('hidden');
            });
        });

    } else {
        // Esto solo debería aparecer si se elimina el navbar del HTML
        console.warn("❌ No se encontró el botón o el menú móvil en el DOM.");
    }
}


// -----------------------------------------------
// --- EJECUCIÓN AL CARGAR LA PÁGINA ---
// -----------------------------------------------
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. INICIALIZAR MENÚ MÓVIL
    // Esta función se llama directamente porque el navbar ya está en el HTML.
    setupMobileMenu(); 
    
    // 2. CARGAR EL FOOTER
    loadTemplate('footer-placeholder', 'includes/footer.html');
    
    // 3. Carga Condicional de la Sección de Citas (se mantiene tu lógica)
    if (document.getElementById('citas-placeholder')) {
        loadTemplate('citas-placeholder', 'includes/citas-section.html');
    }

    // 4. LÓGICA DEL CARRUSEL (Se mantiene la lógica original)
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

        // Auto-play
        setInterval(() => {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateCarousel();
        }, 5000); 
    }
    // ... fin del código del carrusel ...

    // 5. LÓGICA DEL DESPLIEGUE DE DOCTORES (Se mantiene la lógica original)
    const specialtyCards = document.querySelectorAll('.specialty-card');

    specialtyCards.forEach(card => {
        card.addEventListener('click', (event) => {
            const doctorList = card.querySelector('.doctor-list');
            const arrowIcon = card.querySelector('.arrow-icon');
            
            if (event.target.tagName === 'A' && event.target.textContent.includes('Agendar Cita')) {
                return;
            }

            const isOpening = doctorList.classList.contains('hidden');
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

    // 6. Lógica del Botón de Modo Oscuro (Se mantiene la lógica original)
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

    // 7. Lógica de Animación de Scroll (Se mantiene la lógica original)
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