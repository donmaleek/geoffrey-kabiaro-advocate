'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const sections = [
  {
    title: '1. Definitions',
    content: `In these Terms of Service:\n\n"Firm" means Geoffrey Kabiaro Advocate, a law firm duly registered and operating under the Laws of Kenya.\n\n"Client" means any individual or entity that engages the Firm for legal services or uses the Firm's website or client portal.\n\n"Services" means the legal advisory, representation, and ancillary services provided by the Firm.\n\n"Portal" means the online client portal accessible at geoffreykabiaro.co.ke/portal.\n\n"Retainer Agreement" means the engagement letter or fee agreement entered into between the Firm and the Client.`,
  },
  {
    title: '2. Professional Engagement',
    content: `2.1 A professional relationship between the Firm and a Client is only established upon the execution of a Retainer Agreement and the payment of any initial retainer fee.\n\n2.2 Information shared via this website, the client portal, or during an initial consultation does not, by itself, create an attorney-client relationship.\n\n2.3 All Services are governed by the Retainer Agreement, the Advocates Act (Cap. 16, Laws of Kenya), and the Law Society of Kenya's Rules of Professional Conduct.`,
  },
  {
    title: '3. Scope of Services',
    content: `3.1 The scope of legal services provided will be clearly set out in the Retainer Agreement. The Firm will only advise on Kenyan law unless expressly stated otherwise.\n\n3.2 Nothing on this website constitutes legal advice. General information published here is for educational purposes only and may not apply to your specific circumstances. Always seek specific legal advice.`,
  },
  {
    title: '4. Fees and Payment',
    content: `4.1 Consultation fees are as stated on our website at the time of booking and are payable in advance via M-Pesa, bank transfer, or card.\n\n4.2 Consultation fees are credited against the Firm's legal fees if the Client proceeds to engage the Firm for the matter discussed.\n\n4.3 Legal fees for ongoing matters are set out in the Retainer Agreement. Fees may be charged on a time-cost, fixed fee, or staged payment basis as agreed.\n\n4.4 The Firm reserves the right to apply any funds held in the client account against unpaid professional fees, following proper notification.\n\n4.5 The Advocates (Remuneration) Order (as amended) sets minimum fee scales for certain matters. Where applicable, our fees will not fall below these prescribed minima.`,
  },
  {
    title: '5. Confidentiality',
    content: `5.1 All information you share with us in the course of, or in anticipation of, legal representation is protected by attorney-client privilege and the Firm's duty of confidentiality under the Advocates Act.\n\n5.2 We will not disclose your confidential information to any third party without your consent, except where required by law, court order, or to prevent the commission of a serious criminal offence.\n\n5.3 Our data processing practices are governed by our Privacy Policy.`,
  },
  {
    title: '6. Conflicts of Interest',
    content: `6.1 Before accepting an engagement, we conduct a conflict check to ensure we do not have a conflicting duty to another party.\n\n6.2 If a conflict arises during an engagement, we will notify you promptly and take appropriate steps in accordance with our professional obligations.`,
  },
  {
    title: '7. Client Portal',
    content: `7.1 Access to the Client Portal is granted to active clients on a matter-specific basis. Login credentials are personal and must not be shared.\n\n7.2 The Portal is provided to facilitate communication and document sharing. It does not replace formal legal correspondence where required.\n\n7.3 The Firm is not liable for any loss arising from unauthorised access to the Portal where such access results from the Client's failure to secure their credentials.\n\n7.4 The Portal uses 256-bit TLS encryption. We implement reasonable security measures but cannot guarantee absolute security.`,
  },
  {
    title: '8. Intellectual Property',
    content: `8.1 All content on this website — including text, graphics, logos, and legal resources — is the property of Geoffrey Kabiaro Advocate and is protected by copyright.\n\n8.2 Legal documents, opinions, and memoranda produced by the Firm for a Client remain the intellectual property of the Firm until all fees in respect of those documents have been paid in full. Upon full payment, the Client acquires a perpetual licence to use the documents for the purpose for which they were prepared.\n\n8.3 You may not reproduce, distribute, or publish any content from this website without prior written consent.`,
  },
  {
    title: '9. Limitation of Liability',
    content: `9.1 The Firm's liability for professional negligence is limited to the maximum extent permitted by law and our professional indemnity insurance.\n\n9.2 We are not liable for: (a) indirect or consequential loss; (b) loss of profit or business opportunity; (c) information provided on our website that is relied upon without obtaining specific legal advice; or (d) the acts or omissions of any third party, including co-counsel or experts instructed with the Client's agreement.\n\n9.3 Nothing in these Terms limits our liability for fraud, wilful misconduct, or death and personal injury caused by our negligence.`,
  },
  {
    title: '10. Complaints',
    content: `10.1 If you are dissatisfied with our services, please contact Geoffrey Kabiaro directly at complaints@geoffreykabiaro.co.ke. We will acknowledge your complaint within 48 hours and respond substantively within 14 days.\n\n10.2 If you remain dissatisfied following our internal resolution process, you may refer your complaint to the Law Society of Kenya.\n\nLaw Society of Kenya\nLSK Centre, Bishops Road\nNairobi\ninfo@lsk.or.ke`,
  },
  {
    title: '11. Termination of Engagement',
    content: `11.1 Either party may terminate the engagement by giving written notice.\n\n11.2 The Firm reserves the right to withdraw from representation with appropriate notice where: (a) the Client fails to pay fees when due; (b) the Client provides false or misleading instructions; (c) continuing the engagement would require us to act in breach of our professional obligations.\n\n11.3 Upon termination, the Firm will provide the Client's file within a reasonable time, subject to payment of all outstanding fees.`,
  },
  {
    title: '12. Governing Law & Jurisdiction',
    content: `These Terms and any dispute arising from them are governed by and construed in accordance with the Laws of Kenya. Any dispute shall be subject to the exclusive jurisdiction of the courts of Kenya.\n\nDisputes relating to fees may be referred to the Advocates Remuneration Committee of the Law Society of Kenya.`,
  },
  {
    title: '13. Changes to These Terms',
    content: `We may update these Terms from time to time. Material changes will be communicated to active clients via email. Continued use of our services after notification of changes constitutes acceptance of the revised Terms.`,
  },
  {
    title: '14. Contact',
    content: `Geoffrey Kabiaro Advocate\nABC Place, Waiyaki Way, Westlands\nNairobi, Kenya\ninfo@geoffreykabiaro.co.ke\n+254 792 530 464`,
  },
];

