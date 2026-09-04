"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Twitter } from "lucide-react";
import { SOCIAL } from "@/lib/data";
import Typewriter from "./Typewriter";

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden grid-bg pt-32 pb-24">
      <motion.div className="absolute w-72 h-72 rounded-full blur-3xl opacity-30 top-10 -left-10 bg-accent-violet animate-floatSlow" />
      <motion.div className="absolute w-80 h-80 rounded-full blur-3xl opacity-20 bottom-0 right-0 bg-accent-teal animate-floatSlow2" />

      {/* Adjusted padding to px-4 sm:px-6 and centered content */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-12 items-center">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.p
            variants={item}
            className="text-accent-teal text-sm font-medium mb-4"
          >
            Hi, I&apos;m Muhammad Rafay
          </motion.p>
          <motion.h1
            variants={item}
            className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight mb-4"
          >
            I build fast, clean web
            <br /> interfaces that work.
          </motion.h1>
          <motion.p
            variants={item}
            className="text-lg text-slate-300 h-8 mb-6 font-mono"
          >
            <Typewriter />
          </motion.p>
          <motion.p
            variants={item}
            className="text-slate-400 max-w-md mb-8 leading-relaxed"
          >
            BS Computer Science graduate from KUST, focused on React and
            Next.js. I turn designs into responsive, production-ready interfaces
            — and I like wiring real APIs and AI behind them, like in my
            NutriSmart project.
          </motion.p>

          <motion.div variants={item} className="flex flex-wrap gap-4 mb-8">
            {/* Smooth Gradient Button */}
            <button
              onClick={() => scrollTo("projects")}
              className="px-6 py-3 rounded-full font-medium text-base text-white shadow-lg bg-gradient-to-r from-accent-violet via-accent-teal to-accent-violet bg-[length:200%_auto] transition-all duration-500 ease-in-out hover:bg-right hover:scale-105 active:scale-95"
            >
              View Projects
            </button>

            {/* Smooth Border & Text Hover Button */}
            <button
              onClick={() => scrollTo("contact")}
              className="px-6 py-3 rounded-full font-medium border border-slate-700 text-slate-300 hover:border-accent-teal hover:text-accent-teal hover:bg-accent-teal/5 transition-all duration-300 ease-out hover:scale-105 active:scale-95"
            >
              Contact Me
            </button>
          </motion.div>

          {/* Smooth Social Icons Hover */}
          <motion.div variants={item} className="flex gap-5 text-slate-400">
            <a
              href={SOCIAL.github}
              target="_blank"
              rel="noreferrer"
              className="hover:text-accent-teal transition-colors duration-300 ease-in-out transform hover:-translate-y-1"
            >
              <Github size={20} />
            </a>
            <a
              href={SOCIAL.linkedin}
              target="_blank"
              rel="noreferrer"
              className="hover:text-accent-teal transition-colors duration-300 ease-in-out transform hover:-translate-y-1"
            >
              <Linkedin size={20} />
            </a>
            <a
              href={SOCIAL.twitter}
              target="_blank"
              rel="noreferrer"
              className="hover:text-accent-teal transition-colors duration-300 ease-in-out transform hover:-translate-y-1"
            >
              <Twitter size={20} />
            </a>
          </motion.div>
        </motion.div>

        {/* Code Box Container - Centered and Responsive */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          className="w-full flex justify-center"
        >
          <div className="w-full max-w-lg rounded-2xl border border-slate-800 shadow-2xl overflow-hidden bg-surface">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-800">
              <span className="w-3 h-3 rounded-full bg-red-500/70" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <span className="w-3 h-3 rounded-full bg-green-500/70" />
              <span className="ml-3 text-xs text-slate-500 font-mono">
                rafay.dev — profile.ts
              </span>
            </div>

            {/* Adjusted padding (p-4 sm:p-6) & dynamic text sizes (text-xs sm:text-sm) */}
            <pre className="p-4 sm:p-6 text-xs sm:text-sm leading-normal sm:leading-relaxed font-mono overflow-x-auto w-full">
              <code>
                <span className="text-ink-muted">{"// muhammad rafay"}</span>
                {"\n"}
                <span className="text-accent-violet">const</span>{" "}
                <span className="text-accent-teal">developer</span> = {"{"}
                {"\n"}
                {"  "}role:{" "}
                <span className="text-accent-amber">
                  &quot;Front-End Developer&quot;
                </span>
                ,{"\n"}
                {"  "}stack: [
                <span className="text-accent-amber">&quot;React&quot;</span>,{" "}
                <span className="text-accent-amber">&quot;Next.js&quot;</span>,{" "}
                <span className="text-accent-amber">
                  &quot;TypeScript&quot;
                </span>
                ],{"\n"}
                {"  "}cgpa: <span className="text-accent-teal">3.68</span>,
                {"\n"}
                {"  "}basedIn:{" "}
                <span className="text-accent-amber">
                  &quot;Kohat, Pakistan&quot;
                </span>
                ,{"\n"}
                {"  "}openTo:{" "}
                <span className="text-accent-amber">
                  &quot;new opportunities&quot;
                </span>
                ,{"\n"}
                {"}"};{"\n"}
              </code>
            </pre>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
