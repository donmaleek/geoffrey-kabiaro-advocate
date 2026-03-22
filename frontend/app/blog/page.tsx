'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import Link from 'next/link';
import { format } from 'date-fns';

const categories = ['All', 'Land Law', 'Corporate', 'Employment', 'Family Law', 'Tech & IP', 'Court Alerts'];

const posts = [
  {
    id: 1,
    title: 'The New Land (Amendment) Act 2023: What Every Property Owner in Kenya Must Know',
    excerpt: 'The amendments introduce sweeping changes to how land transactions are conducted, registered, and disputed. Here is a plain-language breakdown of what changed and how it affects you.',
    category: 'Land Law',
    date: new Date('2024-11-15'),
    readTime: '8 min read',
    featured: true,
    emoji: '🏠',
    tags: ['Land Law', 'Legislation Update'],
  },
  {
    id: 2,
    title: 'Supreme Court Ruling on Matrimonial Property: A Turning Point for Kenyan Families',
    excerpt: 'The apex court has clarified how courts should treat property acquired during marriage — and the implications go far beyond divorce proceedings.',
    category: 'Family Law',
    date: new Date('2024-10-28'),
    readTime: '6 min read',
    featured: false,
    emoji: '⚖️',
    tags: ['Family Law', 'Case Law'],
  },
  {
    id: 3,
    title: 'Registering a Company in Kenya in 2024: The Complete Step-by-Step Guide',
    excerpt: 'From choosing your entity type to obtaining your KRA PIN, PIN Certificate, and business permit — everything you need to get your business legally operational.',
    category: 'Corporate',
    date: new Date('2024-10-10'),
    readTime: '10 min read',
    featured: false,
    emoji: '🏢',
    tags: ['Corporate', 'Startups'],
  },
  {
    id: 4,
    title: 'Your Rights if Made Redundant in Kenya: The Employment Act Explained',
    excerpt: 'Redundancy is not a free pass for employers. The Employment Act mandates specific procedures, notice periods, and compensation. Know yours before you sign anything.',
    category: 'Employment',
    date: new Date('2024-09-20'),
    readTime: '7 min read',
    featured: false,
    emoji: '💼',
    tags: ['Employment', 'Workers Rights'],
  },
  {
    id: 5,
    title: 'Kenya Data Protection Act: Is Your Business Compliant? A 2024 Audit Checklist',
    excerpt: 'The Office of the Data Protection Commissioner is now actively issuing fines. This checklist covers the 12 things every Kenyan business must have in place.',
    category: 'Tech & IP',
    date: new Date('2024-09-05'),
    readTime: '9 min read',
    featured: false,
    emoji: '🔐',
    tags: ['Tech Law', 'Compliance'],
  },
  {
    id: 6,
    title: 'Court of Appeal Upholds Adverse Possession Claim: Key Lessons for Landowners',
    excerpt: 'A recent landmark decision clarifies the 12-year rule and how courts evaluate continuity of possession. What this means for both squatters and registered owners.',
    category: 'Land Law',
    date: new Date('2024-08-18'),
    readTime: '5 min read',
    featured: false,
    emoji: '📋',
    tags: ['Land Law', 'Case Law'],
  },
  {
    id: 7,
    title: 'Protecting Your Startup: The 5 Contracts Every Kenyan Tech Founder Needs',
    excerpt: 'Founders who neglect legal structure from day one are building on sand. These five agreements will protect your equity, your IP, and your relationships.',
    category: 'Tech & IP',
    date: new Date('2024-08-01'),
    readTime: '7 min read',
    featured: false,
    emoji: '💡',
    tags: ['Startups', 'Tech Law'],
  },
  {
    id: 8,
    title: 'Emergency Court Alert: New ELC Practice Directions on Land Injunctions',
    excerpt: 'The Environment and Land Court has issued revised practice directions governing how injunction applications are filed and heard. Effective immediately.',
    category: 'Court Alerts',
    date: new Date('2024-07-22'),
    readTime: '4 min read',
    featured: false,
    emoji: '🚨',
    tags: ['Court Alert', 'Urgent'],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.07 } }),
};

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [email, setEmail] = useState('');

  const featured = posts.find((p) => p.featured)!;
  const filtered = posts
    .filter((p) => !p.featured)
    .filter((p) => activeCategory === 'All' || p.category === activeCategory);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-midnight via-dark-navy to-navy/20" />
        <div className="absolute top-20 right-10 w-80 h-80 bg-gold/5 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 text-gold text-sm font-medium mb-6">
              Legal Insights · Published Weekly
            </div>
            <h1 className="font-serif text-5xl md:text-7xl font-bold text-white mb-6">
              Know the <span className="text-gold">Law</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Practical legal analysis for Kenyan individuals and businesses.
              No jargon — just clarity you can act on.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Article */}
      <section className="px-4 pb-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="group relative bg-gradient-to-br from-gold/10 to-gold/5 border border-gold/20 hover:border-gold/40 rounded-3xl overflow-hidden transition-all cursor-pointer"
          >
            <div className="grid lg:grid-cols-5 gap-0">
              {/* Thumbnail */}
              <div className="lg:col-span-2 bg-gradient-to-br from-navy to-midnight flex items-center justify-center p-16 min-h-64">
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="text-8xl"
                >
                  {featured.emoji}
                </motion.div>
              </div>

              {/* Content */}
              <div className="lg:col-span-3 p-10 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <Badge variant="warning">Featured</Badge>
                  <Badge variant="default">{featured.category}</Badge>
                  <span className="text-xs text-gray-500">{featured.readTime}</span>
                </div>
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-gold transition-colors leading-snug">
                  {featured.title}
                </h2>
                <p className="text-gray-400 leading-relaxed mb-6">{featured.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gold/20 border border-gold/30 flex items-center justify-center text-xs font-bold text-gold">
                      GK
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">Geoffrey Kabiaro</div>
                      <div className="text-xs text-gray-500">{format(featured.date, 'MMMM d, yyyy')}</div>
                    </div>
                  </div>
                  <Button variant="primary" size="sm">Read Article →</Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Category Filter */}
          <div className="flex gap-2 flex-wrap mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? 'bg-gold text-navy'
                    : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-white/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Articles Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((post, i) => (
              <motion.article
                key={post.id}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                className="group bg-white/3 border border-white/8 hover:border-gold/30 hover:bg-gold/3 rounded-2xl overflow-hidden transition-all cursor-pointer"
              >
                <div className="h-40 bg-gradient-to-br from-navy to-midnight flex items-center justify-center text-5xl">
                  {post.emoji}
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant={post.category === 'Court Alerts' ? 'danger' : 'default'}>
                      {post.category}
                    </Badge>
                    <span className="text-xs text-gray-600">{post.readTime}</span>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-white mb-2 group-hover:text-gold transition-colors leading-snug line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-600">
                    <span>{format(post.date, 'MMM d, yyyy')}</span>
                    <span className="text-gold/70 group-hover:text-gold transition-colors">Read more →</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 px-4 bg-gradient-to-b from-midnight to-dark-navy border-t border-white/5">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="text-4xl mb-4">📬</div>
            <h2 className="font-serif text-3xl font-bold text-white mb-3">
              Stay Ahead of the Law
            </h2>
            <p className="text-gray-400 mb-8">
              Get new legal insights and court alerts delivered to your inbox every Friday.
              Unsubscribe anytime.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-gold/50 text-sm"
              />
              <Button variant="primary" onClick={() => setEmail('')}>
                Subscribe
              </Button>
            </div>
            <p className="text-xs text-gray-600 mt-3">
              Join 2,400+ subscribers. No spam, ever.
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
