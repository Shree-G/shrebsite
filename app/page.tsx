"use client";

import ProjectsGrid from "./components/ProjectsGrid";
import { Limelight } from "next/font/google";

const limelight = Limelight({ subsets: ["latin"], weight: "400", variable: "--font-display" });

export default function Home() {
  return (
    <main className="max-w-7xl mx-auto px-6 pt-32 space-y-40"> {/* might have to change mx-auto depending on margins*/}
      {/* Hero / About + Chat */}
      <section id="about" className="grid md:grid-cols-10 gap-10 items-start">
        <div className="md:col-span-4 space-y-6">
          <h1 className={`text-8xl ${limelight.className} font-bold text-accent-dark text-center`}>Hi, I'm Shree!</h1>
          <p className="text-lg leading-relaxed text-foreground/90">
            I build playful, robust software. I love mixing thoughtful UX with
            solid engineering craft. I'm interested in the applications of generative
            AI to solve real, human issues.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href="https://github.com/Shree-G"
              target="_blank"
              className="px-4 py-2 rounded-full bg-accent-light text-accent-dark font-medium shadow-sm hover:shadow transition"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/shree-gk"
              target="_blank"
              className="px-4 py-2 rounded-full bg-accent-light text-accent-dark font-medium shadow-sm hover:shadow transition"
            >
              LinkedIn
            </a>
            <a
              href="/resume.pdf" // need to add actual resume file
              className="px-4 py-2 rounded-full bg-accent-light text-accent-dark font-medium shadow-sm hover:shadow transition"
            >
              Resume
            </a>
          </div>
        </div>
        <div className="md:col-span-6">
          <div className="rounded-2xl border border-accent-light/60 bg-accent-light/40 backdrop-blur-sm p-4 shadow-inner">
            <div className="h-96 flex flex-col">
              <div className="flex-1 overflow-y-auto space-y-3 p-2" id="chat-scroll">
                {/* Placeholder messages */}
                <div className="w-max max-w-[60%] bg-white/70 text-accent-dark px-3 py-2 rounded-xl text-sm shadow">
                  Future: Ask me anything about my work!
                </div>
                <div className="w-max max-w-[60%] bg-accent-dark text-accent-light px-3 py-2 rounded-xl text-sm shadow ml-auto">
                  Can't wait to build the RAG brain. 🌱
                </div>
              </div>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="mt-auto flex gap-2 p-2"
              >
                <input
                  disabled
                  placeholder="Chat coming soon..."
                  className="flex-1 rounded-full px-4 py-2 bg-white/70 text-accent-dark placeholder:text-accent-dark/50 text-sm focus:outline-none"
                />
                <button
                  disabled
                  className="px-5 py-2 rounded-full bg-accent-dark text-accent-light text-sm font-medium opacity-60"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Work / Projects anchor placeholder to be filled */}
      <section id="work" className="space-y-10">
        <h2 className="text-3xl font-bold text-accent-dark">Projects</h2>
        <ProjectsGrid />
      </section>

      <section id="contact" className="space-y-10 mb-40">
        <h2 className="text-3xl font-bold text-accent-dark">Contact</h2>
        <p className="text-foreground/70">Say hi: shree@example.com (replace with actual).</p>
      </section>
    </main>
  );
}
