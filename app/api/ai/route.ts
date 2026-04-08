// // app/api/generate-food-art/route.ts
// import { GoogleGenAI } from "@google/genai";
// import { NextRequest, NextResponse } from "next/server";

// const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// export async function POST(req: NextRequest) {
//   try {
//     const { prompt } = await req.json();

//     if (!prompt) {
//       return NextResponse.json(
//         { error: "Please provide a prompt." },
//         { status: 400 },
//       );
//     }

//     console.log("API Key exists:", !!process.env.GEMINI_API_KEY);
//     console.log("Prompt:", prompt);

//     const result = await ai.models.generateImages({
//       model: "gemini-2.5-flash",
//       prompt,
//       config: { numberOfImages: 1 },
//     });

//     console.log("Result:", JSON.stringify(result, null, 2));

//     const base64Image = result?.generatedImages?.[0]?.image?.imageBytes;

//     if (!base64Image) {
//       throw new Error("No image data returned.");
//     }

//     return NextResponse.json({ success: true, prompt, imageB64: base64Image });
//   } catch (error: any) {
//     console.error("Full error:", error);
//     return NextResponse.json(
//       { error: "Internal Server Error", details: error.message },
//       { status: 500 },
//     );
//   }
// }

import { GoogleGenAI } from "@google/genai";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY!,
    });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-image-preview",
      contents: prompt,
    });

    let image = null;

    for (const part of response?.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        image = part.inlineData.data;
      }
    }

    return Response.json({ image });
  } catch (error) {
    console.error(error);

    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}
