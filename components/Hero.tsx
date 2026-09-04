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

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-10 md:gap-12 items-center">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.p
            variants={item}
            className="text-accent-teal text-sm font-medium mb-4"
          >
            Hi, I&apos;m Muhammad Rafay
          </motion.p>
          <motion.h1
            variants={item}
            className="text-3xl min-[380px]:text-4xl sm:text-5xl font-bold tracking-tight leading-tight mb-4"
          >
            I build fast, clean web
            <br /> interfaces that work.
          </motion.h1>
          <motion.p
            variants={item}
            className="text-base min-[380px]:text-lg text-slate-300 h-8 mb-6 font-mono"
          >
            <Typewriter />
          </motion.p>
          <motion.p
            variants={item}
            className="text-slate-400 max-w-md mb-8 leading-relaxed text-sm min-[380px]:text-base"
          >
            BS Computer Science graduate from KUST, focused on React and
            Next.js. I turn designs into responsive, production-ready interfaces
            — and I like wiring real APIs and AI behind them, like in my
            NutriSmart project.
          </motion.p>

          {/* Clean Inline Layout for Buttons */}
          <motion.div
            variants={item}
            className="flex flex-row items-center flex-wrap gap-3 min-[380px]:gap-4 mb-8"
          >
            <button
              onClick={() => scrollTo("projects")}
              className="px-5 min-[380px]:px-6 py-3 rounded-full font-medium text-sm min-[380px]:text-base text-white shadow-lg bg-gradient-to-r from-accent-violet via-accent-teal to-accent-violet bg-[length:200%_auto] transition-all duration-500 ease-in-out hover:bg-right hover:scale-105 active:scale-95 whitespace-nowrap"
            >
              View Projects
            </button>

            <button
              onClick={() => scrollTo("contact")}
              className="px-5 min-[380px]:px-6 py-3 rounded-full font-medium text-sm min-[380px]:text-base border border-slate-500 bg-slate-900/90 !text-slate-200 hover:border-accent-teal hover:!text-accent-teal hover:bg-accent-teal/10 transition-all duration-300 ease-out hover:scale-105 active:scale-95 whitespace-nowrap shadow-md"
            >
              Contact Me
            </button>
          </motion.div>

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

        {/* Code Box Container */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          className="w-full flex justify-center px-0"
        >
          <div className="w-full max-w-lg rounded-2xl border border-slate-800 shadow-2xl overflow-hidden bg-surface mx-auto">
            <div className="flex items-center gap-1.5 min-[380px]:gap-2 px-3 min-[380px]:px-4 py-3 border-b border-slate-800">
              <span className="w-2.5 h-2.5 min-[380px]:w-3 min-[380px]:h-3 rounded-full bg-red-500/70 shrink-0" />
              <span className="w-2.5 h-2.5 min-[380px]:w-3 min-[380px]:h-3 rounded-full bg-yellow-500/70 shrink-0" />
              <span className="w-2.5 h-2.5 min-[380px]:w-3 min-[380px]:h-3 rounded-full bg-green-500/70 shrink-0" />
              <span className="ml-2 min-[380px]:ml-3 text-[10px] min-[380px]:text-xs text-slate-500 font-mono truncate">
                rafay.dev — profile.ts
              </span>
            </div>

            <pre className="p-3 min-[380px]:p-4 sm:p-6 text-[10px] min-[380px]:text-xs sm:text-sm leading-relaxed font-mono whitespace-pre-wrap break-words w-full overflow-x-auto">
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
                {"}"};
              </code>
            </pre>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
