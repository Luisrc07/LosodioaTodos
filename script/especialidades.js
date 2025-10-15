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

// Función de inicialización para Especialidades.html (llamada desde global.js)
function initEspecialidadesPage() {
    setupSpecialtyToggle();
}