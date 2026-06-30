import { forwardRef, type ButtonHTMLAttributes } from 'react';
import * as S from './Button.styles';

export type { ButtonVariant } from './Button.styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: S.ButtonVariant;
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
    <S.StyledButton
      ref={ref}
      type={type}
      $variant={variant}
      $block={block}
      $animated={animated}
      {...rest}
    />
  );
});
