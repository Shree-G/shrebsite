// "use client";
// import React, { useCallback, useEffect, useState } from "react";

// export type PlantedTree = {
//   id: string;
//   type: string; // key of tree asset
//   x: number; // viewport X (percentage)
//   y: number; // viewport Y (percentage)
//   message: string;
//   date: string; // ISO
// };

// const TREE_OPTIONS: { key: string; label: string }[] = [
//   { key: "bonsai", label: "Bonsai" },
//   { key: "cherry", label: "Cherry Blossom" },
//   { key: "spruce", label: "Spruce" },
// ];

// const PREDEFINED_MESSAGES = [
//   "A wandering bard planted this tree.",
//   "A powerful wizard spawned this tree to break a curse.",
//   "A traveling salesman rested here.",
//   "Two friends coded under this tree.",
// ];

// const STORAGE_KEY = "shree-site-planted-trees";

// function loadTrees(): PlantedTree[] {
//   if (typeof window === "undefined") return [];
//   try {
//     const raw = localStorage.getItem(STORAGE_KEY);
//     if (!raw) return [];
//     return JSON.parse(raw);
//   } catch {
//     return [];
//   }
// }

// function saveTrees(trees: PlantedTree[]) {
//   try {
//     localStorage.setItem(STORAGE_KEY, JSON.stringify(trees));
//   } catch {}
// }

// const PlantTrees: React.FC = () => {
//   const [trees, setTrees] = useState<PlantedTree[]>([]);
//   const [plantMode, setPlantMode] = useState(false);
//   const [pendingSpot, setPendingSpot] = useState<{ x: number; y: number } | null>(null);
//   const [showModal, setShowModal] = useState(false);
//   const [form, setForm] = useState<{ type: string; message: string }>({ type: TREE_OPTIONS[0].key, message: "" });

//   useEffect(() => {
//     setTrees(loadTrees());
//   }, []);

//   const persist = useCallback((next: PlantedTree[]) => {
//     setTrees(next);
//     saveTrees(next);
//   }, []);

//   const handlePageClick = useCallback(
//     (e: MouseEvent) => {
//       if (!plantMode) return;
//       const marginWidth = 160; // only margins (left/right) are target zones
//       const { innerWidth, innerHeight } = window;
//       if (e.clientX > marginWidth && e.clientX < innerWidth - marginWidth) {
//         return; // only allow planting in margins
//       }
//       // saves tree position as a percentage of viewport
//       const xPerc = (e.clientX / innerWidth) * 100;
//       const yPerc = (e.clientY / innerHeight) * 100;
//       setPendingSpot({ x: xPerc, y: yPerc });
//       setShowModal(true);
//     },
//     [plantMode]
//   );

//   useEffect(() => {
//     window.addEventListener("click", handlePageClick);
//     return () => window.removeEventListener("click", handlePageClick);
//   }, [handlePageClick]);

//   const plantTree = () => {
//     if (!pendingSpot) return;
//     const newTree: PlantedTree = {
//       id: crypto.randomUUID(),
//       type: form.type,
//       message: form.message || PREDEFINED_MESSAGES[Math.floor(Math.random() * PREDEFINED_MESSAGES.length)],
//       x: pendingSpot.x,
//       y: pendingSpot.y,
//       date: new Date().toISOString(),
//     };
//     persist([...trees, newTree]);
//     setShowModal(false);
//     setPlantMode(false);
//     setPendingSpot(null);
//     setForm({ type: TREE_OPTIONS[0].key, message: "" });
//   };

// //   const PlanterColumnVisual: React.FC = () => {
// //   return (
// //     <div
// //       className="w-full h-full"
// //       style={{
// //         backgroundImage: "url('/planter.png')", // Assumes planter.png is in /public
// //         backgroundRepeat: "repeat-y",
// //         backgroundPosition: "center top",
// //         backgroundSize: "100% auto", // Fills the 160px width and repeats
// //       }}
// //     />
// //   );
// // };

//   return (
//     <div className="pointer-events-none">
//         {/* Left Visual Column
//       <div className="fixed top-0 bottom-0 left-0 w-[160px] hidden lg:block z-0">
//         <PlanterColumnVisual />
//       </div>

//       <div className="fixed top-0 bottom-0 right-0 w-[160px] hidden lg:block z-0">
//         <PlanterColumnVisual />
//       </div> */}

