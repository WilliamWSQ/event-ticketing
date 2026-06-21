import { keyframes } from 'styled-components';

/** Screen rise-in on route change. */
export const rise = keyframes`
  from { transform: translateY(16px); opacity: 0; }
  to   { transform: translateY(0);    opacity: 1; }
`;

/** Equalizer bar bounce. */
export const eq = keyframes`
  0%, 100% { transform: scaleY(0.28); }
  50%      { transform: scaleY(1); }
`;

/** Holographic ticket shimmer sweep. */
export const shimmer = keyframes`
  0%   { background-position: 0% 50%; }
  100% { background-position: 200% 50%; }
`;

/** Animated CTA / hero gradient slide. */
export const gradShift = keyframes`
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

/** Slow conic sweep over hero banners. */
export const spinSlow = keyframes`
  to { transform: rotate(360deg); }
`;

/** Success-ring pulse. */
export const ring = keyframes`
  0%   { transform: scale(0.85); opacity: 0.7; }
  100% { transform: scale(2.4);  opacity: 0; }
`;

/** Breathing glow for ambient blobs and live dots. */
export const glowBreath = keyframes`
  0%, 100% { opacity: 0.5; }
  50%      { opacity: 1; }
`;
