// =========================================
// MAIN.JS — Portfolio Entry Point
// =========================================

import './style.css';
import { initMathBackground } from './canvas/mathBackground.js';
import { initSeirSimulator } from './canvas/seirSimulator.js';
import { initConstellation } from './canvas/constellationGraph.js';
import { scholarData } from './data/scholarData.js';
import { patents } from './data/patents.js';
import { publications, publicationCategories } from './data/publications.js';
import { books } from './data/books.js';
import { phdScholars } from './data/phds.js';
import { mediaArticles, awards } from './data/mediaArticles.js';
import { creativeWorks } from './data/creativeWorks.js';

// ===== GLOBAL SCROLL-REVEAL OBSERVER =====
// Created once, shared by all section builders
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

// Helper: observe all .reveal elements not yet observed
function observeRevealElements() {
  document.querySelectorAll('.reveal:not([data-observed])').forEach(el => {
    el.dataset.observed = '1';
    revealObserver.observe(el);
  });
}

// ===== INIT ON DOM READY =====
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initMathBackground('hero-canvas');
  initSeirSimulator('seir-canvas');
  initCounters();
  buildTicker();
  buildTimeline();
  buildPatents();
  buildPublications();
  buildCitationChart();
  buildBooks();
  initConstellation('constellation-canvas', phdScholars);
  buildConstellationInfo();
  buildCreative();
  buildMedia();
  buildFellowships();
  buildConnectTerminal();
  initModal();
  // Observe all .reveal elements after everything is rendered
  observeRevealElements();
});

// ===== NAVIGATION =====
function initNavigation() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('nav-hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileClose = document.getElementById('mobile-nav-close');
  const mobileLinks = mobileNav.querySelectorAll('a');

  // Scroll behavior — navbar background
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });

  // Hamburger open
  hamburger.addEventListener('click', () => {
    mobileNav.classList.add('active');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  });

  // Close mobile nav
  function closeMobileNav() {
    mobileNav.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  mobileClose.addEventListener('click', closeMobileNav);
  mobileLinks.forEach(link => link.addEventListener('click', closeMobileNav));

  // Close on ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav.classList.contains('active')) closeMobileNav();
  });

  // Scroll spy — highlight active nav link
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 120) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  }, { passive: true });
}

// ===== ROLLING COUNTERS =====
function initCounters() {
  const m = scholarData.metrics;
  const navCitations = document.getElementById('nav-citations');
  if (navCitations) navCitations.textContent = `${m.citations.toLocaleString('en-US')}+ citations`;
  const counters = document.querySelectorAll('.metric-value[data-metric]');
  counters.forEach(c => { c.dataset.target = m[c.dataset.metric]; });
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target);
        animateCounter(el, target);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

