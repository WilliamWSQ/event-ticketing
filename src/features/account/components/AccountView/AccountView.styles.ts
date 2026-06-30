import { ChevronRight } from 'lucide-react';
import styled from 'styled-components';
import { Button } from '@shared/ui';
import { rise } from '@shared/theme';

export const Main = styled.main`
  position: relative;
  z-index: 1;
  max-width: 1040px;
  margin: 0 auto;
  padding: clamp(24px, 3vw, 40px) clamp(20px, 5vw, 56px) 96px;
  animation: ${rise} 0.5s ${(p) => p.theme.ease.emphasis} both;
`;
export const Profile = styled.section`
  position: relative;
  border-radius: ${(p) => p.theme.radius.xl3};
  overflow: hidden;
  padding: clamp(24px, 4vw, 40px);
  margin-bottom: 32px;
  background: ${(p) => p.theme.grad.panel120};
  border: 1px solid ${(p) => p.theme.line.l10};
`;
export const ProfileGlow = styled.div`
  position: absolute;
  top: -40%;
  right: -5%;
  width: 40%;
  height: 180%;
  background: radial-gradient(circle, rgba(255, 0, 92, 0.18), transparent 65%);
  filter: blur(10px);
`;
export const ProfileRow = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 24px;
  flex-wrap: wrap;
`;
export const AvatarRing = styled.div`
  width: 96px;
  height: 96px;
  border-radius: ${(p) => p.theme.radius.pill};
  flex: none;
  background: ${(p) => p.theme.grad.brand};
  padding: 3px;
`;
export const Avatar = styled.div`
  width: 100%;
  height: 100%;
  border-radius: ${(p) => p.theme.radius.pill};
  background: ${(p) => p.theme.color.surface3};
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${(p) => p.theme.font.display};
  font-weight: 700;
  font-size: 34px;
  color: #fff;
`;
export const ProfileInfo = styled.div`
  flex: 1;
  min-width: 200px;
`;
export const NameRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`;
export const Name = styled.h1`
  font-family: ${(p) => p.theme.font.display};
  font-weight: 700;
  font-size: clamp(26px, 4vw, 38px);
  letter-spacing: -0.03em;
  margin: 0;
  color: #fff;
`;
export const TierBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 13px;
  border-radius: ${(p) => p.theme.radius.btn};
  background: linear-gradient(135deg, rgba(128, 234, 255, 0.2), rgba(255, 0, 92, 0.2));
  border: 1px solid rgba(149, 128, 255, 0.4);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.06em;
  color: ${(p) => p.theme.color.purple};
`;
export const Meta = styled.p`
  margin: 6px 0 0;
  color: ${(p) => p.theme.color.fg3};
  font-size: 15px;
`;
export const FindBtn = styled(Button)`
  padding: 12px 22px;
  font-size: 14px;
  font-weight: 600;
`;
export const Stats = styled.div`
  position: relative;
  display: flex;
  gap: 14px;
  margin-top: 28px;
  flex-wrap: wrap;
`;
export const Stat = styled.div`
  flex: 1;
  min-width: 130px;
  padding: 16px 18px;
  border-radius: ${(p) => p.theme.radius.mid};
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid ${(p) => p.theme.line.l08};
`;
export const StatValue = styled.div<{ $accent: 'cyan' | 'purple' | 'magenta' }>`
  font-family: ${(p) => p.theme.font.display};
  font-weight: 700;
  font-size: 30px;
  color: ${(p) =>
    p.$accent === 'cyan'
      ? p.theme.color.cyan
      : p.$accent === 'purple'
        ? p.theme.color.purple
        : p.theme.color.magenta400};
`;
export const StatLabel = styled.div`
  font-size: 12px;
  color: ${(p) => p.theme.color.fg3};
`;
export const H2 = styled.h2`
  font-family: ${(p) => p.theme.font.display};
  font-weight: 700;
  font-size: 24px;
  letter-spacing: -0.02em;
  margin: 0 0 16px;
  color: #fff;
`;
export const Tickets = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-bottom: 40px;
`;
export const TicketRow = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 16px;
  border-radius: ${(p) => p.theme.radius.lg};
  background: ${(p) => p.theme.color.surface};
  border: 1px solid ${(p) => p.theme.line.l10};
  cursor: pointer;
  transition:
    border-color ${(p) => p.theme.dur.base} ease,
    transform ${(p) => p.theme.dur.base} ease;
  &:hover {
    border-color: rgba(128, 234, 255, 0.4);
    transform: translateX(4px);
  }
`;
export const TicketArt = styled.div`
  width: 70px;
  height: 70px;
  border-radius: ${(p) => p.theme.radius.mid};
  flex: none;
`;
export const TicketInfo = styled.div`
  flex: 1;
  min-width: 0;
`;
export const TicketArtist = styled.div`
  font-family: ${(p) => p.theme.font.display};
  font-weight: 700;
  font-size: 19px;
  color: #fff;
`;
export const TicketMeta = styled.div`
  font-size: 13px;
  color: ${(p) => p.theme.color.fg3};
`;
export const TicketTier = styled.span`
  padding: 7px 14px;
  border-radius: ${(p) => p.theme.radius.btn};
  background: rgba(128, 234, 255, 0.14);
  border: 1px solid rgba(128, 234, 255, 0.3);
  font-size: 12px;
  font-weight: 700;
  color: ${(p) => p.theme.color.cyan};
  white-space: nowrap;
`;
export const Chevron = styled(ChevronRight)`
  color: ${(p) => p.theme.color.fgMuted};
  flex: none;
`;
export const Cols = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  align-items: flex-start;
`;
export const Col = styled.div`
  flex: 1 1 300px;
`;
export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
export const PayRow = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px;
  border-radius: ${(p) => p.theme.radius.card};
  background: ${(p) => p.theme.color.surface};
  border: 1px solid ${(p) => p.theme.line.l10};
`;
export const Mir = styled.span`
  display: flex;
  align-items: flex-end;
  flex: none;
`;
export const MirA = styled.i`
  width: 30px;
  height: 20px;
  border-radius: 4px;
  background: ${(p) => p.theme.color.magenta};
`;
export const MirB = styled.i`
  width: 30px;
  height: 20px;
  border-radius: 4px;
  background: ${(p) => p.theme.color.purple};
  margin-left: -12px;
  mix-blend-mode: screen;
`;
export const PayInfo = styled.div`
  flex: 1;
`;
export const PayName = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #fff;
`;
export const PaySub = styled.div`
  font-size: 12px;
  color: ${(p) => p.theme.color.fg3};
`;
export const DefaultPill = styled.span`
  font-size: 11px;
  font-weight: 700;
  color: ${(p) => p.theme.color.success};
  padding: 5px 10px;
  border-radius: ${(p) => p.theme.radius.btn};
  background: rgba(46, 204, 113, 0.12);
`;
export const TonBadge = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 24px;
  border-radius: 5px;
  background: rgba(128, 234, 255, 0.14);
  font-family: ${(p) => p.theme.font.mono};
  font-size: 11px;
  color: ${(p) => p.theme.color.cyan};
  flex: none;
`;
export const SettingRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-radius: ${(p) => p.theme.radius.card};
  background: ${(p) => p.theme.color.surface};
  border: 1px solid ${(p) => p.theme.line.l10};
`;
export const SettingLabel = styled.span<{ $muted?: boolean }>`
  font-size: 14px;
  color: ${(p) => (p.$muted ? p.theme.color.fg3 : '#fff')};
`;
