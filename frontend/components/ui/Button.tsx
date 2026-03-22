'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', loading, className = '', children, disabled, ...props }, ref) => {
    const base =
      'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gold/50 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg';

    const variants = {
      primary:
        'bg-gold text-navy font-semibold hover:bg-gold-light active:bg-gold-dark shadow-lg shadow-gold/20 hover:shadow-gold/40',
      outline:
        'border border-gold/50 text-gold hover:bg-gold/10 hover:border-gold',
      ghost: 'text-white hover:bg-white/10',
      link: 'text-gold underline-offset-4 hover:underline p-0 h-auto',
    };

    const sizes = {
      sm: 'text-sm px-3 py-1.5 gap-1.5',
      md: 'text-sm px-4 py-2 gap-2',
      lg: 'text-base px-8 py-4 gap-2',
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: variant === 'link' ? 1 : 1.02 }}
        whileTap={{ scale: variant === 'link' ? 1 : 0.98 }}
        className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
        disabled={disabled || loading}
        {...(props as any)}
      >
        {loading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        )}
        {children}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
