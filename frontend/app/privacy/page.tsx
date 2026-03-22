'use client';

import { motion } from 'framer-motion';

const sections = [
  {
    title: '1. Who We Are',
    content: `Geoffrey Kabiaro Advocate ("we", "us", "our") is a law firm registered and operating under the Laws of Kenya. Our principal place of business is ABC Place, Waiyaki Way, Westlands, Nairobi.\n\nFor purposes of the Kenya Data Protection Act 2019 (KDPA), we are a Data Controller in respect of the personal data we collect from you.`,
  },
  {
    title: '2. What Personal Data We Collect',
    content: `We collect the following categories of personal data:\n\n• **Contact information:** Name, email address, phone number, postal address.\n• **Identity information:** Copies of identification documents when required by law or for client verification.\n• **Matter-related information:** Details of your legal matter, including information about third parties involved.\n• **Financial information:** Payment details and transaction records (processed securely via M-Pesa and payment processors).\n• **Usage data:** IP addresses, browser type, pages visited, and time spent on our website.\n• **Communications:** Records of correspondence with us via email, phone, WhatsApp, or our client portal.`,
  },
  {
    title: '3. How We Collect Your Data',
    content: `We collect personal data:\n\n• Directly from you, when you complete our contact form, book a consultation, or register on the client portal.\n• During the provision of legal services, when you share information relevant to your matter.\n• Automatically, through cookies and similar technologies when you use our website.\n• From third parties, including courts, government agencies, and other parties to your legal matter where necessary.`,
  },
  {
    title: '4. How We Use Your Personal Data',
    content: `We process your personal data for the following purposes and on the following legal bases under the KDPA:\n\n• **Providing legal services** (Performance of contract / legitimate interests): To advise you, represent you, and manage your legal matter.\n• **Billing and payment** (Performance of contract): To issue invoices, process payments, and manage our accounts.\n• **Client verification** (Legal obligation): To comply with anti-money laundering and know-your-client requirements under the Proceeds of Crime and Anti-Money Laundering Act.\n• **Communications** (Legitimate interests / consent): To respond to your enquiries and send you relevant legal updates, where you have consented.\n• **Website improvement** (Legitimate interests): To understand how visitors use our website and improve user experience.\n• **Legal and regulatory compliance** (Legal obligation): To comply with our obligations under the Advocates Act, KDPA, and other applicable legislation.`,
  },
  {
    title: '5. Attorney-Client Privilege & Confidentiality',
    content: `All information you share with us in the context of seeking or receiving legal advice is protected by attorney-client privilege under the Advocates Act (Cap. 16, Laws of Kenya). This is a fundamental protection — we cannot disclose privileged communications without your consent, except in the very limited circumstances prescribed by law.\n\nOur data protection obligations are in addition to, and do not diminish, the protection afforded by legal professional privilege.`,
  },
  {
    title: '6. Sharing Your Personal Data',
    content: `We do not sell your personal data. We may share it with:\n\n• **Courts and tribunals:** When filing court documents or attending hearings on your behalf.\n• **Third parties to your matter:** Opposing parties, their advocates, mediators, or arbitrators, as required in the conduct of your matter.\n• **Service providers:** Our IT providers, cloud storage providers, and payment processors, who are bound by data processing agreements.\n• **Regulatory authorities:** The Law Society of Kenya, the Anti-Money Laundering Unit, or other authorities when required by law.\n\nAll third parties with whom we share data are required to handle it in accordance with applicable data protection laws.`,
  },
  {
    title: '7. International Transfers',
    content: `Some of our service providers are located outside Kenya. Where we transfer your personal data outside Kenya, we ensure appropriate safeguards are in place in accordance with Section 48 of the KDPA, including data processing agreements incorporating standard contractual clauses.`,
  },
  {
    title: '8. Data Retention',
    content: `We retain client files and personal data for a minimum of 7 years after the conclusion of a matter, in accordance with professional obligations under the Advocates Act and Limitation of Actions Act. After this period, data is securely deleted or anonymised.\n\nWebsite usage data is retained for 12 months.`,
  },
  {
    title: '9. Your Rights Under the KDPA',
    content: `As a data subject under the Kenya Data Protection Act 2019, you have the right to:\n\n• **Access** your personal data that we hold.\n• **Rectify** inaccurate personal data.\n• **Erasure** of your personal data (subject to our legal obligations to retain it).\n• **Restriction** of processing in certain circumstances.\n• **Data portability** for data you have provided to us.\n• **Object** to processing based on legitimate interests.\n• **Withdraw consent** at any time, without affecting the lawfulness of prior processing.\n\nTo exercise any of these rights, contact us at privacy@geoffreykabiaro.co.ke. We will respond within 21 days as required by the KDPA.`,
  },
  {
    title: '10. Cookies',
    content: `Our website uses cookies to enhance your browsing experience. We use:\n\n• **Essential cookies:** Required for the website to function.\n• **Analytics cookies:** Google Analytics, to understand how visitors use our site (anonymised). You may opt out via your browser settings.\n\nYou can control cookie preferences in your browser settings.`,
  },
  {
    title: '11. Security',
    content: `We implement appropriate technical and organisational measures to protect your personal data against unauthorised access, loss, or disclosure. Our client portal uses 256-bit TLS encryption. Access to client files is restricted to authorised personnel only.\n\nIn the event of a data breach that is likely to result in a risk to your rights and freedoms, we will notify you and the Office of the Data Protection Commissioner within 72 hours of becoming aware.`,
  },
  {
    title: '12. Complaints',
    content: `If you are unhappy with how we have handled your personal data, you have the right to lodge a complaint with the Office of the Data Protection Commissioner (ODPC) at:\n\nOffice of the Data Protection Commissioner\nBishopsgate House, Upper Hill Road\nNairobi, Kenya\ninfo@odpc.go.ke`,
  },
  {
    title: '13. Changes to This Policy',
    content: `We may update this Privacy Policy from time to time. Material changes will be communicated to active clients via email. The current version is always available on our website.`,
  },
  {
    title: '14. Contact Us',
    content: `For any data protection queries:\n\nGeoffrey Kabiaro Advocate\nABC Place, Waiyaki Way, Westlands, Nairobi\nprivacy@geoffreykabiaro.co.ke\n+254 792 530 464`,
  },
];

