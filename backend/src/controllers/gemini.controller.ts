import { GoogleGenAI } from "@google/genai";
import { Request, Response } from "express";

export const geminiController = async (req: Request, res: Response) => {
  try {
    if (!process.env.GEMINI_API_KEY) {
      console.error("GEMINI_API_KEY is missing");
      return res.status(500).json({ error: "Server misconfiguration: API key missing" });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "give me 6 software engineering or coding related questions to ask in an interview, 2-2-2 easy,medium,hard format as json array",
      config: {
      thinkingConfig: {
        thinkingBudget: 0, // Disables thinking
      },
    } 
    });

    if (!response || !response.text) {
      console.error("AI returned empty response", response);
      return res.status(500).json({ error: "AI returned empty response" });
    }

    console.log("AI Response:", response.text);
    return res.json({ text: response.text });
  } catch (error: any) {
    console.error("Error generating content:", error?.message || error);
    return res.status(500).json({ error: "Error generating content", details: error?.message || error });
  }
};
