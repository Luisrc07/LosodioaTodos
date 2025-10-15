document.addEventListener('DOMContentLoaded', function() {
    
    // Función para cargar contenido HTML de forma asíncrona
    async function loadHTML(url, elementId) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                // Notifica si el archivo no se pudo cargar (ej: error 404)
                throw new Error(`HTTP error! status: ${response.status} al cargar ${url}`);
            }
            const html = await response.text();
            document.getElementById(elementId).innerHTML = html;
        } catch (error) {
            console.error(`Error al cargar el archivo ${url}:`, error);
        }
    }

    // --- PASO CLAVE: Carga los includes de forma asíncrona ---
    // Esperamos a que ambos archivos se carguen antes de inicializar la lógica de la página.
    Promise.all([
        loadHTML('includes/navbar.html', 'navbar-placeholder'),
        loadHTML('includes/footer.html', 'footer-placeholder')
    ]).then(() => {
        
        // ========================================================
        // --- Referencias a Elementos del DOM (DENTRO DEL .then()) ---
        // ========================================================
        // Estos elementos DEBEN ser referenciados DESPUÉS de que los includes se inserten.
        const navbar = document.getElementById('navbar');
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');
        const menuIconOpen = document.getElementById('menu-icon-open');
        const menuIconClose = document.getElementById('menu-icon-close');
        
        // Elementos fuera de los includes pero necesarios para la inicialización
        const themeToggleBtn = document.getElementById('theme-toggle');
        const darkIcon = document.getElementById('theme-toggle-dark-icon');
        const lightIcon = document.getElementById('theme-toggle-light-icon');
        const yearSpan = document.getElementById('year');
        const slidesContainer = document.getElementById('carousel-slides');


        // --- Lógica del Menú Móvil Desplegable (AHORA FUNCIONA) ---
        if (mobileMenuButton && mobileMenu && menuIconOpen && menuIconClose) {
            mobileMenuButton.addEventListener('click', () => {
                const isOpen = mobileMenu.classList.toggle('mobile-menu-open');
                mobileMenu.classList.toggle('mobile-menu-closed', !isOpen);
                
                menuIconOpen.classList.toggle('hidden', isOpen);
                menuIconClose.classList.toggle('hidden', !isOpen);
            });

            // Cierra el menú móvil al hacer clic en un enlace
            document.querySelectorAll('#mobile-menu a').forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.remove('mobile-menu-open');
                    mobileMenu.classList.add('mobile-menu-closed');
                    menuIconOpen.classList.remove('hidden');
                    menuIconClose.classList.add('hidden');
                });
            });
        }
        
        // --- Lógica del Modo Oscuro/Claro ---
        if (themeToggleBtn && darkIcon && lightIcon) {
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

            const currentTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
            applyTheme(currentTheme);

            themeToggleBtn.addEventListener('click', () => {
                const newTheme = document.documentElement.classList.contains('dark') ? 'light' : 'dark';
                localStorage.setItem('theme', newTheme);
                applyTheme(newTheme);
            });
        }

        // --- Lógica del Carrusel Deslizante ---
        if (slidesContainer) {
            const slides = document.querySelectorAll('.carousel-item');
            const prevButton = document.getElementById('carousel-prev');
            const nextButton = document.getElementById('carousel-next');
            
            let currentSlide = 0;
            const totalSlides = slides.length;

            function updateCarousel() {
                slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
            }

            if (nextButton && prevButton) {
                nextButton.addEventListener('click', () => {
                    currentSlide = (currentSlide + 1) % totalSlides;
                    updateCarousel();
                });

                prevButton.addEventListener('click', () => {
                    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
                    updateCarousel();
                });
            }

            // Auto-play del carrusel
            setInterval(() => {
                currentSlide = (currentSlide + 1) % totalSlides;
                updateCarousel();
            }, 7000); // Cambia cada 7 segundos
        }

        // --- Animación de entrada de secciones al hacer scroll ---
        const sections = document.querySelectorAll('.fade-in-section');
        if (sections.length > 0) {
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });

            sections.forEach(section => {
                observer.observe(section);
            });
        }

        // --- Actualizar año en el footer ---
        if (yearSpan) {
            yearSpan.textContent = new Date().getFullYear();
        }

    }).catch(error => {
        console.error("Error durante la carga de includes:", error);
    });
});