//       {/* Toggle button */}
//       <div className="fixed bottom-6 right-6 z-50 pointer-events-auto">
//         <button
//           onClick={() => setPlantMode((m) => !m)}
//           className={`px-5 py-3 rounded-full font-medium shadow-lg border border-accent-dark/40 backdrop-blur-sm transition text-sm ${
//             plantMode ? "bg-accent-dark text-accent-light" : "bg-accent-light text-accent-dark"
//           }`}
//         >
//           {plantMode ? "Click a margin" : "Plant a Tree"}
//         </button>
//       </div>

//       {/* Render planted trees */}
//       {trees.map((t) => (
//         <div
//           key={t.id}
//           style={{ left: `${t.x}vw`, top: `${t.y}vh` }}
//           className="absolute z-40 -translate-x-1/2 -translate-y-1/2 group"
//         >
//           {/* Placeholder circle for tree image */}
//           <div className="w-16 h-16 rounded-full bg-accent-dark/70 flex items-center justify-center text-xs text-accent-light">
//             {t.type}
//           </div>
//           <div className="opacity-0 group-hover:opacity-100 transition pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 bg-accent-dark text-accent-light text-xs whitespace-pre rounded-lg px-3 py-2 shadow-lg w-48">
//             {t.message}\nPlanted {new Date(t.date).toLocaleDateString()}
//           </div>
//         </div>
//       ))}

//       {/* Modal */}
//       {showModal && pendingSpot && (
//         <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 pointer-events-auto">
//           <div className="w-full max-w-md rounded-2xl bg-pale-yellow border border-accent-dark/30 p-6 space-y-5 shadow-xl">
//             <h3 className="text-xl font-semibold text-accent-dark">Plant your tree 🌱</h3>
//             <div className="space-y-4">
//               <label className="block text-sm font-medium text-accent-dark">Tree Type</label>
//               <div className="flex gap-2 flex-wrap">
//                 {TREE_OPTIONS.map((opt) => (
//                   <button
//                     key={opt.key}
//                     onClick={() => setForm((f) => ({ ...f, type: opt.key }))}
//                     className={`px-3 py-2 rounded-full text-sm border transition ${
//                       form.type === opt.key
//                         ? "bg-accent-dark text-accent-light border-accent-dark"
//                         : "bg-accent-light text-accent-dark border-accent-light hover:bg-accent-light/70"
//                     }`}
//                     type="button"
//                   >
//                     {opt.label}
//                   </button>
//                 ))}
//               </div>
//               <label className="block text-sm font-medium text-accent-dark">Message (optional)</label>
//               <textarea
//                 value={form.message}
//                 onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
//                 placeholder="Your whimsical note..."
//                 className="w-full rounded-xl border border-accent-light bg-white/70 p-3 text-sm text-accent-dark focus:outline-none"
//                 rows={3}
//               />
//               <div className="flex flex-wrap gap-2">
//                 {PREDEFINED_MESSAGES.map((msg) => (
//                   <button
//                     key={msg}
//                     type="button"
//                     onClick={() => setForm((f) => ({ ...f, message: msg }))}
//                     className="px-3 py-1 rounded-full bg-accent-light text-accent-dark text-xs border border-accent-light hover:bg-accent-light/70"
//                   >
//                     {msg.slice(0, 28)}...
//                   </button>
//                 ))}
//               </div>
//             </div>
//             <div className="flex justify-end gap-3 pt-2">
//               <button
//                 onClick={() => {
//                   setShowModal(false);
//                   setPlantMode(false);
//                   setPendingSpot(null);
//                 }}
//                 className="px-4 py-2 rounded-full text-sm bg-accent-light text-accent-dark border border-accent-light"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={plantTree}
//                 className="px-5 py-2 rounded-full text-sm font-semibold bg-accent-dark text-accent-light"
//               >
//                 Plant
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PlantTrees;

"use client";
import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";

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

// +++ IMPORTANT: ADJUST THESE PIXEL VALUES +++
// You MUST adjust these to match your planter.png image!
//
// 1. Get the height of your single planter.png image (in pixels)
const PLANTER_IMG_HEIGHT = 220; // <--- ADJUST THIS!
// 2. Find the Y-pixel where the "soil" area STARTS (from the top)
const SOIL_TOP_Y = 50; // <--- ADJUST THIS!
// 3. Find the Y-pixel where the "soil" area ENDS
const SOIL_BOTTOM_Y = 200; // <--- ADJUST THIS!
// +++

