'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { ClientPortal } from '@/components/ClientPortal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

type LoginForm = { email: string; password: string };

// Demo: show portal directly. In production, gate this with NextAuth session check.
export default function PortalPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');

  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>();

  const onSubmit = async (data: LoginForm) => {
    setLoading(true);
    // Simulate auth — replace with real NextAuth signIn()
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setIsLoggedIn(true);
  };

  if (isLoggedIn) {
    return (
      <div className="pt-20 min-h-screen bg-gradient-to-b from-midnight to-dark-navy">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-serif text-3xl font-bold text-white">Client Portal</h1>
              <p className="text-gray-400 text-sm mt-1">Welcome back. Your matters are up to date.</p>
            </div>
            <Button variant="outline" size="sm" onClick={() => setIsLoggedIn(false)}>
              Sign Out
            </Button>
          </div>
          <ClientPortal />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-midnight via-dark-navy to-navy/30 flex items-center justify-center px-4 pt-20">
      {/* Background rings */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-gold/5"
            style={{
              width: `${300 + i * 150}px`,
              height: `${300 + i * 150}px`,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
            animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
            transition={{ duration: 40 + i * 10, repeat: Infinity, ease: 'linear' }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center mx-auto mb-4">
            <svg viewBox="0 0 24 24" className="w-8 h-8 text-gold" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <h1 className="font-serif text-2xl font-bold text-white">Client Portal</h1>
          <p className="text-gray-400 text-sm mt-1">Geoffrey Kabiaro Advocate</p>
        </div>

        {/* Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl shadow-black/40">
          {/* Tabs */}
          <div className="flex mb-8 p-1 bg-white/5 rounded-lg">
            {(['login', 'register'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2 text-sm font-medium rounded-md transition-all capitalize ${
                  activeTab === tab
                    ? 'bg-gold text-navy'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tab === 'login' ? 'Sign In' : 'Register'}
              </button>
            ))}
          </div>

          {activeTab === 'login' ? (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <Input
                label="Email Address"
                type="email"
                placeholder="you@example.com"
                error={errors.email?.message}
                {...register('email', { required: 'Email is required' })}
              />
              <div>
                <Input
                  label="Password"
                  type="password"
                  placeholder="••••••••"
                  error={errors.password?.message}
                  {...register('password', { required: 'Password is required' })}
                />
                <div className="text-right mt-1">
                  <button type="button" className="text-xs text-gold/70 hover:text-gold">
                    Forgot password?
                  </button>
                </div>
              </div>

              <Button type="submit" variant="primary" className="w-full" loading={loading}>
                Sign In to Portal
              </Button>

              <div className="flex items-center gap-3 my-2">
                <div className="flex-1 h-px bg-white/10" />
                <span className="text-xs text-gray-500">or</span>
                <div className="flex-1 h-px bg-white/10" />
              </div>

              <a href="https://wa.me/254792530464" className="block">
                <Button variant="outline" className="w-full" type="button">
                  💬 Request Access via WhatsApp
                </Button>
              </a>
            </form>
          ) : (
            <div className="space-y-5">
              <Input label="Full Name" type="text" placeholder="Your full name" />
              <Input label="Email Address" type="email" placeholder="you@example.com" />
              <Input label="Phone Number" type="tel" placeholder="+254 7XX XXX XXX" />
              <Input label="Case Reference (if any)" type="text" placeholder="e.g. GKA-2024-001" />
              <Button
                variant="primary"
                className="w-full"
                onClick={() => {
                  // In production: POST to /api/auth/register
                  setActiveTab('login');
                }}
              >
                Request Portal Access
              </Button>
              <p className="text-xs text-gray-500 text-center">
                Access is granted after verification by our team. We will contact you within 24 hours.
              </p>
            </div>
          )}
        </div>

        {/* Security note */}
        <div className="mt-6 flex items-center justify-center gap-6 text-xs text-gray-600">
          <span className="flex items-center gap-1.5">🔒 256-bit encrypted</span>
          <span className="flex items-center gap-1.5">⚖️ Attorney-client privilege</span>
          <span className="flex items-center gap-1.5">🛡️ KDPA compliant</span>
        </div>
      </motion.div>
    </div>
  );
}
