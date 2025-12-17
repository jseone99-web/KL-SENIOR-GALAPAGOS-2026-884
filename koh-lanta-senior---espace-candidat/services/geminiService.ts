import { GoogleGenAI, Type } from "@google/genai";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Analyzes the candidate's motivation letter and provides feedback using JSON schema.
 */
export const analyzeMotivation = async (text: string): Promise<{ score: number; advice: string }> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Tu es le directeur de casting de Koh Lanta Senior. Analyse cette lettre de motivation d'un candidat âgé : "${text}". Donne un score sur 100 pour l'esprit d'aventure et un conseil court pour améliorer la candidature.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.NUMBER, description: "Score sur 100" },
            advice: { type: Type.STRING, description: "Conseil constructif" }
          },
          required: ["score", "advice"]
        }
      }
    });

    const jsonText = response.text;
    if (jsonText) {
      return JSON.parse(jsonText);
    }
    return { score: 0, advice: "Erreur d'analyse." };
  } catch (error) {
    console.error("Error analyzing motivation:", error);
    return { score: 50, advice: "Impossible d'analyser pour le moment. Vérifiez votre connexion." };
  }
};

/**
 * Generates a welcoming message from the "Host".
 */
export const generateHostMessage = async (name: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Génère un message d'accueil très court (1 phrase) de la part de Denis Brogniart pour le candidat ${name} qui vient compléter son dossier pour Koh Lanta Senior. Ton solennel et encourageant.`,
    });
    return response.text || "Bienvenue aventurier.";
  } catch (e) {
    return `Bienvenue ${name}, la tribu vous attend.`;
  }
}