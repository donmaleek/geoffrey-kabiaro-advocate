'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';
import Link from 'next/link';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1 },
  }),
};

const values = [
  {
    icon: '⚖️',
    title: 'Unwavering Integrity',
    description:
      'Every brief we hold is a trust. We operate with absolute transparency — you will always know where your matter stands and why.',
  },
  {
    icon: '🎯',
    title: 'Precision in Practice',
    description:
      'We do not do approximations. Every argument is researched, every document reviewed, every strategy stress-tested before it leaves our chambers.',
  },
  {
    icon: '🤝',
    title: 'Client-First Always',
    description:
      'Your outcomes define our success. We are available, responsive, and candid — even when the truth is difficult to hear.',
  },
  {
    icon: '💡',
    title: 'Innovation-Led',
    description:
      'We embrace legal technology to serve you faster and smarter. From AI-powered research to digital case management, we work at the frontier.',
  },
  {
    icon: '🌍',
    title: 'Pan-African Vision',
    description:
      'Rooted in Kenya, connected across East Africa. We navigate cross-border matters with regional expertise and established networks.',
  },
  {
    icon: '🛡️',
    title: 'Confidentiality',
    description:
      'Attorney-client privilege is not a policy — it is sacred. Your secrets are safe with us, always.',
  },
];

const timeline = [
  { year: '2009', event: 'Called to the Bar', detail: 'Admitted to the Law Society of Kenya after graduating top of class from the University of Nairobi School of Law.' },
  { year: '2011', event: 'First Major Landmark Case', detail: 'Successfully represented a consortium of landowners in a precedent-setting boundary dispute at the Environment and Land Court.' },
  { year: '2014', event: 'Senior Associate, Tier-1 Firm', detail: 'Led the corporate transactions desk at one of Nairobi\'s most respected commercial law firms.' },
  { year: '2017', event: 'Founded Independent Chambers', detail: 'Established Geoffrey Kabiaro Advocate to offer bespoke legal services to high-net-worth individuals and growth-stage companies.' },
  { year: '2019', event: 'LSK Council Recognition', detail: 'Recognised by the Law Society of Kenya for outstanding contribution to pro bono legal access programmes.' },
  { year: '2022', event: 'Legal 500 East Africa Listing', detail: 'Independently ranked among East Africa\'s leading practitioners in Corporate & Commercial law.' },
  { year: '2024', event: 'Digital-First Transformation', detail: 'Launched Africa\'s first fully integrated AI-assisted legal client portal, cutting case turnaround times by 40%.' },
];

