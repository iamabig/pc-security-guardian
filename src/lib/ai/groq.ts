export async function analyzeWithGroq(
  apiKey: string,
  commandOutput: string,
  context: string
) {
  const prompt = `
    Expert Context (Jules-Level): ${context}

    Task: Analyze the following network/system data for bugs, AI malfunctions, or external intrusion.
    Data: ${commandOutput}

    Format: JSON only.
    {
      "explanation": "...",
      "riskLevel": "safe|warning|critical",
      "suggestions": ["..."]
    }
  `;

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "mixtral-8x7b-32768",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" }
    })
  });

  if (!response.ok) throw new Error("Groq API Error");
  const data = await response.json();
  return JSON.parse(data.choices[0].message.content);
}
