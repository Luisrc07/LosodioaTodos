/**
 * Processes CSV text where each row contains a service name, price, and optional recommendations.
 * @param {string} csvText The raw text content from a .csv file.
 * @returns {Array<Object>} An array of objects, each containing 'name', 'price', and an array of 'recommendations'.
 */
function processCsvWithRecommendations(csvText) {
    const lines = csvText.split('\n').filter(line => line.trim() !== '');

    return lines.map(row => {
        const columns = row.split(';').map(col => col.trim());

        if (columns.length < 2 || !columns[0] || !columns[1]) {
            return null; // Skips rows that are empty or don't have a name/price
        }

        const name = columns[0];
        const priceString = columns[1];

        // Cleans and formats the price value
        const cleanedPriceString = priceString.replace(/\./g, '').replace(',', '.').replace(/[^\d.]/g, '');
        const priceValue = parseFloat(cleanedPriceString);

        if (isNaN(priceValue)) {
            return null; // Skips rows with an invalid price
        }

        const formattedPrice = new Intl.NumberFormat('es-ES', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(priceValue);

        // Captures all subsequent non-empty columns as recommendations
        const recommendations = columns.slice(2).filter(rec => rec.length > 0);

        return {
            name: name,
            price: `Bs. ${formattedPrice}`,
            recommendations: recommendations
        };
    }).filter(item => item !== null); // Removes any null entries from the final array
}

/**
 * Fetches a CSV file from a given path and processes its content.
 * @param {string} filePath The path to the .csv file.
 * @returns {Promise<Array<Object>>} A promise that resolves to the processed data array.
 */
export async function loadAndProcessCsv(filePath) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const csvText = await response.text();
        return processCsvWithRecommendations(csvText);
    } catch (error) {
        console.error(`Error loading or processing CSV from ${filePath}:`, error);
        return [{
            name: "Error al cargar los datos.",
            price: "Intente de nuevo más tarde.",
            recommendations: []
        }];
    }
}