import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 80;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 64px 20px;
  overflow-y: auto;
  background: rgba(6, 6, 10, 0.7);
  backdrop-filter: blur(6px);
`;
export const Panel = styled.div`
  width: min(560px, 100%);
  background: ${(p) => p.theme.elev};
  border: 1px solid ${(p) => p.theme.line.l12};
  border-radius: ${(p) => p.theme.radius.xl};
  box-shadow: ${(p) => p.theme.shadow.panel};
`;
export const Head = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  border-bottom: 1px solid ${(p) => p.theme.line.l10};
`;
export const Title = styled.h2`
  margin: 0;
  font-size: 19px;
  color: #fff;
`;
export const Close = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: ${(p) => p.theme.radius.sm};
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid ${(p) => p.theme.line.l10};
  color: ${(p) => p.theme.color.fg2};
  cursor: pointer;
  &:hover {
    color: #fff;
    border-color: rgba(255, 255, 255, 0.28);
  }
`;
export const Body = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
export const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding: 16px 24px;
  border-top: 1px solid ${(p) => p.theme.line.l10};
`;
