"use client";

import { Code2, Database, Wrench, Terminal } from "lucide-react";
import { SKILLS } from "@/lib/data";
import Reveal from "./Reveal";

const ICONS: Record<string, JSX.Element> = {
  Frontend: <Code2 size={20} />,
  "Data & APIs": <Database size={20} />,
  Tools: <Wrench size={20} />,
};

export default function Skills() {
  return (
    <section
      id="skills"
      className="py-24 border-t border-slate-900 bg-slate-950/40 relative"
    >
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          {/* Main Large Section Heading Aligned with About Section */}
          <div className="mb-12">
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-100">
              Technical <span className="text-accent-teal">Skills.</span>
            </h2>
          </div>
        </Reveal>

        {/* Skills Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {Object.entries(SKILLS).map(([group, items], i) => (
            <Reveal key={group} delay={i * 0.1}>
              <div className="group p-7 rounded-2xl border border-slate-800 bg-surface h-full hover:border-accent-teal/50 hover:shadow-xl hover:shadow-accent-teal/5 transition-all duration-300 ease-out">
                {/* Skill Group Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-accent-teal group-hover:scale-110 group-hover:border-accent-teal/40 transition-all duration-300">
                    {ICONS[group] || <Terminal size={20} />}
                  </div>
                  <h3 className="font-bold text-lg text-slate-100 group-hover:text-accent-teal transition-colors duration-300">
                    {group}
                  </h3>
                </div>

                {/* Skill Badges */}
                <div className="flex flex-wrap gap-2">
                  {items.map((s) => (
                    <span
                      key={s}
                      className="text-xs font-mono px-3 py-1.5 rounded-full border border-slate-800 bg-slate-900/80 text-slate-300 hover:border-accent-teal/60 hover:text-accent-teal hover:bg-accent-teal/10 hover:scale-105 transition-all duration-200 cursor-default"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
