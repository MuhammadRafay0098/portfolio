"use client";

import Image from "next/image";
import Reveal from "./Reveal";

export default function About() {
  return (
    <section id="about" className="py-24 border-t border-slate-900 relative">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          {/* Main Large Section Heading on Top */}
          <div className="mb-12">
            <h2 className="text-3xl text-center sm:text-5xl font-bold tracking-tight text-slate-100">
              About <span className="text-accent-teal">Me.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-12 gap-12 items-center">
            {/* Image Container with Glow Effect */}
            <div className="md:col-span-5 relative group">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-accent-violet to-accent-teal opacity-30 blur-lg group-hover:opacity-60 transition-opacity duration-500" />
              <div className="relative aspect-square rounded-2xl overflow-hidden border border-slate-800 bg-surface">
                <Image
                  src="/profilepic.jpg"
                  alt="Muhammad Rafay"
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  priority
                />
              </div>
            </div>

            {/* About Content */}
            <div className="md:col-span-7">
              <h3 className="text-xl sm:text-2xl font-semibold tracking-tight mb-4 text-slate-200">
                Driven by clean code & user-centric design.
              </h3>

              <div className="space-y-4 text-slate-300 text-justify leading-relaxed text-base">
                <p>
                  I recently graduated with a BS in Computer Science from Kohat
                  University of Science & Technology (CGPA 3.68). My primary
                  focus lies in building modern, performant web applications
                  using modern JavaScript frameworks.
                </p>
                <p>
                  I specialize in turning complex requirements into clean,
                  interactive user interfaces. Whether it&apos;s integrating
                  REST APIs, implementing dynamic state management, or refining
                  responsive design down to the pixel, I aim for exceptional
                  quality in every project.
                </p>
              </div>

              {/* Quick Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8 pt-6 border-t border-slate-800/80">
                <div className="p-4 rounded-xl bg-surface/50 border border-slate-800/60 hover:border-accent-teal/40 transition-colors duration-300">
                  <p className="text-2xl font-bold text-slate-100">BS CS</p>
                  <p className="text-xs text-slate-400 mt-1 font-mono">
                    Degree (KUST)
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-surface/50 border border-slate-800/60 hover:border-accent-teal/40 transition-colors duration-300">
                  <p className="text-2xl font-bold text-accent-teal">3.68</p>
                  <p className="text-xs text-slate-400 mt-1 font-mono">
                    Academic CGPA
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-surface/50 border border-slate-800/60 hover:border-accent-teal/40 transition-colors duration-300 col-span-2 sm:col-span-1">
                  <p className="text-2xl font-bold text-slate-100">
                    React/Next
                  </p>
                  <p className="text-xs text-slate-400 mt-1 font-mono">
                    Core Tech Stack
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
