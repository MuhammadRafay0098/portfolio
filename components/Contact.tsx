"use client";

import { useState } from "react";
import {
  Mail,
  Phone,
  Github,
  Linkedin,
  Twitter,
  ArrowUpRight,
  Copy,
  Check,
} from "lucide-react";
import { SOCIAL } from "@/lib/data";
import Reveal from "./Reveal";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(SOCIAL.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="contact"
      className="py-28 border-t border-slate-900 relative overflow-hidden"
    >
      <div className="absolute w-96 h-96 rounded-full blur-3xl opacity-15 -bottom-20 left-1/2 -translate-x-1/2 bg-accent-violet pointer-events-none" />
      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <Reveal>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 text-slate-100">
            Let&apos;s build something.
          </h2>

          <p className="text-cyan-200/90 font-medium mb-10 max-w-md mx-auto text-sm leading-relaxed tracking-wide">
            I&apos;m currently open to front-end / React developer roles. Reach
            out — I usually reply within a day.
          </p>

          <div className="flex flex-wrap justify-center items-center gap-4 mb-10">
            {/* Smooth Animated Copy Email Button */}
            <button
              onClick={handleCopyEmail}
              className="px-6 py-3 rounded-full font-medium text-sm flex items-center gap-2 bg-gradient-to-r from-accent-violet via-accent-teal to-accent-violet bg-[length:200%_auto] text-slate-950 shadow-lg shadow-accent-teal/10 hover:shadow-accent-teal/25 transition-all duration-500 ease-in-out hover:bg-right hover:scale-105 active:scale-95"
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? "Email Copied!" : SOCIAL.email}
            </button>

            {/* Smooth Phone Button */}
            <a
              href={`tel:${SOCIAL.phone.replace(/\s+/g, "")}`}
              className="px-6 py-3 rounded-full font-medium text-sm border border-slate-800 bg-slate-900/60 text-slate-300 hover:border-accent-teal hover:text-accent-teal hover:bg-accent-teal/5 transition-all duration-300 ease-out hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <Phone size={16} /> {SOCIAL.phone}
            </a>
          </div>

          {/* Social Links with Smooth Hover & Micro-animations */}
          <div className="flex justify-center gap-6 text-sm text-slate-400">
            <a
              href={SOCIAL.github}
              target="_blank"
              rel="noreferrer"
              className="hover:text-accent-teal transition-all duration-300 ease-in-out hover:-translate-y-0.5 flex items-center gap-1 group"
            >
              <Github size={18} /> GitHub{" "}
              <ArrowUpRight
                size={12}
                className="transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
            <a
              href={SOCIAL.linkedin}
              target="_blank"
              rel="noreferrer"
              className="hover:text-accent-teal transition-all duration-300 ease-in-out hover:-translate-y-0.5 flex items-center gap-1 group"
            >
              <Linkedin size={18} /> LinkedIn{" "}
              <ArrowUpRight
                size={12}
                className="transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
            <a
              href={SOCIAL.twitter}
              target="_blank"
              rel="noreferrer"
              className="hover:text-accent-teal transition-all duration-300 ease-in-out hover:-translate-y-0.5 flex items-center gap-1 group"
            >
              <Twitter size={18} /> X{" "}
              <ArrowUpRight
                size={12}
                className="transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
