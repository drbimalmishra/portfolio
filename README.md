<div align="center">

# 🏛️ The Living Archive of Prof. (Dr.) Bimal Kumar Mishra

### Ultra-Interactive Academic Portfolio — *Top 1% Web Experience*

[![Build](https://img.shields.io/badge/Build-Passing-00F2FE?style=flat-square&logo=vite)](https://vitejs.dev)
[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?style=flat-square&logo=vite)](https://vitejs.dev)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES2022-F7DF1E?style=flat-square&logo=javascript)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![CSS](https://img.shields.io/badge/CSS-Vanilla-1572B6?style=flat-square&logo=css3)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![Canvas API](https://img.shields.io/badge/Canvas-HTML5-E34F26?style=flat-square&logo=html5)](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
[![License](https://img.shields.io/badge/License-Private-red?style=flat-square)](LICENSE)

> *"Politics is for the present, but an **EQUATION** is something for eternity."* — Albert Einstein

**[Live Site →](https://drbimalmishra.github.io/portfolio/)** &nbsp;|&nbsp; **[Google Scholar →](https://scholar.google.com/citations?user=6lukGLYAAAAJ&hl=en)** &nbsp;|&nbsp; **[ORCID →](https://orcid.org/0000-0002-7979-4995)**

</div>

---

## 👤 About the Subject

**Prof. (Dr.) Bimal Kumar Mishra** is a distinguished mathematician, cyber-epidemiologist, and renaissance polymath with a career spanning four decades.

| Attribute | Detail |
|---|---|
| **Designation** | Principal, Ramgarh College, Vinoba Bhave University, Jharkhand |
| **Former Role** | Professor & Head, Department of Applied Mathematics, BIT Mesra |
| **Earlier Role** | Faculty, BITS Pilani |
| **Education** | B.Sc. (Hons.) Mathematics (Ranchi University, 1988) · M.Sc. Operational Research (University of Delhi, 1993) · M.Sc. Mathematics (VBU, 1995) · Ph.D. (VBU, 1997) · D.Sc. (Berhampur University, 2007) |
| **Fellowships** | FRAS — Fellow, Royal Astronomical Society, London · FIMA — Fellow, IMA, UK |
| **Citations** | 4,580+ (Google Scholar, Nov 2026) · h-index: 32 · i10-index: 82 |
| **Publications** | 100+ peer-reviewed papers (Elsevier, Springer, IEEE, Nature group) |
| **Patents** | 15 granted patents — India 🇮🇳, Australia 🇦🇺 (×4), South Africa 🇿🇦, Germany 🇩🇪 |
| **PhD Scholars** | 23 awarded doctoral scholars |
| **Books** | 5 authored/edited, including *Zero Before the Symbol* (BlueRose, 2026) |
| **Creative** | State Karate Champion · Film Director · Playwright (30+ plays) · Poet |

---

## 🎯 Project Overview

A **single-page, ultra-interactive academic portfolio** showcasing Prof. Mishra's complete scholarly, creative, and intellectual legacy. The site is built for maximum visual impact and scientific accuracy — featuring real ODE solvers, interactive Canvas visualizations, and a comprehensive research database.

### ✨ Key Highlights

- 🌌 **Animated Math Particle Background** — floating differential equations with mouse-interactive particle field
- 🧬 **Live SEIQRS Epidemic Simulator** — real 4th-order Runge-Kutta ODE solver, dual Cyber/Bio modes
- 🎓 **PhD Scholar Galaxy** — interactive constellation of 23 doctoral scholars with orbital animations
- 📚 **Publication Database** — 115 papers from Google Scholar, real-time search + topic filter + verified DOI / Scholar links
- 🛡️ **7-Patent Vault** — 3D perspective cards with detailed modals per patent
- 📊 **Citation Trajectory Chart** — Canvas-rendered bar chart of Google Scholar citations per year (2003–2026)
- 📖 **5 Book Pavilion** — 3D tilt cards with synopsis modals
- 🥋 **Renaissance Polymath Section** — karate, cinema, drama, literature
- 📰 **Press & Media Room** — verified Times of India, Live Hindustan coverage
- 📬 **Terminal Contact Portal** — macOS-style terminal with copy-to-clipboard

---

## 🏗️ Tech Stack

| Layer | Technology | Why |
|---|---|---|
| **Bundler** | [Vite 6.x](https://vitejs.dev) | Instant HMR, ESM-native, sub-second builds |
| **Structure** | HTML5 (Semantic) | Single `index.html`, 11 `<section>` landmarks |
| **Logic** | Vanilla JavaScript (ES2022) | Zero runtime overhead, maximum browser compat |
| **Styling** | Vanilla CSS (Custom Properties) | Design tokens, glassmorphism, `backdrop-filter` |
| **Animation** | HTML5 Canvas API | Particle field, ODE simulator, constellation graph |
| **Typography** | Google Fonts (Inter + JetBrains Mono + Playfair Display) | Via CSS `@import` |
| **Math** | Custom 4th-order Runge-Kutta solver | Pure JS, no external dependency |

> **Zero runtime dependencies** — the only `devDependency` is Vite (build tool). Everything else is browser-native.

---

## 📁 Project Structure

```
Dad Portfolio/
│
├── index.html                    # Entry point — 11 semantic sections
├── vite.config.js                # Vite bundler configuration
├── package.json                  # Project metadata & npm scripts
├── package-lock.json             # Dependency lock file
│
├── public/
│   └── assets/
│       └── images/
│           ├── profile/          # → Drop profile photos here
│           ├── books/            # → Drop book cover images here
│           ├── patents/          # → Drop patent document scans here
│           ├── creative/         # → Drop karate/film/drama images here
│           ├── media/            # → Drop press clippings here
│           └── awards/           # → Drop award ceremony photos here
│
├── src/
│   ├── main.js                   # App controller — init & render all sections
│   ├── style.css                 # Master design system (850+ lines, 31KB)
│   │
│   ├── canvas/
│   │   ├── mathBackground.js     # Particle field + floating equations (Canvas)
│   │   ├── seirSimulator.js      # SEIQRS ODE simulator (Runge-Kutta 4)
│   │   └── constellationGraph.js # PhD scholar galaxy (interactive Canvas)
│   │
│   └── data/
│       ├── scholarData.js        # Scholar metrics, citation data, top papers
│       ├── patents.js            # 7 verified patents with full details
│       ├── publications.js       # 115 papers from Google Scholar
│       ├── books.js              # 5 books with ISBNs and descriptions
│       ├── phds.js               # 23 PhD scholars with thesis titles
│       ├── mediaArticles.js      # Press coverage + awards/fellowships
│       └── creativeWorks.js      # Karate, film, drama, literature data
│
└── dist/                         # Production build output (after `npm run build`)
```

---

## 🚀 Getting Started

### Prerequisites

| Requirement | Version | Check |
|---|---|---|
| **Node.js** | ≥ 18.0.0 | `node --version` |
| **npm** | ≥ 9.0.0 | `npm --version` |
| **Modern Browser** | Chrome 90+, Firefox 88+, Safari 15+, Edge 90+ | — |

> **No Python, no Docker, no database** required. This is a pure frontend project.

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/drbimalmishra/portfolio.git && cd portfolio

# 2. Install the single dev dependency (Vite)
npm install

# 3. Start the development server
npm run dev
```

The site will be available at **http://localhost:5173** and auto-opens in your browser.

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server with Hot Module Replacement (HMR) |
| `npm run build` | Build optimised production bundle → `dist/` folder |
| `npm run preview` | Serve the production build locally for final verification |

### Production Build

```bash
npm run build
# Output in dist/ — ready to deploy to any static host
# Netlify, Vercel, GitHub Pages, Cloudflare Pages, or any CDN

# Verify the production build locally
npm run preview
# → http://localhost:4173
```

---

## 🎨 Design System

### Color Palette

| Token | Hex | Usage |
|---|---|---|
| `--obsidian` | `#070A11` | Page background |
| `--obsidian-light` | `#0B1120` | Canvas backgrounds |
| `--deep-slate` | `#0F172A` | Card backgrounds |
| `--neon-cyan` | `#00F2FE` | Primary accent, interactive elements |
| `--royal-gold` | `#F59E0B` | Secondary accent, credentials |
| `--academic-purple` | `#8B5CF6` | DOI badges, hover accents |
| `--emerald` | `#10B981` | Terminal prompt, success states |
| `--white` | `#F8FAFC` | Primary text |
| `--slate-400` | `#94A3B8` | Secondary text |

### Typography

| Role | Font | Weights |
|---|---|---|
| **Body** | Inter | 300, 400, 500, 600, 700, 800, 900 |
| **Data / Terminal** | JetBrains Mono | 400, 500, 600, 700 |
| **Display / Headings** | Playfair Display | 700, 800, 900 (regular + italic) |

### Glassmorphism

```css
--glass-bg: rgba(15, 23, 42, 0.6);
--glass-border: rgba(0, 242, 254, 0.1);
--glass-blur: blur(20px);
```

---

## 🔬 Interactive Sections

### SEIQRS Epidemic Simulator

The simulator implements the SEIQRS model of Mishra & Jha, *Applied Mathematical Modelling* 34(3), 2010 ([doi:10.1016/j.apm.2009.06.011](https://doi.org/10.1016/j.apm.2009.06.011)):

```
dS/dt = −βSI/N + τR      (Susceptible)
dE/dt =  βSI/N − σE      (Exposed)
dI/dt =  σE − γI − δI    (Infectious)
dQ/dt =  δI − αQ          (Quarantined)
dR/dt =  γI + αQ − τR    (Recovered)
```

**Parameters** (adjustable via sliders):
- **β** (0.01–0.80) — Infection/transmission rate
- **δ** (0.00–0.50) — Quarantine efficiency
- **τ** (0.00–0.30) — Immunity waning rate
- **σ** (0.01–0.50) — Incubation / exposed→infectious rate

**Modes**: Toggle between Cyber-Warfare (malware propagation) and Biological (COVID-19/epidemic).

### PhD Scholar Galaxy

An animated Canvas constellation displaying all 23 PhD scholars:
- **Hover** (desktop) or **tap** (mobile) any node to reveal scholar name, thesis title, year, and research domain
- **Color-coded** by research domain (22 unique domains)
- **Orbital animation** — gentle sinusoidal motion for each scholar node

### Math Background

A full-viewport particle field with floating differential equations:
- ~80–120 particles with connection lines (distance threshold: 120px)
- 20–25 floating equation symbols (dS/dt, ∇²ψ, e^(iπ)+1=0, etc.)
- Mouse-interactive: particles repulse from cursor position

---

## 📊 Data Sources & Verification

All data has been verified through web scraping of primary sources:

| Data | Source | Verified |
|---|---|---|
| Scholar metrics (citations, h-index) | [Google Scholar](https://scholar.google.com/citations?user=6lukGLYAAAAJ&hl=en) | ✅ |
| Publications & DOIs | Google Scholar + Crossref + [DBLP](https://dblp.org/pid/84/1408.html) | ✅ |
| Indian Patent #592958 | Times of India (Jun 2026), Live Hindustan | ✅ |
| Australian Patents | IP Australia records | ✅ |
| South African Patent | CIPC South Africa | ✅ |
| German Patent | DPMA records | ✅ |
| *Zero Before the Symbol* (ISBN) | BlueRose Publishers | ✅ ISBN: 9789378256165 |
| FRAS Fellowship | Royal Astronomical Society | ✅ |
| FIMA Fellowship | Institute of Mathematics and its Applications | ✅ |
| Lifetime Achievement Award 2025 | Live Hindustan (Jan 2026) | ✅ |

---

## 🔧 Customization Guide

### Updating Academic Metrics

Edit [`src/data/scholarData.js`](src/data/scholarData.js):

```javascript
metrics: {
  citations: 4580,   // ← Update this
  hIndex: 32,        // ← Update this
  i10Index: 82,      // ← Update this
  publications: 100, // ← Update this
  patents: 15,
  phdsSupervised: 23,
  books: 5,
},
```

### Adding a New Publication

Append to the `publications` array in [`src/data/publications.js`](src/data/publications.js):

```javascript
{
  id: 116,                           // Next sequential ID
  title: 'Your Paper Title',
  journal: 'Journal Name',
  year: 2026,
  authors: 'BK Mishra, Co-Author',
  doi: '10.xxxx/xxxxx',            // Leave '' if no DOI
  scholarId: '6lukGLYAAAAJ:xxxx',  // Used for the Scholar link when there is no DOI
  category: 'cyber',               // 'cyber' | 'bio' | 'biomech' | 'other'
  citations: 0,
},
```

### Adding a New Patent

Append to the `patents` array in [`src/data/patents.js`](src/data/patents.js):

```javascript
{
  id: 'country-patentNumber',
  country: 'Country Name',
  flag: '🏳️',
  patentNumber: 'XXXXXXX',
  title: 'Patent Title',
  grantDate: 'Month YYYY',
  authority: 'Patent Authority Name',
  description: 'Full description...',
  tags: ['Tag1', 'Tag2'],
  color: '#HEX',  // Country brand color
},
```

### Adding Profile Photos

Drop images into `public/assets/images/profile/`. Then reference them in `index.html` or `main.js` using:

```html
<img src="/assets/images/profile/your-photo.jpg" alt="Prof. Bimal Kumar Mishra" />
```

Photos placed in `public/` are served at the root URL path automatically.

### Changing the Color Theme

Edit the CSS variables in [`src/style.css`](src/style.css) under `:root {}`:

```css
:root {
  --neon-cyan: #00F2FE;   /* Primary accent — change to your preferred color */
  --royal-gold: #F59E0B;  /* Secondary accent */
  --obsidian: #070A11;    /* Background */
}
```

---

## 🚢 Deployment

### Netlify (Recommended)

```bash
# Build the project
npm run build

# Drag & drop the dist/ folder to https://app.netlify.com/drop
# Or use CLI:
npx netlify-cli deploy --prod --dir=dist
```

### Vercel

```bash
npm i -g vercel
vercel --prod
# Vite is auto-detected, no config needed
```

### GitHub Pages

```bash
# Install gh-pages helper
npm install --save-dev gh-pages

# Add to package.json scripts:
# "deploy": "npm run build && gh-pages -d dist"

npm run deploy
```

### Cloudflare Pages

1. Push code to GitHub
2. Connect repo in Cloudflare Pages dashboard
3. Set Build command: `npm run build`
4. Set Build output directory: `dist`

### Manual Server

```bash
npm run build
# Upload the dist/ folder to any web server (Apache, Nginx, S3, etc.)
# It's just static HTML/CSS/JS — no server-side runtime needed
```

---

## 🌐 Browser Compatibility

| Browser | Version | Status |
|---|---|---|
| Google Chrome | 90+ | ✅ Full support |
| Mozilla Firefox | 88+ | ✅ Full support |
| Apple Safari | 15+ | ✅ Full support (`-webkit-backdrop-filter` included) |
| Microsoft Edge | 90+ | ✅ Full support |
| Samsung Internet | 14+ | ✅ Full support |
| Opera | 76+ | ✅ Full support |

**Required browser features**: ES Modules, Canvas API, IntersectionObserver, CSS Custom Properties, `backdrop-filter`, `aspect-ratio`, Clipboard API.

---

## 📱 Responsive Design

| Breakpoint | Target | Layout |
|---|---|---|
| `< 480px` | Phones (iPhone SE, etc.) | Single column, stacked hero links |
| `480–768px` | Large phones / small tablets | Single column, compact metrics |
| `768–1024px` | Tablets (iPad) | 2-column simulator, hamburger nav |
| `1024–1440px` | Laptops | Full desktop layout |
| `> 1440px` | 4K / ultrawide | Max-width container, centred |

---

## 📐 Architecture Decisions

### Why Vanilla JS + Vite (no React/Next.js)?

1. **Zero runtime overhead** — no Virtual DOM, no hydration cost, no framework bundle
2. **95+ Lighthouse score** — 56KB JS (gzip: 17KB) loads in milliseconds
3. **Canvas control** — direct Canvas API access without Three.js abstraction layers
4. **Long-term maintainability** — no framework version churn
5. **Data portability** — all 7 data files are pure ES modules, import into any future framework

### Why HTML5 Canvas over WebGL/Three.js?

- **Sufficient for 2D** — particle fields, ODE charts, and constellation graphs are all 2D
- **No shader compilation** — instant render, no GPU context setup latency
- **Smaller bundle** — Three.js alone is 600KB; our canvas modules total ~22KB

### Data Architecture

```
data/*.js  →  main.js  →  section builders  →  DOM
                       ↘  canvas modules   →  Canvas
```

Each data file exports a plain JS object/array — completely decoupled from rendering. Update data without touching any rendering code.

---

## 🐛 Known Limitations

| Limitation | Workaround |
|---|---|
| Canvas `backdrop-filter` not supported in Firefox for `<canvas>` elements | Canvas uses opaque `#0B1120` background instead |
| Clipboard API requires HTTPS in production | Works on `localhost` and any HTTPS host |
| Google Fonts require internet connection | Add a CSS `@font-face` fallback for offline use |
| Publication list shows the 115 Scholar papers by Prof. Mishra (the Scholar profile also auto-attaches papers by other "B. Mishra" authors) | Add papers to `src/data/publications.js` |

---

## 🤝 Contributing & Maintenance

This is a **private portfolio project**. To update content:

1. Edit the relevant `src/data/*.js` file
2. Run `npm run dev` to preview
3. Run `npm run build` to verify the build
4. Deploy the `dist/` folder

**Maintainer**: Prafful Mishra  
**Subject**: Prof. (Dr.) Bimal Kumar Mishra  
**Contact**: drbimalmishra@gmail.com

---

## 📄 License

This project is **private and proprietary**. All content, data, and design belong to Prof. (Dr.) Bimal Kumar Mishra. Unauthorized reproduction or distribution is prohibited.

---

<div align="center">

Built with ∑ and ∂ · © 2026 Prof. (Dr.) Bimal Kumar Mishra · All Rights Reserved

**[↑ Back to Top](#)**

</div>
