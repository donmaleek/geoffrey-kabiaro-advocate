'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import toast from 'react-hot-toast';
import Image from 'next/image';
import Link from 'next/link';

// ─── Schemas per step ──────────────────────────────────────────────────────────
const step1Schema = z.object({
  firstName: z.string().min(2, 'First name required'),
  lastName: z.string().min(2, 'Last name required'),
  email: z.string().email('Valid email required'),
  phone: z.string().min(10, 'Phone number required'),
  company: z.string().optional(),
});

const step2Schema = z.object({
  practiceArea: z.string().min(1, 'Please select a practice area'),
  urgency: z.string().min(1, 'Please select urgency'),
  consultationType: z.string().min(1, 'Please select a format'),
  description: z.string().min(30, 'Please describe your matter (min 30 characters)'),
});

const step3Schema = z.object({
  date: z.string().min(1, 'Please select a date'),
  time: z.string().min(1, 'Please select a time'),
});

const step4Schema = z.object({
  mpesaPhone: z.string().min(10, 'M-Pesa number required'),
  agreedToTerms: z.literal(true, { errorMap: () => ({ message: 'You must agree to continue' }) }),
});

type Step1 = z.infer<typeof step1Schema>;
type Step2 = z.infer<typeof step2Schema>;
type Step3 = z.infer<typeof step3Schema>;
type Step4 = z.infer<typeof step4Schema>;

// ─── Static data ───────────────────────────────────────────────────────────────
const steps = [
  { number: 1, label: 'Your Details' },
  { number: 2, label: 'Your Matter' },
  { number: 3, label: 'Schedule' },
  { number: 4, label: 'Confirm & Pay' },
];

const practiceAreas = [
  { value: 'corporate', label: 'Corporate & Commercial' },
  { value: 'land', label: 'Land & Property' },
  { value: 'family', label: 'Family & Wealth' },
  { value: 'employment', label: 'Employment Law' },
  { value: 'litigation', label: 'Litigation & Disputes' },
  { value: 'tech', label: 'Technology & IP' },
  { value: 'other', label: 'Other / Not Sure' },
];

const consultationTypes = [
  { value: 'in-person', label: '🏛️ In-Person — ABC Place, Westlands', fee: 5000 },
  { value: 'video', label: '📹 Video Call — Zoom / Google Meet', fee: 4000 },
  { value: 'phone', label: '📞 Phone Call', fee: 3000 },
];

const timeSlots = [
  '8:00 AM', '8:30 AM', '9:00 AM', '9:30 AM',
  '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
  '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM',
  '5:00 PM',
];

const trustSignals = [
  { icon: '🔒', text: 'Attorney-client privilege applies from this moment' },
  { icon: '⚡', text: 'Confirmed within 2 hours of booking' },
  { icon: '💳', text: 'Secure M-Pesa payment via Safaricom Daraja' },
  { icon: '🔄', text: 'Full refund if we cannot accommodate your matter' },
];

// ─── Helpers ───────────────────────────────────────────────────────────────────
function getMinDate() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
}

function getMaxDate() {
  const d = new Date();
  d.setDate(d.getDate() + 30);
  return d.toISOString().split('T')[0];
}

function formatKES(n: number) {
  return `KES ${n.toLocaleString('en-KE')}`;
}

// ─── Step components ───────────────────────────────────────────────────────────
function StepOne({ onNext }: { onNext: (d: Step1) => void }) {
  const { register, handleSubmit, formState: { errors } } = useForm<Step1>({
    resolver: zodResolver(step1Schema),
  });
  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <Input label="First Name *" placeholder="Jane" error={errors.firstName?.message} {...register('firstName')} />
        <Input label="Last Name *" placeholder="Muthoni" error={errors.lastName?.message} {...register('lastName')} />
      </div>
      <Input label="Email Address *" type="email" placeholder="jane@example.com" error={errors.email?.message} {...register('email')} />
      <Input label="Phone Number *" type="tel" placeholder="+254 7XX XXX XXX" error={errors.phone?.message} {...register('phone')} />
      <Input label="Company / Organisation (optional)" placeholder="Your business name" {...register('company')} />
      <Button type="submit" variant="primary" size="lg" className="w-full">Continue →</Button>
    </form>
  );
}

