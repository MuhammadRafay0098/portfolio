"use client";

import { useState } from "react";
import { NAV } from "@/lib/data";
import { Menu, X, FileText } from "lucide-react";

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (id: string) => {
    scrollTo(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-slate-800/80">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => handleNavClick("top")}
          className="font-semibold tracking-tight text-lg text-slate-100 hover:text-accent-teal transition-colors duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-teal rounded-md"
        >
          Muhammad<span className="text-accent-teal">Rafay</span>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm text-slate-300">
          {NAV.map((item) => (
            <button
              key={item}
              onClick={() => handleNavClick(item.toLowerCase())}
              className="hover:text-accent-teal transition-colors duration-300 ease-in-out relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-accent-teal hover:after:w-full after:transition-all after:duration-300"
            >
              {item}
            </button>
          ))}
        </nav>

        {/* Desktop Action Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {/* Resume Button */}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm px-4 py-2 rounded-full bg-slate-900 border border-slate-700 text-slate-200 hover:border-accent-teal hover:text-accent-teal hover:bg-slate-800/60 hover:scale-105 active:scale-95 transition-all duration-300 ease-out"
          >
            <FileText size={15} />
            Resume
          </a>

          {/* Get in Touch Button */}
          <button
            onClick={() => handleNavClick("contact")}
            className="text-sm px-4 py-2 rounded-full bg-accent-teal/10 border border-accent-teal/40 text-accent-teal hover:bg-accent-teal hover:text-slate-950 font-medium hover:scale-105 active:scale-95 transition-all duration-300 ease-out shadow-sm hover:shadow-accent-teal/20"
          >
            Get in touch
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-slate-300 hover:text-accent-teal p-2 focus:outline-none transition-colors duration-300"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Smooth Animated Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out border-b border-slate-800/80 bg-slate-950/95 backdrop-blur-xl ${
          mobileMenuOpen
            ? "max-h-[400px] opacity-100 py-6 px-6"
            : "max-h-0 opacity-0 py-0 px-6 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col gap-4 text-base text-slate-300">
          {NAV.map((item) => (
            <button
              key={item}
              onClick={() => handleNavClick(item.toLowerCase())}
              className="text-left py-1 hover:text-accent-teal hover:translate-x-1 transition-all duration-300 ease-out"
            >
              {item}
            </button>
          ))}
        </nav>

        <div className="pt-4 mt-4 border-t border-slate-800 flex flex-col gap-3">
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 text-sm py-2.5 rounded-full bg-slate-900 border border-slate-700 text-slate-200 hover:border-accent-teal hover:text-accent-teal transition-all duration-300 ease-out active:scale-95"
          >
            <FileText size={16} />
            View Resume
          </a>

          <button
            onClick={() => handleNavClick("contact")}
            className="w-full text-center text-sm py-2.5 rounded-full bg-accent-teal text-slate-950 font-medium hover:bg-teal-300 transition-all duration-300 ease-out active:scale-95"
          >
            Get in touch
          </button>
        </div>
      </div>
    </header>
  );
}