export default function TermsPage() {
  return (
    <>
      <section className="relative pt-32 pb-16 px-4 overflow-hidden bg-gradient-to-br from-midnight via-dark-navy to-navy/20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gold/4 rounded-full blur-3xl" />
        <div className="relative max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 text-gold text-sm font-medium mb-6">
              ⚖️ Advocates Act Compliant
            </div>
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-white mb-4">Terms of Service</h1>
            <p className="text-gray-400 text-lg">Geoffrey Kabiaro Advocate</p>
            <p className="text-gray-500 text-sm mt-2">Last updated: January 2025 · Effective immediately</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="p-6 bg-gold/5 border border-gold/20 rounded-2xl mb-10"
          >
            <p className="text-gray-300 text-sm leading-relaxed">
              <strong className="text-white">Important:</strong> These Terms govern the use of our website and client portal, and supplement the Retainer Agreement for legal services. A formal attorney-client relationship is only created upon execution of a Retainer Agreement. Information on this website is not legal advice.
            </p>
          </motion.div>

          {/* Quick nav */}
          <div className="grid sm:grid-cols-2 gap-2 mb-12 p-5 bg-white/3 border border-white/8 rounded-2xl">
            <p className="col-span-full text-xs text-gray-500 uppercase tracking-wider mb-2 font-medium">Quick Navigation</p>
            {sections.map((s) => (
              <a
                key={s.title}
                href={`#${s.title.replace(/\s+/g, '-').toLowerCase()}`}
                className="text-sm text-gray-400 hover:text-gold transition-colors"
              >
                {s.title}
              </a>
            ))}
          </div>

          <div className="space-y-10">
            {sections.map((section, i) => (
              <motion.div
                key={section.title}
                id={section.title.replace(/\s+/g, '-').toLowerCase()}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.02 }}
                viewport={{ once: true }}
                className="pb-10 border-b border-white/5 last:border-0"
              >
                <h2 className="font-serif text-2xl font-bold text-white mb-4">{section.title}</h2>
                <div className="space-y-3">
                  {section.content.split('\n\n').map((para, j) => (
                    <p key={j} className="text-gray-400 leading-relaxed text-sm whitespace-pre-line">
                      {para}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 p-6 bg-white/3 border border-white/10 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-white font-medium">Have questions about these terms?</p>
              <p className="text-gray-400 text-sm">We are happy to explain anything in plain language.</p>
            </div>
            <Link href="/contact">
              <div className="px-6 py-2.5 bg-gold text-navy font-semibold rounded-lg text-sm hover:bg-gold-light transition-colors whitespace-nowrap">
                Contact Us
              </div>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
