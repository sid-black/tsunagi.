
import { GoogleGenAI, GenerateContentResponse, Type, Modality } from "@google/genai";
import { GEMINI_MODELS } from "../constants";

// Fix: Use process.env.API_KEY directly without fallbacks as per guidelines
export const getGeminiAI = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

// Text generation with Search Grounding
export const getMarketInsights = async (query: string) => {
  const ai = getGeminiAI();
  const response = await ai.models.generateContent({
    model: GEMINI_MODELS.TEXT,
    contents: query,
    config: {
      tools: [{ googleSearch: {} }],
    },
  });
  
  return {
    text: response.text,
    sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
  };
};

// Image Editing (2.5 Flash Image)
export const editImage = async (base64Image: string, prompt: string) => {
  const ai = getGeminiAI();
  const response = await ai.models.generateContent({
    model: GEMINI_MODELS.IMAGE_EDIT,
    contents: {
      parts: [
        {
          inlineData: {
            data: base64Image.split(',')[1],
            mimeType: 'image/png',
          },
        },
        { text: prompt },
      ],
    },
  });

  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  return null;
};

// Video Generation (Veo)
export const animateThumbnail = async (base64Image: string, prompt: string, onStatus: (status: string) => void) => {
  // Fix: Create a new GoogleGenAI instance right before making an API call to ensure it always uses the most up-to-date API key
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  onStatus("Starting generation...");
  let operation = await ai.models.generateVideos({
    model: GEMINI_MODELS.VEO,
    prompt: prompt,
    image: {
      imageBytes: base64Image.split(',')[1],
      mimeType: 'image/png',
    },
    config: {
      numberOfVideos: 1,
      resolution: '720p',
      aspectRatio: '16:9'
    }
  });

  while (!operation.done) {
    onStatus("Model is imagining your video... This might take a minute.");
    await new Promise(resolve => setTimeout(resolve, 10000));
    operation = await ai.operations.getVideosOperation({ operation: operation });
  }

  const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
  if (!downloadLink) throw new Error("Video generation failed");
  
  const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
  const blob = await response.blob();
  return URL.createObjectURL(blob);
};
