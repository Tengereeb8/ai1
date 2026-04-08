import { GoogleGenAI } from "@google/genai";

const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

export async function geminiTextToImage(prompt: string) {
  const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

  const defaultPromt = `create image: ${prompt}`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-image",
    contents: defaultPromt,
  });

  for (const part of response?.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      const imageData = part.inlineData.data;
      return `data:image/png;base64,${imageData}`;
    }
  }
  return null;
}
