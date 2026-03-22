'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Button } from './ui/Button';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Practice Areas', href: '/practice-areas' },
  { label: 'Client Portal', href: '/portal' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [menuOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-navy/95 backdrop-blur-xl border-b border-white/10 shadow-xl shadow-black/20'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-gold" fill="currentColor">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="hidden sm:block">
                <div className="font-serif text-xl font-bold text-white leading-none">
                  Geoffrey Kabiaro
                </div>
                <div className="text-xs text-gold/70 font-medium tracking-widest uppercase">
                  Advocate
                </div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* CTA + Mobile Toggle */}
            <div className="flex items-center gap-4">
              <Link href="/consultation" className="hidden sm:block">
                <Button size="sm" variant="primary">
                  Book Consultation
                </Button>
              </Link>

              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="lg:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Toggle menu"
              >
                <div className="w-6 h-5 flex flex-col justify-between">
                  <motion.span
                    animate={menuOpen ? { rotate: 45, y: 9 } : { rotate: 0, y: 0 }}
                    className="block h-0.5 bg-current rounded-full"
                  />
                  <motion.span
                    animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                    className="block h-0.5 bg-current rounded-full"
                  />
                  <motion.span
                    animate={menuOpen ? { rotate: -45, y: -9 } : { rotate: 0, y: 0 }}
                    className="block h-0.5 bg-current rounded-full"
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-40 lg:hidden bg-navy/98 backdrop-blur-xl"
          >
            <div className="flex flex-col h-full pt-24 px-8 pb-12">
              <nav className="flex flex-col gap-2 flex-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="block py-4 text-2xl font-serif font-medium text-white border-b border-white/10 hover:text-gold transition-colors"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="pt-8"
              >
                <Link href="/consultation" onClick={() => setMenuOpen(false)}>
                  <Button size="lg" variant="primary" className="w-full">
                    Book Consultation
                  </Button>
                </Link>
                <div className="flex gap-6 justify-center mt-8">
                  <a href="tel:+254792530464" className="text-gray-400 hover:text-gold transition-colors text-sm">
                    📞 +254 792 530 464
                  </a>
                  <a href="https://wa.me/254792530464" className="text-gray-400 hover:text-gold transition-colors text-sm">
                    💬 WhatsApp
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
