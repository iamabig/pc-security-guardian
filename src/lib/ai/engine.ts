import { GoogleGenerativeAI } from "@google/generative-ai";
import { analyzeWithGroq } from "./groq";

export type AIEngine = 'gemini' | 'groq';

export interface AnalysisResult {
  explanation: string;
  riskLevel: 'safe' | 'warning' | 'critical';
  suggestions: string[];
}

export async function analyzeWithAI(
  engine: AIEngine,
  apiKey: string,
  commandOutput: string,
  context: string
): Promise<AnalysisResult> {
  if (engine === 'gemini') {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
      Expert Context (Jules-Level): ${context}

      Analyze the following command output for security threats, AI malfunctions, or network anomalies.
      Command Output:
      ${commandOutput}

      Respond in JSON format:
      {
        "explanation": "detailed explanation",
        "riskLevel": "safe | warning | critical",
        "suggestions": ["step1", "step2"]
      }
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    // Clean potential markdown code blocks
    const jsonStr = text.replace(/\`\`\`json/g, '').replace(/\`\`\`/g, '');
    return JSON.parse(jsonStr);
  } else if (engine === 'groq') {
    return analyzeWithGroq(apiKey, commandOutput, context);
  }

  throw new Error("Unsupported AI engine");
}
