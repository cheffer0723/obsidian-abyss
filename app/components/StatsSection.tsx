'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { number: '3', label: 'Research Engines' },
  { number: '7', label: 'Market Pairs' },
  { number: '~20yr', label: 'Verified Data' },
  { number: '0', label: 'Custody Risk' },
];

export default function StatsSection() {
  const statsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      statsRef.current.forEach((stat, i) => {
        if (!stat) return;

        gsap.from(stat, {
          duration: 0.8,
          opacity: 0,
          y: 30,
          delay: i * 0.1,
          scrollTrigger: {
            trigger: stat,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="relative w-full py-20 px-4 z-10 border-t border-blue-500/10">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-100 mb-16 tracking-tight">
          BUILT ON DEPTH
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div
              key={i}
              ref={(el) => {
                statsRef.current[i] = el;
              }}
              className="text-center group cursor-pointer"
            >
              <div className="text-5xl md:text-6xl font-bold text-blue-400 mb-3 group-hover:text-blue-300 group-hover:scale-110 transition-all duration-300">
                {stat.number}
              </div>
              <p className="text-gray-400 text-sm md:text-base uppercase tracking-widest font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
