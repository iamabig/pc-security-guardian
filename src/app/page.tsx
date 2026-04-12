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
    const timestamp = new Date().toLocaleString();
    const confirmed = window.confirm(`[보안 알림] 세션 데이터가 ${size}MB에 도달했습니다. 분석용으로 저장할까요?`);
    if (confirmed) {
      setSaveHistory(prev => [...prev, { timestamp, size }]);
      alert(`데이터 ${size}MB가 안전하게 보관되었습니다. 분석을 시작할 수 있습니다.`);
    }
  };

  const runAnalysis = async () => {
    if (!aiKey) {
      alert("AI API 키를 입력해주세요 (Gemini/Groq)");
      return;
    }

    setIsAnalyzing(true);
    try {
      // 1. Fetch Expert Context from Neon
      const context = await getExpertContext(['Network', 'AI_Safety', 'System']);

      // 2. Simulate Command Execution (e.g., netstat)
      const mockOutput = "Active Connections: TCP 127.0.0.1:22 ESTABLISHED, PID: 4022 (idx-agent). Traffic Spike: 150MB in 2s.";

      // 3. Run AI Analysis
      const result = await analyzeWithAI(engine, aiKey, mockOutput, context);
      setLastAnalysis(result);
    } catch (error) {
      console.error(error);
      alert("분석 중 오류가 발생했습니다.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <header className="flex justify-between items-center border-b pb-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900">Security Command Center</h1>
            <p className="text-gray-500 italic">Jules-Level Expert Analysis Integrated</p>
          </div>
          <div className="flex gap-4">
            <select
              value={engine}
              onChange={(e) => setEngine(e.target.value as AIEngine)}
              className="border rounded p-2 text-sm bg-white"
            >
              <option value="gemini">Gemini Engine</option>
              <option value="groq">Groq Engine (Pending)</option>
            </select>
            <input
              type="password"
              placeholder="Enter API Key"
              value={aiKey}
              onChange={(e) => setAiKey(e.target.value)}
              className="border rounded p-2 text-sm w-48"
            />
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Monitor and Metrics */}
          <div className="lg:col-span-1 space-y-6">
            <PacketMonitor onSaveRequested={handleSaveRequest} />
            <MetricSelector selectedMetrics={selectedMetrics} onChange={setSelectedMetrics} />

            <div className="bg-white p-4 border rounded-lg shadow-sm">
              <h4 className="font-bold mb-2">Stored Snapshots</h4>
              {saveHistory.length === 0 ? (
                <p className="text-xs text-gray-400">저장된 데이터 스냅샷이 없습니다.</p>
              ) : (
                <ul className="text-xs space-y-1">
                  {saveHistory.map((h, i) => (
                    <li key={i} className="flex justify-between border-b py-1">
                      <span>{h.timestamp}</span>
                      <span className="font-mono text-blue-600">{h.size}MB</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Right: AI Analysis Dashboard */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 border rounded-lg shadow-sm min-h-[400px]">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">AI Security Intelligence</h2>
                <button
                  onClick={runAnalysis}
                  disabled={isAnalyzing}
                  className={`px-6 py-2 rounded-lg font-bold text-white ${
                    isAnalyzing ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  {isAnalyzing ? 'Analyzing Patterns...' : 'Run Global Analysis'}
                </button>
              </div>

              {lastAnalysis ? (
                <div className="space-y-4">
                  <div className={`p-4 rounded-lg border-l-4 ${
                    lastAnalysis.riskLevel === 'critical' ? 'bg-red-50 border-red-500' :
                    lastAnalysis.riskLevel === 'warning' ? 'bg-yellow-50 border-yellow-500' :
                    'bg-green-50 border-green-500'
                  }`}>
                    <h3 className="font-bold text-lg mb-1 flex items-center">
                      Risk Level:
                      <span className={`ml-2 uppercase ${
                        lastAnalysis.riskLevel === 'critical' ? 'text-red-600' :
                        lastAnalysis.riskLevel === 'warning' ? 'text-yellow-600' :
                        'text-green-600'
                      }`}>
                        {lastAnalysis.riskLevel}
                      </span>
                    </h3>
                    <p className="text-gray-700 leading-relaxed">{lastAnalysis.explanation}</p>
                  </div>

                  <div>
                    <h4 className="font-bold mb-2 flex items-center">
                      <svg className="w-4 h-4 mr-1 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293l-4-4a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-2.293 2.293a1 1 0 001.414 1.414l4-4a1 1 0 000-1.414z" />
                      </svg>
                      Jules Expert Recommendations
                    </h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                      {lastAnalysis.suggestions.map((s, i) => (
                        <li key={i}>{s}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-gray-300">
                  <svg className="w-16 h-16 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <p>데이터 스냅샷을 선택하고 분석을 시작하세요.</p>
                </div>
              )}
            </div>

            <div className="bg-blue-900 p-4 rounded-lg text-blue-100 text-xs flex gap-3 items-center">
              <span className="p-2 bg-blue-800 rounded">💡</span>
              <p>
                <b>Expert Tip:</b> 네트워크 부하가 100MB를 초과할 경우 &quot;Internal Logic Bugs&quot; 지표를 활성화하여
                응용 프로그램의 비정상적인 데이터 루프를 점검하는 것이 좋습니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
