'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import toast from 'react-hot-toast';

const schema = z.object({
  name: z.string().min(2, 'Full name is required'),
  email: z.string().email('Valid email required'),
  phone: z.string().min(10, 'Phone number required'),
  practiceArea: z.string().min(1, 'Please select a practice area'),
  urgency: z.string().min(1, 'Please select urgency'),
  message: z.string().min(20, 'Please describe your matter in at least 20 characters'),
});

type ContactForm = z.infer<typeof schema>;

const contactMethods = [
  {
    icon: '📞',
    title: 'Call Directly',
    value: '+254 792 530 464',
    sub: 'Mon–Fri, 8am–6pm EAT',
    href: 'tel:+254792530464',
    cta: 'Call Now',
    color: 'from-blue-500/10 to-blue-600/5 border-blue-500/20',
  },
  {
    icon: '💬',
    title: 'WhatsApp',
    value: '+254 792 530 464',
    sub: 'Fastest response · 7 days a week',
    href: 'https://wa.me/254792530464',
    cta: 'Open WhatsApp',
    color: 'from-emerald-500/10 to-emerald-600/5 border-emerald-500/20',
  },
  {
    icon: '✉️',
    title: 'Email',
    value: 'info@geoffreykabiaro.co.ke',
    sub: 'Replied within 4 business hours',
    href: 'mailto:info@geoffreykabiaro.co.ke',
    cta: 'Send Email',
    color: 'from-gold/10 to-gold/5 border-gold/20',
  },
];

const officeHours = [
  { day: 'Monday – Friday', hours: '8:00 AM – 6:00 PM' },
  { day: 'Saturday', hours: '9:00 AM – 1:00 PM' },
  { day: 'Sunday', hours: 'Emergency only' },
  { day: 'Public Holidays', hours: 'Emergency only' },
];

