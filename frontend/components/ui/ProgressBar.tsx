'use client';

import { motion } from 'framer-motion';

interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  className?: string;
  showLabel?: boolean;
}

export function ProgressBar({ value, max = 100, label, className = '', showLabel = false }: ProgressBarProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className={`w-full ${className}`}>
      {(label || showLabel) && (
        <div className="flex justify-between items-center mb-1.5">
          {label && <span className="text-sm text-gray-400">{label}</span>}
          {showLabel && (
            <span className="text-sm font-medium text-gold">{Math.round(percentage)}%</span>
          )}
        </div>
      )}
      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-gold-dark to-gold rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}
