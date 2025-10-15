// ===================================================================
// --- DATOS DE SERVICIOS (Restaurados de tu script.js original) ---
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
    odontologia: {
        title: "Odontología Preventiva",
        prices: [
            { name: "Consulta General", price: "Bs. 40.000", code: "O-010" },
            { name: "Limpieza Dental", price: "Bs. 90.000", code: "O-011" },
            { name: "Aplicación de Flúor", price: "Bs. 35.000", code: "O-012" },
        ],
        recommendations: [
            "Asistir a su cita con la boca limpia.",
            "Si tiene radiografías recientes, tráigalas.",
            "Para procedimientos, evite consumir alimentos 30 minutos antes.",
        ],
        schedule: "Lunes a Jueves: 8:00 AM - 4:00 PM | Viernes: 9:00 AM - 3:00 PM",
    },
    farmacia: {
        title: "Farmacia Cooperativa",
        prices: [
            { name: "Consulta de Medicamentos", price: "Gratuita", code: "F-020" },
            { name: "Inyectología", price: "Bs. 15.000", code: "F-021" },
            { name: "Toma de Tensión", price: "Bs. 10.000", code: "F-022" },
        ],
        recommendations: [
            "Presente la receta médica original para la dispensación de control.",
            "Consulte al farmacéutico sobre interacciones de medicamentos.",
            "Pregunte por nuestras marcas cooperativas con mejores precios.",
        ],
        schedule: "Lunes a Sábado: 7:00 AM - 5:00 PM",
    },
    imagenologia: {
        title: "Imagenología (Rayos X y Eco)",
        prices: [
            { name: "Rayos X de Tórax", price: "Bs. 120.000", code: "I-030" },
            { name: "Ecosonograma Abdominal", price: "Bs. 180.000", code: "I-031" },
            { name: "Mamografía", price: "Bs. 250.000", code: "I-032" },
        ],
        recommendations: [
            "Para ecosonogramas abdominales, asista con la vejiga llena.",
            "Evite joyas y objetos metálicos en la zona a examinar.",
            "Llegue 15 minutos antes de su cita para el registro.",
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
    saludmental: {
        title: "Salud Mental (Psicología)",
        prices: [
            { name: "Consulta Psicológica (1h)", price: "Bs. 90.000", code: "S-050" },
            { name: "Terapia de Pareja (1.5h)", price: "Bs. 150.000", code: "S-051" },
        ],
        recommendations: [
            "Llegue puntualmente para aprovechar el tiempo de la sesión.",
            "Busque un lugar tranquilo si la sesión es virtual.",
            "La confidencialidad es clave, siéntase libre de expresarse.",
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

// Genera la tabla de precios
function generatePriceTable(prices) {
    let tableHTML = `
        <table class="min-w-full divide-y divide-border dark:divide-primary/20">
            <thead class="bg-primary/10 dark:bg-primary/20">
                <tr>
                    <th class="px-4 py-2 text-left text-sm font-medium text-primary dark:text-primary uppercase tracking-wider">Servicio</th>
                    <th class="px-4 py-2 text-left text-sm font-medium text-primary dark:text-primary uppercase tracking-wider">Precio</th>
                    <th class="px-4 py-2 text-left text-sm font-medium text-primary dark:text-primary uppercase tracking-wider">Código</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-border dark:divide-primary/20">
    `;
    prices.forEach(item => {
        tableHTML += `
            <tr class="hover:bg-alt/50 transition-colors duration-150">
                <td class="px-4 py-3 whitespace-nowrap text-main">${item.name}</td>
                <td class="px-4 py-3 whitespace-nowrap text-main font-semibold">${item.price}</td>
                <td class="px-4 py-3 whitespace-nowrap text-alt">${item.code}</td>
            </tr>
        `;
    });
    tableHTML += `</tbody></table>`;
    return tableHTML;
}

// Genera la lista de recomendaciones
function generateRecommendationsList(recommendations) {
    let listHTML = '<ul class="space-y-2 text-alt list-disc list-inside">';
    recommendations.forEach(rec => {
        listHTML += `<li>${rec}</li>`;
    });
    listHTML += '</ul>';
    return listHTML;
}

// Rellena el contenido dinámico de la página y maneja el estado del botón
function populateServiceContent(serviceKey) {
    const data = serviceData[serviceKey];
    if (!data) return;

    // Mostrar el contenedor de detalles
    const detailsContainer = document.getElementById('service-details-container');
    if (detailsContainer) {
        detailsContainer.classList.remove('hidden');
    }

    // Actualizar el título
    const titleEl = document.getElementById('detail-service-title');
    if (titleEl) titleEl.textContent = data.title;

    // Actualizar la tabla de precios
    const pricesEl = document.getElementById('service-price-table-content');
    if (pricesEl) pricesEl.innerHTML = generatePriceTable(data.prices);

    // Actualizar las recomendaciones
    const recommendationsEl = document.getElementById('recommendations-content');
    if (recommendationsEl) recommendationsEl.innerHTML = generateRecommendationsList(data.recommendations);

    // Actualizar el horario
    const scheduleEl = document.getElementById('schedule-content');
    if (scheduleEl) scheduleEl.textContent = data.schedule;

    // Actualizar el estado de los botones
    document.querySelectorAll('.service-card').forEach(btn => {
        btn.classList.remove('bg-accent', 'text-white');
        if (btn.dataset.serviceId === serviceKey) {
            btn.classList.add('bg-accent', 'text-white');
        }
    });
}

// Función de inicialización para Servicios.html (llamada desde global.js)
function initServiciosPage() {
    document.querySelectorAll('.service-card').forEach(button => {
        button.addEventListener('click', (event) => {
            const serviceKey = event.currentTarget.dataset.serviceId;
            if (serviceKey) {
                populateServiceContent(serviceKey);
                // Opcional: Guardar el estado para recargas
                localStorage.setItem('activeService', serviceKey);
            }
        });
    });

    // Cargar el servicio inicial (ej. 'laboratorio') o el guardado
    const initialService = localStorage.getItem('activeService') || 'laboratorio';
    populateServiceContent(initialService);
}