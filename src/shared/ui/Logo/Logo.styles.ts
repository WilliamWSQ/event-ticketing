import styled from 'styled-components';

export const Root = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
`;

export const Tile = styled.span`
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 11px;
  background: radial-gradient(120% 120% at 50% 0%, #15151d, #0a0a12);
  border: 1px solid rgba(128, 234, 255, 0.22);
  box-shadow:
    0 0 18px rgba(128, 234, 255, 0.18),
    inset 0 0 12px rgba(128, 234, 255, 0.06);
  padding-bottom: 11px;
`;

export const Lockup = styled.span`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  line-height: 1;
`;

export const Word = styled.span`
  font-family: ${(p) => p.theme.font.display};
  font-weight: 800;
  font-size: 20px;
  letter-spacing: 0.01em;
  color: #fff;
`;

export const Sub = styled.span`
  font-family: ${(p) => p.theme.font.body};
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.32em;
  color: ${(p) => p.theme.color.cyan};
  text-transform: uppercase;
  margin-top: 3px;
`;
