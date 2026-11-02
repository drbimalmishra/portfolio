// =========================================
// Math Background — Floating Equations & Particle Field
// =========================================

export function initMathBackground(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H; // logical size (CSS pixels)
  let particles = [], equations = [];
  let mouse = { x: 0, y: 0 };

  const EQUATIONS = [
    'dS/dt', 'dE/dt', 'dI/dt', 'dQ/dt', 'dR/dt',
    '∂²u/∂t²', '∇²ψ', 'λ', 'β', 'δ', 'τ', 'γ',
    '∫₀^∞', 'Σᵢ₌₁ⁿ', 'dx/dt = σ(y−x)',
    'dy/dt = x(ρ−z)−y', 'dz/dt = xy−βz',
    'ℝⁿ', '∂f/∂x', '∮', 'ε→0', 'lim',
    '∞', 'π', 'e^(iπ)+1=0', '∇×F',
  ];

  const COLORS = [
    'rgba(0, 242, 254, 0.12)',
    'rgba(245, 158, 11, 0.10)',
    'rgba(139, 92, 246, 0.10)',
    'rgba(16, 185, 129, 0.08)',
  ];

  // Resize and rebuild particles — always uses setTransform, never stacks scale
  function resize() {
    const dpr = window.devicePixelRatio || 1;
    W = canvas.offsetWidth;
    H = canvas.offsetHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const area = W * H;
    const pCount = Math.min(Math.floor(area / 8000), 120);
    const eCount = Math.min(Math.floor(area / 25000), 25);

    particles = Array.from({ length: pCount }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.5 + 0.1,
    }));

    equations = Array.from({ length: eCount }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.15,
      vy: -(Math.random() * 0.2 + 0.05),
      text: EQUATIONS[Math.floor(Math.random() * EQUATIONS.length)],
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      size: Math.random() * 6 + 10,
      opacity: Math.random() * 0.15 + 0.03,
      rotation: (Math.random() - 0.5) * 0.3,
    }));

    mouse = { x: W / 2, y: H / 2 };
  }

  function drawParticles() {
    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = W;
      else if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H;
      else if (p.y > H) p.y = 0;

      // Subtle mouse repulsion
      const dx = p.x - mouse.x;
      const dy = p.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 150 && dist > 0) {
        p.x += (dx / dist) * 0.3;
        p.y += (dy / dist) * 0.3;
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 242, 254, ${p.opacity})`;
      ctx.fill();
    }

    // Draw connections between close particles
    const maxDist = 120;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < maxDist) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0, 242, 254, ${0.06 * (1 - dist / maxDist)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  function drawEquations() {
    for (const eq of equations) {
      eq.x += eq.vx;
      eq.y += eq.vy;

      if (eq.y < -30) {
        eq.y = H + 30;
        eq.x = Math.random() * W;
        eq.text = EQUATIONS[Math.floor(Math.random() * EQUATIONS.length)];
      }
      if (eq.x < -80) eq.x = W + 80;
      else if (eq.x > W + 80) eq.x = -80;

      ctx.save();
      ctx.translate(eq.x, eq.y);
      ctx.rotate(eq.rotation);
      ctx.font = `${eq.size}px 'JetBrains Mono', monospace`;
      ctx.fillStyle = eq.color;
      ctx.globalAlpha = eq.opacity;
      ctx.fillText(eq.text, 0, 0);
      ctx.restore();
    }
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);
    drawParticles();
    drawEquations();
    if (onScreen) rafId = requestAnimationFrame(animate);
  }

  // Only animate while the hero is visible
  let onScreen = true, rafId;
  new IntersectionObserver(([entry]) => {
    const wasOn = onScreen;
    onScreen = entry.isIntersecting;
    if (onScreen && !wasOn) {
      cancelAnimationFrame(rafId); // never run two loops
      rafId = requestAnimationFrame(animate);
    }
  }).observe(canvas);

  // Debounced resize
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 100);
  });

  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  canvas.addEventListener('mouseleave', () => {
    mouse.x = W / 2;
    mouse.y = H / 2;
  });

  resize();
  animate();
}
