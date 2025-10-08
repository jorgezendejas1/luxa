// Esta función se ejecuta en el entorno de Node.js de Netlify, no en el navegador.
// Usa la API `fetch` nativa disponible en los runtimes modernos de Node.js de Netlify.
// NO estamos usando el SDK de @google/genai aquí para evitar la necesidad de un paso de compilación (npm install).

exports.handler = async function (event, context) {
  // Solo permitir solicitudes POST
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { prompt, systemInstruction } = JSON.parse(event.body);

    if (!prompt) {
      return { statusCode: 400, body: "Bad Request: se requiere un 'prompt'." };
    }

    const API_KEY = process.env.API_KEY;
    if (!API_KEY) {
        // Este error es para el desarrollador, no para el usuario final.
        console.error("La variable de entorno API_KEY no está configurada.");
        return { statusCode: 500, body: "Error de configuración del servidor." };
    }

    // Usamos la API REST de Gemini directamente
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;
    
    const requestBody = {
      contents: [
        {
          // FIX: Se añade el rol 'user' para cumplir con el esquema de la API y mejorar la robustez.
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
    };

    // Agrega la instrucción del sistema al cuerpo de la solicitud si se proporcionó.
    // Esta es la forma recomendada de guiar al modelo.
    if (systemInstruction) {
        requestBody.systemInstruction = {
            parts: [{ text: systemInstruction }],
        };
    }

    const apiResponse = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!apiResponse.ok) {
      const errorBody = await apiResponse.text();
      console.error("Error de la API de Gemini:", errorBody);
      return { statusCode: apiResponse.status, body: `Error de la API de Gemini: ${errorBody}` };
    }

    const data = await apiResponse.json();
    
    // Extraer el texto de la respuesta
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No se generó texto.";

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    };
  } catch (error) {
    console.error("Error en la función de Netlify:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Ocurrió un error interno en el servidor." }),
    };
  }
};