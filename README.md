## Shree's Portfolio Site

Modern, minimalist + playful portfolio built with Next.js App Router, TypeScript and Tailwind.

### Features
* Floating pill navbar with scroll spy
* Hero section with About + placeholder chat UI (future: RAG chatbot)
* Dynamic Projects grid sourced from GitHub API (`/users/Shree-G/repos`)
* "Plant-a-Tree" interactive feature – users can plant whimsical trees in page margins (persisted in `localStorage`)
* Responsive design, custom palette and Nunito font

### Development
```bash
npm install
npm run dev
```
Visit http://localhost:3000

### File Overview
* `app/layout.tsx` – global layout, navbar, tree feature injection
* `app/page.tsx` – page sections (About, Work, Play, Notes, Contact)
* `app/components/` – UI components (`Navbar`, `ProjectsGrid`, `PlantTrees`)
* `public/trees/*.png` – tree image placeholders (replace with actual PNG assets)

### Plant-a-Tree Data Shape
```ts
type PlantedTree = {
	id: string;
	type: string; // key mapping to image in /public/trees
	x: number; // viewport percentage X
	y: number; // viewport percentage Y
	message: string;
	date: string; // ISO timestamp
}
```

### Next Steps / Ideas
* Replace placeholder tree circles with actual PNG assets
* Add deletion & drag reposition for planted trees
* Implement RAG chatbot in hero section
* Project filtering & tags
* Notes section markdown rendering

### License
Personal portfolio – not currently licensed for reuse. Reach out if you'd like to adapt ideas.
