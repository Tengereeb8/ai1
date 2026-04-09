import { GoogleGenAI } from "@google/genai";

const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

export async function geminiTextToText(prompt: string) {
  const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

  const defaultPromt = `Suggest me a food that i can make with these ingredients: ${prompt}. Just give text. 3-4 points and simple steps. Give it in text format`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: defaultPromt,
  });

  return (
    response.candidates?.[0]?.content?.parts?.[0]?.text ?? "Could not make food"
  );
}
