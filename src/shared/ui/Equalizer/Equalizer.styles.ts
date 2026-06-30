import styled, { css } from 'styled-components';
import { eq } from '@shared/theme';

export const Wrap = styled.span<{ $variant: 'logo' | 'lineup' }>`
  display: flex;
  ${(p) =>
    p.$variant === 'logo'
      ? css`
          align-items: flex-end;
          justify-content: center;
          gap: 3px;
        `
      : css`
          align-items: flex-end;
          gap: 2px;
          height: 16px;
        `}
`;

export const Bar = styled.i`
  display: block;
  width: 3px;
  border-radius: 2px;
  transform-origin: bottom;
  animation-name: ${eq};
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
`;
