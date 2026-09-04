"use client";

import { EXPERIENCE } from "@/lib/data";
import { Briefcase, CheckCircle2 } from "lucide-react";
import Reveal from "./Reveal";

export default function Experience() {
  return (
    <section
      id="experience"
      className="py-24 border-t border-slate-900 relative"
    >
      <div className="max-w-4xl mx-auto px-6">
        <Reveal>
          {/* Main Large Section Heading */}
          <div className="mb-12">
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-100">
              Work <span className="text-accent-teal">Experience.</span>
            </h2>
          </div>
        </Reveal>

        {/* Timeline List */}
        <div className="relative border-l border-slate-800/80 ml-4 space-y-10">
          {EXPERIENCE.map((item) => (
            <Reveal key={item.role}>
              <div className="relative pl-8 group">
                {/* Timeline Node Point */}
                <span className="absolute -left-[17px] top-1 w-8 h-8 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-400 group-hover:border-accent-teal group-hover:text-accent-teal transition-all duration-300 group-hover:scale-110">
                  <Briefcase size={14} />
                </span>

                <div className="p-6 rounded-2xl bg-surface border border-slate-800/80 group-hover:border-slate-700 transition-all duration-300">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <h3 className="text-lg font-bold text-slate-100 group-hover:text-accent-teal transition-colors duration-300">
                      {item.role}
                    </h3>
                    <span className="text-xs font-mono px-3 py-1 rounded-full bg-slate-900 text-accent-teal border border-accent-teal/20">
                      {item.time}
                    </span>
                  </div>

                  <p className="text-sm font-medium text-slate-300 mb-4">
                    {item.org}
                  </p>

                  {/* Bullet Points List */}
                  <ul className="space-y-2">
                    {item.points.map((point, idx) => (
                      <li
                        key={idx}
                        className="text-slate-400 text-sm leading-relaxed flex items-start gap-2.5"
                      >
                        <CheckCircle2
                          size={15}
                          className="text-accent-teal shrink-0 mt-0.5"
                        />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