function StepTwo({ onNext, onBack }: { onNext: (d: Step2) => void; onBack: () => void }) {
  const { register, handleSubmit, formState: { errors } } = useForm<Step2>({
    resolver: zodResolver(step2Schema),
  });
  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Practice Area *</label>
        <div className="grid sm:grid-cols-2 gap-3">
          {practiceAreas.map((area) => (
            <label key={area.value} className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 hover:border-gold/40 rounded-xl cursor-pointer transition-all group">
              <input type="radio" value={area.value} {...register('practiceArea')} className="accent-gold" />
              <span className="text-sm text-gray-300 group-hover:text-white transition-colors">{area.label}</span>
            </label>
          ))}
        </div>
        {errors.practiceArea && <p className="text-xs text-red-400 mt-1">{errors.practiceArea.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Consultation Format *</label>
        <div className="space-y-2">
          {consultationTypes.map((type) => (
            <label key={type.value} className="flex items-center justify-between p-4 bg-white/5 border border-white/10 hover:border-gold/40 rounded-xl cursor-pointer transition-all group">
              <div className="flex items-center gap-3">
                <input type="radio" value={type.value} {...register('consultationType')} className="accent-gold" />
                <span className="text-sm text-gray-300 group-hover:text-white transition-colors">{type.label}</span>
              </div>
              <span className="text-gold font-semibold text-sm">{formatKES(type.fee)}</span>
            </label>
          ))}
        </div>
        {errors.consultationType && <p className="text-xs text-red-400 mt-1">{errors.consultationType.message}</p>}
      </div>

      <Select label="Urgency *" error={errors.urgency?.message} {...register('urgency')}>
        <option value="">How urgent is this matter?</option>
        <option value="normal">Normal — within 2 weeks</option>
        <option value="soon">Soon — within 3–5 days</option>
        <option value="urgent">Urgent — within 24–48 hours</option>
        <option value="emergency">Emergency — today if possible</option>
      </Select>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1.5">Describe Your Matter *</label>
        <textarea
          rows={5}
          placeholder="Give us an overview of your legal matter — the more detail you provide, the more prepared Geoffrey will be. All information is confidential."
          className={`w-full px-4 py-2.5 bg-white/5 border ${errors.description ? 'border-red-500/50' : 'border-white/10'} rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gold/50 resize-none text-sm`}
          {...register('description')}
        />
        {errors.description && <p className="text-xs text-red-400 mt-1">{errors.description.message}</p>}
      </div>

      <div className="flex gap-3">
        <Button variant="outline" size="lg" className="flex-1" onClick={onBack}>← Back</Button>
        <Button type="submit" variant="primary" size="lg" className="flex-1">Continue →</Button>
      </div>
    </form>
  );
}

function StepThree({ onNext, onBack }: { onNext: (d: Step3) => void; onBack: () => void }) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Step3>({
    resolver: zodResolver(step3Schema),
  });
  const selectedTime = watch('time');

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1.5">Preferred Date *</label>
        <input
          type="date"
          min={getMinDate()}
          max={getMaxDate()}
          className={`w-full px-4 py-2.5 bg-white/5 border ${errors.date ? 'border-red-500/50' : 'border-white/10'} rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-gold/50 text-sm`}
          {...register('date')}
        />
        {errors.date && <p className="text-xs text-red-400 mt-1">{errors.date.message}</p>}
        <p className="text-xs text-gray-500 mt-1">Available Mon–Fri. We will confirm availability within 2 hours.</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">Preferred Time (EAT) *</label>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
          {timeSlots.map((slot) => (
            <label
              key={slot}
              className={`flex items-center justify-center p-2.5 rounded-xl border text-sm font-medium cursor-pointer transition-all ${
                selectedTime === slot
                  ? 'bg-gold text-navy border-gold'
                  : 'bg-white/5 border-white/10 text-gray-400 hover:border-gold/40 hover:text-white'
              }`}
            >
              <input type="radio" value={slot} {...register('time')} className="sr-only" />
              {slot}
            </label>
          ))}
        </div>
        {errors.time && <p className="text-xs text-red-400 mt-1">{errors.time.message}</p>}
      </div>

      <div className="p-4 bg-gold/5 border border-gold/10 rounded-xl text-sm text-gray-400">
        <span className="text-gold font-medium">📅 Duration: </span>
        The initial consultation is <strong className="text-white">45 minutes</strong>. You will receive a calendar invite and reminder via email and SMS.
      </div>

      <div className="flex gap-3">
        <Button variant="outline" size="lg" className="flex-1" onClick={onBack}>← Back</Button>
        <Button type="submit" variant="primary" size="lg" className="flex-1">Review Booking →</Button>
      </div>
    </form>
  );
}

