import { Check } from 'lucide-react';
import styled from 'styled-components';
import { rise, ring, shimmer } from '@shared/theme';

export const Main = styled.main`
  position: relative;
  z-index: 1;
  max-width: 620px;
  margin: 0 auto;
  padding: clamp(28px, 5vw, 56px) clamp(20px, 5vw, 40px) 96px;
  text-align: center;
  animation: ${rise} 0.55s ${(p) => p.theme.ease.emphasis} both;
`;
export const SuccessRing = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 84px;
  height: 84px;
  border-radius: ${(p) => p.theme.radius.pill};
  background: ${(p) => p.theme.grad.brand};
  margin-bottom: 22px;
`;
export const RingCyan = styled.div`
  position: absolute;
  inset: 0;
  border-radius: ${(p) => p.theme.radius.pill};
  border: 2px solid ${(p) => p.theme.color.cyan};
  animation: ${ring} 1.8s ease-out infinite;
`;
export const RingMagenta = styled.div`
  position: absolute;
  inset: 0;
  border-radius: ${(p) => p.theme.radius.pill};
  border: 2px solid ${(p) => p.theme.color.magenta};
  animation: ${ring} 1.8s ease-out infinite 0.6s;
`;
export const SuccessCheck = styled(Check)`
  color: ${(p) => p.theme.color.page};
`;
export const Title = styled.h1`
  font-family: ${(p) => p.theme.font.display};
  font-weight: 700;
  font-size: clamp(28px, 5vw, 40px);
  letter-spacing: -0.03em;
  margin: 0;
  color: #fff;
`;
export const Subtext = styled.p`
  color: ${(p) => p.theme.color.fg3};
  margin: 8px 0 32px;
  font-size: 16px;
`;
export const Stub = styled.div`
  position: relative;
  border-radius: ${(p) => p.theme.radius.xl3};
  overflow: hidden;
  text-align: left;
  background: linear-gradient(135deg, #13131d, #0a0a12);
  border: 1px solid ${(p) => p.theme.line.l12};
  box-shadow: 0 30px 70px rgba(0, 0, 0, 0.55);
`;
export const Shimmer = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    115deg,
    transparent 30%,
    rgba(128, 234, 255, 0.12) 45%,
    rgba(255, 0, 92, 0.12) 55%,
    transparent 70%
  );
  background-size: 300% 300%;
  animation: ${shimmer} 5s linear infinite;
  pointer-events: none;
`;
export const StubHeader = styled.div`
  position: relative;
  height: 130px;
  display: flex;
  align-items: flex-end;
  padding: 18px 24px;
`;
export const StubHeaderScrim = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(0deg, rgba(10, 10, 18, 0.85), transparent);
`;
export const StubHeaderText = styled.div`
  position: relative;
`;
export const Admit = styled.div`
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${(p) => p.theme.color.cyan};
  font-weight: 700;
`;
export const StubArtist = styled.div`
  font-family: ${(p) => p.theme.font.display};
  font-weight: 700;
  font-size: 28px;
  color: #fff;
  line-height: 1;
`;
export const Perf = styled.div`
  position: relative;
  height: 0;
  border-top: 2px dashed ${(p) => p.theme.line.l18};
  margin: 0 18px;
`;
export const Notch = styled.span<{ $side: 'left' | 'right' }>`
  position: absolute;
  top: -12px;
  width: 24px;
  height: 24px;
  border-radius: ${(p) => p.theme.radius.pill};
  background: ${(p) => p.theme.color.page};
  ${(p) => (p.$side === 'left' ? 'left: -30px;' : 'right: -30px;')}
`;
export const StubBody = styled.div`
  position: relative;
  display: flex;
  gap: 20px;
  padding: 24px;
  align-items: center;
  flex-wrap: wrap;
`;
export const DetailsGrid = styled.div`
  flex: 1;
  min-width: 180px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`;
export const DetailWide = styled.div`
  grid-column: 1 / 3;
`;
export const DetailLabel = styled.div`
  font-size: 11px;
  color: ${(p) => p.theme.color.fgMuted};
  text-transform: uppercase;
  letter-spacing: 0.08em;
`;
export const DetailValue = styled.div`
  font-size: 15px;
  color: #fff;
  font-weight: 600;
`;
export const DetailZone = styled.div`
  font-size: 15px;
  color: ${(p) => p.theme.color.cyan};
  font-weight: 700;
`;
export const DetailOrder = styled.div`
  font-family: ${(p) => p.theme.font.mono};
  font-size: 13px;
  color: ${(p) => p.theme.color.fg2};
`;
export const QrCol = styled.div`
  flex: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;
export const Qr = styled.div`
  width: 118px;
  height: 118px;
  padding: 9px;
  border-radius: ${(p) => p.theme.radius.mid};
  background: #fff;
`;
export const Scan = styled.span`
  font-size: 10px;
  color: ${(p) => p.theme.color.fgMuted};
  letter-spacing: 0.08em;
`;
export const Actions = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-top: 28px;
  flex-wrap: wrap;
`;
