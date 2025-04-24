import { GoogleGenAI } from "@google/genai";

export const gemini = {
    ask: async (message, callback, onCompleted) => {
        try {
            const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GOOGLE_API_KEY });
            const id = crypto.randomUUID();
            const response = await ai.models.generateContentStream({
                model: "gemini-2.0-flash",
                contents: message,
                language: "en"
            })
            for await (const chunk of response) {
                if(chunk?.candidates?.[0]?.content?.parts?.[0]?.text) {
                    callback(chunk.candidates[0].content.parts[0].text, id)
                }
            }
            onCompleted(id)
        } catch (_error) {
            return null
        }
    }
}