"use client";

import React, { useState } from 'react';
import { PacketMonitor } from '@/components/security/PacketMonitor';
import { MetricSelector, SecurityMetric } from '@/components/security/MetricSelector';
import { analyzeWithAI, AIEngine, AnalysisResult } from '@/lib/ai/engine';
import { getExpertContext } from '@/lib/ai/knowledge';

export default function CommandCenter() {
  const [selectedMetrics, setSelectedMetrics] = useState<SecurityMetric[]>(['external_intrusion', 'ai_malfunction']);
  const [aiKey, setAiKey] = useState('');
  const [engine, setEngine] = useState<AIEngine>('gemini');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [lastAnalysis, setLastAnalysis] = useState<AnalysisResult | null>(null);
  const [saveHistory, setSaveHistory] = useState<{timestamp: string, size: number}[]>([]);

  const handleSaveRequest = (size: number) => {
    const timestamp = new Date().toLocaleTimeString();
    setSaveHistory(prev => [...prev, { timestamp, size }]);
  };

  const runAnalysis = async () => {
    if (!aiKey) return alert("API KEY REQUIRED");
    setIsAnalyzing(true);
    try {
      const context = await getExpertContext(['Network', 'AI_Safety', 'System']);
      const mockOutput = "SENTINEL_SCAN: TCP/22 established from Google-Cloud-IDX. Payload entropy detected anomalous patterns. CPU Spike: 88%.";
      const result = await analyzeWithAI(engine, aiKey, mockOutput, context);
      setLastAnalysis(result);
    } catch (error) {
      console.error(error);
      alert("ANALYSIS ERROR");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background selection:bg-primary/30 text-foreground overflow-x-hidden">
      {/* Background HUD Decor */}
      <div className="fixed inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
        <div className="absolute top-[20%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-primary/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-8">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-display text-4xl font-bold tracking-tight mb-2">
              SENTINEL <span className="text-primary">COMMAND</span>
            </h1>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-tertiary/10 border border-tertiary/20 text-tertiary text-[10px] font-mono font-bold uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse"></span>
                System Secure
              </span>
              <span className="text-foreground/40 text-[10px] font-mono tracking-widest uppercase">Expert Agent Jules Active</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex bg-surface-low rounded-xl border border-white/5 p-1">
              <button
                onClick={() => setEngine('gemini')}
                className={`px-4 py-1.5 rounded-lg text-[10px] font-bold transition-all ${engine === 'gemini' ? 'bg-primary text-background shadow-neon-blue' : 'text-foreground/50 hover:text-foreground'}`}
              >
                GEMINI 1.5
              </button>
              <button
                onClick={() => setEngine('groq')}
                className={`px-4 py-1.5 rounded-lg text-[10px] font-bold transition-all ${engine === 'groq' ? 'bg-primary text-background shadow-neon-blue' : 'text-foreground/50 hover:text-foreground'}`}
              >
                GROQ/MIXTRAL
              </button>
            </div>
            <input
              type="password"
              placeholder="SECRET_API_KEY"
              value={aiKey}
              onChange={(e) => setAiKey(e.target.value)}
              className="hud-input px-4 py-2.5 w-56 text-xs font-mono"
            />
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column (Monitor & Config) */}
          <div className="lg:col-span-4 space-y-8">
            <PacketMonitor onSaveRequested={handleSaveRequest} />
            <MetricSelector selectedMetrics={selectedMetrics} onChange={setSelectedMetrics} />

            <div className="glass-card p-6">
              <h4 className="font-display font-bold text-sm tracking-widest text-foreground/50 mb-4 uppercase">Capture Logs</h4>
              <div className="space-y-3 max-h-40 overflow-y-auto custom-scrollbar">
                {saveHistory.length === 0 ? (
                  <div className="text-[10px] font-mono text-foreground/20 text-center py-8 italic uppercase tracking-tighter">No active captures found</div>
                ) : (
                  saveHistory.slice().reverse().map((h, i) => (
                    <div key={i} className="flex justify-between items-center p-3 rounded-lg bg-white/5 border border-white/5">
                      <div>
                        <span className="text-[10px] font-mono text-foreground/40">{h.timestamp}</span>
                        <div className="text-xs font-bold text-primary-container">SNAPSHOT_CAPTURED</div>
                      </div>
                      <span className="text-xs font-mono bg-primary/20 text-primary px-2 py-0.5 rounded">{h.size}MB</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Right Column (AI Insights) */}
          <div className="lg:col-span-8 space-y-8">
            <div className="glass-card p-8 min-h-[600px] flex flex-col relative overflow-hidden">
              {/* Scan Decoration */}
              <div className={`absolute top-0 left-0 w-full h-0.5 bg-primary/40 shadow-[0_0_15px_#8ff5ff] z-10 ${isAnalyzing ? 'animate-scan' : 'hidden'}`}></div>

              <div className="flex justify-between items-center mb-10">
                <div>
                  <h2 className="text-display text-2xl font-bold tracking-tight">AI SECURITY INTELLIGENCE</h2>
                  <p className="text-xs font-mono text-foreground/40 mt-1 uppercase tracking-widest">Cross-referencing Expert Knowledge</p>
                </div>
                <button
                  onClick={runAnalysis}
                  disabled={isAnalyzing}
                  className={`relative group px-8 py-3 rounded-xl font-display font-bold text-sm tracking-wider transition-all ${
                    isAnalyzing ? 'bg-white/5 text-foreground/20' : 'bg-primary text-background hover:scale-105 active:scale-95 shadow-neon-blue'
                  }`}
                >
                  {isAnalyzing ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      SCANNING...
                    </span>
                  ) : 'RUN GLOBAL SCAN'}
                </button>
              </div>

              {lastAnalysis ? (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <div className={`p-6 rounded-2xl border-l-4 ${
                    lastAnalysis.riskLevel === 'critical' ? 'bg-error/10 border-error neon-border-red' :
                    lastAnalysis.riskLevel === 'warning' ? 'bg-yellow-500/10 border-yellow-500' :
                    'bg-tertiary/10 border-tertiary'
                  }`}>
                    <div className="flex items-center gap-3 mb-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                        lastAnalysis.riskLevel === 'critical' ? 'bg-error text-white' :
                        lastAnalysis.riskLevel === 'warning' ? 'bg-yellow-500 text-background' :
                        'bg-tertiary text-background'
                      }`}>
                        {lastAnalysis.riskLevel} threat
                      </span>
                    </div>
                    <p className="text-lg leading-relaxed text-foreground font-medium">
                      {lastAnalysis.explanation}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="glass-card p-6 bg-white/5">
                      <h4 className="font-display font-bold text-xs tracking-widest text-primary mb-4 flex items-center gap-2 uppercase">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293l-4-4a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-2.293 2.293a1 1 0 001.414 1.414l4-4a1 1 0 000-1.414z" />
                        </svg>
                        Jules Countermeasures
                      </h4>
                      <ul className="space-y-3">
                        {lastAnalysis.suggestions.map((s, i) => (
                          <li key={i} className="flex gap-3 text-xs text-foreground/70 leading-relaxed">
                            <span className="text-primary font-mono shrink-0">0{i+1}.</span>
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="glass-card p-6 bg-white/5 border-white/10">
                      <h4 className="font-display font-bold text-xs tracking-widest text-foreground/40 mb-4 uppercase">System Impact</h4>
                      <div className="space-y-4">
                        <div className="flex justify-between items-end">
                          <span className="text-[10px] font-mono text-foreground/50">CPU LOAD</span>
                          <span className="text-xs font-bold">88%</span>
                        </div>
                        <div className="w-full bg-white/5 h-1.5 rounded-full">
                          <div className="bg-error h-full rounded-full w-[88%] shadow-[0_0_8px_#ff716c]"></div>
                        </div>
                        <div className="flex justify-between items-end">
                          <span className="text-[10px] font-mono text-foreground/50">LATENCY</span>
                          <span className="text-xs font-bold text-tertiary">24 MS</span>
                        </div>
                        <div className="w-full bg-white/5 h-1.5 rounded-full">
                          <div className="bg-tertiary h-full rounded-full w-[24%] shadow-[0_0_8px_#8eff71]"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-foreground/10 py-20">
                  <div className="relative mb-6">
                    <svg className="w-32 h-32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full"></div>
                  </div>
                  <p className="font-display font-bold text-sm tracking-[0.3em] uppercase">Ready for Deep Scan</p>
                  <p className="text-[10px] font-mono mt-2 tracking-widest opacity-40 uppercase">Awaiting Data Snapshot or User API Key</p>
                </div>
              )}

              {/* Footer Tip */}
              <div className="mt-auto pt-8 border-t border-white/5 flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                   <span className="text-primary text-xs italic">i</span>
                </div>
                <p className="text-[10px] font-mono text-foreground/40 leading-relaxed uppercase tracking-tighter">
                  <b>Expert Advisory:</b> 지속적인 대량 데이터 유입(100MB+) 발생 시,
                  <span className="text-primary"> AI Runaway</span> 프로필을 활성화하여 비정상적인 프로세스 루프를 조기에 차단하십시오.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes scan {
          0% { top: 0; }
          100% { top: 100%; }
        }
        .animate-scan {
          animation: scan 3s linear infinite;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(143, 245, 255, 0.2);
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}
