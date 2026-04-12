# Security Command Center Architecture (Phase 1)

## 1. Data Flow & Privacy
- **Local Device Operation**: All diagnostic tasks (netstat, tasklist, etc.) are executed within the user's device context.
- **Zero-Storage of API Keys**: AI API keys (Gemini/Groq) are entered by the user in the UI and held only in memory (or optionally encrypted LocalStorage). They are NEVER sent to our database.
- **Expert Context Injection**: Jules-level security guidelines are fetched from a hosted **Neon Database** and injected into the AI prompt to ensure high-quality analysis.

## 2. Threshold-Based Management
- The system monitors data volume and interrupts at 100MB, 500MB, and 1GB intervals.
- This ensures users are not overwhelmed and provides discrete "checkpoints" for security analysis.

## 3. Threat Matrix
- **External Intrusion**: Focuses on cloud-to-device connections (e.g., Project IDX).
- **Internal Bugs**: Detects software-level instability.
- **AI Malfunction**: Monitors for recursive agent loops or abnormal payload spikes.
- **Data Contamination**: Identifies virus-like dummy data or corrupted buffers.

## 4. Technology Stack
- **Frontend**: Next.js 14, TailwindCSS
- **Database**: Neon (Serverless Postgres)
- **AI**: Gemini Pro / Groq (Mixtral)
- **Expert Knowledge**: Pre-seeded pattern library in Neon.
