// =========================================
// PhD Scholar Galaxy — Interactive Constellation
// =========================================

export function initConstellation(canvasId, scholars) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width, height, nodes, hoveredNode = null;
  let mouseX = 0, mouseY = 0;
  let time = 0;

  const DOMAIN_COLORS = {
    'Cyber-Epidemiology': '#00F2FE',
    'Network Security': '#3B82F6',
    'Fuzzy Mathematics': '#F59E0B',
    'Wireless Networks': '#10B981',
    'Game Theory & Security': '#EF4444',
    'Network Epidemics': '#8B5CF6',
    'Media & Epidemics': '#EC4899',
    'Biomathematics': '#06B6D4',
    'Infrastructure Security': '#F97316',
    'Pandemic Modeling': '#DC2626',
    'Epidemiology': '#14B8A6',
    'Malware Analysis': '#E11D48',
    'E-Epidemics': '#A855F7',
    'Fluid Dynamics': '#0EA5E9',
    'Blockchain & IoT': '#22C55E',
    'Deep Learning': '#6366F1',
    'Co-Infection Models': '#F43F5E',
    'Optimal Control': '#84CC16',
    'AI & Smart Cities': '#FBBF24',
    'Stochastic Models': '#7C3AED',
    'Mobile Security': '#38BDF8',
    'Cyber Crime': '#FB7185',
  };

  // Reliable hex to rgba converter
  function hexToRgba(hex, alpha) {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  function resize() {
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    layoutNodes();
  }

  function layoutNodes() {
    const cx = width / 2;
    const cy = height / 2;
    const maxR = Math.min(width, height) * 0.38;

    nodes = scholars.map((s, i) => {
      const angle = (i / scholars.length) * Math.PI * 2 - Math.PI / 2;
      const ring = i < 12 ? 0.7 : 1;
      const r = maxR * ring;
      return {
        ...s,
        x: cx + Math.cos(angle) * r,
        y: cy + Math.sin(angle) * r,
        baseX: cx + Math.cos(angle) * r,
        baseY: cy + Math.sin(angle) * r,
        radius: 6,
        color: DOMAIN_COLORS[s.domain] || '#00F2FE',
        angle,
      };
    });
  }

  function draw() {
    time += 0.005;
    ctx.clearRect(0, 0, width, height);

    const cx = width / 2;
    const cy = height / 2;

    // Subtle orbital rings
    const maxR = Math.min(width, height) * 0.38;
    for (let ring = 0.7; ring <= 1; ring += 0.3) {
      ctx.beginPath();
      ctx.arc(cx, cy, maxR * ring, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(0, 242, 254, 0.05)';
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Draw connections from center to nodes
    for (const node of nodes) {
      // Gentle orbital motion
      node.x = node.baseX + Math.sin(time + node.angle * 2) * 3;
      node.y = node.baseY + Math.cos(time + node.angle * 3) * 3;

      const isHovered = node === hoveredNode;

      // Connection line
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(node.x, node.y);
      ctx.strokeStyle = isHovered ? 'rgba(0, 242, 254, 0.4)' : 'rgba(0, 242, 254, 0.08)';
      ctx.lineWidth = isHovered ? 2 : 0.5;
      ctx.stroke();
    }

    // Draw scholar nodes
    for (const node of nodes) {
      const isHovered = node === hoveredNode;
      const r = isHovered ? 10 : node.radius;

      // Glow
      if (isHovered) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, r + 8, 0, Math.PI * 2);
        const grad = ctx.createRadialGradient(node.x, node.y, r, node.x, node.y, r + 8);
        grad.addColorStop(0, hexToRgba(node.color, 0.3));
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = grad;
        ctx.fill();
      }

      // Node circle
      ctx.beginPath();
      ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
      ctx.fillStyle = isHovered ? node.color : hexToRgba(node.color, 0.6);
      ctx.fill();
      ctx.strokeStyle = node.color;
      ctx.lineWidth = isHovered ? 2 : 1;
      ctx.stroke();

      // ID label
      if (!isHovered) {
        ctx.font = '8px "JetBrains Mono", monospace';
        ctx.fillStyle = 'rgba(203, 213, 225, 0.6)';
        ctx.textAlign = 'center';
        ctx.fillText(node.id, node.x, node.y + r + 12);
      }
    }

    // Center node (Prof. Mishra)
    const centerPulse = 18 + Math.sin(time * 2) * 3;
    
    // Center glow
    const cGrad = ctx.createRadialGradient(cx, cy, 5, cx, cy, centerPulse + 15);
    cGrad.addColorStop(0, 'rgba(0, 242, 254, 0.2)');
    cGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.beginPath();
    ctx.arc(cx, cy, centerPulse + 15, 0, Math.PI * 2);
    ctx.fillStyle = cGrad;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(cx, cy, centerPulse, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0, 242, 254, 0.15)';
    ctx.fill();
    ctx.strokeStyle = '#00F2FE';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.font = 'bold 10px "Inter", sans-serif';
    ctx.fillStyle = '#00F2FE';
    ctx.textAlign = 'center';
    ctx.fillText('Prof. B.K. Mishra', cx, cy - 3);
    ctx.font = '8px "JetBrains Mono", monospace';
    ctx.fillStyle = 'rgba(0, 242, 254, 0.7)';
    ctx.fillText('23 PhD Scholars', cx, cy + 10);

    // Hover tooltip
    if (hoveredNode) {
      const n = hoveredNode;
      const tw = 280;
      const th = 70;
      let tx = n.x + 15;
      let ty = n.y - th / 2;
      if (tx + tw > width) tx = n.x - tw - 15;
      if (ty < 10) ty = 10;
      if (ty + th > height - 10) ty = height - th - 10;

      // Tooltip background
      ctx.fillStyle = 'rgba(15, 23, 42, 0.95)';
      ctx.strokeStyle = hexToRgba(n.color, 0.4);
      ctx.lineWidth = 1;
      roundRect(ctx, tx, ty, tw, th, 8);
      ctx.fill();
      ctx.stroke();

      ctx.font = 'bold 11px "Inter", sans-serif';
      ctx.fillStyle = '#F8FAFC';
      ctx.textAlign = 'left';
      ctx.fillText(n.name, tx + 12, ty + 20);

      ctx.font = '9px "Inter", sans-serif';
      ctx.fillStyle = 'rgba(148, 163, 184, 0.8)';
      const thesisText = n.thesis.length > 55 ? n.thesis.substring(0, 55) + '...' : n.thesis;
      ctx.fillText(thesisText, tx + 12, ty + 36);

      ctx.font = '9px "JetBrains Mono", monospace';
      ctx.fillStyle = n.color;
      ctx.fillText(`${n.domain} • ${n.year}`, tx + 12, ty + 54);
    }

    requestAnimationFrame(draw);
  }

  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  }

  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;

    hoveredNode = null;
    for (const node of nodes) {
      const dx = mouseX - node.x;
      const dy = mouseY - node.y;
      if (Math.sqrt(dx * dx + dy * dy) < 15) {
        hoveredNode = node;
        canvas.style.cursor = 'pointer';
        break;
      }
    }
    if (!hoveredNode) canvas.style.cursor = 'default';
  });

  canvas.addEventListener('mouseleave', () => {
    hoveredNode = null;
    canvas.style.cursor = 'default';
  });

  window.addEventListener('resize', resize);
  resize();
  draw();
}
