const fetch = require('node-fetch');

const generateDescriptionWithAI = async (req, res) => {
  const { descripcionAnterior } = req.body;

  if (!descripcionAnterior) {
    return res.status(400).json({
      descripcionAnterior: "Falta el contexto o la descripción anterior para generar el texto."
    });
  }

  try {
    const prompt = `
Eres un asistente experto en redacción para establecimientos de bares.

Tu tarea es generar una descripción mejorada, atractiva y profesional basada en el siguiente contexto:

Contexto o descripción anterior:
"${descripcionAnterior}"

Requisitos:
- No quiero que supere los 200 caracteres
- Mantén el sentido y el contexto del texto original.
- Corrige errores de redacción o gramática si los hay.
- Haz que sea fluida y atractiva para los clientes.
- Responde ESTRICTAMENTE en formato JSON, sin texto adicional.

Estructura requerida:
{
  "descripcion": "Texto mejorado aquí"
}
`;

    const response = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'gemma4:31b-cloud',
        prompt,
        format: 'json',
        stream: false,
      }),
    });

    if (!response.ok) {
      throw new Error('Error al conectar con el servidor de Ollama');
    }

    const data = await response.json();
    const texto = data.response.trim();

    const limpio = texto
      .replace(/```json/g, '')
      .replace(/```/g, '')
      .trim();

    let resultado;
    try {
      resultado = JSON.parse(limpio);
    } catch (e) {
      console.error("Error parseando JSON de la descripción:", limpio);
      resultado = { descripcion: descripcionAnterior }; // Fallback
    }

    return res.json(resultado);
  } catch (error) {
    console.error("Error en la generación de descripción:", error);
    return res.status(500).json({ error: error.message });
  }
};




const checkDuplicateWithAI = async (req, res) => {


  const { nuevoNombre, listaNombresExistentes } = req.body;


  if (!nuevoNombre || !Array.isArray(listaNombresExistentes)) {
    return res.status(400).json({
      esDuplicado: false,
      barSimilar: null,
      confianza: "bajo",
      error: "Datos de entrada inválidos. nuevoNombre y listaNombresExistentes son requeridos."
    });
  }

  try {
    const prompt = `Eres un sistema de validación de datos.
Nuevo nombre: "${nuevoNombre}"
Lista de bares existentes: ${JSON.stringify(listaNombresExistentes)}

Analiza si el nuevo nombre es un duplicado o muy similar (comparando palabras, significado u oraciones parecidas).

No consideres duplicado si:
- El nombre es claramente diferente
- Solo comparten palabras genéricas o comunes como "Bar", "Pub", "Tucumán", etc.

Responde SOLO en JSON válido con la siguiente estructura:
{
  "esDuplicado": boolean,
  "barSimilar": string | null,
  "confianza": "alto" | "medio" | "bajo"
}`;

    const response = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'gemma4:31b-cloud',
        prompt,
        format: 'json',
        stream: false,
      }),
    });

    if (!response.ok) {
      throw new Error(`Error al conectar con el servidor de Ollama: ${response.statusText}`);
    }

    const data = await response.json();
    const limpio = data.response.replace(/```json/g, '').replace(/```/g, '').trim();
    
    return res.json(JSON.parse(limpio));

  } catch (error) {
    console.error("Error en checkDuplicateWithAI:", error);
    
    return res.status(500).json({
      esDuplicado: false,
      barSimilar: null,
      confianza: "bajo",
      error: error.message
    });
  }
};

module.exports = {
  generateDescriptionWithAI,
  checkDuplicateWithAI
};