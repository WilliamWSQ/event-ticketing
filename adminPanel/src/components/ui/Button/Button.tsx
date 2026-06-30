import { forwardRef, type ButtonHTMLAttributes } from 'react';
import * as S from './Button.styles';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: S.Variant;
  size?: S.Size;
}

export const Button = forwardRef<HTMLButtonElement, Props>(function Button(
  { variant = 'primary', size = 'md', type = 'button', ...rest },
  ref,
) {
  return <S.StyledButton ref={ref} type={type} $variant={variant} $size={size} {...rest} />;
});