const faqs = [
  {
    q: 'How quickly can I get an appointment?',
    a: 'Most clients are seen within 48 hours. Urgent matters can often be accommodated same-day. WhatsApp us for fastest booking.',
  },
  {
    q: 'What is the fee for the initial consultation?',
    a: 'The initial 45-minute consultation is charged at KES 5,000. This is credited toward our fees if you proceed with the matter.',
  },
  {
    q: 'Do you handle matters outside Nairobi?',
    a: 'Yes. We appear in courts across Kenya and handle matters nationally. We also conduct virtual consultations for clients upcountry and in the diaspora.',
  },
  {
    q: 'Can I pay via M-Pesa?',
    a: 'Absolutely. We accept M-Pesa, bank transfer, and card payments. Retainer agreements and invoices are issued digitally.',
  },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<ContactForm>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: ContactForm) => {
    await new Promise((r) => setTimeout(r, 1000));
    setSubmitted(true);
    reset();
    toast.success('Message received! We will be in touch within 4 hours.');
  };

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-midnight via-dark-navy to-navy/20" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-gold/5 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 text-gold text-sm font-medium mb-6">
              ⚡ Same-day responses · Confidential
            </div>
            <h1 className="font-serif text-5xl md:text-7xl font-bold text-white mb-6">
              Let's <span className="text-gold">Talk</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Every significant legal matter starts with a conversation.
              Tell us what you are dealing with and we will tell you how we can help.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="pb-12 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6">
          {contactMethods.map((method, i) => (
            <motion.a
              key={method.title}
              href={method.href}
              target={method.href.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
              className={`block p-6 bg-gradient-to-br ${method.color} border rounded-2xl transition-all group`}
            >
              <div className="text-3xl mb-3">{method.icon}</div>
              <div className="font-semibold text-white mb-1">{method.title}</div>
              <div className="text-gold font-medium text-sm mb-1">{method.value}</div>
              <div className="text-gray-500 text-xs mb-4">{method.sub}</div>
              <span className="text-xs font-semibold text-white/70 group-hover:text-white transition-colors">
                {method.cta} →
              </span>
            </motion.a>
          ))}
        </div>
      </section>

      {/* Form + Sidebar */}
      <section className="pb-20 px-4">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-12">
          {/* Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="font-serif text-3xl font-bold text-white mb-2">Send Us a Message</h2>
              <p className="text-gray-400 mb-8">We read every message personally. You will hear from us within 4 business hours.</p>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-10 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-center"
                >
                  <div className="text-5xl mb-4">✅</div>
                  <h3 className="font-serif text-2xl font-bold text-white mb-2">Message Received</h3>
                  <p className="text-gray-400">
                    Thank you. Geoffrey or a member of our team will contact you within 4 business hours.
                    For urgent matters, please WhatsApp us directly.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-6"
                    onClick={() => setSubmitted(false)}
                  >
                    Send Another Message
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Input
                      label="Full Name *"
                      placeholder="Jane Muthoni"
                      error={errors.name?.message}
                      {...register('name')}
                    />
                    <Input
                      label="Email Address *"
                      type="email"
                      placeholder="jane@example.com"
                      error={errors.email?.message}
                      {...register('email')}
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <Input
                      label="Phone Number *"
                      type="tel"
                      placeholder="+254 7XX XXX XXX"
                      error={errors.phone?.message}
                      {...register('phone')}
                    />
                    <Select
                      label="Practice Area *"
                      error={errors.practiceArea?.message}
                      {...register('practiceArea')}
                    >
                      <option value="">Select practice area</option>
                      <option value="corporate">Corporate & Commercial</option>
                      <option value="land">Land & Property</option>
                      <option value="family">Family & Wealth</option>
                      <option value="employment">Employment Law</option>
                      <option value="litigation">Litigation</option>
                      <option value="tech">Technology & IP</option>
                      <option value="other">Other / Not Sure</option>
                    </Select>
                  </div>

                  <Select
                    label="Urgency *"
                    error={errors.urgency?.message}
                    {...register('urgency')}
                  >
                    <option value="">How urgent is this?</option>
                    <option value="normal">Normal — within the next few weeks</option>
                    <option value="soon">Soon — within the next few days</option>
                    <option value="urgent">Urgent — within 24 hours</option>
                    <option value="emergency">Emergency — immediate attention needed</option>
                  </Select>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">
                      Describe Your Matter *
                    </label>
                    <textarea
                      rows={5}
                      placeholder="Please give us a brief overview of your legal matter. The more detail you provide, the better we can prepare for our conversation. All information is strictly confidential."
                      className={`w-full px-4 py-2.5 bg-white/5 border ${errors.message ? 'border-red-500/50' : 'border-white/10'} rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold/50 transition-colors resize-none text-sm`}
                      {...register('message')}
                    />
                    {errors.message && (
                      <p className="mt-1 text-xs text-red-400">{errors.message.message}</p>
                    )}
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-gold/5 border border-gold/10 rounded-xl">
                    <span className="text-gold mt-0.5">🔒</span>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      Everything you share with us is protected by attorney-client privilege and our
                      strict confidentiality policy under the Advocates Act (Cap. 16, Laws of Kenya).
                    </p>
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full"
                    loading={isSubmitting}
                  >
                    Send Message Securely
                  </Button>
                </form>
              )}
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Office Hours */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white/3 border border-white/10 rounded-2xl p-6"
            >
              <h3 className="font-serif text-xl font-bold text-white mb-4 flex items-center gap-2">
                🕐 Office Hours
              </h3>
              <div className="space-y-3">
                {officeHours.map((item) => (
                  <div key={item.day} className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">{item.day}</span>
                    <span className={`font-medium ${item.hours.includes('Emergency') ? 'text-amber-400' : 'text-white'}`}>
                      {item.hours}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs text-emerald-400 font-medium">Currently available</span>
              </div>
            </motion.div>

            {/* Location */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white/3 border border-white/10 rounded-2xl p-6"
            >
              <h3 className="font-serif text-xl font-bold text-white mb-4 flex items-center gap-2">
                📍 Location
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                Geoffrey Kabiaro Advocate<br />
                ABC Place, Waiyaki Way<br />
                Westlands, Nairobi<br />
                P.O. Box 00100, Kenya
              </p>
              <div className="aspect-video bg-navy border border-white/10 rounded-xl flex items-center justify-center text-gray-600 text-sm">
                [Map — Westlands, Nairobi]
              </div>
            </motion.div>

            {/* FAQs */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white/3 border border-white/10 rounded-2xl p-6"
            >
              <h3 className="font-serif text-xl font-bold text-white mb-4">Quick Answers</h3>
              <div className="space-y-3">
                {faqs.map((faq, i) => (
                  <div key={i} className="border border-white/8 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full text-left px-4 py-3 text-sm font-medium text-white hover:text-gold transition-colors flex items-center justify-between gap-2"
                    >
                      <span>{faq.q}</span>
                      <span className={`text-gold transition-transform flex-none ${openFaq === i ? 'rotate-180' : ''}`}>▾</span>
                    </button>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        className="px-4 pb-3 text-sm text-gray-400 leading-relaxed"
                      >
                        {faq.a}
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
