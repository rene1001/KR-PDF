import React from 'react';
import { Loader2 } from 'lucide-react';

interface ProgressBarProps {
  percent: number;
  message: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ percent, message }) => {
  return (
    <div className="w-full max-w-md mx-auto my-8 p-6 rounded-2xl bg-white border border-slate-200 shadow-sm text-center">
      <div className="flex items-center justify-center gap-3 mb-4">
        <Loader2 className="w-5 h-5 text-emerald-600 animate-spin" />
        <span className="text-sm font-semibold text-slate-800">{message}</span>
      </div>

      <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden p-0.5">
        <div
          className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${Math.min(100, Math.max(5, percent))}%` }}
        />
      </div>

      <div className="mt-2 text-right">
        <span className="text-xs font-mono font-bold text-emerald-700">{percent}%</span>
      </div>
    </div>
  );
};
