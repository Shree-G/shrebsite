"use client";
import React, { useEffect, useState } from "react";

interface Repo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
}

const ProjectsGrid: React.FC = () => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const res = await fetch("https://api.github.com/users/Shree-G/repos", {
          headers: { Accept: "application/vnd.github+json" },
          cache: "force-cache",
        });
        if (!res.ok) throw new Error("Failed fetching repos");
        const data: Repo[] = await res.json();
        // Basic filter: remove forks perhaps
        setRepos(data.filter((r) => !("fork" in r && (r as any).fork)));
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRepos();
  }, []);

  if (loading) return <p className="text-sm text-foreground/60">Loading projects...</p>;
  if (error) return <p className="text-sm text-red-600">{error}</p>;

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {repos.map((repo) => (
        <a
          key={repo.id}
          href={repo.html_url}
          target="_blank"
          className="group rounded-3xl border border-accent-light/60 bg-white/60 hover:bg-accent-light/50 transition shadow-sm p-5 flex flex-col gap-3 relative overflow-hidden"
        >
          <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition" style={{background:"radial-gradient(circle at 30% 20%, var(--accent-light), transparent)"}} />
          <div className="flex items-center justify-between">
            <span className="text-xs px-3 py-1 rounded-full bg-accent-dark text-accent-light font-semibold tracking-wide">
              {repo.language || "Unknown"}
            </span>
          </div>
          <h3 className="text-lg font-semibold text-accent-dark break-words">
            {repo.name}
          </h3>
          <p className="text-sm text-foreground/70 line-clamp-3">
            {repo.description || "No description provided."}
          </p>
        </a>
      ))}
    </div>
  );
};

export default ProjectsGrid;
