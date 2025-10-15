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
    rx: {
        title: "Radiografia",
        prices: [
            { name: "Consulta General", price: "Bs. 40.000", code: "O-010" },
            { name: "Limpieza Dental", price: "Bs. 90.000", code: "O-011" },
            { name: "Aplicación de Flúor", price: "Bs. 35.000", code: "O-012" },
        ],
        recommendations: [
            "Si usted está embarazada o cree estarlo, debe notificarlo al técnico de inmediato.",
            "Quítese todas las joyas, relojes, piercings, gafas y ropa con cremalleras, botones o broches metálicos. El metal interfiere con la calidad de la imagen.",
            "Use ropa suelta y cómoda que pueda quitarse fácilmente.",
        ],
        schedule: "Lunes a Jueves: 8:00 AM - 4:00 PM | Viernes: 9:00 AM - 3:00 PM",
    },
    
    ecografia: {
        title: "Ecografia",
        prices: [
            { name: "Rayos X de Tórax", price: "Bs. 120.000", code: "I-030" },
            { name: "Ecosonograma Abdominal", price: "Bs. 180.000", code: "I-031" },
            { name: "Mamografía", price: "Bs. 250.000", code: "I-032" },
        ],
        recommendations: [
            "Ecografía Abdominal: Generalmente se requiere ayuno (no comer ni beber) durante 6 a 8 horas antes del examen.",
            "Ecografía Pélvica / Obstétrica: Se solicita tener la vejiga llena para obtener una imagen clara de los órganos pélvicos. Beba varios vasos de agua una hora antes de su cita.",
            "Otros Estudios (Tiroides, Músculo-esquelético): No suelen requerir ninguna preparación especial.",
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
    mamografia: {
        title: "Mamografia",
        prices: [
            { name: "Consulta Psicológica (1h)", price: "Bs. 90.000", code: "S-050" },
            { name: "Terapia de Pareja (1.5h)", price: "Bs. 150.000", code: "S-051" },
        ],
        recommendations: [
            "No aplique desodorantes, antitranspirantes, talcos, lociones o perfumes en el área del pecho ni en las axilas.",
            "Vista ropa cómoda de dos piezas (blusa y pantalón/falda), ya que deberá quitarse solo la ropa de la cintura para arriba.",
            "Si tiene implantes mamarios o cirugías previas, avise al técnico. Lleve mamografías anteriores si las tiene.",
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
        <table class="min-w-full divide-y divide-border bg-main">
            <thead class="bg-primary/10 dark:bg-primary/20">
                <tr>
                    <th class="bg-main px-4 py-2 text-left text-sm font-medium text-primary dark:text-primary uppercase tracking-wider">Servicio</th>
                    <th class="bg-main px-4 py-2 text-left text-sm font-medium text-primary dark:text-primary uppercase tracking-wider">Precio Estimado</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-border bg-main"> 
    `;
    prices.forEach(item => {
        tableHTML += `
            <tr class="bg-main transition-colors duration-200">
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
    let listHTML = '<ul class="bg-main list-disc pl-5 space-y-2 text-main ">';
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

if (document.querySelector('.service-card')) {
        setupServicesAccordion(); 
    }