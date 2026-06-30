import { Calendar, Clock, MapPin } from 'lucide-react';
import styled from 'styled-components';
import { spinSlow } from '@shared/theme';

export const Hero = styled.section`
  position: relative;
  border-radius: 26px;
  overflow: hidden;
  min-height: 380px;
  display: flex;
  align-items: flex-end;
  padding: clamp(28px, 4vw, 48px);
  box-shadow: 0 30px 70px rgba(0, 0, 0, 0.45);
`;
export const HeroScrim = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(0deg, rgba(6, 6, 10, 0.92) 0%, rgba(6, 6, 10, 0.2) 55%, transparent 100%);
`;
export const HeroSweep = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 50%;
  height: 100%;
  opacity: 0.4;
  background: conic-gradient(from 0deg, transparent, rgba(255, 255, 255, 0.45), transparent 30%);
  mix-blend-mode: overlay;
  animation: ${spinSlow} 22s linear infinite;
  transform-origin: 70% 40%;
`;
export const HeroBody = styled.div`
  position: relative;
  width: 100%;
`;
export const Tags = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 14px;
`;
export const TagGenre = styled.span`
  padding: 6px 13px;
  border-radius: ${(p) => p.theme.radius.btn};
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  background: rgba(128, 234, 255, 0.16);
  border: 1px solid rgba(128, 234, 255, 0.4);
  color: ${(p) => p.theme.color.cyan};
`;
export const TagAge = styled.span`
  padding: 6px 13px;
  border-radius: ${(p) => p.theme.radius.btn};
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
`;
export const Artist = styled.h1`
  font-family: ${(p) => p.theme.font.display};
  font-weight: 700;
  font-size: clamp(40px, 7vw, 76px);
  line-height: 0.92;
  letter-spacing: -0.04em;
  margin: 0;
  color: #fff;
`;
export const Tour = styled.p`
  margin: 10px 0 0;
  font-size: 20px;
  color: ${(p) => p.theme.color.fg2};
  font-weight: 500;
`;
export const Body = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
  margin-top: 36px;
  align-items: flex-start;
`;
export const Left = styled.div`
  flex: 1 1 420px;
  min-width: 300px;
`;
export const InfoChips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-bottom: 32px;
`;
export const InfoChip = styled.div`
  flex: 1 1 150px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  border-radius: ${(p) => p.theme.radius.card};
  background: ${(p) => p.theme.color.surface};
  border: 1px solid ${(p) => p.theme.line.l08};
`;
export const InfoLabel = styled.div`
  font-size: 12px;
  color: ${(p) => p.theme.color.fg3};
`;
export const InfoValue = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: #fff;
`;
export const CalIcon = styled(Calendar)`
  color: ${(p) => p.theme.color.cyan};
  flex: none;
`;
export const ClockIcon = styled(Clock)`
  color: ${(p) => p.theme.color.purple};
  flex: none;
`;
export const PinIcon = styled(MapPin)`
  color: ${(p) => p.theme.color.magenta400};
  flex: none;
`;
export const H3 = styled.h3`
  font-family: ${(p) => p.theme.font.display};
  font-weight: 600;
  font-size: 24px;
  letter-spacing: -0.02em;
  margin: 0 0 14px;
  color: #fff;
`;
export const About = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: ${(p) => p.theme.color.fg2};
  margin: 0 0 32px;
`;
export const Lineup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;
export const Act = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 14px 16px;
  border-radius: ${(p) => p.theme.radius.icon};
  background: ${(p) => p.theme.color.surface};
  border: 1px solid ${(p) => p.theme.line.l05};
  transition:
    border-color ${(p) => p.theme.dur.base} ease,
    background ${(p) => p.theme.dur.base} ease;
  &:hover {
    border-color: rgba(255, 0, 92, 0.3);
    background: ${(p) => p.theme.color.surface2};
  }
`;
export const ActTime = styled.span`
  font-family: ${(p) => p.theme.font.mono};
  font-size: 13px;
  color: ${(p) => p.theme.color.cyan};
  min-width: 62px;
`;
export const ActName = styled.span`
  flex: 1;
  font-family: ${(p) => p.theme.font.display};
  font-weight: 600;
  font-size: 17px;
  color: #fff;
`;
