import { ArrowRight, Play } from 'lucide-react';
import styled from 'styled-components';
import { glowBreath, gradShift, rise, spinSlow } from '@shared/theme';

export const Main = styled.main`
  position: relative;
  z-index: 1;
  max-width: ${(p) => p.theme.layout.maxw};
  margin: 0 auto;
  padding: clamp(24px, 4vw, 48px) clamp(20px, 5vw, 56px) 96px;
  animation: ${rise} 0.5s ${(p) => p.theme.ease.emphasis} both;
`;
export const Hero = styled.section`
  position: relative;
  border-radius: ${(p) => p.theme.radius.hero};
  overflow: hidden;
  padding: clamp(32px, 5vw, 64px);
  min-height: 420px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background: linear-gradient(115deg, #80eaff 0%, #9580ff 42%, #ff005c 100%);
  background-size: 200% 200%;
  animation: ${gradShift} 14s ease infinite;
  box-shadow:
    0 30px 80px rgba(255, 0, 92, 0.25),
    0 0 0 1px rgba(255, 255, 255, 0.08) inset;
`;
export const HeroScrim = styled.div`
  position: absolute;
  inset: 0;
  background: radial-gradient(120% 120% at 80% 0%, transparent 30%, rgba(6, 6, 10, 0.55) 100%);
`;
export const HeroSweep = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 55%;
  height: 100%;
  opacity: 0.5;
  background: conic-gradient(from 0deg, transparent, rgba(255, 255, 255, 0.5), transparent 30%);
  mix-blend-mode: overlay;
  animation: ${spinSlow} 42s linear infinite;
  transform-origin: 80% 30%;
`;
export const Eyebrow = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  align-self: flex-start;
  margin-bottom: 18px;
  padding: 7px 14px;
  border-radius: ${(p) => p.theme.radius.btn};
  background: rgba(6, 6, 10, 0.55);
  backdrop-filter: blur(6px);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${(p) => p.theme.color.cyan};
`;
export const EyebrowDot = styled.span`
  display: inline-block;
  width: 7px;
  height: 7px;
  border-radius: ${(p) => p.theme.radius.pill};
  background: ${(p) => p.theme.color.magenta};
  box-shadow: 0 0 10px ${(p) => p.theme.color.magenta};
  animation: ${glowBreath} 1.4s infinite;
`;
export const HeroTitle = styled.h1`
  position: relative;
  font-family: ${(p) => p.theme.font.display};
  font-weight: 700;
  font-size: clamp(40px, 7vw, 84px);
  line-height: 0.95;
  letter-spacing: -0.04em;
  margin: 0;
  color: ${(p) => p.theme.color.page};
  text-shadow: 0 2px 30px rgba(255, 255, 255, 0.3);
`;
export const HeroSub = styled.p`
  position: relative;
  max-width: 520px;
  margin: 18px 0 0;
  font-size: 18px;
  line-height: 1.5;
  color: rgba(6, 6, 10, 0.82);
  font-weight: 500;
`;
export const HeroActions = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-top: 30px;
`;
export const HeroPrimary = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 9px;
  border-radius: ${(p) => p.theme.radius.btn};
  cursor: pointer;
  font-family: ${(p) => p.theme.font.display};
  font-weight: 600;
  font-size: 16px;
  padding: 15px 28px;
  border: none;
  background: ${(p) => p.theme.color.page};
  color: #fff;
  box-shadow: 0 10px 30px rgba(6, 6, 10, 0.4);
  transition:
    transform ${(p) => p.theme.dur.base} ease,
    background ${(p) => p.theme.dur.base} ease;
  &:hover {
    transform: translateY(-2px);
  }
  &:active {
    transform: translateY(0);
    opacity: 0.9;
  }
`;
export const HeroGhost = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 9px;
  border-radius: ${(p) => p.theme.radius.btn};
  cursor: pointer;
  font-family: ${(p) => p.theme.font.display};
  font-weight: 600;
  font-size: 16px;
  padding: 15px 26px;
  background: rgba(6, 6, 10, 0.35);
  backdrop-filter: blur(6px);
  color: ${(p) => p.theme.color.page};
  border: 1.5px solid rgba(6, 6, 10, 0.45);
  transition:
    transform ${(p) => p.theme.dur.base} ease,
    background ${(p) => p.theme.dur.base} ease;
  &:hover {
    background: rgba(6, 6, 10, 0.5);
  }
`;
export const HeroArrow = styled(ArrowRight)`
  color: ${(p) => p.theme.color.cyan};
`;
export const PlayIcon = styled(Play)`
  fill: ${(p) => p.theme.color.page};
  stroke: none;
`;
