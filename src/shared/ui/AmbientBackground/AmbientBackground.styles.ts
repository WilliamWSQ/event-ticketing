import styled, { css } from 'styled-components';
import { glowBreath } from '@shared/theme';

export const Canvas = styled.canvas`
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

export const GlowCyan = styled.div`
  ${glowBase}
  top: -15%;
  left: -10%;
  width: 55vw;
  height: 55vw;
  background: radial-gradient(circle, rgba(128, 234, 255, 0.16), transparent 65%);
`;

export const GlowMagenta = styled.div`
  ${glowBase}
  bottom: -20%;
  right: -10%;
  width: 60vw;
  height: 60vw;
  background: radial-gradient(circle, rgba(255, 0, 92, 0.15), transparent 65%);
  animation-duration: 11s;
  animation-delay: 1s;
`;
