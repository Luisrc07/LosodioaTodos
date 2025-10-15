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

  if (document.getElementById('carousel-container')) {
        setupMainCarousel();
        setupGalleryCarousel();
        setupScrollObserverForNav(); // Observador de scroll solo para el index
    }