function animateCounter(el, target) {
  const duration = 2000;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(eased * target);
    el.textContent = current.toLocaleString('en-US') + (target > 100 ? '+' : '');
    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

// ===== TICKER STRIP =====
function buildTicker() {
  const track = document.getElementById('ticker-track');
  if (!track) return;
  const m = scholarData.metrics;
  const items = [
    { label: 'Citations', value: `${m.citations.toLocaleString('en-US')}+` },
    { label: 'Publications', value: `${m.publications}+` },
    { label: 'Global Patents', value: m.patents },
    { label: 'PhDs Mentored', value: m.phdsSupervised },
    { label: 'h-index', value: m.hIndex },
    { label: 'i10-index', value: m.i10Index },
    { label: 'Books', value: m.books },
    { label: 'Conference Papers', value: '33' },
    { label: 'Countries Patented', value: '4' },
    { label: 'Years in Academia', value: '30+' },
    { label: 'Fellowships', value: 'FRAS · FIMA' },
    { label: 'Latest Patent', value: '#592958 India 2026' },
  ];
  // Duplicate for seamless loop
  const html = [...items, ...items].map(i =>
    `<span class="ticker-item"><strong>${i.value}</strong>&nbsp;${i.label}</span>`
  ).join('');
  track.innerHTML = html;
}

// ===== TIMELINE =====
function buildTimeline() {
  const timeline = document.getElementById('timeline');
  if (!timeline) return;
  const milestones = [
    { year: '1985–1988', title: 'B.Sc. (Hons.) Mathematics — Ranchi University', desc: 'Undergraduate honours in Mathematics. Beginning of a lifelong love for equations.' },
    { year: '1991–1993', title: 'M.Sc. Operational Research — University of Delhi', desc: 'Postgraduate training in operational research, optimization and decision science.' },
    { year: '1995', title: 'M.Sc. Mathematics — Vinoba Bhave University', desc: 'Second master\'s degree, in Mathematics.' },
    { year: '1997', title: 'Ph.D. — Vinoba Bhave University', desc: 'Doctoral research in Applied Mathematics, laying the foundation for mathematical modeling of complex dynamical systems.' },
    { year: '2000s', title: 'Faculty, BITS Pilani', desc: 'Teaching and research at BITS Pilani, mentoring the next generation of mathematicians and engineers.' },
    { year: '2007', title: 'D.Sc. — Berhampur University', desc: 'Doctor of Science degree recognizing distinguished contributions to mathematical modeling and nonlinear dynamics.' },
    { year: '2007–2017', title: 'Professor & Head, BIT Mesra', desc: 'Led the Department of Applied Mathematics at Birla Institute of Technology. Published 100+ papers. Supervised 20+ PhD scholars.' },
    { year: '2017–Present', title: 'Principal, VBU Colleges', desc: 'Principal of Ramgarh College under Vinoba Bhave University. Continuing active research while leading academic administration.' },
    { year: '2026', title: 'Indian Patent & "Zero Before the Symbol"', desc: 'Patent #592958 granted for AI-Cybersecurity for Smart Cities. Published groundbreaking monograph on the mathematical origins of zero.' },
  ];

  timeline.innerHTML = milestones.map((m) => `
    <div class="timeline-item reveal">
      <div class="timeline-dot"></div>
      <div class="timeline-content">
        <div class="timeline-card">
          <div class="timeline-year">${m.year}</div>
          <div class="timeline-title">${m.title}</div>
          <div class="timeline-desc">${m.desc}</div>
        </div>
      </div>
    </div>
  `).join('');
}

// ===== PATENTS =====
function buildPatents() {
  const grid = document.getElementById('patents-grid');
  if (!grid) return;

  grid.innerHTML = patents.map(p => `
    <div class="patent-card reveal" style="--patent-color: ${p.color}" data-patent-id="${p.id}">
      <div class="patent-header">
        <span class="patent-flag">${p.flag}</span>
        <div>
          <div class="patent-country">${p.country}</div>
          <div class="patent-number">Patent #${p.patentNumber}</div>
        </div>
      </div>
      <div class="patent-title">${p.title}</div>
      <div class="patent-date">${p.authority} · ${p.grantDate}</div>
      <div class="patent-tags">
        ${p.tags.map(t => `<span class="patent-tag">${t}</span>`).join('')}
      </div>
    </div>
  `).join('');

  // Click to show modal
  grid.querySelectorAll('.patent-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.dataset.patentId;
      const p = patents.find(x => x.id === id);
      if (p) showModal(`
        <h3 style="color: var(--white); font-size: 1.3rem; margin-bottom: 0.5rem; line-height:1.3;">${p.flag} ${p.title}</h3>
        <p style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--neon-cyan); margin-bottom: 1rem;">
          Patent #${p.patentNumber} &nbsp;·&nbsp; ${p.country} &nbsp;·&nbsp; ${p.authority}
        </p>
        <p style="color: var(--slate-300); line-height: 1.75; margin-bottom: 1rem;">${p.description}</p>
        <p style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--slate-500);">
          Granted: ${p.grantDate}${p.filingDate ? ' &nbsp;·&nbsp; Filed: ' + p.filingDate : ''}
        </p>
        <div style="margin-top:1rem; display:flex; flex-wrap:wrap; gap:0.4rem;">
          ${p.tags.map(t => `<span style="font-size:0.7rem; padding:0.2rem 0.6rem; background:rgba(0,242,254,0.1); color:var(--neon-cyan); border-radius:999px;">${t}</span>`).join('')}
        </div>
      `);
    });
  });
}

