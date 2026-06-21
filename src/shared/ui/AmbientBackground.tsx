import { useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { glowBreath } from '../theme/animations';

interface Particle {
  x: number;
  y: number;
  r: number;
  vy: number;
  vx: number;
  c: string;
  a: number;
}

const COLORS = ['#80EAFF', '#FF005C', '#9580FF'];

const Canvas = styled.canvas`
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
`;

const glowBase = css`
  position: fixed;
  border-radius: 50%;
  filter: blur(20px);
  z-index: 0;
  pointer-events: none;
  animation: ${glowBreath} 9s ease-in-out infinite;
`;

const GlowCyan = styled.div`
  ${glowBase}
  top: -15%;
  left: -10%;
  width: 55vw;
  height: 55vw;
  background: radial-gradient(circle, rgba(128, 234, 255, 0.16), transparent 65%);
`;

const GlowMagenta = styled.div`
  ${glowBase}
  bottom: -20%;
  right: -10%;
  width: 60vw;
  height: 60vw;
  background: radial-gradient(circle, rgba(255, 0, 92, 0.15), transparent 65%);
  animation-duration: 11s;
  animation-delay: 1s;
`;

/**
 * Decorative ambient layer: a drifting neon particle field on a canvas + two
 * breathing radial glows. The canvas is skipped under reduced motion.
 */
export function AmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let raf = 0;

    const resize = () => {
      dpr = Math.min(2, window.devicePixelRatio || 1);
      w = canvas.width = window.innerWidth * dpr;
      h = canvas.height = window.innerHeight * dpr;
    };
    resize();
    window.addEventListener('resize', resize);

    const count = 64;
    const particles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: (Math.random() * 1.8 + 0.6) * dpr,
        vy: -(Math.random() * 0.4 + 0.08) * dpr,
        vx: (Math.random() - 0.5) * 0.18 * dpr,
        c: COLORS[i % 3],
        a: Math.random() * 0.45 + 0.15,
      });
    }

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.y += p.vy;
        p.x += p.vx;
        if (p.y < -12) {
          p.y = h + 12;
          p.x = Math.random() * w;
        }
        if (p.x < -12) p.x = w + 12;
        if (p.x > w + 12) p.x = -12;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 7);
        ctx.fillStyle = p.c;
        ctx.globalAlpha = p.a;
        ctx.shadowColor = p.c;
        ctx.shadowBlur = 7 * dpr;
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [reduced]);

  return (
    <>
      {!reduced && <Canvas ref={canvasRef} aria-hidden="true" />}
      <GlowCyan aria-hidden="true" />
      <GlowMagenta aria-hidden="true" />
    </>
  );
}
