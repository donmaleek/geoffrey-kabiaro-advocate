'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface Stat {
  value: number;
  suffix: string;
  label: string;
  description: string;
  icon: string;
}

const stats: Stat[] = [
  {
    value: 500,
    suffix: '+',
    label: 'Cases Won',
    description: 'Successful outcomes across all practice areas',
    icon: '⚖️',
  },
  {
    value: 15,
    suffix: '+',
    label: 'Years Experience',
    description: 'Deep expertise in Kenyan and East African law',
    icon: '🏛️',
  },
  {
    value: 98,
    suffix: '%',
    label: 'Success Rate',
    description: 'Industry-leading win rate across all matters',
    icon: '🎯',
  },
  {
    value: 1200,
    suffix: '+',
    label: 'Clients Served',
    description: 'Trusted by individuals, SMEs, and corporations',
    icon: '🤝',
  },
];

function AnimatedCounter({ value, suffix, duration = 2 }: { value: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const end = value;
    const steps = 60;
    const stepTime = (duration * 1000) / steps;
    const increment = end / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [inView, value, duration]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export function StatsCounter() {
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-midnight to-dark-navy border-y border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="p-6 rounded-2xl bg-white/3 border border-white/8 hover:border-gold/30 hover:bg-gold/5 transition-all duration-300 text-center">
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />

                <div className="relative">
                  <div className="text-3xl mb-3">{stat.icon}</div>
                  <div className="font-serif text-3xl lg:text-4xl font-bold text-gold mb-1">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="font-semibold text-white text-sm lg:text-base mb-1">
                    {stat.label}
                  </div>
                  <div className="text-xs text-gray-500 leading-relaxed hidden lg:block">
                    {stat.description}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
