import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '../../lib/cn';
import styles from './Button.module.css';

export type ButtonVariant = 'gradient' | 'gradientCP' | 'ink' | 'ghost' | 'soft';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  /** Stretch to fill the container width. */
  block?: boolean;
  /** Animate the gradient (used for primary CTAs). */
  animated?: boolean;
}

/**
 * Shared button. Variants:
 *  - `gradient`   cyan→magenta brand CTA (dark ink text)
 *  - `gradientCP` cyan→purple CTA
 *  - `ink`        solid near-black (hero primary)
 *  - `ghost`      translucent w/ hairline border
 *  - `soft`       subtle filled (secondary)
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'gradient', block = false, animated = false, className, type = 'button', ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cn(
        styles.btn,
        styles[variant],
        block && styles.block,
        animated && styles.animated,
        className,
      )}
      {...rest}
    />
  );
});