// ===== PUBLICATIONS =====
function buildPublications() {
  const filters = document.getElementById('pub-filters');
  const list = document.getElementById('pub-list');
  const count = document.getElementById('pub-count');
  const search = document.getElementById('pub-search');
  const sort = document.getElementById('pub-sort');
  if (!filters || !list || !count || !search || !sort) return;

  let activeFilter = 'all';

  // Build filter buttons
  publicationCategories.forEach(cat => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `pub-filter-btn ${cat.key === 'all' ? 'active' : ''}`;
    const n = cat.key === 'all' ? publications.length : publications.filter(p => p.category === cat.key).length;
    btn.textContent = `${cat.label} (${n})`;
    btn.addEventListener('click', () => {
      activeFilter = cat.key;
      filters.querySelectorAll('.pub-filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderPubs();
    });
    filters.appendChild(btn);
  });

  function renderPubs() {
    const query = search.value.toLowerCase().trim();
    let filtered = [...publications];

    if (activeFilter !== 'all') {
      filtered = filtered.filter(p => p.category === activeFilter);
    }
    if (query) {
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(query) ||
        p.journal.toLowerCase().includes(query) ||
        (p.authors && p.authors.toLowerCase().includes(query)) ||
        String(p.year).includes(query)
      );
    }

    // Undated papers always go last; ties fall back to most cited
    const byYear = (a, b) => (b.year || 0) - (a.year || 0);
    if (sort.value === 'cited') filtered.sort((a, b) => b.citations - a.citations || byYear(a, b));
    else if (sort.value === 'oldest') filtered.sort((a, b) => (a.year || 9999) - (b.year || 9999) || b.citations - a.citations);
    else filtered.sort((a, b) => byYear(a, b) || b.citations - a.citations);

    count.textContent = `Showing ${filtered.length} of ${publications.length} papers listed on Google Scholar`;

    list.innerHTML = filtered.length ? filtered.map(p => `
      <div class="pub-item">
        <span class="pub-year">${p.year || '—'}</span>
        <div class="pub-info">
          <div class="pub-title">${p.title}</div>
          <div class="pub-journal">${p.journal ? p.journal + ' · ' : ''}${p.authors}${p.citations ? ` · Cited by ${p.citations}` : ''}</div>
          ${p.doi
            ? `<a href="https://doi.org/${p.doi}" target="_blank" rel="noopener noreferrer" class="pub-doi">DOI ↗</a>`
            : `<a href="https://scholar.google.com/citations?view_op=view_citation&hl=en&user=${scholarData.scholarId}&citation_for_view=${p.scholarId}" target="_blank" rel="noopener noreferrer" class="pub-doi">Google Scholar ↗</a>`}
        </div>
      </div>
    `).join('') : '<p style="color:var(--slate-500); text-align:center; padding:2rem 0;">No papers match your search.</p>';
  }

  // Debounced search
  let timeout;
  search.addEventListener('input', () => {
    clearTimeout(timeout);
    timeout = setTimeout(renderPubs, 200);
  });

  sort.addEventListener('change', renderPubs);
  renderPubs();
}

