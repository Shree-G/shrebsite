"use client";
import React, { useCallback, useEffect, useState } from "react";

export type PlantedTree = {
  id: string;
  type: string; // key of tree asset
  x: number; // viewport X (percentage)
  y: number; // viewport Y (percentage)
  message: string;
  date: string; // ISO
};

const TREE_OPTIONS: { key: string; label: string }[] = [
  { key: "bonsai", label: "Bonsai" },
  { key: "cherry", label: "Cherry Blossom" },
  { key: "spruce", label: "Spruce" },
];

const PREDEFINED_MESSAGES = [
  "A wandering bard planted this tree.",
  "A powerful wizard spawned this tree to break a curse.",
  "A traveling salesman rested here.",
  "Two friends coded under this tree.",
];

const STORAGE_KEY = "shree-site-planted-trees";

function loadTrees(): PlantedTree[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function saveTrees(trees: PlantedTree[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trees));
  } catch {}
}

const PlantTrees: React.FC = () => {
  const [trees, setTrees] = useState<PlantedTree[]>([]);
  const [plantMode, setPlantMode] = useState(false);
  const [pendingSpot, setPendingSpot] = useState<{ x: number; y: number } | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState<{ type: string; message: string }>({ type: TREE_OPTIONS[0].key, message: "" });

  useEffect(() => {
    setTrees(loadTrees());
  }, []);

  const persist = useCallback((next: PlantedTree[]) => {
    setTrees(next);
    saveTrees(next);
  }, []);

  const handlePageClick = useCallback(
    (e: MouseEvent) => {
      if (!plantMode) return;
      const marginWidth = 160; // only margins (left/right) are target zones
      const { innerWidth, innerHeight } = window;
      if (e.clientX > marginWidth && e.clientX < innerWidth - marginWidth) {
        return; // only allow planting in margins
      }
      const xPerc = (e.clientX / innerWidth) * 100;
      const yPerc = (e.clientY / innerHeight) * 100;
      setPendingSpot({ x: xPerc, y: yPerc });
      setShowModal(true);
    },
    [plantMode]
  );

  useEffect(() => {
    window.addEventListener("click", handlePageClick);
    return () => window.removeEventListener("click", handlePageClick);
  }, [handlePageClick]);

  const plantTree = () => {
    if (!pendingSpot) return;
    const newTree: PlantedTree = {
      id: crypto.randomUUID(),
      type: form.type,
      message: form.message || PREDEFINED_MESSAGES[Math.floor(Math.random() * PREDEFINED_MESSAGES.length)],
      x: pendingSpot.x,
      y: pendingSpot.y,
      date: new Date().toISOString(),
    };
    persist([...trees, newTree]);
    setShowModal(false);
    setPlantMode(false);
    setPendingSpot(null);
    setForm({ type: TREE_OPTIONS[0].key, message: "" });
  };

  return (
    <div className="pointer-events-none">
      {/* Toggle button */}
      <div className="fixed bottom-6 right-6 z-50 pointer-events-auto">
        <button
          onClick={() => setPlantMode((m) => !m)}
          className={`px-5 py-3 rounded-full font-medium shadow-lg border border-accent-dark/40 backdrop-blur-sm transition text-sm ${
            plantMode ? "bg-accent-dark text-accent-light" : "bg-accent-light text-accent-dark"
          }`}
        >
          {plantMode ? "Click a margin" : "Plant a Tree"}
        </button>
      </div>

      {/* Render planted trees */}
      {trees.map((t) => (
        <div
          key={t.id}
          style={{ left: `${t.x}vw`, top: `${t.y}vh` }}
          className="absolute z-40 -translate-x-1/2 -translate-y-1/2 group"
        >
          {/* Placeholder circle for tree image */}
          <div className="w-16 h-16 rounded-full bg-accent-dark/70 flex items-center justify-center text-xs text-accent-light">
            {t.type}
          </div>
          <div className="opacity-0 group-hover:opacity-100 transition pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 bg-accent-dark text-accent-light text-xs whitespace-pre rounded-lg px-3 py-2 shadow-lg w-48">
            {t.message}\nPlanted {new Date(t.date).toLocaleDateString()}
          </div>
        </div>
      ))}

      {/* Modal */}
      {showModal && pendingSpot && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 pointer-events-auto">
          <div className="w-full max-w-md rounded-2xl bg-pale-yellow border border-accent-dark/30 p-6 space-y-5 shadow-xl">
            <h3 className="text-xl font-semibold text-accent-dark">Plant your tree 🌱</h3>
            <div className="space-y-4">
              <label className="block text-sm font-medium text-accent-dark">Tree Type</label>
              <div className="flex gap-2 flex-wrap">
                {TREE_OPTIONS.map((opt) => (
                  <button
                    key={opt.key}
                    onClick={() => setForm((f) => ({ ...f, type: opt.key }))}
                    className={`px-3 py-2 rounded-full text-sm border transition ${
                      form.type === opt.key
                        ? "bg-accent-dark text-accent-light border-accent-dark"
                        : "bg-accent-light text-accent-dark border-accent-light hover:bg-accent-light/70"
                    }`}
                    type="button"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
              <label className="block text-sm font-medium text-accent-dark">Message (optional)</label>
              <textarea
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                placeholder="Your whimsical note..."
                className="w-full rounded-xl border border-accent-light bg-white/70 p-3 text-sm text-accent-dark focus:outline-none"
                rows={3}
              />
              <div className="flex flex-wrap gap-2">
                {PREDEFINED_MESSAGES.map((msg) => (
                  <button
                    key={msg}
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, message: msg }))}
                    className="px-3 py-1 rounded-full bg-accent-light text-accent-dark text-xs border border-accent-light hover:bg-accent-light/70"
                  >
                    {msg.slice(0, 28)}...
                  </button>
                ))}
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => {
                  setShowModal(false);
                  setPlantMode(false);
                  setPendingSpot(null);
                }}
                className="px-4 py-2 rounded-full text-sm bg-accent-light text-accent-dark border border-accent-light"
              >
                Cancel
              </button>
              <button
                onClick={plantTree}
                className="px-5 py-2 rounded-full text-sm font-semibold bg-accent-dark text-accent-light"
              >
                Plant
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlantTrees;
