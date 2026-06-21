import { cn } from '../../lib/cn';
import styles from './Equalizer.module.css';

interface Bar {
  color: string;
  /** Height — px number for the logo, CSS length (e.g. '70%') for the lineup. */
  height: number | string;
  duration: number;
  delay: number;
  /** Logo bars get a neon glow. */
  glow?: boolean;
}

const LOGO_BARS: Bar[] = [
  { color: '#80EAFF', height: 9, duration: 0.9, delay: 0, glow: true },
  { color: '#9580FF', height: 15, duration: 0.7, delay: 0.1, glow: true },
  { color: '#FF005C', height: 7, duration: 1.1, delay: 0.2, glow: true },
  { color: '#80EAFF', height: 12, duration: 0.8, delay: 0.15, glow: true },
];

const LINEUP_BARS: Bar[] = [
  { color: '#9580FF', height: '50%', duration: 0.8, delay: 0 },
  { color: '#FF005C', height: '100%', duration: 0.6, delay: 0.1 },
  { color: '#80EAFF', height: '70%', duration: 1, delay: 0.2 },
];

/** Looping equalizer bars — used in the logo (fixed px) and lineup rows (%). */
export function Equalizer({ variant }: { variant: 'logo' | 'lineup' }) {
  const bars = variant === 'logo' ? LOGO_BARS : LINEUP_BARS;
  return (
    <span className={cn(styles.eq, styles[variant])} aria-hidden="true">
      {bars.map((b, i) => (
        <i
          key={i}
          className={styles.bar}
          style={{
            height: typeof b.height === 'number' ? `${b.height}px` : b.height,
            background: b.color,
            animationDuration: `${b.duration}s`,
            animationDelay: `${b.delay}s`,
            boxShadow: b.glow ? `0 0 6px ${b.color}` : undefined,
          }}
        />
      ))}
    </span>
  );
}
