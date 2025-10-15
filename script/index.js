// ===================================================================
// --- FUNCIONES ESPECÍFICAS DE INDEX.HTML (Carruseles INDEPENDIENTES) ---
// ===================================================================

const intervalTime = 5000;

/**
 * Función genérica para configurar cualquier carrusel.
 * @param {string} containerId - El ID del contenedor principal del carrusel.
 * @param {string} slideContainerSelector - El selector CSS para el contenedor de las diapositivas.
 * @param {string} prevBtnSelector - El selector CSS para el botón de retroceder.
 * @param {string} nextBtnSelector - El selector CSS para el botón de avanzar.
 * @param {boolean} autoRotate - Si el carrusel debe rotar automáticamente.
 */
function setupCarousel(containerId, slideContainerSelector, prevBtnSelector, nextBtnSelector, autoRotate = true) {
    const wrapper = document.getElementById(containerId);
    if (!wrapper) {
        console.error(`No se encontró el contenedor del carrusel con ID: ${containerId}`);
        return;
    }
    
    let currentSlide = 0;
    let slideInterval;

    const slidesContainer = wrapper.querySelector(slideContainerSelector);
    const prevButton = wrapper.querySelector(prevBtnSelector);
    const nextButton = wrapper.querySelector(nextBtnSelector);

    // Se busca tanto .carousel-item como .gallery-item para que funcione en ambos carruseles
    const slides = slidesContainer ? slidesContainer.querySelectorAll('.carousel-item, .gallery-item') : [];
    
    if (slides.length === 0) {
        console.error(`No se encontraron diapositivas dentro de: ${slideContainerSelector}`);
        return;
    }

    function updateCarouselPosition() {
        // Obtenemos el ancho del contenedor visible para calcular la traslación
        const slideWidth = slides[0].clientWidth; 
        if (slidesContainer) {
            slidesContainer.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
        }
    }

    function moveToSlide(index) {
        if (index >= slides.length) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = slides.length - 1;
        } else {
            currentSlide = index;
        }
        updateCarouselPosition();
        if (autoRotate) {
            resetSlideTimer();
        }
    }

    function resetSlideTimer() {
        clearInterval(slideInterval);
        slideInterval = setInterval(() => {
            moveToSlide(currentSlide + 1);
        }, intervalTime);
    }

    if (prevButton) {
        prevButton.addEventListener('click', () => moveToSlide(currentSlide - 1));
    }
    if (nextButton) {
        nextButton.addEventListener('click', () => moveToSlide(currentSlide + 1));
    }

    window.addEventListener('resize', updateCarouselPosition);
    
    // Llamada inicial para posicionar el carrusel
    updateCarouselPosition();
    
    // Iniciar la rotación automática si está habilitada
    if (autoRotate) {
        resetSlideTimer();
    }
}

/**
 * Función de inicialización para la página Index.html
 * Esta función es llamada desde global.js cuando el DOM está cargado.
 */
function initIndexPage() {
    console.log("Inicializando scripts de la página de inicio...");

    // 1. Carrusel Principal (Hero/Banner)
    // Se usan los IDs correctos del archivo index.html
    setupCarousel(
        'carousel-container',     // ID del contenedor principal del primer carrusel
        '#carousel-slides',       // Selector del contenedor de las diapositivas
        '#carousel-prev',         // Selector del botón "anterior"
        '#carousel-next',         // Selector del botón "siguiente"
        true                      // Habilitar auto-rotación
    );

    // 2. Carrusel de Instalaciones (Galería)
    // Se usan los IDs correctos del segundo carrusel en index.html
    setupCarousel(
        'gallery-carousel-container', // ID del contenedor principal del carrusel de galería
        '#gallery-slides',            // Selector del contenedor de las diapositivas
        '#gallery-prev',              // Selector del botón "anterior"
        '#gallery-next',              // Selector del botón "siguiente"
        true                          // Habilitar auto-rotación
    );
}

// Nota: La llamada a initIndexPage() se realiza en global.js dentro del evento DOMContentLoaded.
