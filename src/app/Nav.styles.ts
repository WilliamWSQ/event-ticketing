import styled from 'styled-components';

export const Bar = styled.nav<{ $scrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  height: ${(p) => p.theme.layout.navH};
  display: flex;
  align-items: center;
  backdrop-filter: blur(18px) saturate(140%);
  -webkit-backdrop-filter: blur(18px) saturate(140%);
  background: ${(p) =>
    p.$scrolled
      ? 'linear-gradient(180deg,rgba(8,8,14,0.92),rgba(8,8,14,0.78))'
      : 'linear-gradient(180deg,rgba(10,10,18,0.5),rgba(10,10,18,0.18))'};
  border-bottom: 1px solid ${(p) => (p.$scrolled ? 'rgba(128,234,255,0.14)' : p.theme.line.l05)};
  box-shadow: ${(p) => (p.$scrolled ? '0 12px 34px rgba(0,0,0,0.5)' : 'none')};
  transition:
    background ${(p) => p.theme.dur.slow} ease,
    box-shadow ${(p) => p.theme.dur.slow} ease,
    border-color ${(p) => p.theme.dur.slow} ease;
`;
export const Hairline = styled.span`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(128, 234, 255, 0.55),
    rgba(255, 0, 92, 0.55),
    transparent
  );
  opacity: 0.7;
`;
export const Inner = styled.div`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 0 clamp(20px, 5vw, 56px);
`;
export const Links = styled.div`
  display: flex;
  gap: 2px;
  margin-left: 14px;
  @media (max-width: 720px) {
    display: none;
  }
`;
export const Link = styled.button<{ $active?: boolean }>`
  position: relative;
  background: none;
  border: none;
  color: ${(p) => (p.$active ? '#fff' : p.theme.color.fg3)};
  font-family: ${(p) => p.theme.font.body};
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  padding: 9px 14px;
  border-radius: ${(p) => p.theme.radius.btn};
  transition:
    color ${(p) => p.theme.dur.base} ease,
    background ${(p) => p.theme.dur.base} ease;
  &:hover {
    color: #fff;
    background: rgba(255, 255, 255, 0.05);
  }
`;
export const Underline = styled.span`
  position: absolute;
  left: 14px;
  right: 14px;
  bottom: 2px;
  height: 2px;
  border-radius: 2px;
  background: ${(p) => p.theme.grad.brand};
  box-shadow: 0 0 8px rgba(128, 234, 255, 0.6);
`;
export const Spacer = styled.div`
  flex: 1;
`;
export const IconBtn = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: ${(p) => p.theme.radius.icon};
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid ${(p) => p.theme.line.l08};
  color: #fff;
  cursor: pointer;
  flex: none;
  transition:
    background ${(p) => p.theme.dur.base} ease,
    border-color ${(p) => p.theme.dur.base} ease;
  &:hover {
    background: rgba(255, 0, 92, 0.14);
    border-color: rgba(255, 0, 92, 0.5);
  }
`;
export const Dot = styled.span`
  position: absolute;
  top: -3px;
  right: -3px;
  width: 9px;
  height: 9px;
  border-radius: ${(p) => p.theme.radius.pill};
  background: ${(p) => p.theme.color.magenta};
  border: 2px solid ${(p) => p.theme.color.page};
  box-shadow: 0 0 8px ${(p) => p.theme.color.magenta};
`;
export const Account = styled.button<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 9px;
  height: 40px;
  padding: 0 14px 0 4px;
  border-radius: 11px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid ${(p) => (p.$active ? 'rgba(149,128,255,0.6)' : p.theme.line.l08)};
  cursor: pointer;
  flex: none;
  transition: border-color ${(p) => p.theme.dur.base} ease;
  &:hover {
    border-color: rgba(149, 128, 255, 0.6);
  }
`;
export const Avatar = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: ${(p) => p.theme.radius.pill};
  background: ${(p) => p.theme.grad.brand};
  color: ${(p) => p.theme.color.onBright};
  font-weight: 800;
  font-size: 12px;
  font-family: ${(p) => p.theme.font.display};
`;
export const UserName = styled.span`
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  @media (max-width: 560px) {
    display: none;
  }
`;
