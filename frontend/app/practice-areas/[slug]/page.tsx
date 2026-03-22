'use client';

import { notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

const fadeUp = (i = 0) => ({
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, delay: i * 0.08 } },
});

// ─── All practice area data ────────────────────────────────────────────────────
const areas: Record<string, {
  title: string;
  tagline: string;
  emoji: string;
  heroColor: string;
  accentColor: string;
  overview: string;
  whyUs: string;
  services: { name: string; desc: string }[];
  process: { step: string; title: string; desc: string }[];
  results: { stat: string; label: string }[];
  faqs: { q: string; a: string }[];
}> = {
  corporate: {
    title: 'Corporate & Commercial',
    tagline: 'Building businesses on unshakeable legal foundations.',
    emoji: '🏢',
    heroColor: 'from-blue-900/40 via-dark-navy to-midnight',
    accentColor: 'text-blue-400',
    overview: `Kenya's business environment is dynamic, competitive, and increasingly regulated. Whether you are incorporating a company, closing a funding round, or navigating a merger — every transaction carries legal risk that grows when ignored. Our corporate and commercial practice exists to eliminate that risk, so you can build with confidence.\n\nWe advise founders, SMEs, listed companies, and multinational subsidiaries operating across Kenya and East Africa. Our approach is commercial — we understand that legal advice exists to enable business, not obstruct it.`,
    whyUs: 'We have closed transactions across fintech, real estate, manufacturing, agribusiness, and the social sector. We understand deal mechanics, not just legal formalities. Our clients trust us to give them the honest commercial picture — not just what is legally permissible, but what is strategically smart.',
    services: [
      { name: 'Company Incorporation & Restructuring', desc: 'Sole proprietorships, partnerships, private/public limited companies, holding structures, and foreign branch registrations via the Business Registration Service.' },
      { name: 'Mergers & Acquisitions', desc: 'Full-cycle M&A advisory: target assessment, due diligence, SPA and SHA drafting, regulatory filings with the Competition Authority of Kenya, and post-merger integration.' },
      { name: 'Shareholders & Board Governance', desc: 'Shareholders agreements, board charters, founder vesting schedules, drag-along/tag-along clauses, and dispute resolution mechanisms.' },
      { name: 'Commercial Contracts', desc: 'Drafting, review, and negotiation of supply agreements, distribution contracts, licensing deals, NDAs, and bespoke commercial arrangements.' },
      { name: 'Regulatory Compliance & Licensing', desc: 'CBK, CMA, CA, KEBS, and sector-specific licensing. Compliance frameworks and ongoing regulatory advisory.' },
      { name: 'Foreign Direct Investment', desc: 'Structuring inbound investments, EPZA/SEZ registrations, land acquisition for foreign entities, and repatriation of profits.' },
      { name: 'Business Sale & Succession Planning', desc: 'Exit structuring, business valuations, earn-out arrangements, and transition of business ownership within families or to third parties.' },
    ],
    process: [
      { step: '01', title: 'Business Understanding', desc: 'We learn your business model, sector, stakeholders, and growth objectives before giving any advice.' },
      { step: '02', title: 'Legal Structuring', desc: 'We recommend the optimal legal structure for your transaction or entity, weighing tax, liability, and operational considerations.' },
      { step: '03', title: 'Documentation', desc: 'We draft watertight documents that reflect the commercial deal and protect you in every foreseeable scenario.' },
      { step: '04', title: 'Regulatory Clearances', desc: 'We handle all required filings, notifications, and approvals so nothing is left undone.' },
      { step: '05', title: 'Closing & Follow-Through', desc: 'We attend to closing conditions, condition precedents, and post-closing obligations until the matter is fully concluded.' },
    ],
    results: [
      { stat: '200+', label: 'Commercial transactions advised' },
      { stat: 'KES 4B+', label: 'Deal value closed' },
      { stat: '48hrs', label: 'Average document turnaround' },
      { stat: '100%', label: 'CAK merger clearance rate' },
    ],
    faqs: [
      { q: 'How long does it take to register a company in Kenya?', a: 'With all documents in order, incorporation via BRS typically takes 3–5 working days. We manage the entire process and have it done faster.' },
      { q: 'Do I need a lawyer for a small commercial contract?', a: 'Yes — if the contract has commercial significance. Poorly drafted contracts are one of the leading causes of business disputes in Kenya. A one-time legal review saves multiples in litigation.' },
      { q: 'Can a foreigner own a company in Kenya?', a: 'Yes. Non-citizens can own shares in Kenyan companies, subject to sector restrictions (e.g., land ownership for foreigners). We advise on the right structure.' },
    ],
  },

  land: {
    title: 'Land & Property',
    tagline: 'Because land is irreplaceable — and so is getting it right.',
    emoji: '🏠',
    heroColor: 'from-emerald-900/40 via-dark-navy to-midnight',
    accentColor: 'text-emerald-400',
    overview: `Land is Kenya's most fought-over asset. Fraud, boundary disputes, fraudulent titles, unlawful evictions, and inheritance battles over land are among the most common and devastating legal crises Kenyans face. A single flawed transaction can cost a family everything they have built over generations.\n\nOur land and property practice is built around one objective: ensuring your position is legally unassailable. We do not cut corners on due diligence, and we do not settle for anything less than a clean title.`,
    whyUs: "We have appeared before the Environment and Land Court, the National Land Commission, and the Court of Appeal in landmark land matters. We know Kenya's land law inside out — from the Land Act, Land Registration Act, and Community Land Act to the NLC Act and the complex web of county by-laws that affect property transactions.",
    services: [
      { name: 'Title Search & Verification', desc: 'Official and unofficial searches at the Land Registry, caution searches, historical ownership tracing, and fraud detection.' },
      { name: 'Land Purchase & Transfer', desc: 'Sale agreements, stamp duty compliance, transfer documents, consent applications, and registration at the Lands Registry.' },
      { name: 'Boundary Dispute Resolution', desc: 'Survey instructions, boundary beacons, government survey records, and ELC litigation or ADR.' },
      { name: 'Adverse Possession', desc: 'Filing and defending adverse possession claims. Advising on the 12-year rule and continuous possession requirements.' },
      { name: 'Caution & Injunction Applications', desc: 'Lodging cautions to protect your interest and urgent injunction applications to prevent unlawful dealing.' },
      { name: 'Real Estate Development', desc: 'Joint venture agreements, construction contracts, off-plan purchase agreements, and sectional titles.' },
      { name: 'Environmental & Zoning Compliance', desc: 'NEMA approvals, county development approvals, and change of user applications.' },
    ],
    process: [
      { step: '01', title: 'Due Diligence', desc: 'We conduct a full land search before any transaction proceeds — title history, encumbrances, cautions, and physical inspection coordination.' },
      { step: '02', title: 'Risk Assessment', desc: 'We identify and communicate every risk clearly. If the title has problems, we tell you before you commit.' },
      { step: '03', title: 'Transaction Structuring', desc: 'We draft sale agreements with protective clauses for every identified risk scenario.' },
      { step: '04', title: 'Regulatory Compliance', desc: 'Land Control Board consent, stamp duty assessment, NLC approvals where required.' },
      { step: '05', title: 'Registration', desc: 'We handle the end-to-end registration process and hand you a clean, verified title.' },
    ],
    results: [
      { stat: '150+', label: 'Disputes successfully resolved' },
      { stat: '0', label: 'Fraudulent titles missed in due diligence' },
      { stat: 'KES 2B+', label: 'Property value protected' },
      { stat: '98%', label: 'ELC success rate' },
    ],
    faqs: [
      { q: 'How do I verify a land title is genuine?', a: 'You need an official search at the relevant Land Registry. We go further — cross-referencing survey maps, historical records, and physical inspection to catch sophisticated fraud.' },
      { q: 'What is a caution and when should I lodge one?', a: 'A caution is a notice registered against a title to prevent dealings without your consent. If you have a claim to land that is not yet formally registered, file a caution immediately.' },
      { q: 'Can I buy land as a foreigner in Kenya?', a: 'Foreigners can hold leasehold interests (up to 99 years) but not freehold land under the Constitution. We structure transactions appropriately.' },
    ],
  },

  family: {
    title: 'Family & Wealth',
    tagline: 'Protecting what matters most, for those who come after you.',
    emoji: '👨‍👩‍👧',
    heroColor: 'from-pink-900/40 via-dark-navy to-midnight',
    accentColor: 'text-pink-400',
    overview: `Family wealth — built over a lifetime — can unravel in a generation without the right legal structures. In Kenya, intestate succession, contested wills, matrimonial disputes, and family business disagreements are among the most emotionally and financially damaging legal crises.\n\nWe handle family and wealth matters with a rare combination: the technical rigour of commercial lawyers and the sensitivity these matters require. We are direct but compassionate, thorough but efficient.`,
    whyUs: 'We have administered estates ranging from a single piece of land to complex multi-jurisdictional portfolios. We handle family matters with absolute discretion — our client confidentiality record is unblemished. We also understand the delicate family dynamics that make these matters uniquely complex.',
    services: [
      { name: 'Will Drafting & Estate Planning', desc: 'Legally valid wills tailored to your asset structure, family composition, and wishes. Including testamentary trusts and conditions.' },
      { name: 'Probate & Letters of Administration', desc: 'Obtaining grants in the High Court. Contentious and non-contentious probate. Distribution of estates.' },
      { name: 'Trust Formation & Management', desc: 'Living trusts, testamentary trusts, discretionary trusts, and charitable trusts for wealth preservation and succession.' },
      { name: 'Matrimonial Property Disputes', desc: 'Division of matrimonial property upon divorce or separation under the Matrimonial Property Act.' },
      { name: 'Divorce & Separation', desc: 'Uncontested and contested divorce petitions. Judicial separation. Negotiated settlements.' },
      { name: 'Child Custody & Maintenance', desc: 'Custody orders, access arrangements, child maintenance assessments, and enforcement.' },
      { name: 'Family Business Succession', desc: 'Transitioning family businesses to the next generation. Buy-sell agreements, share transfers, and governance structures.' },
    ],
    process: [
      { step: '01', title: 'Confidential Assessment', desc: 'We understand your family structure, assets, and objectives in a strictly confidential consultation.' },
      { step: '02', title: 'Legal Architecture', desc: 'We design the appropriate legal structures — wills, trusts, or corporate vehicles — to meet your succession goals.' },
      { step: '03', title: 'Documentation', desc: 'Every document is drafted precisely, witnessed correctly, and stored securely.' },
      { step: '04', title: 'Registration & Formalities', desc: 'Where required, we register trusts, file court documents, and comply with all formal requirements.' },
      { step: '05', title: 'Review & Update', desc: 'We recommend regular reviews — especially after major life events. Your estate plan should evolve with your life.' },
    ],
    results: [
      { stat: '300+', label: 'Estates administered' },
      { stat: '95%', label: 'Disputes resolved without litigation' },
      { stat: 'KES 1.5B+', label: 'Family wealth protected' },
      { stat: '100%', label: 'Client confidentiality maintained' },
    ],
    faqs: [
      { q: 'What happens if I die without a will in Kenya?', a: 'Your estate is distributed under the Law of Succession Act as if you had no preferences. This often produces outcomes the deceased would never have wanted. A will takes half a day to prepare — dying intestate takes years to resolve.' },
      { q: 'Can I disinherit a family member in Kenya?', a: "With limitations. The Law of Succession Act protects dependants' rights. We can advise on what is legally achievable and how to structure your will to minimize challenges." },
      { q: 'How is matrimonial property divided in Kenya?', a: 'Under the Matrimonial Property Act 2013, courts consider each party\'s contribution — financial and non-financial. The Supreme Court has recently clarified how this is assessed. We advise both spouses and those planning marriage.' },
    ],
  },

  employment: {
    title: 'Employment Law',
    tagline: 'Fair, compliant workplaces. Fierce representation when it matters.',
    emoji: '💼',
    heroColor: 'from-amber-900/40 via-dark-navy to-midnight',
    accentColor: 'text-amber-400',
    overview: `Kenya's Employment Act, Labour Relations Act, and Work Injury Benefits Act create a complex web of obligations for employers and rights for employees. Non-compliance is expensive — Employment and Labour Relations Court awards can be substantial, and reputational damage from employment disputes is immediate.\n\nWe advise employers building compliant HR frameworks and employees who have been wronged. Both deserve the same precision.`,
    whyUs: "We have advised employers from sole traders to listed companies with 5,000+ employees. We have represented employees in landmark ELRC cases that set precedents still cited today. Our employment law advice is practical — we understand that an HR policy that can't be implemented is worthless.",
    services: [
      { name: 'Employment Contracts', desc: 'Comprehensive, Kenya Employment Act-compliant contracts for all employment levels. Executive agreements with non-compete and IP assignment clauses.' },
      { name: 'Unfair & Wrongful Dismissal', desc: 'ELRC representation for both employers and employees. Settlement negotiations and full hearing advocacy.' },
      { name: 'Redundancy & Retrenchment', desc: 'Structuring lawful redundancy processes: genuine redundancy criteria, selection criteria, notice periods, severance calculations, and NSSF compliance.' },
      { name: 'Workplace Discrimination & Harassment', desc: 'Internal investigation frameworks, disciplinary procedures, and ELRC representation in harassment and discrimination claims.' },
      { name: 'HR Policy Frameworks', desc: "Employment manuals, disciplinary and grievance procedures, leave policies, and whistleblower policies compliant with Kenya's laws." },
      { name: 'NSSF, NHIF & KRA Compliance', desc: 'Payroll compliance advisory. Audit preparation. Regularising historical non-compliance.' },
      { name: 'Collective Bargaining', desc: 'CBA drafting, negotiation, and dispute resolution with COTU-affiliated unions.' },
    ],
    process: [
      { step: '01', title: 'HR Audit', desc: 'We assess your current employment documentation and practices against the Employment Act and related legislation.' },
      { step: '02', title: 'Gap Analysis', desc: 'We identify compliance gaps and litigation risks — before they become claims.' },
      { step: '03', title: 'Documentation', desc: 'We draft or update contracts, policies, and procedures to close identified gaps.' },
      { step: '04', title: 'Training', desc: 'We train HR teams and managers on compliance requirements and best practices.' },
      { step: '05', title: 'Ongoing Advisory', desc: 'We provide ongoing retainer support for day-to-day employment questions and dispute management.' },
    ],
    results: [
      { stat: '95%', label: 'ELRC success rate' },
      { stat: '50+', label: 'Companies with HR frameworks we built' },
      { stat: '200+', label: 'Employment matters resolved' },
      { stat: '48hrs', label: 'Response time on urgent HR matters' },
    ],
    faqs: [
      { q: 'When is a dismissal considered unfair in Kenya?', a: 'Under the Employment Act, a dismissal must have both a valid reason and follow fair procedure. Failure on either ground makes it unfair — even if the employee was genuinely at fault.' },
      { q: 'How much severance must I pay on redundancy?', a: 'The Employment Act requires a minimum of 15 days\' pay per year worked, plus all accrued leave and notice pay. We calculate this precisely to avoid under or overpaying.' },
      { q: 'Can an employer include a non-compete clause in Kenya?', a: 'Yes, but enforceability depends on reasonableness of scope, duration, and geography. Courts scrutinise these closely. We draft enforceable restraints.' },
    ],
  },

  litigation: {
    title: 'Litigation & Dispute Resolution',
    tagline: 'When the stakes are highest, preparation wins.',
    emoji: '⚖️',
    heroColor: 'from-red-900/40 via-dark-navy to-midnight',
    accentColor: 'text-red-400',
    overview: `Litigation is the option of last resort — and the arena where inadequate preparation is brutally exposed. Kenya's courts are demanding: tight timelines, strict procedural rules, and judges who reward precision. We have built our litigation practice on the belief that every case is won or lost before it enters the courtroom.\n\nWe appear at every level of the Kenyan judiciary — from subordinate courts to the Supreme Court — and before arbitral tribunals constituted under Kenyan and international rules.`,
    whyUs: "We do not take cases we do not believe in. Our success rate reflects a selective, thorough approach: we assess every matter critically, advise clients honestly about their prospects, and pursue only what can be won. When we take your case, we commit fully.",
    services: [
      { name: 'Commercial Litigation', desc: 'Contract disputes, debt recovery, shareholder disputes, professional negligence, and civil fraud in the High Court and Court of Appeal.' },
      { name: 'Judicial Review', desc: 'Challenging unlawful administrative decisions by government agencies, regulatory bodies, and public authorities.' },
      { name: 'Constitutional Petitions', desc: 'Fundamental rights enforcement and constitutional interpretation before the High Court.' },
      { name: 'Arbitration', desc: 'Representation in domestic and international commercial arbitration under NCIA, ICC, LCIA, and UNCITRAL rules.' },
      { name: 'Injunctions & Urgent Relief', desc: 'Mareva injunctions, Anton Piller orders, mandatory injunctions, and other urgent applications.' },
      { name: 'Debt Recovery & Enforcement', desc: 'Demand letters, statutory demands, bankruptcy and liquidation petitions, and enforcement of court judgments.' },
      { name: 'Appeals', desc: 'Appeals to the Court of Appeal and Supreme Court. Leave applications. Interlocutory appeals.' },
    ],
    process: [
      { step: '01', title: 'Case Assessment', desc: 'Brutally honest assessment of your legal position, evidence, prospects, and the cost-benefit of proceeding to court.' },
      { step: '02', title: 'Pre-litigation Strategy', desc: 'Demand letters, preservation of evidence, and mediation attempts before issuing proceedings.' },
      { step: '03', title: 'Pleadings & Filing', desc: 'Precisely drafted originating process, statement of claim, and supporting affidavits.' },
      { step: '04', title: 'Interlocutories', desc: 'Urgent applications for injunctions, discovery, and case management conferences.' },
      { step: '05', title: 'Hearing & Judgment', desc: 'Full trial advocacy with meticulously prepared witness statements, expert reports, and legal submissions.' },
    ],
    results: [
      { stat: '500+', label: 'Cases successfully concluded' },
      { stat: '92%', label: 'Overall court success rate' },
      { stat: '3', label: 'Supreme Court appearances' },
      { stat: 'KES 3B+', label: 'Value of judgments obtained' },
    ],
    faqs: [
      { q: 'How long does a High Court case take in Kenya?', a: 'Commercial cases in the High Court typically take 2–4 years from filing to judgment. Urgent matters with injunctions can be resolved in weeks. We always explore settlement to achieve faster, cheaper outcomes.' },
      { q: 'What is judicial review and when does it apply?', a: 'Judicial review challenges the legality of public authority decisions — government agencies, boards, and tribunals. If you believe a public body has acted unlawfully, irrationally, or unfairly against you, judicial review may be your remedy.' },
      { q: 'Is arbitration faster and cheaper than court?', a: 'Usually yes — especially if the arbitration agreement provides for an expedited process. We advise on the best forum for each dispute type.' },
    ],
  },

  tech: {
    title: 'Technology & Intellectual Property',
    tagline: 'Protecting ideas in Africa\'s fastest-growing digital economy.',
    emoji: '💻',
    heroColor: 'from-purple-900/40 via-dark-navy to-midnight',
    accentColor: 'text-purple-400',
    overview: `The Silicon Savannah is booming — and the legal framework governing it is evolving rapidly. Kenya's Data Protection Act, the Computer Misuse and Cybercrimes Act, the Copyright Act, the Industrial Property Act, and a growing body of CBK and CA fintech regulations create a complex compliance environment for tech businesses.\n\nWe are Kenya's go-to practice for technology companies, founders, innovators, and investors who need lawyers that actually understand the technology they are building.`,
    whyUs: "We have advised fintech startups, e-commerce platforms, SaaS companies, app developers, content creators, and traditional businesses undergoing digital transformation. Our team understands product development cycles, data architecture, and the commercial realities of scaling a tech business in East Africa.",
    services: [
      { name: 'Trademark & Brand Registration', desc: 'Registration at the Kenya Industrial Property Institute (KIPI), opposition proceedings, international registration via the Madrid Protocol.' },
      { name: 'Copyright Protection & Licensing', desc: 'Copyright registration, licensing agreements, MCSK matters, work-for-hire agreements, and copyright enforcement.' },
      { name: 'Data Protection Compliance', desc: 'KDPA compliance audits, privacy policies, data processing agreements, ODPC registration, and breach response protocols.' },
      { name: 'Technology Contracts', desc: 'SaaS agreements, software development contracts, API terms, hosting agreements, and IT procurement contracts.' },
      { name: 'Startup Legal Structuring', desc: 'Equity structuring, ESOP design, founder agreements, term sheet review, and Series A documentation.' },
      { name: 'Patent & Utility Models', desc: 'Patent applications at KIPI, freedom-to-operate opinions, and patent licensing.' },
      { name: 'Domain & Cybercrime', desc: 'Domain dispute resolution, UDRP/KEDRP proceedings, and advice under the Computer Misuse and Cybercrimes Act.' },
    ],
    process: [
      { step: '01', title: 'IP Audit', desc: 'We identify all your intellectual property assets — many founders do not know what they own.' },
      { step: '02', title: 'Protection Strategy', desc: 'We recommend the most cost-effective combination of trademark, copyright, patent, and trade secret protection.' },
      { step: '03', title: 'Registration', desc: 'We handle all KIPI filings, copyright registrations, and international applications.' },
      { step: '04', title: 'Compliance', desc: 'For tech companies: KDPA compliance, fintech regulatory advisory, and ongoing data governance.' },
      { step: '05', title: 'Enforcement', desc: 'When your IP is infringed, we move fast: cease and desist, domain takedowns, and court action.' },
    ],
    results: [
      { stat: '80+', label: 'IP registrations obtained' },
      { stat: '40+', label: 'Tech companies advised' },
      { stat: '100%', label: 'KIPI trademark success rate' },
      { stat: '25+', label: 'KDPA compliance audits conducted' },
    ],
    faqs: [
      { q: 'Do I need to register my trademark in Kenya?', a: "Registration is not compulsory but is strongly advisable. Unregistered marks can be protected under passing off, but it's expensive and difficult. Registration costs a fraction of enforcement litigation." },
      { q: 'Is my software automatically protected by copyright in Kenya?', a: 'Yes — copyright arises automatically on creation in Kenya. However, registration creates a public record and is valuable evidence in infringement proceedings.' },
      { q: 'What does KDPA compliance require for a startup?', a: 'At minimum: a privacy notice, lawful basis for processing personal data, data subject rights procedures, and registration with the ODPC if you process data on a large scale. We conduct gap analyses and produce compliant documentation.' },
    ],
  },
};

