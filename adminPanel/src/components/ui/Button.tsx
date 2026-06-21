import { forwardRef, type ButtonHTMLAttributes } from 'react';
import styled, { css } from 'styled-components';

type Variant = 'primary' | 'ghost' | 'danger' | 'subtle';
type Size = 'sm' | 'md';

const variants = {
  primary: css`
    background: ${(p) => p.theme.grad.brand};
    color: ${(p) => p.theme.color.onBright};
    font-weight: 700;
    &:hover {
      filter: brightness(1.06);
    }
  `,
  ghost: css`
    background: rgba(255, 255, 255, 0.04);
    border-color: ${(p) => p.theme.line.l12};
    color: ${(p) => p.theme.color.fg1};
    &:hover {
      border-color: rgba(255, 255, 255, 0.28);
    }
  `,
  subtle: css`
    background: transparent;
    color: ${(p) => p.theme.color.fg3};
    &:hover {
      color: #fff;
      background: rgba(255, 255, 255, 0.05);
    }
  `,
  danger: css`
    background: rgba(255, 0, 92, 0.12);
    border-color: rgba(255, 0, 92, 0.4);
    color: ${(p) => p.theme.color.magenta400};
    &:hover {
      background: rgba(255, 0, 92, 0.2);
      border-color: ${(p) => p.theme.color.magenta};
    }
  `,
} as const;

const sizes = {
  md: css`
    padding: 10px 16px;
    font-size: 14px;
  `,
  sm: css`
    padding: 6px 12px;
    font-size: 13px;
  `,
} as const;

const StyledButton = styled.button<{ $variant: Variant; $size: Size }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: 1px solid transparent;
  border-radius: ${(p) => p.theme.radius.md};
  cursor: pointer;
  font-family: ${(p) => p.theme.font.body};
  font-weight: 600;
  white-space: nowrap;
  transition:
    transform 0.15s ease,
    background 0.15s ease,
    border-color 0.15s ease,
    opacity 0.15s ease;
  &:active {
    transform: translateY(1px);
  }
  &:disabled {
    opacity: 0.55;
    cursor: progress;
  }
  ${(p) => sizes[p.$size]}
  ${(p) => variants[p.$variant]}
`;

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export const Button = forwardRef<HTMLButtonElement, Props>(function Button(
  { variant = 'primary', size = 'md', type = 'button', ...rest },
  ref,
) {
  return <StyledButton ref={ref} type={type} $variant={variant} $size={size} {...rest} />;
});
