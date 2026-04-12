"use client";

import React, { useState, useEffect } from 'react';

interface PacketMonitorProps {
  onSaveRequested: (size: number) => void;
}

export const PacketMonitor: React.FC<PacketMonitorProps> = ({ onSaveRequested }) => {
  const [currentSize, setCurrentSize] = useState(0);
  const [thresholds] = useState([100, 500, 1000]);
  const [lastNotified, setLastNotified] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSize(prev => {
        const next = prev + Math.random() * 5;
        const hitThreshold = thresholds.find(t => next >= t && lastNotified < t);
        if (hitThreshold) {
          onSaveRequested(hitThreshold);
          setLastNotified(hitThreshold);
        }
        return next;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, [lastNotified, onSaveRequested, thresholds]);

  return (
    <div className="glass-card p-6 neon-border-blue">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-display font-bold text-xl tracking-tight flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            LIVE TRAFFIC
          </h3>
          <p className="text-xs text-foreground/50 font-mono mt-1">SENTINEL-X MONITORING ACTIVE</p>
        </div>
        <div className="text-right">
          <span className="text-display text-4xl font-bold text-primary">
            {currentSize.toFixed(1)}
          </span>
          <span className="text-xs font-mono ml-1 text-primary/70">MB</span>
        </div>
      </div>

      <div className="space-y-4">
        {/* Animated HUD-style graph simulation */}
        <div className="h-24 w-full flex items-end gap-1 px-1 overflow-hidden">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="bg-primary/30 w-full rounded-t-sm transition-all duration-1000"
              style={{ height: `${Math.random() * 100}%`, opacity: 0.3 + (i / 30) * 0.7 }}
            ></div>
          ))}
        </div>

        <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
          <div
            className="bg-primary h-full transition-all duration-500 shadow-[0_0_10px_#8ff5ff]"
            style={{ width: `${(currentSize % 100) / 1}%` }}
          ></div>
        </div>

        <div className="flex justify-between text-[10px] font-mono text-foreground/40 uppercase tracking-widest">
          <span>0 MB</span>
          <span>Next Snapshot: 100 MB</span>
        </div>
      </div>
    </div>
  );
};
