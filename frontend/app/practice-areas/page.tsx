'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08 },
  }),
};

const areas = [
  {
    id: 'corporate',
    icon: '🏢',
    title: 'Corporate & Commercial',
    tagline: 'Building businesses on solid legal foundations.',
    description:
      'From incorporation to exit, we advise businesses at every stage of their lifecycle. Whether you are structuring a joint venture, negotiating a major supply contract, or navigating regulatory compliance, our corporate practice delivers the clarity and precision your business demands.',
    services: [
      'Company incorporation & restructuring',
      'Mergers, acquisitions & due diligence',
      'Shareholder agreements & board governance',
      'Commercial contracts & negotiations',
      'Regulatory compliance & licensing',
      'Foreign direct investment advisory',
      'Business sale & succession planning',
    ],
    stat: { value: '200+', label: 'Commercial Transactions' },
    color: 'from-blue-500/10 to-blue-600/5',
    border: 'hover:border-blue-500/30',
  },
  {
    id: 'land',
    icon: '🏠',
    title: 'Land & Property',
    tagline: 'Protecting what is rightfully yours.',
    description:
      'Land fraud is Kenya\'s single most common legal crisis. We conduct exhaustive due diligence, resolve disputes at every level — from tribunals to the Court of Appeal — and ensure your property transactions are watertight. In a country where boundaries can cost fortunes, precision is not optional.',
    services: [
      'Title deed searches & verification',
      'Land purchase & transfer transactions',
      'Boundary dispute resolution',
      'Adverse possession & encroachment',
      'Environmental & zoning compliance',
      'Real estate development agreements',
      'Caution & injunction applications',
    ],
    stat: { value: '150+', label: 'Land Disputes Resolved' },
    color: 'from-emerald-500/10 to-emerald-600/5',
    border: 'hover:border-emerald-500/30',
  },
  {
    id: 'family',
    icon: '👨‍👩‍👧',
    title: 'Family & Wealth',
    tagline: 'Securing your legacy across generations.',
    description:
      'Family wealth is hard-built and easily lost without proper legal structures. We handle succession planning, estate administration, and family disputes with the sensitivity they require and the firmness they demand. Your family\'s financial security is a legal matter — not a chance one.',
    services: [
      'Will drafting & estate planning',
      'Grant of probate & letters of administration',
      'Trust formation & management',
      'Matrimonial property disputes',
      'Divorce & separation proceedings',
      'Child custody & guardianship',
      'Family business succession',
    ],
    stat: { value: '300+', label: 'Estates Administered' },
    color: 'from-pink-500/10 to-pink-600/5',
    border: 'hover:border-pink-500/30',
  },
  {
    id: 'employment',
    icon: '💼',
    title: 'Employment Law',
    tagline: 'Fair outcomes for employers and employees alike.',
    description:
      'Kenya\'s Employment Act creates precise obligations on both sides of the employment relationship. Whether you are an employer building HR compliance frameworks or an employee challenging unfair dismissal, we bring the same rigour to your matter.',
    services: [
      'Employment contract drafting & review',
      'Unfair & constructive dismissal claims',
      'Redundancy & retrenchment advisory',
      'Workplace discrimination & harassment',
      'COTU & FKE negotiations',
      'NSSF & NHIF compliance',
      'HR policy frameworks',
    ],
    stat: { value: '95%', label: 'Employment Tribunal Success Rate' },
    color: 'from-amber-500/10 to-amber-600/5',
    border: 'hover:border-amber-500/30',
  },
  {
    id: 'litigation',
    icon: '⚖️',
    title: 'Litigation & Dispute Resolution',
    tagline: 'Fearless advocacy in every forum.',
    description:
      'When negotiation fails, you need a litigator who is as comfortable in front of the Supreme Court as they are at the magistrate\'s bench. We bring meticulous preparation and unflinching advocacy to commercial disputes, judicial reviews, and constitutional matters.',
    services: [
      'High Court civil & commercial litigation',
      'Court of Appeal & Supreme Court matters',
      'Judicial review applications',
      'Arbitration & mediation',
      'Debt recovery & enforcement',
      'Injunctions & urgent relief',
      'Constitutional petitions',
    ],
    stat: { value: '500+', label: 'Cases Successfully Concluded' },
    color: 'from-red-500/10 to-red-600/5',
    border: 'hover:border-red-500/30',
  },
  {
    id: 'tech',
    icon: '💻',
    title: 'Technology & Intellectual Property',
    tagline: 'Protecting ideas in the digital economy.',
    description:
      'The Silicon Savannah is booming — and so are the legal risks that come with it. From startup equity to data protection compliance under the Kenya Data Protection Act, we give tech companies and innovators the legal foundation to build without fear.',
    services: [
      'Trademark & brand registration',
      'Patent & utility model applications',
      'Copyright & licensing agreements',
      'Data protection compliance (KDPA)',
      'Software development & SaaS contracts',
      'Tech startup equity structuring',
      'Domain disputes & cyber law',
    ],
    stat: { value: '80+', label: 'IP Registrations' },
    color: 'from-purple-500/10 to-purple-600/5',
    border: 'hover:border-purple-500/30',
  },
];

