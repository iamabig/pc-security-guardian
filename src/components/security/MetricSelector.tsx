"use client";

import React from 'react';

export type SecurityMetric = 'external_intrusion' | 'internal_bugs' | 'ai_malfunction' | 'data_contamination';

interface MetricSelectorProps {
  selectedMetrics: SecurityMetric[];
  onChange: (metrics: SecurityMetric[]) => void;
}

export const MetricSelector: React.FC<MetricSelectorProps> = ({ selectedMetrics, onChange }) => {
  const options: { id: SecurityMetric; label: string; desc: string }[] = [
    { id: 'external_intrusion', label: 'EXTERNAL INTRUSION', desc: 'CLOUD-TO-DEVICE ACCESS LOGS' },
    { id: 'internal_bugs', label: 'INTERNAL LOGIC BUGS', desc: 'SYSTEM INSTABILITY PATTERNS' },
    { id: 'ai_malfunction', label: 'AI RUNAWAY DETECTION', desc: 'RECURSIVE AGENT LOOP MONITOR' },
    { id: 'data_contamination', label: 'DATA CONTAMINATION', desc: 'DUMMY DATA & BUFFER ANALYSIS' }
  ];

  const toggleMetric = (id: SecurityMetric) => {
    if (selectedMetrics.includes(id)) {
      onChange(selectedMetrics.filter(m => m !== id));
    } else {
      onChange([...selectedMetrics, id]);
    }
  };

  return (
    <div className="glass-card p-6">
      <h4 className="font-display font-bold text-sm tracking-[0.2em] text-foreground/70 mb-6 uppercase">Analysis Focus Matrix</h4>
      <div className="space-y-3">
        {options.map(opt => (
          <div
            key={opt.id}
            onClick={() => toggleMetric(opt.id)}
            className={`group relative p-4 rounded-xl cursor-pointer transition-all duration-300 ${
              selectedMetrics.includes(opt.id)
              ? 'bg-primary/10 border-primary/30'
              : 'bg-white/5 border-transparent hover:bg-white/10'
            } border`}
          >
            <div className="flex items-center justify-between">
              <div>
                <span className={`font-display text-sm font-bold tracking-tight ${
                  selectedMetrics.includes(opt.id) ? 'text-primary' : 'text-foreground/80'
                }`}>
                  {opt.label}
                </span>
                <p className="text-[10px] text-foreground/40 font-mono tracking-wider mt-0.5">{opt.desc}</p>
              </div>
              <div className={`w-5 h-5 rounded flex items-center justify-center transition-all ${
                selectedMetrics.includes(opt.id) ? 'bg-primary text-background shadow-neon-blue' : 'bg-white/10'
              }`}>
                {selectedMetrics.includes(opt.id) && (
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
            </div>
            {selectedMetrics.includes(opt.id) && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-2/3 bg-primary rounded-r-full"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
