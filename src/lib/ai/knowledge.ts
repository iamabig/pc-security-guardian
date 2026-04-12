import { neon } from '@neondatabase/serverless';

export interface ExpertPattern {
  category: string;
  pattern_name: string;
  pattern_description: string;
  diagnostic_logic: string;
  jules_context: string;
}

export async function getExpertContext(categories: string[]): Promise<string> {
  const sql = neon(process.env.DATABASE_URL!);

  const results = await sql`
    SELECT category, pattern_name, pattern_description, diagnostic_logic, jules_context
    FROM expert_knowledge
    WHERE category = ANY(${categories})
  `;

  return (results as unknown as ExpertPattern[]).map(p => `
    [${p.pattern_name}]
    Description: ${p.pattern_description}
    Diagnostic Logic: ${p.diagnostic_logic}
    Expert Guideline (Jules-Level): ${p.jules_context}
  `).join('\n\n');
}
