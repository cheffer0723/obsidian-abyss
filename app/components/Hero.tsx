'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        duration: 1,
        opacity: 0,
        y: 50,
        ease: 'power2.out',
      });

      gsap.from(subtitleRef.current, {
        duration: 1,
        opacity: 0,
        y: 30,
        delay: 0.2,
        ease: 'power2.out',
      });

      gsap.from(ctaRef.current, {
        duration: 1,
        opacity: 0,
        scale: 0.9,
        delay: 0.4,
        ease: 'power2.out',
      });

      // Hover glow effect
      gsap.to(titleRef.current, {
        duration: 3,
        textShadow: '0 0 20px rgba(100, 150, 255, 0.6)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center pt-20 px-4 z-10">
      <div className="text-center max-w-3xl mx-auto">
        <h1
          ref={titleRef}
          className="text-5xl md:text-7xl font-bold text-gray-100 mb-6 tracking-tight"
        >
          Read the Regime
          <br />
          <span className="text-blue-400">Then Prove It</span>
        </h1>

        <p
          ref={subtitleRef}
          className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          Descend into market clarity. Cerberus reads regime patterns. Backtest against 20 years of real data. Non-custodial. Transparent. Pure signal.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            ref={ctaRef}
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-lg hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-105"
          >
            EXPLORE THE ABYSS
          </button>
          <button className="px-8 py-4 border-2 border-blue-500/30 text-blue-400 font-bold rounded-lg hover:border-blue-500 hover:bg-blue-500/10 transition-all duration-300">
            LEARN MORE
          </button>
        </div>
      </div>
    </section>
  );
}
