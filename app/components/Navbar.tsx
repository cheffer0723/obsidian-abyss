'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-blue-500/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="group">
            <div className="text-lg font-bold tracking-widest text-gray-200 transition-all duration-300 hover:text-blue-400 hover:drop-shadow-lg">
              OBSIDIAN ABYSS
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 items-center">
            <Link href="#features" className="text-gray-400 hover:text-blue-400 text-sm font-medium transition-colors duration-300">
              Features
            </Link>
            <Link href="#about" className="text-gray-400 hover:text-blue-400 text-sm font-medium transition-colors duration-300">
              About
            </Link>
            <Link href="#pricing" className="text-gray-400 hover:text-blue-400 text-sm font-medium transition-colors duration-300">
              Pricing
            </Link>
            <button className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold text-sm hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300">
              Get Access
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-400 hover:text-blue-400 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-6 border-t border-blue-500/15">
            <div className="flex flex-col gap-4 pt-4">
              <Link href="#features" className="text-gray-400 hover:text-blue-400 text-sm font-medium transition-colors">
                Features
              </Link>
              <Link href="#about" className="text-gray-400 hover:text-blue-400 text-sm font-medium transition-colors">
                About
              </Link>
              <Link href="#pricing" className="text-gray-400 hover:text-blue-400 text-sm font-medium transition-colors">
                Pricing
              </Link>
              <button className="w-full px-6 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold text-sm">
                Get Access
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
