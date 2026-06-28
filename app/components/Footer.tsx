'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="relative w-full border-t border-blue-500/10 py-12 px-4 z-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-gray-100 font-bold mb-4">Product</h3>
            <div className="space-y-2">
              <p className="text-gray-400 hover:text-blue-400 cursor-pointer transition-colors text-sm">
                Features
              </p>
              <p className="text-gray-400 hover:text-blue-400 cursor-pointer transition-colors text-sm">
                Pricing
              </p>
              <p className="text-gray-400 hover:text-blue-400 cursor-pointer transition-colors text-sm">
                Documentation
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-gray-100 font-bold mb-4">Company</h3>
            <div className="space-y-2">
              <p className="text-gray-400 hover:text-blue-400 cursor-pointer transition-colors text-sm">
                About
              </p>
              <p className="text-gray-400 hover:text-blue-400 cursor-pointer transition-colors text-sm">
                Blog
              </p>
              <p className="text-gray-400 hover:text-blue-400 cursor-pointer transition-colors text-sm">
                Careers
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-gray-100 font-bold mb-4">Legal</h3>
            <div className="space-y-2">
              <p className="text-gray-400 hover:text-blue-400 cursor-pointer transition-colors text-sm">
                Privacy
              </p>
              <p className="text-gray-400 hover:text-blue-400 cursor-pointer transition-colors text-sm">
                Terms
              </p>
              <p className="text-gray-400 hover:text-blue-400 cursor-pointer transition-colors text-sm">
                Risk
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-gray-100 font-bold mb-4">Connect</h3>
            <div className="space-y-2">
              <p className="text-gray-400 hover:text-blue-400 cursor-pointer transition-colors text-sm">
                Twitter
              </p>
              <p className="text-gray-400 hover:text-blue-400 cursor-pointer transition-colors text-sm">
                Discord
              </p>
              <p className="text-gray-400 hover:text-blue-400 cursor-pointer transition-colors text-sm">
                GitHub
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-blue-500/10 pt-8">
          <p className="text-gray-500 text-center text-sm">
            © 2026 Obsidian Abyss. Nothing here is financial advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
