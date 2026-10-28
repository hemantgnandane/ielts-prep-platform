# IELTS PREP — Minimalist CD-IELTS Simulation Platform

An ultra-clean, enterprise-grade React application engineered with an **Apple / Linear design system** for high-stakes IELTS preparation (Band 7.5 to 9.0). Aligned with **British Council** and **IDP: IELTS Australia** Computer-Delivered standards.

---

## ✦ Key Architectural Principles

1. **Aesthetic Standards (Apple / Linear Minimalist)**
   - **Light Canvas**: `#ffffff` background, `#e5e5e7` ultra-crisp borders, `#1d1d1f` primary slate text, `#86868b` muted descriptors.
   - **Dark Mode**: `#0a0a0c` canvas, `#27272a` borders, `#ededed` high-contrast text.
   - **Signature Accent**: IELTS crimson red dot (`#e0001a`) and monospace badges.
   - **Typography**: Native Apple system font stack (`-apple-system`, `SF Pro Text`, `sans-serif`) with tight letter tracking (`tracking-tight`, `-0.03em`). Zero cartoon mascots, zero bloated gradients.

2. **Decoupled State Management**
   - **`ThemeContext`**: Light/Dark toggle persistent across browser reloads via `localStorage` and synchronized directly with `document.documentElement.classList`.
   - **`TrackContext`**: Seamless switching between `'academic'` and `'general'`, dynamically re-rendering module specifications, reading passages, and Task 1 criteria across all components.
   - **`SimulationContext`**: Complete CD-IELTS simulation engine managing live 20-minute countdown timer, `showTimer` visibility toggle, radio answer state for True / False / Not Given, question review flags, font-scaling accessibility, and instant band scoring diagnostics (4.0–9.0 band curves).

---

## ✦ Component Architecture

```
src/
├── types/
│   └── index.ts                 # Strongly-typed domain models (TestTrack, Question, SimulationResult, etc.)
├── context/
│   ├── ThemeContext.tsx         # Light / Dark theme persistence & DOM sync
│   ├── TrackContext.tsx         # Academic vs. General Training track selector
│   └── SimulationContext.tsx    # Live countdown, radio state, palette & band scoring logic
├── data/
│   ├── passages.ts              # Authentic Academic & General passages (Q1–Q13 + 40-item mock palette)
│   ├── disciplines.ts           # In-depth criteria for Listening, Reading, Writing, Speaking
│   └── comparison.ts            # Side-by-side Academic vs. General comparison matrix
├── components/
│   ├── layout/
│   │   ├── Header.tsx           # Brand, red dot, PREP mono badge, track pill switch, dark toggle
│   │   └── Footer.tsx           # Official legal disclaimers, Cambridge/IDP trademarks, curriculum links
│   ├── hero/
│   │   └── Hero.tsx             # Authoritative typography, philosophy, trust indicators
│   ├── disciplines/
│   │   └── DisciplinesGrid.tsx  # 4 border-defined cards with track-divergent criteria & syllabus modal
│   ├── simulation/
│   │   ├── ExamTopBar.tsx       # Candidate ID, section title, live countdown clock, hide time button
│   │   ├── ReadingPassagePane.tsx # Split left pane: paragraph labels [A]–[F], highlighter helper, scale
│   │   ├── QuestionPane.tsx     # Split right pane: True/False/Not Given radio bindings & explanation
│   │   ├── QuestionPalette.tsx  # Bottom palette: 1–40 buttons, active indicator, review checkbox
│   │   ├── ScoreModal.tsx       # Official band score calculation, CEFR level, item diagnostics
│   │   └── SimulationViewer.tsx # Master split-screen container with responsive mobile tabs & fullscreen mode
│   └── comparison/
│       └── TrackComparison.tsx  # Side-by-side interactive comparison matrix
├── App.tsx                      # Root composition
├── main.tsx                     # React 18 StrictMode entry with Context Providers
└── index.css                    # Tailwind directives, custom Apple scrollbars & smooth typography
```

---

## ✦ Getting Started

### Prerequisites
- Node.js `v18+` or `v20+` / `v22+`
- npm, pnpm, or yarn

### Development Server
```bash
npm run dev
```
Starts the Vite local server with instantaneous hot module replacement (HMR).

### Production Build
```bash
npm run build
```
Executes TypeScript type checking (`tsc`) followed by Vite's optimized production build.

### Preview Build
```bash
npm run preview
```

---

## ✦ Extensibility for Production & Backend Integration

The state architecture is deliberately decoupled for seamless expansion:
1. **API Endpoints**: Replace `academicPassage` and `generalPassage` imports in `SimulationContext.tsx` with async queries (e.g. TanStack Query or SWR) pointing to your `/api/passages/:id` and `/api/questions` backend endpoints.
2. **User Authentication**: Connect candidate profile info into `ExamTopBar.tsx` via your Auth context (e.g., Supabase, NextAuth, Clerk).
3. **Session Persistence**: Question responses and time remaining can be synchronized to PostgreSQL / Redis via WebSocket or debounced REST calls.

