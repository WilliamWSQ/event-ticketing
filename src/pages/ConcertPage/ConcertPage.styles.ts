import styled from 'styled-components';
import { rise } from '@shared/theme';

export const Main = styled.main`
  position: relative;
  z-index: 1;
  max-width: ${(p) => p.theme.layout.maxw};
  margin: 0 auto;
  padding: clamp(20px, 3vw, 32px) clamp(20px, 5vw, 56px) 120px;
  animation: ${rise} 0.5s ${(p) => p.theme.ease.emphasis} both;
`;