// ===== CITATION CHART =====
function buildCitationChart() {
  const canvas = document.getElementById('citation-chart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const data = scholarData.citationsByYear;
  let drawn = false;

  function draw() {
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;
    if (w === 0 || h === 0) return;

    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);

    const pad = { top: 30, right: 20, bottom: 45, left: 50 };
    const cw = w - pad.left - pad.right;
    const ch = h - pad.top - pad.bottom;
    const maxVal = Math.max(...data.map(d => d.count));

    // Title
    ctx.font = 'bold 12px "Inter", sans-serif';
    ctx.fillStyle = '#F8FAFC';
    ctx.textAlign = 'left';
    ctx.fillText(`Citations per Year (${data[0].year}–${data[data.length - 1].year})`, pad.left, 18);

    // Grid lines
    for (let i = 0; i <= 4; i++) {
      const y = pad.top + (ch * i / 4);
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.08)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(pad.left, y);
      ctx.lineTo(pad.left + cw, y);
      ctx.stroke();

      ctx.fillStyle = 'rgba(148, 163, 184, 0.5)';
      ctx.font = '9px "JetBrains Mono", monospace';
      ctx.textAlign = 'right';
      ctx.fillText(Math.round(maxVal * (4 - i) / 4), pad.left - 6, y + 3);
    }

    // Bars
    const barW = (cw / data.length) * 0.7;
    const gap = cw / data.length;

    // Gradient area under an imaginary line (smooth feel)
    ctx.beginPath();
    for (let i = 0; i < data.length; i++) {
      const x = pad.left + i * gap + gap / 2;
      const y = pad.top + ch - (data[i].count / maxVal) * ch;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.lineTo(pad.left + (data.length - 1) * gap + gap / 2, pad.top + ch);
    ctx.lineTo(pad.left + gap / 2, pad.top + ch);
    ctx.closePath();
    const areaGrad = ctx.createLinearGradient(0, pad.top, 0, pad.top + ch);
    areaGrad.addColorStop(0, 'rgba(0, 242, 254, 0.15)');
    areaGrad.addColorStop(1, 'rgba(0, 242, 254, 0.02)');
    ctx.fillStyle = areaGrad;
    ctx.fill();

    for (let i = 0; i < data.length; i++) {
      const x = pad.left + i * gap + gap * 0.15;
      const barH = (data[i].count / maxVal) * ch;
      const y = pad.top + ch - barH;

      // Bar gradient
      const grad = ctx.createLinearGradient(x, y, x, pad.top + ch);
      grad.addColorStop(0, 'rgba(0, 242, 254, 0.85)');
      grad.addColorStop(1, 'rgba(0, 242, 254, 0.2)');
      ctx.fillStyle = grad;

      // Rounded top corners
      const r = Math.min(3, barW / 2);
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.lineTo(x + barW - r, y);
      ctx.arcTo(x + barW, y, x + barW, y + r, r);
      ctx.lineTo(x + barW, pad.top + ch);
      ctx.lineTo(x, pad.top + ch);
      ctx.lineTo(x, y + r);
      ctx.arcTo(x, y, x + r, y, r);
      ctx.closePath();
      ctx.fill();

      // Year label (every other bar to avoid clutter)
      if (i % 2 === 0) {
        ctx.fillStyle = 'rgba(148, 163, 184, 0.5)';
        ctx.font = '8px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.fillText(data[i].year, x + barW / 2, pad.top + ch + 15);
      }
    }
  }

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !drawn) {
      drawn = true;
      draw();
      window.addEventListener('resize', draw, { passive: true });
    }
  }, { threshold: 0.2 });

  observer.observe(canvas);
}

