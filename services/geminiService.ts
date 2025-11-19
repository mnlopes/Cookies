import { GoogleGenAI, Type } from "@google/genai";
import { Cookie, AiRecommendation } from "../types";

// Initialize Gemini Client
// NOTE: In a real production app, ensure process.env.API_KEY is set.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getCookieRecommendation = async (
  mood: string,
  availableCookies: Cookie[]
): Promise<AiRecommendation> => {
  
  const cookieListString = availableCookies.map(c => `${c.id}: ${c.name} (${c.description})`).join('\n');

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `
        Você é um "Concierge de Cookies" sofisticado, engraçado e levemente pretensioso, estilo marketing da Apple.
        O usuário vai dizer como está se sentindo ou o que quer.
        Baseado na lista de cookies abaixo, escolha UM cookie perfeito para ele.
        
        Lista de Cookies:
        ${cookieListString}
        
        Input do Usuário: "${mood}"
        
        Retorne APENAS um JSON com o ID do cookie recomendado e uma razão curta, engraçada e estilo "Apple" (use termos como 'revolucionário', 'mágico', 'design', 'arquitetura de sabor').
      `,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            recommendedCookieId: { type: Type.STRING },
            reason: { type: Type.STRING },
          },
          required: ["recommendedCookieId", "reason"]
        }
      }
    });

    if (response.text) {
        const data = JSON.parse(response.text);
        return data as AiRecommendation;
    }
    
    throw new Error("No response text");

  } catch (error) {
    console.error("Error getting recommendation:", error);
    // Fallback if AI fails
    return {
      recommendedCookieId: availableCookies[0].id,
      reason: "Nossa IA está meditando. Mas este cookie é inegavelmente mágico."
    };
  }
};
