
import { GoogleGenAI, Type } from "@google/genai";

const API_KEY = process.env.API_KEY || "";

export const analyzeMealImage = async (base64Image: string) => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const model = "gemini-3-flash-preview";

  const prompt = "Analyze this food image and provide nutritional information in JSON format. Include name, estimated calories, protein (g), carbs (g), and fat (g).";

  const response = await ai.models.generateContent({
    model,
    contents: [
      {
        parts: [
          { inlineData: { mimeType: "image/jpeg", data: base64Image } },
          { text: prompt }
        ]
      }
    ],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          calories: { type: Type.NUMBER },
          protein: { type: Type.NUMBER },
          carbs: { type: Type.NUMBER },
          fat: { type: Type.NUMBER },
        },
        required: ["name", "calories", "protein", "carbs", "fat"]
      }
    }
  });

  return JSON.parse(response.text);
};

export const generateWorkoutPlan = async (goal: string, level: string, frequency: number) => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const model = "gemini-3-flash-preview";

  const prompt = `Generate a workout session for a user with goal: ${goal}, experience: ${level}, training ${frequency} times a week. Return as JSON.`;

  const response = await ai.models.generateContent({
    model,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          focalMuscles: { type: Type.STRING },
          duration: { type: Type.NUMBER },
          exercises: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                sets: { type: Type.NUMBER },
                reps: { type: Type.STRING },
                image: { type: Type.STRING, description: "Placeholder URL for exercise image" }
              }
            }
          }
        }
      }
    }
  });

  return JSON.parse(response.text);
};