function StepFour({
  onSubmit,
  onBack,
  data,
}: {
  onSubmit: (d: Step4) => void;
  onBack: () => void;
  data: { step1: Step1; step2: Step2; step3: Step3 };
}) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Step4>({
    resolver: zodResolver(step4Schema),
  });

  const feeInfo = consultationTypes.find((c) => c.value === data.step2.consultationType);
  const fee = feeInfo?.fee ?? 5000;
  const areaLabel = practiceAreas.find((a) => a.value === data.step2.practiceArea)?.label;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Summary */}
      <div className="bg-white/3 border border-white/10 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
          <h3 className="font-semibold text-white">Booking Summary</h3>
          <button type="button" onClick={onBack} className="text-xs text-gold/70 hover:text-gold">Edit</button>
        </div>
        <div className="px-6 py-5 space-y-3 text-sm">
          {[
            { label: 'Client', value: `${data.step1.firstName} ${data.step1.lastName}` },
            { label: 'Contact', value: `${data.step1.email} · ${data.step1.phone}` },
            { label: 'Practice Area', value: areaLabel },
            { label: 'Format', value: feeInfo?.label.replace(/^[^\s]+\s/, '') },
            { label: 'Date & Time', value: `${data.step3.date} at ${data.step3.time}` },
            { label: 'Urgency', value: data.step2.urgency },
          ].map(({ label, value }) => (
            <div key={label} className="flex justify-between">
              <span className="text-gray-500">{label}</span>
              <span className="text-white text-right max-w-[60%]">{value}</span>
            </div>
          ))}
          <div className="pt-3 border-t border-white/10 flex justify-between items-center">
            <span className="text-gray-400 font-medium">Consultation Fee</span>
            <span className="text-gold font-bold text-lg">{formatKES(fee)}</span>
          </div>
          <p className="text-xs text-gray-600">
            Fee credited toward legal fees if you proceed with the matter.
          </p>
        </div>
      </div>

      {/* M-Pesa */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center text-white font-bold text-xs">M</div>
          <div>
            <div className="text-white font-semibold text-sm">Pay via M-Pesa STK Push</div>
            <div className="text-xs text-gray-500">You will receive a prompt on your phone to confirm</div>
          </div>
        </div>
        <Input
          label="M-Pesa Phone Number *"
          type="tel"
          placeholder="07XX XXX XXX or 01XX XXX XXX"
          error={errors.mpesaPhone?.message}
          {...register('mpesaPhone')}
        />
        <div className="mt-3 p-3 bg-green-500/5 border border-green-500/20 rounded-lg text-xs text-gray-400">
          <strong className="text-green-400">How it works:</strong> After clicking "Confirm Booking", you will
          receive an STK push on <em>the number above</em>. Enter your M-Pesa PIN to complete the payment.
          Booking is confirmed instantly upon payment.
        </div>
      </div>

      {/* Terms */}
      <label className="flex items-start gap-3 cursor-pointer group">
        <input
          type="checkbox"
          {...register('agreedToTerms')}
          className="mt-0.5 w-4 h-4 accent-gold rounded"
        />
        <span className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
          I understand that this consultation is confidential and protected by attorney-client privilege.
          I agree to the{' '}
          <Link href="/terms" className="text-gold underline">Terms of Engagement</Link>
          {' '}and{' '}
          <Link href="/privacy" className="text-gold underline">Privacy Policy</Link>.
        </span>
      </label>
      {errors.agreedToTerms && (
        <p className="text-xs text-red-400 -mt-3">{errors.agreedToTerms.message}</p>
      )}

      <div className="flex gap-3">
        <Button variant="outline" size="lg" className="flex-1" onClick={onBack} type="button">← Back</Button>
        <Button type="submit" variant="primary" size="lg" className="flex-1" loading={isSubmitting}>
          Confirm & Pay {formatKES(fee)}
        </Button>
      </div>

      <div className="flex items-center justify-center gap-6 text-xs text-gray-600">
        <span>🔒 Safaricom Daraja API</span>
        <span>⚖️ Attorney-client privilege</span>
        <span>🛡️ KDPA compliant</span>
      </div>
    </form>
  );
}

