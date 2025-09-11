
import { GoogleGenAI, Modality, GenerateContentResponse } from "@google/genai";
import { MOCKUP_PROMPTS, MODEL_ADVERTISING_PROMPTS } from '../constants/prompts';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const fileToGenerativePart = async (file: File) => {
    const base64EncodedDataPromise = new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
        reader.readAsDataURL(file);
    });
    return {
        inlineData: {
            data: await base64EncodedDataPromise,
            mimeType: file.type,
        },
    };
};

const generateContentWithRetry = async (
    params: any,
    retries = 2
): Promise<GenerateContentResponse> => {
    try {
        const response = await ai.models.generateContent(params);
        
        const candidate = response.candidates?.[0];

        if (!candidate) {
            const blockReason = response.promptFeedback?.blockReason;
            if (blockReason) {
                throw new Error(`Request was blocked by API. Reason: ${blockReason}`);
            }
            throw new Error("API returned no candidates in the response.");
        }
        
        if (candidate.finishReason && candidate.finishReason !== 'STOP') {
            throw new Error(`Image generation stopped prematurely. Reason: ${candidate.finishReason}.`);
        }
        
        const imagePart = candidate.content?.parts?.find(part => part.inlineData);
        if (!imagePart || !imagePart.inlineData) {
            const textPart = candidate.content?.parts?.find(part => part.text);
            if (textPart) {
                console.warn("Model returned text instead of an image:", textPart.text);
            }
            throw new Error("API call succeeded but returned no image data.");
        }

        return response;
    } catch (error) {
        if (retries > 0) {
            console.warn(`Image generation attempt failed, retrying... (${retries} attempts left). Error:`, error);
            await new Promise(resolve => setTimeout(resolve, 1000));
            return generateContentWithRetry(params, retries - 1);
        } else {
            console.error("Image generation failed after multiple retries.", error);
            throw error;
        }
    }
};

export const generateMockups = async (file: File): Promise<string[]> => {
    const imagePart = await fileToGenerativePart(file);
    const model = 'gemini-2.5-flash-image-preview';

    const generationPromises = MOCKUP_PROMPTS.map(prompt => {
        const uniquePrompt = `${prompt} (Style variation ID: ${Math.random()})`;
        const params = {
            model,
            contents: {
                parts: [
                    imagePart,
                    { text: uniquePrompt },
                ],
            },
            config: {
                responseModalities: [Modality.IMAGE, Modality.TEXT],
            },
        };
        return generateContentWithRetry(params);
    });

    const results = await Promise.allSettled(generationPromises);
    
    const imageUrls: string[] = [];
    results.forEach((result, index) => {
        if (result.status === 'fulfilled' && result.value) {
            const response = result.value;
            const imagePart = response.candidates?.[0]?.content?.parts?.find(part => part.inlineData);
            if (imagePart?.inlineData) {
                const { data: base64ImageBytes, mimeType } = imagePart.inlineData;
                imageUrls.push(`data:${mimeType};base64,${base64ImageBytes}`);
            } else {
                 console.warn(`Mockup generation for prompt ${index} unexpectedly returned no image after retries.`);
            }
        } else {
             console.error(`Mockup generation for prompt ${index} failed permanently:`, (result as PromiseRejectedResult).reason);
        }
    });

    if (imageUrls.length === 0) {
        throw new Error("AI was unable to generate any mockups. Please try again.");
    }

    return imageUrls;
};

export const generateModelAds = async (productFile: File, modelFile: File): Promise<string[]> => {
    const productPart = await fileToGenerativePart(productFile);
    const modelPart = await fileToGenerativePart(modelFile);
    const model = 'gemini-2.5-flash-image-preview';
    
    const generationPromises = MODEL_ADVERTISING_PROMPTS.map(prompt => {
        const uniquePrompt = `${prompt} (스타일 변형 ID: ${Math.random()})`;
        const params = {
            model,
            contents: {
                parts: [
                    productPart,
                    modelPart,
                    { text: uniquePrompt },
                ],
            },
            config: {
                responseModalities: [Modality.IMAGE, Modality.TEXT],
            },
        };
        return generateContentWithRetry(params);
    });

    const results = await Promise.allSettled(generationPromises);

    const imageUrls: string[] = [];
    results.forEach((result, index) => {
        if (result.status === 'fulfilled' && result.value) {
            const response = result.value;
            const imagePart = response.candidates?.[0]?.content?.parts?.find(part => part.inlineData);
            if (imagePart?.inlineData) {
                const { data: base64ImageBytes, mimeType } = imagePart.inlineData;
                imageUrls.push(`data:${mimeType};base64,${base64ImageBytes}`);
            } else {
                console.warn(`Model ad generation for prompt ${index} unexpectedly returned no image after retries.`);
            }
        } else {
            console.error(`Model ad generation for prompt ${index} failed permanently:`, (result as PromiseRejectedResult).reason);
        }
    });

    if (imageUrls.length === 0) {
        throw new Error("AI was unable to generate any model ads. Please try again.");
    }

    return imageUrls;
};
