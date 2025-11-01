"use client";
import React, { useEffect, useState } from "react";
import clsx from "clsx";

const SECTIONS = ["work", "about", "play", "notes", "contact"] as const;

type Section = typeof SECTIONS[number];

export const Navbar: React.FC = () => {
  const [active, setActive] = useState<Section>("about");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActive(id);
            }
          });
        },
        { rootMargin: "-40% 0px -50% 0px", threshold: 0.1 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
      <div className="flex gap-2 px-6 py-3 rounded-full gradient-green shadow-lg border border-accent-dark/30 backdrop-blur-sm">
        {SECTIONS.map((s) => (
          <a
            key={s}
            href={`#${s}`}
            className={clsx(
              "relative px-5 py-2 text-sm font-medium transition-colors rounded-full text-foreground",
              s === active && "bg-accent-light text-accent-dark shadow-sm"
            )}
          >
            <span className="capitalize">{s}</span>
          </a>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