// ─── Success screen ────────────────────────────────────────────────────────────
function BookingConfirmed({ data }: { data: { step1: Step1; step2: Step2; step3: Step3 } }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center py-8"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
        className="w-20 h-20 rounded-full bg-gold/20 border-2 border-gold flex items-center justify-center mx-auto mb-6 text-4xl"
      >
        ✅
      </motion.div>

      <h2 className="font-serif text-3xl font-bold text-white mb-3">
        Booking Confirmed!
      </h2>
      <p className="text-gray-400 mb-6 max-w-md mx-auto">
        Your consultation with <strong className="text-white">Geoffrey Kabiaro</strong> has been booked
        for <strong className="text-gold">{data.step3.date} at {data.step3.time}</strong>.
      </p>

      <div className="space-y-3 max-w-sm mx-auto mb-8">
        {[
          { icon: '📧', text: `Confirmation email sent to ${data.step1.email}` },
          { icon: '📱', text: `SMS reminder will be sent to ${data.step1.phone}` },
          { icon: '📅', text: 'Calendar invite attached to your confirmation email' },
          { icon: '📁', text: 'You will gain access to the Client Portal shortly' },
        ].map((item) => (
          <div key={item.text} className="flex items-center gap-3 text-sm text-gray-400 text-left">
            <span className="text-lg flex-none">{item.icon}</span>
            {item.text}
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link href="/portal">
          <Button variant="primary" size="lg">Access Client Portal</Button>
        </Link>
        <Link href="/">
          <Button variant="outline" size="lg">Back to Home</Button>
        </Link>
      </div>

      <p className="text-xs text-gray-600 mt-6">
        Need to reschedule? WhatsApp{' '}
        <a href="https://wa.me/254792530464" className="text-gold">+254 792 530 464</a>
        {' '}at least 24 hours in advance.
      </p>
    </motion.div>
  );
}

// ─── Main page ─────────────────────────────────────────────────────────────────
export default function ConsultationPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [done, setDone] = useState(false);
  const [formData, setFormData] = useState<{
    step1?: Step1;
    step2?: Step2;
    step3?: Step3;
  }>({});

  const handleStep1 = (data: Step1) => { setFormData((p) => ({ ...p, step1: data })); setCurrentStep(2); };
  const handleStep2 = (data: Step2) => { setFormData((p) => ({ ...p, step2: data })); setCurrentStep(3); };
  const handleStep3 = (data: Step3) => { setFormData((p) => ({ ...p, step3: data })); setCurrentStep(4); };
  const handleStep4 = async (data: Step4) => {
    // In production: POST to /api/consultations/book with all formData + mpesa trigger
    await new Promise((r) => setTimeout(r, 1500));
    toast.success('Payment confirmed! Booking complete.');
    setDone(true);
  };

  const progress = done ? 100 : ((currentStep - 1) / steps.length) * 100;

  return (
    <>
      {/* Hero */}
      <section className="relative pt-24 pb-8 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-midnight via-dark-navy to-navy/20" />
        <div className="absolute top-10 right-10 w-72 h-72 bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-10 w-48 h-48 bg-gold/3 rounded-full blur-2xl" />

        <div className="relative max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Headline */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 text-gold text-sm font-medium mb-6">
                <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                Next available: Tomorrow
              </div>
              <h1 className="font-serif text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                Book Your<br />
                <span className="text-gold">Consultation</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                A 45-minute, fully confidential session with Geoffrey Kabiaro to assess your
                matter, understand your options, and chart the best course of action.
              </p>

              {/* Trust signals */}
              <div className="space-y-3">
                {trustSignals.map((s) => (
                  <div key={s.text} className="flex items-center gap-3 text-sm text-gray-400">
                    <span className="text-lg">{s.icon}</span>
                    {s.text}
                  </div>
                ))}
              </div>

              {/* Lawyer card */}
              <div className="mt-8 flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl">
                <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-gold/30 flex-none">
                  <Image
                    src="/geoffrey-kabiaro.jpeg"
                    alt="Geoffrey Kabiaro"
                    fill
                    className="object-cover object-top"
                    sizes="56px"
                  />
                </div>
                <div>
                  <div className="font-semibold text-white">Geoffrey Kabiaro</div>
                  <div className="text-sm text-gray-400">Advocate of the High Court of Kenya</div>
                  <div className="flex items-center gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-gold text-xs">★</span>
                    ))}
                    <span className="text-xs text-gray-500 ml-1">500+ clients served</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right: Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl shadow-black/40">
                {done ? (
                  <BookingConfirmed
                    data={{
                      step1: formData.step1!,
                      step2: formData.step2!,
                      step3: formData.step3!,
                    }}
                  />
                ) : (
                  <>
                    {/* Progress bar */}
                    <div className="mb-8">
                      <div className="flex justify-between mb-3">
                        {steps.map((s) => (
                          <div
                            key={s.number}
                            className={`flex flex-col items-center gap-1 ${currentStep >= s.number ? 'text-gold' : 'text-gray-600'}`}
                          >
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
                                currentStep > s.number
                                  ? 'bg-gold border-gold text-navy'
                                  : currentStep === s.number
                                  ? 'border-gold text-gold'
                                  : 'border-gray-700 text-gray-600'
                              }`}
                            >
                              {currentStep > s.number ? '✓' : s.number}
                            </div>
                            <span className="text-xs hidden sm:block font-medium">{s.label}</span>
                          </div>
                        ))}
                      </div>
                      <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-gold-dark to-gold rounded-full"
                          animate={{ width: `${progress}%` }}
                          transition={{ duration: 0.4 }}
                        />
                      </div>
                    </div>

                    {/* Step title */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.25 }}
                      >
                        <h2 className="font-serif text-2xl font-bold text-white mb-1">
                          {steps[currentStep - 1].label}
                        </h2>
                        <p className="text-gray-500 text-sm mb-6">
                          Step {currentStep} of {steps.length}
                        </p>

                        {currentStep === 1 && <StepOne onNext={handleStep1} />}
                        {currentStep === 2 && (
                          <StepTwo onNext={handleStep2} onBack={() => setCurrentStep(1)} />
                        )}
                        {currentStep === 3 && (
                          <StepThree onNext={handleStep3} onBack={() => setCurrentStep(2)} />
                        )}
                        {currentStep === 4 && (
                          <StepFour
                            onSubmit={handleStep4}
                            onBack={() => setCurrentStep(3)}
                            data={{
                              step1: formData.step1!,
                              step2: formData.step2!,
                              step3: formData.step3!,
                            }}
                          />
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What to expect */}
      {!done && (
        <section className="py-20 px-4 bg-gradient-to-b from-midnight to-dark-navy">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="font-serif text-4xl font-bold text-white mb-3">
                What Happens in Your <span className="text-gold">Consultation</span>
              </h2>
              <p className="text-gray-400 max-w-xl mx-auto">
                Every minute of your 45 minutes is intentional.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-4 gap-6">
              {[
                { time: '0–5 min', icon: '👋', title: 'Introductions', desc: 'We establish the context — who you are, what you are dealing with, and what outcome you are hoping for.' },
                { time: '5–20 min', icon: '🔍', title: 'Matter Analysis', desc: 'Geoffrey digs into the specifics. He asks the questions that matter and listens — really listens.' },
                { time: '20–35 min', icon: '🗺️', title: 'Strategic Options', desc: 'You receive a clear, candid assessment: your legal position, available routes, realistic outcomes, and timelines.' },
                { time: '35–45 min', icon: '🤝', title: 'Next Steps', desc: 'If we can help, we agree on scope, fees, and a plan of action. No pressure — no obligation to proceed.' },
              ].map((item, i) => (
                <motion.div
                  key={item.time}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="relative p-6 bg-white/3 border border-white/8 rounded-2xl hover:border-gold/20 transition-all"
                >
                  <div className="text-xs font-mono text-gold/60 mb-3">{item.time}</div>
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                  {i < 3 && (
                    <div className="hidden md:block absolute top-8 -right-3 text-gray-700 text-lg z-10">→</div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