// ===== BOOKS =====
function buildBooks() {
  const grid = document.getElementById('books-grid');
  if (!grid) return;

  grid.innerHTML = books.map((b, idx) => `
    <div class="book-card reveal" style="--book-color: ${b.color}; --book-glow: ${b.color}33;" data-book-idx="${idx}">
      <div class="book-card-inner">
        <div class="book-icon">${b.icon}</div>
        <div class="book-title">${b.title}</div>
        ${b.subtitle ? `<div class="book-subtitle">${b.subtitle}</div>` : ''}
        <div class="book-meta">${b.publisher ? b.publisher + ' · ' : ''}${b.year}${b.isbn ? ' · ISBN: ' + b.isbn : ''}</div>
        <div class="book-tags">
          ${b.tags.map(t => `<span class="book-tag">${t}</span>`).join('')}
        </div>
      </div>
    </div>
  `).join('');

  // Click to expand modal
  grid.querySelectorAll('.book-card').forEach(card => {
    card.addEventListener('click', () => {
      const idx = parseInt(card.dataset.bookIdx);
      const b = books[idx];
      if (!b) return;
      showModal(`
        <div style="text-align: center; margin-bottom: 1.5rem;">
          <span style="font-size: 3.5rem;">${b.icon}</span>
        </div>
        <h3 style="color: var(--white); font-size: 1.3rem; margin-bottom: 0.3rem; line-height:1.3;">${b.title}</h3>
        ${b.subtitle ? `<p style="font-style: italic; color: var(--slate-400); margin-bottom: 1rem; font-size:0.95rem;">${b.subtitle}</p>` : ''}
        <p style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--neon-cyan); margin-bottom: 1.2rem;">
          ${b.publisher ? b.publisher + ' · ' : ''}${b.year}${b.isbn ? ' · ISBN: ' + b.isbn : ''}
        </p>
        <p style="color: var(--slate-300); line-height: 1.75; font-size: 0.95rem;">${b.description}</p>
        ${b.buyLink ? `<div style="margin-top:1.5rem; text-align:center;"><a href="${b.buyLink}" target="_blank" rel="noopener noreferrer" style="display:inline-flex; align-items:center; gap:0.4rem; padding:0.7rem 1.4rem; background:var(--neon-cyan); color:var(--obsidian); border-radius:999px; font-weight:700; font-size:0.85rem;">Get this Book ↗</a></div>` : ''}
      `);
    });
  });
}

// ===== CONSTELLATION INFO =====
function buildConstellationInfo() {
  const info = document.getElementById('constellation-info');
  if (!info) return;
  const domains = [...new Set(phdScholars.map(s => s.domain))];
  const years = phdScholars.map(s => s.year);
  info.innerHTML = `
    <div class="constellation-stat">
      <div class="constellation-stat-value">${phdScholars.length}</div>
      <div class="constellation-stat-label">PhD Scholars Awarded</div>
    </div>
    <div class="constellation-stat">
      <div class="constellation-stat-value">${domains.length}</div>
      <div class="constellation-stat-label">Research Domains</div>
    </div>
    <div class="constellation-stat">
      <div class="constellation-stat-value">${Math.min(...years)}–${Math.max(...years)}</div>
      <div class="constellation-stat-label">Mentorship Span</div>
    </div>
    <div class="constellation-stat">
      <div class="constellation-stat-value">4</div>
      <div class="constellation-stat-label">Institutions</div>
    </div>
  `;
}

// ===== CREATIVE =====
function buildCreative() {
  const grid = document.getElementById('creative-grid');
  if (!grid) return;
  const entries = Object.values(creativeWorks);
  grid.innerHTML = entries.map(c => `
    <div class="creative-card reveal" style="--creative-color: ${c.color}">
      <div class="creative-icon">${c.icon}</div>
      <div class="creative-title">${c.title}</div>
      <ul class="creative-list">
        ${c.achievements.map(a => `<li>${a}</li>`).join('')}
      </ul>
    </div>
  `).join('');
}

// ===== MEDIA =====
function buildMedia() {
  const grid = document.getElementById('media-grid');
  if (!grid) return;
  grid.innerHTML = mediaArticles.map(m => `
    <div class="media-card reveal">
      <div class="media-source">
        <span class="media-source-icon">${m.icon}</span>
        <span class="media-source-name" style="color: ${m.color}">${m.source}</span>
        <span class="media-source-date">${m.date}</span>
      </div>
      <div class="media-title">${m.title}</div>
      <div class="media-desc">${m.description}</div>
    </div>
  `).join('');
}

// ===== FELLOWSHIPS =====
function buildFellowships() {
  const grid = document.getElementById('fellowships-grid');
  if (!grid) return;
  grid.innerHTML = awards.map(a => `
    <div class="fellowship-card reveal" style="--fellowship-color: ${a.color}; --fellowship-glow: ${a.color}33;">
      <div class="fellowship-icon">${a.icon}</div>
      <div class="fellowship-title">${a.title}</div>
      <div class="fellowship-org">${a.organization}</div>
      <div class="fellowship-desc">${a.description}</div>
    </div>
  `).join('');
}

