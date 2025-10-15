// ===================================================================
// --- FUNCIONES GLOBALES (Menú Móvil, Tema, Animaciones) ---
// ===================================================================

// Función para manejar el menú móvil
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


// Función para manejar el tema (Modo Oscuro/Claro)
function setupThemeToggle() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const darkIcon = document.getElementById('theme-toggle-dark-icon');
    const lightIcon = document.getElementById('theme-toggle-light-icon');

    if (!themeToggleBtn) return;

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

// Función para animaciones de fade-in
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

// Función para cargar plantillas HTML (footer, etc.)
async function loadTemplate(elementId, filePath) {
    try {
        const response = await fetch(filePath);
        if (response.ok) {
            const html = await response.text();
            document.getElementById(elementId).innerHTML = html;
        }
    } catch (error) {
        console.error('Error loading template:', error);
    }
}


// --- PUNTO DE ENTRADA PRINCIPAL ---
document.addEventListener('DOMContentLoaded', () => {
    // 1. Inicializar funciones globales en TODAS las páginas
    setupMobileMenu();
    setupThemeToggle();
    setupFadeInAnimations();
    
    // **NUEVO:** Cargar el footer
    loadTemplate('footer-placeholder', 'includes/footer.html');

    // 2. Llamar a la función de inicialización específica de la página si existe
    if (typeof initIndexPage === 'function') {
        initIndexPage();
    }
    if (typeof initServiciosPage === 'function') {
        initServiciosPage();
    }
    if (typeof initEspecialidadesPage === 'function') {
        initEspecialidadesPage();
    }
});