export default function PrivacyPage() {
  return (
    <>
      <section className="relative pt-32 pb-16 px-4 overflow-hidden bg-gradient-to-br from-midnight via-dark-navy to-navy/20">
        <div className="absolute top-20 right-10 w-72 h-72 bg-gold/4 rounded-full blur-3xl" />
        <div className="relative max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 text-gold text-sm font-medium mb-6">
              🔒 KDPA Compliant
            </div>
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-white mb-4">Privacy Policy</h1>
            <p className="text-gray-400 text-lg">Geoffrey Kabiaro Advocate</p>
            <p className="text-gray-500 text-sm mt-2">Last updated: January 2025</p>
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
              <strong className="text-white">Summary:</strong> We collect personal data to provide you with legal services. All information shared in the context of legal advice is protected by attorney-client privilege. We do not sell your data. You have rights under the Kenya Data Protection Act 2019. Contact us at <a href="mailto:privacy@geoffreykabiaro.co.ke" className="text-gold">privacy@geoffreykabiaro.co.ke</a> with any concerns.
            </p>
          </motion.div>

          <div className="space-y-10">
            {sections.map((section, i) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.03 }}
                viewport={{ once: true }}
                className="pb-10 border-b border-white/5 last:border-0"
              >
                <h2 className="font-serif text-2xl font-bold text-white mb-4">{section.title}</h2>
                <div className="space-y-3">
                  {section.content.split('\n\n').map((para, j) => (
                    <p key={j} className="text-gray-400 leading-relaxed text-sm whitespace-pre-line">
                      {para.replace(/\*\*([^*]+)\*\*/g, '$1')}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
