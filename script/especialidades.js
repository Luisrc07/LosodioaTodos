// ===================================================================
// --- FUNCIONES ESPECÍFICAS DE ESPECIALIDADES.HTML (Acordeón) ---
// ===================================================================

function setupSpecialtyToggle() {
    document.querySelectorAll('.specialty-card').forEach(card => {
        // Seleccionamos el encabezado de la tarjeta (el que contiene el título)
        const header = card.querySelector('.p-4:not(.doctor-item), .p-6:not(.doctor-item)');
        const doctorList = card.querySelector('.doctor-list');
        const arrowIcon = card.querySelector('.arrow-icon');

        if (header && doctorList && arrowIcon) {
            header.addEventListener('click', () => {
                // Toggle la visibilidad de la lista de doctores
                doctorList.classList.toggle('hidden');

                // Animación de la flecha
                arrowIcon.classList.toggle('rotate-180');

                // Opcional: cerrar otras tarjetas al abrir una (efecto acordeón)
                document.querySelectorAll('.specialty-card').forEach(otherCard => {
                    if (otherCard !== card) {
                        otherCard.querySelector('.doctor-list').classList.add('hidden');
                        otherCard.querySelector('.arrow-icon').classList.remove('rotate-180');
                    }
                });
            });
        }
    });
}

// Función de inicialización para Especialidades.html (llamada desde global.js)
function initEspecialidadesPage() {
    setupSpecialtyToggle();
}