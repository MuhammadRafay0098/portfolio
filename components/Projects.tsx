"use client";

import { PROJECTS } from "@/lib/data";
import { ExternalLink, Github, Folder } from "lucide-react";
import Reveal from "./Reveal";

export default function Projects() {
  return (
    <section id="projects" className="py-24 border-t border-slate-900 relative">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          {/* Main Large Section Heading Aligned with About & Skills */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-100">
                Featured <span className="text-accent-teal">Projects.</span>
              </h2>
            </div>
            <p className="text-slate-400 text-sm max-w-sm mt-3 md:mt-0 font-mono">
              Selected real-world applications and academic highlights.
            </p>
          </div>
        </Reveal>

        {/* Project Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {PROJECTS.map((project) => (
            <Reveal key={project.title}>
              <div className="group h-full flex flex-col justify-between p-7 rounded-2xl bg-surface border border-slate-800 hover:border-accent-teal/50 hover:shadow-xl hover:shadow-accent-teal/5 transition-all duration-300 ease-out">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-accent-teal group-hover:scale-110 group-hover:border-accent-teal/40 transition-all duration-300">
                        <Folder size={22} />
                      </div>
                      {/* Project Tag Badge */}
                      <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-slate-900/80 border border-slate-800 text-accent-violet">
                        {project.tag}
                      </span>
                    </div>

                    {/* Action Links Aligned with data.ts */}
                    <div className="flex items-center gap-3 text-slate-400">
                      {project.code && (
                        <a
                          href={project.code}
                          target="_blank"
                          rel="noreferrer"
                          aria-label="GitHub Repository"
                          className="hover:text-accent-teal transition-colors duration-300 hover:scale-110"
                        >
                          <Github size={18} />
                        </a>
                      )}
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noreferrer"
                          aria-label="Live Demo"
                          className="hover:text-accent-teal transition-colors duration-300 hover:scale-110"
                        >
                          <ExternalLink size={18} />
                        </a>
                      )}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-slate-100 group-hover:text-accent-teal transition-colors duration-300 mb-3">
                    {project.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">
                    {project.description}
                  </p>
                </div>

                {/* Tech Badges with Hover Scale */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-800/60">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-xs font-mono px-3 py-1 rounded-full bg-slate-900 text-slate-300 border border-slate-800/80 hover:border-accent-teal/50 hover:text-accent-teal hover:scale-105 transition-all duration-200 cursor-default"
                    >
                      {t}
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
