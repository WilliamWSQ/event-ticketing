import { useState } from 'react';
import { cn } from '../../lib/cn';
import styles from './Toggle.module.css';

/** Pill switch used in account settings. Self-managed; visual matches the design. */
export function Toggle({ defaultOn = false, label }: { defaultOn?: boolean; label: string }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      className={cn(styles.track, on && styles.on)}
      onClick={() => setOn((v) => !v)}
    >
      <span className={styles.knob} />
    </button>
  );
}
