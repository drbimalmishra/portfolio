// =========================================
// SEIQRS Epidemic Simulator — Runge-Kutta ODE Solver
// Dual-mode: Cyber-Warfare vs Biological Pandemic
// =========================================

export function initSeirSimulator(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width, height;
  let mode = 'cyber'; // 'cyber' or 'bio'
  let animFrameId = null;

  // Parameters with defaults
  let params = {
    beta: 0.3,
    delta: 0.15,
    tau: 0.1,
    sigma: 0.2,
    gamma: 0.08,
    alpha: 0.05,
  };

  const modeConfig = {
    cyber: {
      title: 'Cyber-Warfare & Malware Propagation',
      S: 'Clean Nodes', E: 'Exposed Nodes', I: 'Infected Nodes',
      Q: 'Quarantined Nodes', R: 'Recovered Nodes',
    },
    bio: {
      title: 'Biological Epidemic (COVID-19)',
      S: 'Susceptible', E: 'Exposed', I: 'Infectious',
      Q: 'Quarantined', R: 'Recovered',
    },
  };

  const COLORS = {
    S: '#3B82F6',
    E: '#F59E0B',
    I: '#EF4444',
    Q: '#8B5CF6',
    R: '#10B981',
  };

  // Reliable hex to rgba
  function hexToRgba(hex, alpha) {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  // SEIQRS ODE System
  function derivatives(state, p) {
    const { S, E, I, Q, R } = state;
    const N = S + E + I + Q + R;
    if (N === 0) return { dS: 0, dE: 0, dI: 0, dQ: 0, dR: 0 };
    return {
      dS: -p.beta * S * I / N + p.tau * R,
      dE: p.beta * S * I / N - p.sigma * E,
      dI: p.sigma * E - p.gamma * I - p.delta * I,
      dQ: p.delta * I - p.alpha * Q,
      dR: p.gamma * I + p.alpha * Q - p.tau * R,
    };
  }

  // 4th-order Runge-Kutta step
  function rk4Step(state, p, dt) {
    const k1 = derivatives(state, p);
    const s2 = {
      S: state.S + k1.dS * dt / 2, E: state.E + k1.dE * dt / 2,
      I: state.I + k1.dI * dt / 2, Q: state.Q + k1.dQ * dt / 2,
      R: state.R + k1.dR * dt / 2,
    };
    const k2 = derivatives(s2, p);
    const s3 = {
      S: state.S + k2.dS * dt / 2, E: state.E + k2.dE * dt / 2,
      I: state.I + k2.dI * dt / 2, Q: state.Q + k2.dQ * dt / 2,
      R: state.R + k2.dR * dt / 2,
    };
    const k3 = derivatives(s3, p);
    const s4 = {
      S: state.S + k3.dS * dt, E: state.E + k3.dE * dt,
      I: state.I + k3.dI * dt, Q: state.Q + k3.dQ * dt,
      R: state.R + k3.dR * dt,
    };
    const k4 = derivatives(s4, p);

    return {
      S: Math.max(0, state.S + (k1.dS + 2 * k2.dS + 2 * k3.dS + k4.dS) * dt / 6),
      E: Math.max(0, state.E + (k1.dE + 2 * k2.dE + 2 * k3.dE + k4.dE) * dt / 6),
      I: Math.max(0, state.I + (k1.dI + 2 * k2.dI + 2 * k3.dI + k4.dI) * dt / 6),
      Q: Math.max(0, state.Q + (k1.dQ + 2 * k2.dQ + 2 * k3.dQ + k4.dQ) * dt / 6),
      R: Math.max(0, state.R + (k1.dR + 2 * k2.dR + 2 * k3.dR + k4.dR) * dt / 6),
    };
  }

  function simulate() {
    const steps = 500;
    const dt = 0.5;
    let state = { S: 0.95, E: 0.03, I: 0.02, Q: 0, R: 0 };
    const history = [{ ...state, t: 0 }];
    for (let i = 1; i <= steps; i++) {
      state = rk4Step(state, params, dt);
      history.push({ ...state, t: i * dt });
    }
    return history;
  }

  // Resize ONCE — called explicitly, not from draw()
  function resize() {
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function draw() {
    if (width === 0 || height === 0) return;

    const data = simulate();
    const cfg = modeConfig[mode];

    ctx.clearRect(0, 0, width, height);

    // Background
    ctx.fillStyle = '#0B1120';
    ctx.fillRect(0, 0, width, height);

    // Chart area
    const pad = { top: 45, right: 25, bottom: 55, left: 60 };
    const cw = width - pad.left - pad.right;
    const ch = height - pad.top - pad.bottom;

    // Grid lines
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.08)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
      const y = pad.top + (ch * i / 5);
      ctx.beginPath();
      ctx.moveTo(pad.left, y);
      ctx.lineTo(pad.left + cw, y);
      ctx.stroke();

      ctx.fillStyle = 'rgba(148, 163, 184, 0.5)';
      ctx.font = '10px "JetBrains Mono", monospace';
      ctx.textAlign = 'right';
      ctx.fillText(((5 - i) * 20) + '%', pad.left - 8, y + 4);
    }

    // X-axis labels
    ctx.fillStyle = 'rgba(148, 163, 184, 0.5)';
    ctx.font = '10px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    const tMax = data[data.length - 1].t;
    for (let i = 0; i <= 5; i++) {
      const x = pad.left + (cw * i / 5);
      const t = Math.round(tMax * i / 5);
      ctx.fillText('t=' + t, x, height - pad.bottom + 20);
    }

    // Chart title
    ctx.fillStyle = '#F8FAFC';
    ctx.font = 'bold 13px "Inter", sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(cfg.title, pad.left, 25);

    // Draw area fills first (behind lines)
    const compartments = ['S', 'E', 'I', 'Q', 'R'];
    const labels = [cfg.S, cfg.E, cfg.I, cfg.Q, cfg.R];

    for (let c = 0; c < compartments.length; c++) {
      const key = compartments[c];
      ctx.beginPath();
      for (let i = 0; i < data.length; i++) {
        const x = pad.left + (i / (data.length - 1)) * cw;
        const y = pad.top + ch - (data[i][key] * ch);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.lineTo(pad.left + cw, pad.top + ch);
      ctx.lineTo(pad.left, pad.top + ch);
      ctx.closePath();
      ctx.fillStyle = hexToRgba(COLORS[key], 0.07);
      ctx.fill();
    }

    // Draw curves on top
    for (let c = 0; c < compartments.length; c++) {
      const key = compartments[c];
      ctx.beginPath();
      ctx.strokeStyle = COLORS[key];
      ctx.lineWidth = 2.5;
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';

      for (let i = 0; i < data.length; i++) {
        const x = pad.left + (i / (data.length - 1)) * cw;
        const y = pad.top + ch - (data[i][key] * ch);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }

    // Legend at bottom
    const legendY = height - 14;
    let legendX = pad.left;
    ctx.font = '10px "Inter", sans-serif';
    for (let c = 0; c < compartments.length; c++) {
      const key = compartments[c];
      // Legend swatch
      ctx.fillStyle = COLORS[key];
      ctx.fillRect(legendX, legendY - 6, 14, 3);
      // Legend label
      ctx.fillStyle = 'rgba(203, 213, 225, 0.8)';
      ctx.textAlign = 'left';
      const label = labels[c];
      ctx.fillText(label, legendX + 18, legendY);
      legendX += ctx.measureText(label).width + 34;
    }
  }

  // Public API — called from HTML onclick and from main.js
  window.setSeirMode = function(m) {
    mode = m;
    draw();
  };

  window.setSeirParam = function(key, value) {
    params[key] = parseFloat(value);
    draw();
  };

  window.addEventListener('resize', () => {
    resize();
    draw();
  });

  // Initial draw
  resize();
  draw();
}
