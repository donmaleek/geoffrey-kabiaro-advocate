'use client';

import { useEffect, useRef, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { LegalHealthChecker } from '@/components/LegalHealthChecker';
import { CaseValuationTool } from '@/components/CaseValuationTool';
import { VideoCarousel } from '@/components/VideoCarousel';
import { StatsCounter } from '@/components/StatsCounter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import Link from 'next/link';

// Deterministic star positions — seeded so SSR and client match
function generateStars(count: number) {
  const stars = [];
  // Simple LCG pseudo-random with fixed seed
  let seed = 42;
  const rand = () => { seed = (seed * 1664525 + 1013904223) & 0xffffffff; return (seed >>> 0) / 0xffffffff; };
  for (let i = 0; i < count; i++) {
    stars.push({
      id: i,
      x: rand() * 100,
      y: rand() * 100,
      size: rand() * 2 + 0.5,
      opacity: rand() * 0.7 + 0.3,
      duration: rand() * 4 + 2,
      delay: rand() * 5,
    });
  }
  return stars;
}

export default function Home() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  const stars = useMemo(() => generateStars(180), []);

  return (
    <>
      {/* Hero Section — Starfield */}
      <section className="relative h-screen overflow-hidden bg-midnight">
        {/* Static gradient base */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#04080f] via-[#070D18] to-[#0A1929]" />

        {/* Subtle gold nebula glows */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-gold/3 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-blue-500/4 blur-[100px] pointer-events-none" />

        {/* Stars */}
        <div className="absolute inset-0 overflow-hidden">
          {stars.map((star) => (
            <motion.div
              key={star.id}
              className="absolute rounded-full bg-white"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
              }}
              animate={{ opacity: [star.opacity * 0.4, star.opacity, star.opacity * 0.4] }}
              transition={{ duration: star.duration, delay: star.delay, repeat: Infinity, ease: 'easeInOut' }}
            />
          ))}
          {/* A handful of gold stars */}
          {stars.slice(0, 12).map((star) => (
            <motion.div
              key={`gold-${star.id}`}
              className="absolute rounded-full bg-gold"
              style={{
                left: `${(star.x + 30) % 100}%`,
                top: `${(star.y + 20) % 100}%`,
                width: `${star.size * 0.8}px`,
                height: `${star.size * 0.8}px`,
              }}
              animate={{ opacity: [0.1, 0.5, 0.1] }}
              transition={{ duration: star.duration + 1, delay: star.delay + 1, repeat: Infinity, ease: 'easeInOut' }}
            />
          ))}
        </div>

        {/* Hero content */}
        <motion.div
          style={{ opacity, scale }}
          className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 text-gold text-sm font-medium mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
            Advocate of the High Court of Kenya · Est. 2017
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
          >
            Legal Certainty
            <br />
            <span className="text-gold">in a Digital Age</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mb-10"
          >
            Award-winning legal services combining traditional expertise
            with cutting-edge technology. Serving Kenya&apos;s most discerning clients.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link href="/consultation">
              <Button size="lg" variant="primary">Book Consultation</Button>
            </Link>
            <a href="#legal-health">
              <Button size="lg" variant="outline">Assess Your Legal Health</Button>
            </a>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-12 flex flex-wrap justify-center gap-6 text-xs text-gray-500"
          >
            {['LSK Member No. 5821', 'Legal 500 East Africa', '15+ Years at the Bar', 'KDPA Compliant'].map((badge) => (
              <span key={badge} className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-gold/60" />
                {badge}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7-7-7m14-6l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <StatsCounter />

      {/* Interactive Tools Section */}
      <section id="legal-health" className="py-20 px-4 bg-gradient-to-b from-dark-navy to-midnight">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
              Smart Tools for <span className="text-gold">Legal Clarity</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Get instant insights about your legal position with our AI-powered tools
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <LegalHealthChecker />
            <CaseValuationTool />
          </div>
        </div>
      </section>

      {/* Practice Areas */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
              Areas of <span className="text-gold">Expertise</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Specialized legal services delivered with precision and excellence
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {practiceAreas.map((area, index) => (
              <motion.div
                key={area.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 text-center hover:transform hover:-translate-y-2 transition-all duration-300">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gold/10 rounded-full flex items-center justify-center">
                    {area.icon}
                  </div>
                  <h3 className="font-serif text-2xl font-bold mb-3">{area.title}</h3>
                  <p className="text-gray-300 mb-4">{area.description}</p>
                  <Button variant="link" className="text-gold">
                    Learn More →
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Precedent Database */}
      <section className="py-20 px-4 bg-gradient-to-b from-midnight to-dark-navy">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
              Legal Insights <span className="text-gold">Video Library</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Expert analysis of complex legal topics in under 2 minutes
            </p>
          </motion.div>
          
          <VideoCarousel />
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 px-4 relative overflow-hidden bg-midnight">
        {/* Coat of arms watermark */}
        <div
          className="absolute inset-0 bg-center bg-no-repeat bg-cover pointer-events-none"
          style={{ backgroundImage: "url('/court-of-arm.png')", opacity: 0.08 }}
        />
        {/* Gold gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-midnight via-transparent to-midnight pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-midnight via-transparent to-midnight pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 text-gold text-sm font-medium mb-8">
              <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
              Serving Kenya since 2017
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
              Ready to Secure Your <span className="text-gold">Legal Position?</span>
            </h2>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Join Kenya&apos;s most discerning clients who trust us with their most important legal matters.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/consultation">
                <Button size="lg" variant="primary">Schedule Consultation</Button>
              </Link>
              <a href="https://wa.me/254792530464">
                <Button size="lg" variant="outline">WhatsApp Us Now</Button>
              </a>
            </div>
            <p className="text-sm text-gray-500 mt-8">
              ⚡ Same-day responses &nbsp;·&nbsp; 🔒 Confidential &nbsp;·&nbsp; 💳 M-Pesa accepted
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}

const practiceAreas = [
  {
    title: "Corporate & Commercial",
    description: "Expert guidance for businesses, from startups to established corporations. Mergers, acquisitions, and regulatory compliance.",
    icon: "🏢"
  },
  {
    title: "Land & Property",
    description: "Resolving land disputes, conducting due diligence, and navigating Kenya's complex land laws.",
    icon: "🏠"
  },
  {
    title: "Family & Wealth",
    description: "Protecting your legacy through succession planning, trusts, and family law representation.",
    icon: "👨‍👩‍👧‍👦"
  },
  {
    title: "Employment Law",
    description: "Employment contracts, dispute resolution, and compliance with Kenya's employment regulations.",
    icon: "💼"
  },
  {
    title: "Litigation",
    description: "Aggressive representation in civil and commercial disputes across all Kenyan courts.",
    icon: "⚖️"
  },
  {
    title: "Tech & IP",
    description: "Protecting innovation through patents, trademarks, and technology law expertise.",
    icon: "💻"
  }
];