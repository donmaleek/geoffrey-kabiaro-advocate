import Link from 'next/link';

const practiceAreas = [
  { label: 'Corporate & Commercial', slug: 'corporate' },
  { label: 'Land & Property', slug: 'land' },
  { label: 'Family & Wealth', slug: 'family' },
  { label: 'Employment Law', slug: 'employment' },
  { label: 'Litigation', slug: 'litigation' },
  { label: 'Tech & IP', slug: 'tech' },
];

const quickLinks = [
  { label: 'About the Firm', href: '/about' },
  { label: 'Our Team', href: '/about#team' },
  { label: 'Client Portal', href: '/portal' },
  { label: 'Legal Resources', href: '/blog' },
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
];

export function Footer() {
  return (
    <footer className="bg-midnight border-t border-white/10">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-gold" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <div>
                <div className="font-serif text-xl font-bold text-white">Geoffrey Kabiaro</div>
                <div className="text-xs text-gold/70 font-medium tracking-widest uppercase">Advocate</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Kenya's premier digital-first law firm. Combining decades of legal expertise
              with cutting-edge technology to deliver superior outcomes.
            </p>
            <div className="flex gap-3">
              {['LinkedIn', 'Twitter', 'Facebook'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-gold hover:border-gold/30 hover:bg-gold/5 transition-all"
                  aria-label={social}
                >
                  <span className="text-xs font-bold">{social[0]}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Practice Areas */}
          <div>
            <h3 className="font-serif text-lg font-bold text-white mb-6">Practice Areas</h3>
            <ul className="space-y-2.5">
              {practiceAreas.map((area) => (
                <li key={area.slug}>
                  <Link
                    href={`/practice-areas/${area.slug}`}
                    className="text-sm text-gray-400 hover:text-gold transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-gold/40 group-hover:bg-gold transition-colors" />
                    {area.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-lg font-bold text-white mb-6">Quick Links</h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-gold transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-gold/40 group-hover:bg-gold transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-serif text-lg font-bold text-white mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="text-gold mt-0.5">📍</span>
                <div className="text-sm text-gray-400">
                  Westlands, Nairobi<br />
                  P.O. Box 00100, Kenya
                </div>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-gold">📞</span>
                <a href="tel:+254792530464" className="text-sm text-gray-400 hover:text-gold transition-colors">
                  +254 792 530 464
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-gold">✉️</span>
                <a href="mailto:info@geoffreykabiaro.co.ke" className="text-sm text-gray-400 hover:text-gold transition-colors">
                  info@geoffreykabiaro.co.ke
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-gold">💬</span>
                <a href="https://wa.me/254792530464" className="text-sm text-gray-400 hover:text-gold transition-colors">
                  WhatsApp Us
                </a>
              </li>
            </ul>

            <div className="mt-6 p-4 bg-gold/5 border border-gold/20 rounded-xl">
              <p className="text-xs text-gray-400 leading-relaxed">
                <span className="text-gold font-semibold">Admitted to the Bar:</span><br />
                Law Society of Kenya<br />
                East African Court of Justice
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} Geoffrey Kabiaro Advocate. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <span className="text-xs text-gray-600">
                Attorney-client privilege protected
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-600">Payments:</span>
                <span className="text-xs bg-white/5 border border-white/10 px-2 py-0.5 rounded text-gray-400">M-Pesa</span>
                <span className="text-xs bg-white/5 border border-white/10 px-2 py-0.5 rounded text-gray-400">Visa</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
