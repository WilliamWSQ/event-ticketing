import styled from 'styled-components';

export const Group = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  padding: 0 4px;
  border-radius: 11px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid ${(p) => p.theme.line.l08};
  gap: 2px;
  flex: none;
`;

export const Seg = styled.button<{ $active: boolean }>`
  padding: 5px 9px;
  border-radius: 8px;
  border: none;
  background: ${(p) => (p.$active ? p.theme.grad.brand : 'transparent')};
  color: ${(p) => (p.$active ? p.theme.color.onBright : p.theme.color.fg3)};
  font-family: ${(p) => p.theme.font.body};
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.02em;
  cursor: pointer;
  transition:
    background ${(p) => p.theme.dur.base} ${(p) => p.theme.ease.standard},
    color ${(p) => p.theme.dur.base} ${(p) => p.theme.ease.standard};
`;
