import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateJobDescription = async (workType: string, location: string): Promise<string> => {
  if (!apiKey) return "API Key missing. Please provide a description manually.";
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Write a short, inviting, and clear job description (max 30 words) for an agricultural job. 
      Work Type: ${workType}. 
      Location: ${location}. 
      Target audience: Local farm workers.`,
    });
    return response.text || "No description generated.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Could not generate description automatically.";
  }
};

export const suggestEquipmentMaintenance = async (equipmentName: string): Promise<string> => {
    if (!apiKey) return "Maintenance tips unavailable.";

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Provide 3 short, bulleted maintenance tips for a farming ${equipmentName}. Keep it under 50 words total.`
        });
        return response.text || "No tips available.";
    } catch (error) {
        console.error("Gemini Error:", error);
        return "Maintenance tips unavailable.";
    }
}