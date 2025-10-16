// --- DATOS DE SERVICIOS ---

const serviceData = {
    laboratorio: {
        title: "Laboratorio Clínico",
        prices: [], // Se llenará desde el CSV
        recommendations: [
            "Debe asistir en ayunas (mínimo 8 horas).",
            "Traer la orden médica si aplica.",
            "Informar sobre cualquier medicamento que esté tomando.",
        ],
        schedule: ["Lunes a Viernes: 6:30 AM - 4:00 PM" , 
            "Sábados: 6:30 AM - 3:00 PM",
            "Domingo: 7 AM - 12PM (orden de llegada) " ,
        ],
    },
    rx: {
        title: "Radiografia",
        prices: [],
        recommendations: [
            "Si es menor de edad debe venir con su respectivo representante!.",
            "El paciente debe traer orden médica.",
            "Si necesita informe para el estudio debe dejarlo, encaso de llevarselo debe traer el estudio nuevemente y no haber transcurrido 15 dias de haberse realizado el estudio.",
        ],
        schedule: ["Lunes a Viernes: 6:30 AM - 4:00 PM (Se atienden 80 pacientes).",
        "Sabados: 7:00 AM - 12:00 PM (Se atienden 20 pacientes).",
        " Domingo: 7:00 AM - 12:00 PM (Se atienden 20 pacientes).",
    ]
    },
    
    eco: {
        title: "Ecografia",
        prices: [],
        recommendations: [
            "Ecografía Abdominal: Generalmente se requiere ayuno (no comer ni beber) durante 6 a 8 horas antes del examen.",
            "Ecografía Pélvica / Obstétrica: Se solicita tener la vejiga llena para obtener una imagen clara de los órganos pélvicos. Beba varios vasos de agua una hora antes de su cita.",
            "Otros Estudios (Tiroides, Músculo-esquelético): No suelen requerir ninguna preparación especial.",
        ],
        schedule: ["Lunes a Viernes: 8:00 AM - 12:00 PM y 2:00 PM - 4:00 PM",
        ],
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
            { name: "MAMOGRAFIA I BILATERAL", price: "Bs. 3.547", code: "S-050" },
            { name: "MAMOGRAFIA BILATERAL CON PROTESIS", price: "Bs. 4.256,4", code: "S-051" },
            { name: "MAMOGRAFIA I UNILATERAL", price: "Bs. 2.837,6", code: "S-051" },
        ],
        recommendations: [
            "No aplique desodorantes, antitranspirantes, talcos, lociones o perfumes en el área del pecho ni en las axilas.",
            "Vista ropa cómoda de dos piezas (blusa y pantalón/falda), ya que deberá quitarse solo la ropa de la cintura para arriba.",
            "Si tiene implantes mamarios o cirugías previas, avise al técnico. Lleve mamografías anteriores si las tiene.",
        ],
        schedule: "Lunes a viernes: 7:00 am - 12:00 PM | El informa se entregara en 8 dias",
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
//  FUNCIONES ESPECÍFICAS DE SERVICIOS.HTML 
// ===================================================================

function generatePriceTable(prices, serviceId) {
    if (!prices || prices.length === 0) {
        return '<p class="text-center p-4">No hay precios disponibles para este servicio.</p>';
    }

    // --- CORRECCIÓN 1: Se chequea si el servicio usa recomendaciones individuales del CSV ---
    const hasIndividualRecommendations = (serviceId === 'laboratorio' || serviceId === 'rx' || serviceId === 'eco');
    const isMobile = window.innerWidth < 640;

    // VISTA MÓVIL (CARDS)
    if (isMobile) {
        return `
            <div class="space-y-3">
                ${prices.map((item, index) => `
                    <div class="border border-border rounded-xl p-3 bg-main shadow-sm hover:shadow-md transition-shadow duration-300">
                        <p class="font-semibold text-sm text-primary">${item.name}</p>
                        <p class="text-accent font-bold text-base mb-2">${item.price}</p>
                        ${hasIndividualRecommendations && item.recommendation ? `
                            <button 
                                class="text-xs text-primary font-semibold hover:underline mt-1 focus:outline-none"
                                onclick="document.getElementById('rec-card-${index}').classList.toggle('hidden')"
                            >
                                🧪 Ver Indicación
                            </button>
                            <p id="rec-card-${index}" class="text-xs italic text-alt mt-1 p-2 bg-primary/10 rounded hidden">${item.recommendation}</p>
                        ` : ''}
                    </div>
                `).join('')}
            </div>
        `;
    }

    // VISTA DESKTOP (TABLA)
    let tableHTML = `
        <div class="w-full overflow-x-auto">
            <table class="min-w-full divide-y divide-border bg-main">
                <thead class="bg-primary/10 dark:bg-primary/20">
                    <tr>
                        <th class="px-4 py-2 text-left text-sm font-medium text-primary uppercase tracking-wider whitespace-nowrap">
                            Servicio
                        </th>
                        <th class="px-4 py-2 text-left text-sm font-medium text-primary uppercase tracking-wider whitespace-nowrap">
                            Precio Estimado
                        </th>
                        ${hasIndividualRecommendations ? `<th class="px-4 py-2 text-left text-sm font-medium text-primary uppercase tracking-wider whitespace-nowrap">Indicación</th>` : ''}
                    </tr>
                </thead>
                <tbody class="divide-y divide-border bg-main">
    `;

    prices.forEach((item, index) => {
        tableHTML += `
            <tr class="transition-colors duration-200 hover:bg-primary/5">
                <td class="px-4 py-3 whitespace-nowrap text-sm">${item.name}</td>
                <td class="px-4 py-3 whitespace-nowrap text-sm font-semibold text-accent">${item.price}</td>
                ${hasIndividualRecommendations ? `
                    <td class="px-4 py-3 text-sm">
                        ${item.recommendation ? `
                            <button 
                                class="text-xs text-primary font-semibold hover:underline focus:outline-none"
                                onclick="document.getElementById('rec-row-${index}').classList.toggle('hidden')"
                            >
                                🧪 Ver Indicación
                            </button>
                        ` : '<span class="text-gray-400 text-xs">N/A</span>'}
                    </td>
                ` : ''}
            </tr>
            ${hasIndividualRecommendations && item.recommendation ? `
                <tr id="rec-row-${index}" class="hidden bg-primary/5">
                    <td colspan="3" class="px-4 py-2 text-xs italic text-alt">
                        <strong>Indicación:</strong> ${item.recommendation}
                    </td>
                </tr>
            ` : ''}
        `;
    });

    tableHTML += `
                </tbody>
            </table>
        </div>
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
    const recommendationsDiv = document.getElementById('recommendations-div');

    serviceCards.forEach(card => {
        card.addEventListener('click', function() {
            const serviceId = this.getAttribute('data-service-id');
            const data = serviceData[serviceId];
            // Se usa la misma lógica para ocultar la sección general
            const hasIndividualRecommendations = (serviceId === 'laboratorio' || serviceId === 'rx' || serviceId === 'eco')

            if (data) {
                // 1. Actualizar Título
                titleElement.textContent = data.title;

                // 2. Actualizar Tabla de Precios (se le pasa el serviceId)
                priceTableElement.innerHTML = generatePriceTable(data.prices, serviceId);

                // 3. Manejar y actualizar Recomendaciones
                // Si es Lab, RX o ECO, ocultamos la sección general ya que las indicaciones son individuales en la tabla.
                /*if (hasIndividualRecommendations) {
                    recommendationsDiv.classList.add('hidden');
                } else {
                    recommendationsDiv.classList.remove('hidden');
                   
                }*/
                recommendationsContent.innerHTML = generateList(data.recommendations);
                // 4. Actualizar Horario
                // El horario puede ser un array o un string, la función generateList lo maneja bien.
                const scheduleArray = Array.isArray(data.schedule) ? data.schedule : [data.schedule];
                scheduleContent.innerHTML = generateList(scheduleArray);

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

function filterPriceTableItems(searchTerm) {
    const container = document.querySelector('#service-price-table-content');
    if (!container) return;

    const normalizedSearchTerm = searchTerm.toLowerCase().trim();

    // MODO TABLA
    const tableRows = container.querySelectorAll('tbody tr');
    if (tableRows.length > 0) {
        tableRows.forEach(row => {
            // Ignorar las filas de indicación (las que tienen el ID 'rec-row-')
            if (row.id && row.id.startsWith('rec-row-')) return; 

            const serviceName = row.querySelector('td:first-child').textContent.toLowerCase().trim();
            
            // También ocultamos la fila de indicación si existe
            if (!serviceName.includes(normalizedSearchTerm)) {
                row.style.display = 'none';
                const recRow = document.getElementById(`rec-row-${row.rowIndex - 1}`);
                if (recRow) recRow.style.display = 'none';
            } else {
                 row.style.display = '';
            }
        });
        return;
    }

    // MODO CARDS (móvil)
    const cards = container.querySelectorAll('div.border.rounded-xl');
    if (cards.length > 0) {
        cards.forEach(card => {
            const text = card.textContent.toLowerCase().trim();
            card.style.display = text.includes(normalizedSearchTerm) ? '' : 'none';
        });
    }
}

// Funcion para cargar los datos de Radiografia (RX)
async function loadRxData() {
    try {
        // --- CORRECCIÓN 2: Se eliminó 'data/' en la ruta ---
        const response = await fetch('data/rx.csv'); 
        const csvText = await response.text();
        const rows = csvText.split('\n').slice(1).map(row => row.trim()).filter(row => row.length > 0);

        const newPrices = rows.map(row => {
            const columns = row.split(';');
            const name = columns[0].trim();
            const priceString = columns[1] ? columns[1].trim() : '';
            // Columna de la indicación: índice 2
            const recommendation = columns[2] ? columns[2].trim() : ''; 

            if (!name || !priceString) {
                return null;
            }

            // Normalización del precio (igual que en loadLabData)
            const cleanedPriceString = priceString.replace(',', '.').replace(/[^.\d]/g, '');
            const priceValue = parseFloat(cleanedPriceString);
            if (isNaN(priceValue)) {
                return null;
            }
            const formattedPrice = new Intl.NumberFormat('es-ES', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }).format(priceValue);

            return {
                name: name,
                price: `Bs. ${formattedPrice}`,
                recommendation: recommendation // <- Incluir recomendación/indicación
            };
        }).filter(item => item !== null);

        serviceData.rx.prices = newPrices;

    } catch (error) {
        console.error("Error cargando los datos de Radiografía:", error);
        serviceData.rx.prices = [{
            name: "Error al cargar la lista de exámenes. (Verifique que 'rx.csv' esté en la misma carpeta)",
            price: "Por favor, intente más tarde.",
            recommendation: ""
        }];
    }
}

// Función para cargar los datos de Ecosonograma (ECO)
async function loadEcoData() {
    try {
        // --- CORRECCIÓN 2: Se eliminó 'data/' en la ruta ---
        const response = await fetch('data/eco.csv'); 
        const csvText = await response.text();
        const rows = csvText.split('\n').slice(1).map(row => row.trim()).filter(row => row.length > 0);

        const newPrices = rows.map(row => {
            const columns = row.split(';');
            const name = columns[0].trim();
            const priceString = columns[1] ? columns[1].trim() : '';
            // Columna de la indicación: índice 2
            const recommendation = columns[2] ? columns[2].trim() : ''; 

            if (!name || !priceString) {
                return null;
            }

            // Normalización del precio (igual que en loadLabData)
            const cleanedPriceString = priceString.replace(',', '.').replace(/[^.\d]/g, '');
            const priceValue = parseFloat(cleanedPriceString);
            if (isNaN(priceValue)) {
                return null;
            }
            const formattedPrice = new Intl.NumberFormat('es-ES', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }).format(priceValue);

            return {
                name: name,
                price: `Bs. ${formattedPrice}`,
                recommendation: recommendation // <- Incluir recomendación/indicación
            };
        }).filter(item => item !== null);

        serviceData.eco.prices = newPrices;

    } catch (error) {
        console.error("Error cargando los datos de Ecosonograma:", error);
        serviceData.eco.prices = [{
            name: "Error al cargar la lista de exámenes. (Verifique que 'eco.csv' esté en la misma carpeta)",
            price: "Por favor, intente más tarde.",
            recommendation: ""
        }];
    }
}

// Esta función ahora "limpia" el string del precio antes de convertirlo a número.
async function loadLabData() {
   
    try {
        // --- CORRECCIÓN 2: Se eliminó en la ruta ---
        const response = await fetch('./data/Lab.csv'); 
        
        if (!response.ok) { // Verifica si el archivo fue encontrado (status 200)
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const csvText = await response.text();
        
        const newPrices = csvText
    .split('\n')
    .slice(1) // Si tu CSV no tiene encabezado, puedes comentar o eliminar esta línea
    .map(row => {
        const columns = row.split(';');
        // Ahora verificamos que existan al menos las 2 primeras columnas
        if (columns.length < 2 || !columns[0] || !columns[1]) return null;

        const name = columns[0].trim();
        const priceString = columns[1].trim();
        
        // Capturamos la recomendación de la tercera columna
        const recommendation = columns[2] && columns[2].trim() ? columns[2].trim() : "";

        // Lógica para limpiar y formatear el precio (ya la tienes bien)
        const cleanedPriceString = priceString.replace(/\./g, '').replace(',', '.').replace(/[^\d.]/g, '');
        const priceValue = parseFloat(cleanedPriceString);
        if (isNaN(priceValue)) {
            return null;
        }
        const formattedPrice = new Intl.NumberFormat('es-ES', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(priceValue);

        // Añadimos 'recommendation' al objeto que retornamos
        return {
            name: name,
            price: `Bs. ${formattedPrice}`,
            recommendation: recommendation // <-- La nueva propiedad
        };
    })
            .filter(item => item !== null);

        serviceData.laboratorio.prices = newPrices;
        
    } catch (error) {
        console.error("Error cargando los datos del laboratorio:", error);
      
        // Si hay un error (ej: archivo no encontrado), mostramos un mensaje útil.
        serviceData.laboratorio.prices = [{
            name: "Error al cargar la lista de exámenes. (Verifique que 'Lab.csv' esté en la misma carpeta)",
            price: "Por favor, intente más tarde."
        }];
    }
}


document.addEventListener('DOMContentLoaded', async () => {
    // Llama a las 3 funciones de carga de CSV
    await loadLabData();
    await loadRxData();
    await loadEcoData();

    if (document.querySelector('.service-card')) {
        setupServicesAccordion();
    }

    const searchInput = document.getElementById('service-search');
    if (searchInput) {
        searchInput.addEventListener('keyup', (e) => {
            filterPriceTableItems(e.target.value);
        });
    }
});