import 'dotenv/config';
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

const getGeminiResponse = async (message) => {
    try {
        const interaction = await ai.interactions.create({
            model: "gemini-3.5-flash",
            input: message
        });

        return interaction.output_text;
    } catch (err) {
        if (err.status === 429) {
            throw new Error("Rate limit exceeded. Please wait a minute and try again.");
        }

        throw err;
    }
};
export { getGeminiResponse };