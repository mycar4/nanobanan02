
import { GoogleGenAI, Modality, type Part } from "@google/genai";
import type { EditedImageResult } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function editImageWithGemini(imagePart: Part, textPrompt: string): Promise<EditedImageResult> {
  try {
    const model = await ai.models.get({ model: "gemini-2.0-flash-exp" });
    const textPart = { text: textPrompt };

    const response = await (model as any).generateContent({
      contents: [{
        role: "user", 
        parts: [imagePart, textPart]
      }],
      config: {
        responseModalities: [Modality.IMAGE, Modality.TEXT],
      },
    });

    let imageUrl = '';
    let text = '';

    if (response.candidates && response.candidates.length > 0) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          const base64ImageBytes = part.inlineData.data;
          const mimeType = part.inlineData.mimeType;
          imageUrl = `data:${mimeType};base64,${base64ImageBytes}`;
        } else if (part.text) {
          text += part.text;
        }
      }
    }
    
    if (!imageUrl) {
        throw new Error("API did not return an image. The model may have refused the request.");
    }

    return { imageUrl, text };
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to edit image with Gemini. Check the console for more details.");
  }
}
