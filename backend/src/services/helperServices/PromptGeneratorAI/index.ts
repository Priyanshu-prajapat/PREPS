import axios from "axios";

export function filterQuestions(text: string) {
    const regex = /\*\*(.*?)\*\*/g;
    let match;
    const result = [];
    while ((match = regex.exec(text)) !== null) {
        result.push(match[1]);
    }
    return result;
}

export async function generateQuestions(prompt: string) {
    try {
        console.log('loading...')
        const { data } = await axios.post(
            `${process.env.GEMINI_API_KEY}`,
            {
                contents: [
                    {
                        parts: [{ text: prompt }]
                    }
                ]
            }
        );
        const filteredData = filterQuestions(data.candidates[0].content.parts[0].text)
        return filteredData;
    } catch (error) {
        console.error("Error generating response:", error);
    }
};