const process = [
  { step: '01', title: 'Initial Consultation', description: 'We listen first. A 45-minute session to understand your matter, assess its merits, and outline strategic options — honestly.' },
  { step: '02', title: 'Matter Assessment', description: 'We conduct a thorough legal analysis: applicable statutes, precedents, risks, timelines, and realistic outcomes.' },
  { step: '03', title: 'Strategic Planning', description: 'A clear plan of action is agreed upon — including milestones, fees, and communication protocols — before any work begins.' },
  { step: '04', title: 'Execution & Updates', description: 'We execute with precision and keep you informed at every step via your client portal. No surprises, no silence.' },
  { step: '05', title: 'Resolution & Follow-Through', description: 'We do not consider a matter closed until the outcome is enforced, documented, and your position fully secured.' },
];

export default function PracticeAreasPage() {
  const [activeArea, setActiveArea] = useState<string | null>(null);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-midnight via-dark-navy to-navy/30" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold/3 rounded-full blur-2xl" />

        <div className="relative max-w-7xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 text-gold text-sm font-medium mb-6">
              Specialised Legal Expertise
            </div>
            <h1 className="font-serif text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Areas of <span className="text-gold">Excellence</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Six focused practice areas. Fifteen years of depth. One standard: the best possible outcome for you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Practice Areas Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-6">
            {areas.map((area, i) => (
              <motion.div
                key={area.id}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className={`bg-gradient-to-br ${area.color} border border-white/10 ${area.border} rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer group`}
                onClick={() => setActiveArea(activeArea === area.id ? null : area.id)}
              >
                <div className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-4xl">{area.icon}</div>
                    <div className="text-right">
                      <div className="font-serif text-2xl font-bold text-gold">{area.stat.value}</div>
                      <div className="text-xs text-gray-500">{area.stat.label}</div>
                    </div>
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-white mb-2 group-hover:text-gold transition-colors">
                    {area.title}
                  </h3>
                  <p className="text-gold/70 text-sm font-medium mb-3 italic">{area.tagline}</p>
                  <p className="text-gray-400 text-sm leading-relaxed">{area.description}</p>

                  <AnimatePresence>
                    {activeArea === area.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-6 pt-6 border-t border-white/10"
                      >
                        <h4 className="text-sm font-semibold text-white mb-3 uppercase tracking-wider">Key Services</h4>
                        <ul className="space-y-2">
                          {area.services.map((service) => (
                            <li key={service} className="flex items-center gap-2 text-sm text-gray-300">
                              <span className="w-1.5 h-1.5 rounded-full bg-gold flex-none" />
                              {service}
                            </li>
                          ))}
                        </ul>
                        <Link href="/contact" className="block mt-6">
                          <Button variant="primary" size="sm" className="w-full">
                            Discuss This Matter
                          </Button>
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <button className="mt-4 text-xs text-gold/60 hover:text-gold flex items-center gap-1 transition-colors">
                    {activeArea === area.id ? '▲ Show less' : '▼ View services'}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-20 px-4 bg-gradient-to-b from-midnight to-dark-navy">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
              How We <span className="text-gold">Work</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              A clear, disciplined process that keeps you informed and in control at every stage.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-5 gap-6">
            {process.map((step, i) => (
              <motion.div
                key={step.step}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="relative inline-flex">
                  <div className="w-14 h-14 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold font-bold font-serif text-lg mb-4 group-hover:bg-gold group-hover:text-navy transition-all mx-auto">
                    {step.step}
                  </div>
                  {i < process.length - 1 && (
                    <div className="hidden md:block absolute top-7 left-14 w-full h-px bg-gradient-to-r from-gold/30 to-transparent" />
                  )}
                </div>
                <h3 className="font-semibold text-white text-sm mb-2">{step.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-gold/10 via-gold/15 to-gold/10 border border-gold/20 rounded-3xl p-12 text-center"
          >
            <h2 className="font-serif text-4xl font-bold text-white mb-4">
              Not Sure Which Area Applies?
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-xl mx-auto">
              Many legal matters span multiple practice areas. Book a free 30-minute assessment
              and we will identify exactly what you need.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" variant="primary">Book Free Assessment</Button>
              </Link>
              <a href="https://wa.me/254792530464">
                <Button size="lg" variant="outline">WhatsApp Now</Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