// ===== CONNECT TERMINAL =====
function buildConnectTerminal() {
  const terminal = document.getElementById('connect-terminal');
  if (!terminal) return;

  const lines = [
    { key: 'ORCID', value: '0000-0002-7979-4995', link: 'https://orcid.org/0000-0002-7979-4995', copy: '0000-0002-7979-4995' },
    { key: 'Scholar', value: scholarData.scholarId, link: scholarData.links.scholar, copy: scholarData.links.scholar },
    { key: 'DBLP', value: 'pid/84/1408', link: scholarData.links.dblp, copy: scholarData.links.dblp },
    { key: 'ResearchGate', value: 'Bimal-Mishra', link: 'https://www.researchgate.net/profile/Bimal-Mishra', copy: 'https://www.researchgate.net/profile/Bimal-Mishra' },
    { key: 'LinkedIn', value: 'prof-bimal-kumar-mishra', link: 'https://www.linkedin.com/in/prof-bimal-kumar-mishra-ph-d-d-sc-fras-fima-93220621/', copy: 'https://www.linkedin.com/in/prof-bimal-kumar-mishra-ph-d-d-sc-fras-fima-93220621/' },
    { key: 'Email', value: 'drbimalmishra@gmail.com', link: 'mailto:drbimalmishra@gmail.com', copy: 'drbimalmishra@gmail.com' },
  ];

  terminal.innerHTML = `
    <div class="terminal-header">
      <span class="terminal-dot red"></span>
      <span class="terminal-dot yellow"></span>
      <span class="terminal-dot green"></span>
      <span class="terminal-title">bkm@academic ~ $ connect</span>
    </div>
    <div class="terminal-body">
      ${lines.map((l, i) => `
        <div class="terminal-line">
          <span class="terminal-prompt">▸</span>
          <span class="terminal-key">${l.key}:</span>
          <span class="terminal-val"><a href="${l.link}" target="_blank" rel="noopener noreferrer">${l.value}</a></span>
          <button type="button" class="copy-btn" id="copy-btn-${i}" data-copy="${l.copy}">copy</button>
        </div>
      `).join('')}
    </div>
  `;

  // Attach copy handlers
  terminal.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const text = btn.dataset.copy;
      const write = navigator.clipboard ? navigator.clipboard.writeText(text) : Promise.reject(new Error('Clipboard unavailable'));
      write.then(() => {
        btn.textContent = '✓ copied';
        btn.classList.add('copied');
        setTimeout(() => {
          btn.textContent = 'copy';
          btn.classList.remove('copied');
        }, 2000);
      }).catch(() => {
        // Fallback for older browsers
        btn.textContent = '(copy failed)';
        setTimeout(() => { btn.textContent = 'copy'; }, 2000);
      });
    });
  });
}

// ===== MODAL =====
function initModal() {
  const overlay = document.getElementById('modal-overlay');
  const close = document.getElementById('modal-close');
  if (!overlay || !close) return;

  function closeModal() {
    if (!overlay.classList.contains('active')) return;
    overlay.classList.remove('active');
    document.body.style.overflow = '';
    lastFocus?.focus();
  }

  close.addEventListener('click', closeModal);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // Patent and book cards open the modal: make them reachable by keyboard too
  document.querySelectorAll('.patent-card, .book-card').forEach(card => {
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });
}

let lastFocus = null;

function showModal(html) {
  const body = document.getElementById('modal-body');
  const overlay = document.getElementById('modal-overlay');
  if (!body || !overlay) return;
  lastFocus = document.activeElement;
  body.innerHTML = html;
  overlay.classList.add('active');
  // Prevent body scroll when modal is open
  document.body.style.overflow = 'hidden';
  document.getElementById('modal-close')?.focus();
}