const awards = [
  { title: 'Legal 500 East Africa', subtitle: 'Recommended Lawyer — Corporate & Commercial', year: '2022–2024' },
  { title: 'LSK Pro Bono Award', subtitle: 'Outstanding Contribution to Access to Justice', year: '2019' },
  { title: 'Top 40 Under 40', subtitle: 'Business Daily Africa — Legal Category', year: '2018' },
  { title: 'Best Emerging Law Firm', subtitle: 'Kenya Law Awards', year: '2020' },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-midnight via-dark-navy to-navy/50" />
        <div className="absolute inset-0">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full border border-gold/5"
              style={{
                width: `${200 + i * 120}px`,
                height: `${200 + i * 120}px`,
                top: '50%',
                left: '30%',
                transform: 'translate(-50%, -50%)',
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 30 + i * 8, repeat: Infinity, ease: 'linear' }}
            />
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial="hidden" animate="show" variants={fadeUp}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 text-gold text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
              Senior Advocate · 15+ Years at the Bar
            </div>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Geoffrey<br />
              <span className="text-gold">Kabiaro</span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed mb-8 max-w-xl">
              Advocate of the High Court of Kenya. Trusted by individuals, families,
              and institutions who demand clarity, precision, and results from their legal counsel.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/consultation">
                <Button size="lg" variant="primary">Book a Consultation</Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline">Get in Touch</Button>
              </Link>
            </div>
          </motion.div>

          {/* Photo placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative mx-auto w-80 h-96 lg:w-full lg:h-[520px]">
              {/* Decorative border frame */}
              <div className="absolute -inset-2 bg-gradient-to-br from-gold/30 to-gold/5 rounded-3xl" />
              <div className="absolute inset-0 rounded-2xl overflow-hidden border border-gold/20">
                <Image
                  src="/geoffrey-kabiaro.jpeg"
                  alt="Geoffrey Kabiaro — Advocate of the High Court of Kenya"
                  fill
                  className="object-cover object-top"
                  priority
                  sizes="(max-width: 768px) 320px, 500px"
                />
                {/* Subtle gradient overlay at bottom */}
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-navy/80 to-transparent" />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 bg-gold text-navy px-4 py-2 rounded-xl font-bold text-sm shadow-lg shadow-gold/30 z-10">
                15+ Years Experience
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Philosophy quote */}
      <section className="py-16 px-4 bg-gradient-to-r from-gold/5 via-gold/10 to-gold/5 border-y border-gold/10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="font-serif text-2xl md:text-3xl text-white italic leading-relaxed"
          >
            "The law is not simply rules on paper. It is the architecture of a just society —
            and every client who walks through my door deserves to have that architecture working for them."
          </motion.blockquote>
          <p className="mt-6 text-gold font-medium">— Geoffrey Kabiaro, Advocate</p>
        </div>
      </section>

      {/* Bio */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-4xl font-bold text-white mb-6">
              The <span className="text-gold">Story</span>
            </h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                Born and raised in Nairobi, Geoffrey Kabiaro grew up watching the legal system
                fail ordinary people — not from malice, but from inaccessibility. That observation
                shaped everything. It drove him to the University of Nairobi's School of Law,
                where he graduated in the top percentile of his class.
              </p>
              <p>
                After being called to the Bar in 2009, he cut his teeth at some of Nairobi's
                most demanding commercial litigation chambers, developing an instinct for
                strategy that most advocates only acquire after decades in practice.
              </p>
              <p>
                In 2017, he founded his own chambers with a single conviction: that world-class
                legal representation should not be the exclusive preserve of corporations and
                the ultra-wealthy. Today, his practice serves a diverse clientele — from
                landowners in the Rift Valley to fintech founders in Silicon Savannah.
              </p>
              <p>
                Geoffrey is also a committed advocate for legal education, regularly speaking
                at the Kenya School of Law and contributing to policy reform through the
                Law Society of Kenya's committees.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                { label: 'University of Nairobi', sub: 'LLB (Hons), First Class' },
                { label: 'Kenya School of Law', sub: 'Advocate Training' },
                { label: 'LSK Membership', sub: 'No. 5821' },
                { label: 'EAC Court', sub: 'Admitted Practitioner' },
              ].map((item) => (
                <div key={item.label} className="p-4 bg-white/5 border border-white/10 rounded-xl">
                  <div className="font-semibold text-white text-sm">{item.label}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{item.sub}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Awards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-4xl font-bold text-white mb-6">
              Recognition & <span className="text-gold">Awards</span>
            </h2>
            <div className="space-y-4">
              {awards.map((award, i) => (
                <motion.div
                  key={award.title}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="flex items-start gap-4 p-5 bg-white/3 border border-white/8 hover:border-gold/30 hover:bg-gold/5 rounded-xl transition-all"
                >
                  <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center flex-none">
                    <span className="text-gold text-lg">🏆</span>
                  </div>
                  <div>
                    <div className="font-semibold text-white">{award.title}</div>
                    <div className="text-sm text-gray-400">{award.subtitle}</div>
                    <div className="text-xs text-gold/70 mt-1">{award.year}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
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
              The Values That <span className="text-gold">Guide Us</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              These are not marketing promises. They are the principles by which we measure ourselves daily.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                className="p-6 bg-white/3 border border-white/8 hover:border-gold/30 rounded-2xl transition-all group"
              >
                <div className="text-3xl mb-4">{value.icon}</div>
                <h3 className="font-serif text-xl font-bold text-white mb-2 group-hover:text-gold transition-colors">
                  {value.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
              A Career Built on <span className="text-gold">Results</span>
            </h2>
          </motion.div>

          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-gold/50 via-gold/20 to-transparent" />
            <div className="space-y-8">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="flex gap-6 pl-4"
                >
                  <div className="relative flex-none">
                    <div className="w-8 h-8 rounded-full bg-gold border-4 border-dark-navy flex items-center justify-center shadow-lg shadow-gold/30 relative z-10" />
                  </div>
                  <div className="pb-8">
                    <div className="text-gold font-bold text-lg font-serif">{item.year}</div>
                    <div className="text-white font-semibold text-lg mb-1">{item.event}</div>
                    <div className="text-gray-400 text-sm leading-relaxed">{item.detail}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section id="team" className="py-20 px-4 bg-gradient-to-b from-dark-navy to-midnight">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 text-gold text-sm font-medium mb-6">
              The People Behind Your Case
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
              Our <span className="text-gold">Team</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              A lean, elite team of legal minds — each chosen for excellence, integrity, and a genuine drive to deliver results.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: 'Geoffrey Kabiaro',
                role: 'Principal Advocate',
                call: 'Called to Bar 2009',
                areas: ['Corporate & Commercial', 'Litigation', 'Tech & IP'],
                bio: 'Advocate of the High Court of Kenya with 15+ years at the bar. Ranked by Legal 500 East Africa. Founder and Principal.',
                lsk: 'LSK No. 5821',
                photo: true,
              },
              {
                name: 'Amina Odhiambo',
                role: 'Senior Associate',
                call: 'Called to Bar 2014',
                areas: ['Land & Property', 'Family & Wealth'],
                bio: 'Specialist in conveyancing and family law. Previously a conveyancing associate at a Big 4 professional services firm.',
                lsk: 'LSK No. 9134',
                photo: false,
              },
              {
                name: 'Brian Mwangi',
                role: 'Associate',
                call: 'Called to Bar 2019',
                areas: ['Employment Law', 'Litigation'],
                bio: 'Employment and dispute resolution specialist. Published author on Kenyan employment law reforms.',
                lsk: 'LSK No. 12045',
                photo: false,
              },
              {
                name: 'Cynthia Wanjiku',
                role: 'Paralegal & Research Lead',
                call: 'LLB (Hons), UoN 2021',
                areas: ['Legal Research', 'Client Management'],
                bio: 'Drives our legal research function and client onboarding. Pursuing her Advocates Training Programme.',
                lsk: 'ATP Candidate',
                photo: false,
              },
              {
                name: 'David Otieno',
                role: 'Client Relations Manager',
                call: 'MBA, Strathmore 2018',
                areas: ['Client Experience', 'Portal Management'],
                bio: "Ensures every client interaction reflects the firm's standard of excellence. Your first point of contact.",
                lsk: '',
                photo: false,
              },
              {
                name: 'Join Our Team',
                role: 'We Are Hiring',
                call: '',
                areas: ['Open Positions Available'],
                bio: 'We are always looking for brilliant legal minds who share our values. If you are exceptional, we want to hear from you.',
                lsk: '',
                photo: false,
                cta: true,
              },
            ].map((member, i) => (
              <motion.div
                key={member.name}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className={`relative p-6 rounded-2xl border transition-all group ${
                  member.cta
                    ? 'border-dashed border-gold/30 bg-gold/3 hover:bg-gold/8 flex flex-col items-center justify-center text-center cursor-pointer'
                    : 'border-white/8 bg-white/3 hover:border-gold/30 hover:bg-gold/3'
                }`}
              >
                {member.cta ? (
                  <>
                    <div className="w-16 h-16 rounded-full border-2 border-dashed border-gold/40 flex items-center justify-center mb-4">
                      <span className="text-3xl text-gold/60">+</span>
                    </div>
                    <h3 className="font-serif text-xl font-bold text-white mb-1">{member.name}</h3>
                    <p className="text-gold text-sm font-medium mb-3">{member.role}</p>
                    <p className="text-gray-400 text-sm leading-relaxed mb-4">{member.bio}</p>
                    <a href="mailto:careers@geoffreykabiaro.co.ke" className="text-xs text-gold border border-gold/30 px-4 py-1.5 rounded-full hover:bg-gold/10 transition-colors">
                      careers@geoffreykabiaro.co.ke
                    </a>
                  </>
                ) : (
                  <>
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gold/20 to-gold/5 border border-gold/30 flex items-center justify-center flex-none overflow-hidden">
                        {member.photo ? (
                          <Image src="/geoffrey-kabiaro.jpeg" alt={member.name} width={56} height={56} className="object-cover object-top w-full h-full" />
                        ) : (
                          <span className="text-xl font-serif text-gold font-bold">{member.name.split(' ').map(n => n[0]).join('')}</span>
                        )}
                      </div>
                      <div>
                        <h3 className="font-serif text-lg font-bold text-white group-hover:text-gold transition-colors">{member.name}</h3>
                        <p className="text-gold text-sm font-medium">{member.role}</p>
                        {member.call && <p className="text-gray-500 text-xs mt-0.5">{member.call}</p>}
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed mb-4">{member.bio}</p>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {member.areas.map((area) => (
                        <span key={area} className="text-xs bg-white/5 border border-white/10 px-2 py-0.5 rounded-full text-gray-400">
                          {area}
                        </span>
                      ))}
                    </div>
                    {member.lsk && (
                      <p className="text-xs text-gold/60 font-mono">{member.lsk}</p>
                    )}
                  </>
                )}
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-12 p-6 bg-white/3 border border-white/8 rounded-2xl text-center"
          >
            <p className="text-gray-400 text-sm">
              All advocates are members in good standing of the{' '}
              <span className="text-gold">Law Society of Kenya</span> and are regulated under the{' '}
              <span className="text-white">Advocates Act (Cap. 16)</span>.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-gold/10 via-gold/5 to-gold/10 border-t border-gold/10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-4xl font-bold text-white mb-4">
              Ready to Work Together?
            </h2>
            <p className="text-gray-300 text-lg mb-8">
              Schedule a confidential consultation and let us understand your matter.
              No obligations — just clarity.
            </p>
            <Link href="/contact">
              <Button size="lg" variant="primary">Schedule a Consultation</Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
