import styled from 'styled-components';

export const Track = styled.button<{ $on: boolean }>`
  position: relative;
  width: 46px;
  height: 26px;
  border-radius: ${(p) => p.theme.radius.pill};
  background: ${(p) => (p.$on ? p.theme.grad.brand : 'rgba(255,255,255,0.14)')};
  border: none;
  padding: 0;
  cursor: pointer;
  flex: none;
  transition: background ${(p) => p.theme.dur.base} ${(p) => p.theme.ease.standard};
`;

export const Knob = styled.span<{ $on: boolean }>`
  position: absolute;
  top: 3px;
  left: 3px;
  width: 20px;
  height: 20px;
  border-radius: ${(p) => p.theme.radius.pill};
  background: ${(p) => (p.$on ? '#fff' : '#6e6e7e')};
  transform: ${(p) => (p.$on ? 'translateX(20px)' : 'none')};
  transition:
    transform ${(p) => p.theme.dur.base} ${(p) => p.theme.ease.emphasis},
    background ${(p) => p.theme.dur.base} ${(p) => p.theme.ease.standard};
`;
