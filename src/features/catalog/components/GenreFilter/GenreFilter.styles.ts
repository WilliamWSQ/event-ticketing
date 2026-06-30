import styled from 'styled-components';

export const Row = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  margin: 48px 0 24px;
`;
export const Title = styled.h2`
  font-family: ${(p) => p.theme.font.display};
  font-weight: 700;
  font-size: clamp(26px, 3.5vw, 38px);
  letter-spacing: -0.03em;
  margin: 0;
  color: #fff;
`;
export const Chips = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;
export const Chip = styled.button<{ $active: boolean }>`
  background: ${(p) => (p.$active ? p.theme.grad.soft : 'rgba(255,255,255,0.04)')};
  border: 1px solid ${(p) => (p.$active ? 'rgba(149,128,255,0.5)' : p.theme.line.l10)};
  color: ${(p) => (p.$active ? '#fff' : p.theme.color.fg3)};
  font-family: ${(p) => p.theme.font.body};
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  padding: 9px 16px;
  border-radius: ${(p) => p.theme.radius.btn};
  transition:
    border-color ${(p) => p.theme.dur.base} ease,
    background ${(p) => p.theme.dur.base} ease,
    color ${(p) => p.theme.dur.base} ease;

  &:hover {
    border-color: rgba(128, 234, 255, 0.5);
  }
`;
