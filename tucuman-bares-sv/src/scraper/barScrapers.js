const axios = require("axios");
const cheerio = require("cheerio");

const scrapeAllPages = async (maxPages = 5) => {
    const bars = [];

    for (let i = 1; i <= maxPages; i++) {
        try {

            let url = `https://lanochedelasbirrerias.com.ar/cerveceria/page/${i}/?s&business_location=tucuman`;
            
            if (i === 1) {
                url = "https://lanochedelasbirrerias.com.ar/cerveceria/?s=&business_location=tucuman";
            }

            console.log(`Scrapeando página ${i}: ${url}`);

            const { data } = await axios.get(url, {
                headers: {
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
                }
            });

            const $ = cheerio.load(data);

            $("article.h-entry").each((_, el) => {
                const rawNombre = $(el).find("h2").text();
                const nombre = rawNombre.replace(/\s+/g, ' ').trim();
                
                const categoria = $(el).find('span[itemprop="additionalType"]').text().trim();
                const ubicacion = $(el).find('span[itemprop="addressLocality"]').text().trim();
                const rawDescripcion = $(el).find('p[itemprop="description"]').text();
                const descripcion = rawDescripcion.replace(/\s+/g, ' ').trim();
                const image = $(el).find("img").attr("src") || "";

                if (nombre) {
                    bars.push({
                        nombre,
                        categoria,
                        ubicacion,
                        descripcion,
                        image,
                        fuente: "lanochedelasbirrerias",
                        fecha_obtencion: new Date().toISOString(),
                    });
                }
            });

            await new Promise(resolve => setTimeout(resolve, 1500));

        } catch (error) {
            console.error(`Error al scrapear la página ${i}:`, error.message);
            if (error.response && error.response.status === 404) {
                console.log("No hay más páginas disponibles.");
                break; 
            }
        }
    }

    return bars;
};

module.exports = scrapeAllPages;