/**
 * Renders the visual, repeating planter box background.
 */
const PlanterColumnVisual: React.FC = () => {
  return (
    <div
      className="w-full h-full"
      style={{
        backgroundImage: "url('/ground1.png')", // Using .png from your file
        backgroundRepeat: "repeat-y",
        backgroundPosition: "center top",
        backgroundSize: "100% auto", // Fills the 160px width
      }}
    />
  );
};

// This component now accepts `children` (your page content)
const PlantTrees: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [trees, setTrees] = useState<PlantedTree[]>([]);
  const [plantMode, setPlantMode] = useState(false);
  const [pendingSpot, setPendingSpot] = useState<{ x: number; y: number } | null>(
    null
  );
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState<{ type: string; message: string }>({
    type: TREE_OPTIONS[0].key,
    message: "",
  });

  useEffect(() => {
    setTrees(loadTrees());
  }, []);

  const persist = useCallback((next: PlantedTree[]) => {
    setTrees(next);
    saveTrees(next);
  }, []);

  // This function is unchanged
  const plantTree = () => {
    if (!pendingSpot) return;
    const newTree: PlantedTree = {
      id: crypto.randomUUID(),
      type: form.type,
      message:
        form.message ||
        PREDEFINED_MESSAGES[
          Math.floor(Math.random() * PREDEFINED_MESSAGES.length)
        ],
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

  // +++ NEW: Click handler for the planter columns +++
  const handleColumnClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!plantMode) return;

    // We need the click position relative to the PAGE,
    // not the column, to account for scrolling.
    const clickY_onPage = e.pageY;

    // Find the click's Y position *within* the repeating background image
    const clickY_inImage = clickY_onPage % PLANTER_IMG_HEIGHT;

    // Check if the click is inside the "soil" area
    const isPlantable =
      clickY_inImage >= SOIL_TOP_Y && clickY_inImage <= SOIL_BOTTOM_Y;

    if (isPlantable) {
      // Plant logic: We still use viewport % for 'absolute' positioning
      const { innerWidth, innerHeight } = window;
      const xPerc = (e.clientX / innerWidth) * 100;
      const yPerc = (e.clientY / innerHeight) * 100;

      setPendingSpot({ x: xPerc, y: yPerc });
      setShowModal(true);
    } else {
      // Click was on the wood, not soil. Do nothing.
      console.log("Not a plantable area!");
    }
  };

  // +++ NEW: Style for the "plant mode" highlighter overlay +++
  const highlighterStyle = {
    backgroundImage: `repeating-linear-gradient(
      to bottom,
      transparent,
      transparent ${SOIL_TOP_Y}px,
      rgba(100, 255, 100, 0.4) ${SOIL_TOP_Y}px,  /* Light green highlight */
      rgba(100, 255, 100, 0.4) ${SOIL_BOTTOM_Y}px,
      transparent ${SOIL_BOTTOM_Y}px,
      transparent ${PLANTER_IMG_HEIGHT}px
    )`,
    backgroundSize: `100% ${PLANTER_IMG_HEIGHT}px`, // Repeat every image height
    backgroundRepeat: "repeat-y",
  };

  return (
    <>
      {/* This is the new 3-column grid layout.
        - 'lg:grid-cols-[160px_1fr_160px]': Creates the 3 columns on large screens.
        - 'grid-cols-1': Stacks everything on mobile (planters hide).
        - 'pt-20': Pushes content below your fixed Navbar (adjust as needed).
      */}
      <div className="lg:grid lg:grid-cols-[160px_1fr_160px] pt-20">
        
        {/* Col 1: Left Planter */}
        <div
          className="hidden lg:block relative h-full"
          onClick={handleColumnClick}
        >
          <PlanterColumnVisual />
          {/* Highlighter Overlay */}
          {plantMode && (
            <div
              className="absolute inset-0 z-10 cursor-pointer"
              style={highlighterStyle}
            />
          )}
        </div>

        {/* Col 2: Main Content (Your page.tsx) */}
        {/* 'min-w-0' is a grid fix to prevent overflow */}
        <main className="w-full min-w-0">{children}</main>

        {/* Col 3: Right Planter */}
        <div
          className="hidden lg:block relative h-full"
          onClick={handleColumnClick}
        >
          <PlanterColumnVisual />
          {/* Highlighter Overlay */}
          {plantMode && (
            <div
              className="absolute inset-0 z-10 cursor-pointer"
              style={highlighterStyle}
            />
          )}
        </div>
      </div>

      {/* --- UI Elements (Button, Trees, Modal) --- */}
      {/* These remain 'fixed' or 'absolute' so they float on top */}

      {/* Toggle button */}
      <div className="fixed bottom-6 right-6 z-50 pointer-events-auto">
        <button
          onClick={(e) => {
            e.stopPropagation(); // Stop click from bubbling to grid
            setPlantMode((m) => !m);
          }}
          className={`px-5 py-3 rounded-full font-medium shadow-lg border border-accent-dark/40 backdrop-blur-sm transition text-sm ${
            plantMode
              ? "bg-accent-dark text-accent-light"
              : "bg-accent-light text-accent-dark"
          }`}
        >
          {plantMode ? "Click a soil patch" : "Plant a Tree"}
        </button>
      </div>

      {/* Render planted trees */}
      {trees.map((t) => (
        <div
          key={t.id}
          style={{ left: `${t.x}vw`, top: `${t.y}vh` }}
          // Added 'pointer-events-none' so trees don't block clicks on soil
          className="absolute z-40 -translate-x-1/2 -translate-y-1/2 group pointer-events-none"
        >
          {/* Placeholder circle for tree image */}
          <div className="w-16 h-16 rounded-full bg-accent-dark/70 flex items-center justify-center text-xs text-accent-light">
            <Image
                src={`/trees/tree.png`}
                alt={t.type}
                width={64}
                height={64}
                className="object-contain"
            />
          </div>
          <div className="opacity-0 group-hover:opacity-100 transition pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 bg-accent-dark text-accent-light text-xs whitespace-pre rounded-lg px-3 py-2 shadow-lg w-48">
            {t.message}\nPlanted {new Date(t.date).toLocaleDateString()}
          </div>
        </div>
      ))}

      {/* Modal */}
      {showModal && pendingSpot && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 pointer-events-auto"
          // Stop backdrop click from triggering grid click
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-full max-w-md rounded-2xl bg-pale-yellow border border-accent-dark/30 p-6 space-y-5 shadow-xl">
            <h3 className="text-xl font-semibold text-accent-dark">
              Plant your tree 🌱
            </h3>
            <div className="space-y-4">
              <label className="block text-sm font-medium text-accent-dark">
                Tree Type
              </label>
              <div className="flex gap-2 flex-wrap">
                {TREE_OPTIONS.map((opt) => (
                  <button
                    key={opt.key}
                    onClick={(e) => {
                      e.stopPropagation();
                      setForm((f) => ({ ...f, type: opt.key }));
                    }}
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
              <label className="block text-sm font-medium text-accent-dark">
                Message (optional)
              </label>
              <textarea
                value={form.message}
                onClick={(e) => e.stopPropagation()} // Stop clicks here too
                onChange={(e) => {
                  e.stopPropagation();
                  setForm((f) => ({ ...f, message: e.target.value }));
                }}
                placeholder="Your whimsical note..."
                className="w-full rounded-xl border border-accent-light bg-white/70 p-3 text-sm text-accent-dark focus:outline-none"
                rows={3}
              />
              <div className="flex flex-wrap gap-2">
                {PREDEFINED_MESSAGES.map((msg) => (
                  <button
                    key={msg}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setForm((f) => ({ ...f, message: msg }));
                    }}
                    className="px-3 py-1 rounded-full bg-accent-light text-accent-dark text-xs border border-accent-light hover:bg-accent-light/70"
                  >
                    {msg.slice(0, 28)}...
                  </button>
                ))}
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowModal(false);
                  setPlantMode(false);
                  setPendingSpot(null);
                }}
                className="px-4 py-2 rounded-full text-sm bg-accent-light text-accent-dark border border-accent-light"
              >
                Cancel
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  plantTree();
                }}
                className="px-5 py-2 rounded-full text-sm font-semibold bg-accent-dark text-accent-light"
              >
                Plant
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PlantTrees;