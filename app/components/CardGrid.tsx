'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowRight } from 'lucide-react';

const cards = [
  {
    title: 'Charon',
    icon: '🧭',
    description: 'Your guide through the unknown. Research framing without bias.',
    link: '#charon',
  },
  {
    title: 'Cerberus',
    icon: '⚙️',
    description: 'Three-headed regime detector. Live signals. Validated patterns.',
    link: '#cerberus',
  },
  {
    title: 'Flow',
    icon: '🌊',
    description: 'Ask → Read → Test → Decide. You own every decision.',
    link: '#flow',
  },
  {
    title: 'Non-Custodial',
    icon: '🔐',
    description: 'Your keys. Your capital. Complete autonomy.',
    link: '#noncustodial',
  },
  {
    title: 'Backtest',
    icon: '📊',
    description: '20 years of real data. See wins and losses.',
    link: '#backtest',
  },
  {
    title: 'Access',
    icon: '✨',
    description: '$9.99/month. Everything included. No surprises.',
    link: '#access',
  },
];

export default function CardGrid() {
  const cardsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, i) => {
        if (!card) return;

        // Initial animation
        gsap.from(card, {
          duration: 0.8,
          opacity: 0,
          y: 50,
          delay: i * 0.1,
          ease: 'power2.out',
        });

        // Hover effect
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            duration: 0.3,
            y: -10,
            boxShadow: '0 20px 50px rgba(100, 150, 255, 0.15)',
            ease: 'power2.out',
          });
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            duration: 0.3,
            y: 0,
            boxShadow: '0 0 0px rgba(100, 150, 255, 0)',
            ease: 'power2.out',
          });
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="features" className="relative w-full py-20 px-4 z-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-100 mb-4 tracking-tight">
            EXPLORE THE ABYSS
          </h2>
          <p className="text-gray-400 text-lg">Six depths of market research</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <a
              key={i}
              href={card.link}
              ref={(el) => {
                cardsRef.current[i] = el;
              }}
              className="group relative bg-blue-950/10 border border-blue-500/15 rounded-xl p-8 backdrop-blur-sm cursor-pointer transition-all duration-300 hover:border-blue-500/40 hover:bg-blue-950/20"
            >
              <div className="mb-6 text-4xl">{card.icon}</div>
              <h3 className="text-xl font-bold text-gray-100 mb-3 group-hover:text-blue-400 transition-colors">
                {card.title}
              </h3>
              <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                {card.description}
              </p>
              <div className="flex items-center text-blue-400 font-semibold text-sm group-hover:gap-2 gap-1 transition-all">
                Explore <ArrowRight size={16} />
              </div>

              {/* Hover border glow */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