// ─── Page component ────────────────────────────────────────────────────────────
export default function PracticeAreaPage({ params }: { params: { slug: string } }) {
  const area = areas[params.slug];
  if (!area) notFound();

  const otherAreas = Object.entries(areas)
    .filter(([slug]) => slug !== params.slug)
    .slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className={`relative pt-32 pb-20 px-4 overflow-hidden bg-gradient-to-br ${area.heroColor}`}>
        <div className="absolute top-10 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/2 rounded-full blur-2xl" />

        <div className="relative max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <Link href="/practice-areas" className="inline-flex items-center gap-2 text-gray-400 hover:text-gold text-sm mb-8 transition-colors">
              ← All Practice Areas
            </Link>

            <div className="flex items-start gap-6 mb-6">
              <div className="text-6xl">{area.emoji}</div>
              <div>
                <h1 className="font-serif text-5xl md:text-6xl font-bold text-white leading-tight mb-3">
                  {area.title}
                </h1>
                <p className={`text-xl font-medium italic ${area.accentColor}`}>
                  {area.tagline}
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10">
              {area.results.map((r) => (
                <div key={r.label} className="p-4 bg-white/5 backdrop-blur border border-white/10 rounded-2xl text-center">
                  <div className="font-serif text-2xl font-bold text-gold">{r.stat}</div>
                  <div className="text-xs text-gray-400 mt-1">{r.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-6">
            <motion.div initial="hidden" whileInView="show" variants={fadeUp(0)} viewport={{ once: true }}>
              <h2 className="font-serif text-4xl font-bold text-white mb-6">Overview</h2>
              {area.overview.split('\n\n').map((para, i) => (
                <p key={i} className="text-gray-300 leading-relaxed mb-4">{para}</p>
              ))}
            </motion.div>

            <motion.div initial="hidden" whileInView="show" variants={fadeUp(1)} viewport={{ once: true }}
              className="p-6 bg-gold/5 border-l-4 border-gold rounded-r-2xl">
              <h3 className="font-semibold text-white mb-2">Why Choose Us</h3>
              <p className="text-gray-300 text-sm leading-relaxed">{area.whyUs}</p>
            </motion.div>
          </div>

          {/* Quick CTA sidebar */}
          <div className="space-y-4">
            <div className="sticky top-28">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <div className="w-12 h-12 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center mx-auto mb-4 text-2xl">
                  {area.emoji}
                </div>
                <h3 className="font-serif text-xl font-bold text-white text-center mb-2">
                  Need Help with a {area.title} Matter?
                </h3>
                <p className="text-gray-400 text-sm text-center mb-6">
                  Speak directly with Geoffrey Kabiaro. Confidential, no-obligation.
                </p>
                <Link href="/consultation" className="block mb-3">
                  <Button variant="primary" className="w-full">Book Consultation</Button>
                </Link>
                <a href="https://wa.me/254792530464" className="block">
                  <Button variant="outline" className="w-full">💬 WhatsApp Now</Button>
                </a>
                <div className="mt-4 pt-4 border-t border-white/10 space-y-2 text-xs text-gray-500">
                  <div className="flex items-center gap-2">🔒 Attorney-client privilege from first contact</div>
                  <div className="flex items-center gap-2">⚡ Response within 2 hours</div>
                  <div className="flex items-center gap-2">💳 M-Pesa, card, or bank transfer</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 px-4 bg-gradient-to-b from-midnight to-dark-navy">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="show" variants={fadeUp(0)} viewport={{ once: true }} className="mb-10">
            <h2 className="font-serif text-4xl font-bold text-white mb-3">Our Services</h2>
            <p className="text-gray-400">Every service we offer in this practice area.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-5">
            {area.services.map((svc, i) => (
              <motion.div
                key={svc.name}
                initial="hidden"
                whileInView="show"
                variants={fadeUp(i * 0.5)}
                viewport={{ once: true }}
                className="flex gap-4 p-5 bg-white/3 border border-white/8 hover:border-gold/25 rounded-2xl transition-all group"
              >
                <div className="w-2 h-2 rounded-full bg-gold mt-2 flex-none" />
                <div>
                  <h3 className="font-semibold text-white mb-1 group-hover:text-gold transition-colors">{svc.name}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{svc.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="show" variants={fadeUp(0)} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="font-serif text-4xl font-bold text-white mb-3">
              Our <span className="text-gold">Process</span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">How we handle every matter from first contact to final resolution.</p>
          </motion.div>

          <div className="grid md:grid-cols-5 gap-6">
            {area.process.map((step, i) => (
              <motion.div
                key={step.step}
                initial="hidden"
                whileInView="show"
                variants={fadeUp(i * 0.5)}
                viewport={{ once: true }}
                className="text-center group relative"
              >
                <div className="w-14 h-14 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold font-bold font-serif text-lg mb-4 mx-auto group-hover:bg-gold group-hover:text-navy transition-all">
                  {step.step}
                </div>
                {i < area.process.length - 1 && (
                  <div className="hidden md:block absolute top-7 left-[calc(50%+28px)] right-[calc(-50%+28px)] h-px bg-gradient-to-r from-gold/30 to-transparent" />
                )}
                <h3 className="font-semibold text-white text-sm mb-2">{step.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 px-4 bg-gradient-to-b from-midnight to-dark-navy">
        <div className="max-w-3xl mx-auto">
          <motion.div initial="hidden" whileInView="show" variants={fadeUp(0)} viewport={{ once: true }} className="text-center mb-10">
            <h2 className="font-serif text-4xl font-bold text-white mb-3">
              Common <span className="text-gold">Questions</span>
            </h2>
          </motion.div>

          <div className="space-y-4">
            {area.faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="show"
                variants={fadeUp(i * 0.5)}
                viewport={{ once: true }}
                className="p-6 bg-white/3 border border-white/8 rounded-2xl"
              >
                <h3 className="font-semibold text-white mb-3 flex items-start gap-3">
                  <span className="text-gold flex-none">Q.</span>
                  {faq.q}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed pl-6">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Other areas */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-serif text-3xl font-bold text-white mb-8">Other Practice Areas</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {otherAreas.map(([slug, other]) => (
              <Link key={slug} href={`/practice-areas/${slug}`}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="p-6 bg-white/3 border border-white/8 hover:border-gold/30 rounded-2xl transition-all group cursor-pointer"
                >
                  <div className="text-3xl mb-3">{other.emoji}</div>
                  <h3 className="font-serif text-xl font-bold text-white group-hover:text-gold transition-colors mb-2">
                    {other.title}
                  </h3>
                  <p className="text-gray-500 text-sm italic">{other.tagline}</p>
                  <div className="mt-4 text-gold/60 text-sm group-hover:text-gold transition-colors">
                    Learn more →
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

