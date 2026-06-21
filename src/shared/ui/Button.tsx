import { forwardRef, type ButtonHTMLAttributes } from 'react';
import styled, { css } from 'styled-components';
import { gradShift } from '../theme/animations';

export type ButtonVariant = 'gradient' | 'gradientCP' | 'ink' | 'ghost' | 'soft';

const variants = {
  gradient: css`
    color: ${(p) => p.theme.color.onBright};
    background: ${(p) => p.theme.grad.brand};
    background-size: 200% 200%;
    box-shadow: ${(p) => p.theme.shadow.cta};
    &:hover {
      box-shadow: ${(p) => p.theme.shadow.ctaHover};
    }
  `,
  gradientCP: css`
    color: ${(p) => p.theme.color.onBright};
    background: ${(p) => p.theme.grad.brandCp};
    background-size: 200% 200%;
  `,
  ink: css`
    color: #fff;
    background: ${(p) => p.theme.color.page};
    box-shadow: 0 10px 30px rgba(6, 6, 10, 0.4);
  `,
  ghost: css`
    color: #fff;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid ${(p) => p.theme.line.l14};
    font-family: ${(p) => p.theme.font.body};
    font-weight: 600;
    &:hover {
      border-color: rgba(255, 255, 255, 0.3);
    }
  `,
  soft: css`
    color: ${(p) => p.theme.color.fg2};
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid ${(p) => p.theme.line.l10};
    font-family: ${(p) => p.theme.font.body};
    font-weight: 500;
    &:hover {
      color: #fff;
      border-color: rgba(255, 255, 255, 0.25);
    }
  `,
} as const;

const StyledButton = styled.button<{
  $variant: ButtonVariant;
  $block: boolean;
  $animated: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 15px 28px;
  border: none;
  border-radius: ${(p) => p.theme.radius.btn};
  cursor: pointer;
  font-family: ${(p) => p.theme.font.display};
  font-weight: 700;
  font-size: 16px;
  line-height: 1;
  white-space: nowrap;
  transition:
    transform ${(p) => p.theme.dur.base} ${(p) => p.theme.ease.standard},
    box-shadow ${(p) => p.theme.dur.base} ${(p) => p.theme.ease.standard},
    background ${(p) => p.theme.dur.base} ${(p) => p.theme.ease.standard},
    border-color ${(p) => p.theme.dur.base} ${(p) => p.theme.ease.standard};

  &:hover {
    transform: translateY(-2px);
  }
  &:active {
    transform: translateY(0);
    opacity: 0.92;
  }
  &:disabled {
    opacity: 0.6;
    cursor: progress;
    transform: none;
  }

  ${(p) => variants[p.$variant]}

  ${(p) =>
    p.$block &&
    css`
      width: 100%;
      padding: 16px;
      border-radius: ${p.theme.radius.mid};
    `}

  ${(p) =>
    p.$animated &&
    css`
      animation: ${gradShift} 6s ease infinite;
    `}
`;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  block?: boolean;
  animated?: boolean;
}

/**
 * Shared button. Variants: gradient (brand CTA), gradientCP (cyan→purple),
 * ink (solid near-black), ghost (translucent), soft (subtle).
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'gradient', block = false, animated = false, type = 'button', ...rest },
  ref,
) {
  return (
    <StyledButton
      ref={ref}
      type={type}
      $variant={variant}
      $block={block}
      $animated={animated}
      {...rest}
    />
  );
});
