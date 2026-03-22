'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Video {
  id: string;
  title: string;
  topic: string;
  duration: string;
  thumbnail: string;
  views: string;
  description: string;
}

const videos: Video[] = [
  {
    id: '1',
    title: 'Understanding Land Ownership in Kenya: What Every Property Buyer Must Know',
    topic: 'Land Law',
    duration: '1:52',
    thumbnail: '🏠',
    views: '12.4K',
    description: 'Critical checks before buying land — title search, caution searches, and fraud prevention.',
  },
  {
    id: '2',
    title: 'How to Register a Company in Kenya in 2024',
    topic: 'Corporate Law',
    duration: '1:45',
    thumbnail: '🏢',
    views: '8.7K',
    description: 'Step-by-step guide to company formation, from BRS to KRA PIN registration.',
  },
  {
    id: '3',
    title: 'Employment Rights You Did Not Know You Had',
    topic: 'Employment Law',
    duration: '1:58',
    thumbnail: '💼',
    views: '15.2K',
    description: 'NSSF, NHIF, wrongful dismissal claims, and redundancy packages explained.',
  },
  {
    id: '4',
    title: 'Writing a Valid Will in Kenya: Common Mistakes to Avoid',
    topic: 'Succession',
    duration: '1:34',
    thumbnail: '📝',
    views: '9.1K',
    description: 'Ensure your estate is distributed as intended — what makes a will legally binding.',
  },
  {
    id: '5',
    title: 'Protecting Your Brand: Trademark Registration in Kenya',
    topic: 'IP Law',
    duration: '1:41',
    thumbnail: '™️',
    views: '6.8K',
    description: 'KEPI registration, passing off, and brand protection strategies for businesses.',
  },
  {
    id: '6',
    title: 'Divorce & Asset Division Under Kenyan Law',
    topic: 'Family Law',
    duration: '1:47',
    thumbnail: '⚖️',
    views: '22.3K',
    description: 'How courts approach matrimonial property, child custody, and maintenance orders.',
  },
];

export function VideoCarousel() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const itemsPerView = 3;
  const maxIndex = Math.max(0, videos.length - itemsPerView);

  const scroll = (direction: 'prev' | 'next') => {
    setCurrentIndex((prev) =>
      direction === 'next' ? Math.min(prev + 1, maxIndex) : Math.max(prev - 1, 0)
    );
  };

  return (
    <div className="relative">
      {/* Navigation */}
      <div className="flex justify-end gap-3 mb-8">
        <button
          onClick={() => scroll('prev')}
          disabled={currentIndex === 0}
          className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:border-gold hover:text-gold disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          ←
        </button>
        <button
          onClick={() => scroll('next')}
          disabled={currentIndex === maxIndex}
          className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:border-gold hover:text-gold disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          →
        </button>
      </div>

      {/* Cards */}
      <div className="overflow-hidden" ref={containerRef}>
        <motion.div
          className="flex gap-6"
          animate={{ x: `calc(-${currentIndex} * (100% / ${itemsPerView} + 8px))` }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          {videos.map((video) => (
            <motion.div
              key={video.id}
              className="flex-none w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] cursor-pointer group"
              whileHover={{ y: -4 }}
              onClick={() => setActiveVideo(video.id === activeVideo ? null : video.id)}
            >
              {/* Thumbnail */}
              <div className="relative aspect-video bg-gradient-to-br from-navy to-midnight rounded-xl border border-white/10 group-hover:border-gold/30 transition-all overflow-hidden mb-4">
                <div className="absolute inset-0 flex items-center justify-center text-6xl">
                  {video.thumbnail}
                </div>
                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-gold/20 backdrop-blur-sm border border-gold/50 flex items-center justify-center group-hover:bg-gold/40 group-hover:scale-110 transition-all">
                    <svg className="w-6 h-6 text-gold ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
                {/* Duration */}
                <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm rounded px-2 py-0.5 text-xs text-white font-medium">
                  {video.duration}
                </div>
                {/* Topic badge */}
                <div className="absolute top-3 left-3 bg-gold/20 backdrop-blur-sm border border-gold/30 rounded-full px-3 py-0.5 text-xs text-gold font-medium">
                  {video.topic}
                </div>
              </div>

              {/* Info */}
              <div>
                <h4 className="font-medium text-white text-sm leading-snug mb-2 group-hover:text-gold transition-colors line-clamp-2">
                  {video.title}
                </h4>
                <p className="text-xs text-gray-500 mb-2 line-clamp-2">{video.description}</p>
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <span>👁 {video.views} views</span>
                  <span>·</span>
                  <span>Geoffrey Kabiaro Advocate</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Progress dots */}
      <div className="flex justify-center gap-2 mt-8">
        {Array.from({ length: maxIndex + 1 }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === currentIndex ? 'w-6 bg-gold' : 'w-1.5 bg-white/20 hover:bg-white/40'
            }`}
          />
        ))}
      </div>

      {/* CTA */}
      <div className="text-center mt-10">
        <p className="text-sm text-gray-400 mb-4">
          New legal insights every week — subscribe for alerts
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gold/50 text-sm"
          />
          <button className="px-6 py-2.5 bg-gold text-navy font-semibold rounded-lg hover:bg-gold-light transition-colors text-sm whitespace-nowrap">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
}
