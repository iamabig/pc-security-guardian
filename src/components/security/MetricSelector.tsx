"use client";

import React from 'react';

export type SecurityMetric = 'external_intrusion' | 'internal_bugs' | 'ai_malfunction' | 'data_contamination';

interface MetricSelectorProps {
  selectedMetrics: SecurityMetric[];
  onChange: (metrics: SecurityMetric[]) => void;
}

export const MetricSelector: React.FC<MetricSelectorProps> = ({ selectedMetrics, onChange }) => {
  const options: { id: SecurityMetric; label: string; desc: string }[] = [
    { id: 'external_intrusion', label: 'External Intrusion (IDX/Cloud)', desc: 'Monitor unauthorized cloud-to-device access.' },
    { id: 'internal_bugs', label: 'Internal Logic Bugs', desc: 'Detect system instability or application errors.' },
    { id: 'ai_malfunction', label: 'AI Malfunction/Runaway', desc: 'Monitor for recursive AI agent loops or data spikes.' },
    { id: 'data_contamination', label: 'Data Contamination', desc: 'Identify virus-like dummy data or corrupted buffers.' }
  ];

  const toggleMetric = (id: SecurityMetric) => {
    if (selectedMetrics.includes(id)) {
      onChange(selectedMetrics.filter(m => m !== id));
    } else {
      onChange([...selectedMetrics, id]);
    }
  };

  return (
    <div className="p-4 border rounded-lg bg-white shadow-md">
      <h4 className="font-bold text-lg mb-3">Analysis Focus Metrics</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {options.map(opt => (
          <div
            key={opt.id}
            onClick={() => toggleMetric(opt.id)}
            className={`p-3 border rounded-md cursor-pointer transition-colors ${
              selectedMetrics.includes(opt.id)
              ? 'bg-blue-50 border-blue-500 ring-1 ring-blue-500'
              : 'hover:bg-gray-50 border-gray-200'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold text-sm">{opt.label}</span>
              <input
                type="checkbox"
                checked={selectedMetrics.includes(opt.id)}
                readOnly
                className="rounded text-blue-600"
              />
            </div>
            <p className="text-xs text-gray-500">{opt.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
