import { HTMLAttributes, forwardRef } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  glass?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ glass = false, className = '', children, ...props }, ref) => {
    const base = glass
      ? 'backdrop-blur-lg bg-white/5 border border-white/10 rounded-xl'
      : 'bg-navy/60 border border-white/10 rounded-xl';

    return (
      <div ref={ref} className={`${base} ${className}`} {...props}>
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
