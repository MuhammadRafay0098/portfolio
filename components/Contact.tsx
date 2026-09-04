"use client";

import { useState } from "react";
import {
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

  // Generate WhatsApp direct chat link using the phone number
  const whatsappUrl =
    SOCIAL.whatsapp ||
    `https://wa.me/${SOCIAL.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
      "Hi Muhammad Rafay, I saw your portfolio and would like to connect!",
    )}`;

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

            {/* Direct WhatsApp Redirect Phone Button */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contact on WhatsApp"
              className="px-6 py-3 rounded-full font-medium text-sm border border-slate-800 bg-slate-900/60 text-slate-300 hover:border-emerald-500/50 hover:text-emerald-400 hover:bg-emerald-500/5 transition-all duration-300 ease-out hover:scale-105 active:scale-95 flex items-center gap-2 group"
            >
              <Phone
                size={16}
                className="group-hover:text-emerald-400 transition-colors duration-300"
              />
              <span>{SOCIAL.phone}</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 ml-1">
                WhatsApp
              </span>
            </a>
          </div>

          {/* Social Links */}
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
