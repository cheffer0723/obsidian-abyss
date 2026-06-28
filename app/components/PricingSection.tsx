'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function PricingSection() {
  const priceRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(priceRef.current, {
        duration: 1,
        opacity: 0,
        scale: 0.9,
        ease: 'power2.out',
      });

      gsap.from(ctaRef.current, {
        duration: 1,
        opacity: 0,
        y: 20,
        delay: 0.3,
        ease: 'power2.out',
      });

      // Pulse animation on price
      gsap.to(priceRef.current, {
        duration: 2,
        textShadow: '0 0 30px rgba(100, 150, 255, 0.4)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="pricing" className="relative w-full py-20 px-4 z-10">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-100 mb-6 tracking-tight">
          ONE PRICE
        </h2>
        <p className="text-gray-400 text-lg mb-12">
          Everything. No hidden tiers. No surprises.
        </p>

        <div
          ref={priceRef}
          className="mb-12"
        >
          <div className="text-7xl md:text-8xl font-bold text-blue-400 mb-2">
            $9.99
          </div>
          <p className="text-gray-400 text-xl">per month</p>
        </div>

        <button
          ref={ctaRef}
          className="px-12 py-5 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold text-lg rounded-lg hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-105 mb-16"
        >
          DESCEND DEEPER
        </button>

        <div className="bg-blue-950/10 border border-blue-500/15 rounded-xl p-8 backdrop-blur-sm text-left">
          <h3 className="text-xl font-bold text-gray-100 mb-6">What's Included</h3>
          <div className="space-y-4">
            <div>
              <p className="font-semibold text-gray-200 mb-2">Research Platform</p>
              <p className="text-gray-400 text-sm">Live regime signals, real-time validation, multi-engine analysis</p>
            </div>
            <div>
              <p className="font-semibold text-gray-200 mb-2">Backtesting Lab</p>
              <p className="text-gray-400 text-sm">20 years of verified data, walk-forward validation, realistic costs</p>
            </div>
            <div>
              <p className="font-semibold text-gray-200 mb-2">Research Companion</p>
              <p className="text-gray-400 text-sm">Charon advisor, market structure insights, strategy guidance</p>
            </div>
            <div>
              <p className="font-semibold text-gray-200 mb-2">Complete Access</p>
              <p className="text-gray-400 text-sm">No paywalls, API access, data export, priority support</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
