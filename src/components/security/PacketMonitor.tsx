"use client";

import React, { useState, useEffect } from 'react';

interface PacketMonitorProps {
  onSaveRequested: (size: number) => void;
}

export const PacketMonitor: React.FC<PacketMonitorProps> = ({ onSaveRequested }) => {
  const [currentSize, setCurrentSize] = useState(0); // in MB
  const [thresholds] = useState([100, 500, 1000]);
  const [lastNotified, setLastNotified] = useState(0);

  useEffect(() => {
    // Simulated packet accumulation for demonstration
    const interval = setInterval(() => {
      setCurrentSize(prev => {
        const next = prev + Math.random() * 5; // Accumulate random traffic

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
    <div className="p-4 border rounded-lg bg-slate-900 text-white shadow-xl">
      <h3 className="text-xl font-bold mb-4 flex items-center">
        <span className="animate-pulse mr-2 h-3 w-3 bg-red-500 rounded-full"></span>
        Live Packet Monitoring
      </h3>
      <div className="flex flex-col gap-2">
        <div className="text-sm text-gray-400">Current Session Data:</div>
        <div className="text-3xl font-mono text-green-400">
          {currentSize.toFixed(2)} MB
        </div>
        <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden mt-2">
          <div
            className="bg-blue-500 h-full transition-all duration-500"
            style={{ width: `${(currentSize % 1000) / 10}%` }}
          ></div>
        </div>
        <p className="text-xs text-gray-500 mt-2 italic">
          * Notifications will trigger at 100MB, 500MB, and 1GB thresholds.
        </p>
      </div>
    </div>
  );
};
