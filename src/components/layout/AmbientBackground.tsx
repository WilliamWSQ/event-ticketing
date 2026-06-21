import { useEffect, useRef } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import styles from './AmbientBackground.module.css';

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

/**
 * Decorative, stateless ambient layer behind everything: a drifting neon
 * particle field on a canvas + two large breathing radial glows. Particle
 * count drops under reduced motion ("Calm"); the canvas is skipped entirely
 * if motion is reduced.
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
      {!reduced && <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />}
      <div className={`${styles.glow} ${styles.glowCyan}`} aria-hidden="true" />
      <div className={`${styles.glow} ${styles.glowMagenta}`} aria-hidden="true" />
    </>
  );
}
