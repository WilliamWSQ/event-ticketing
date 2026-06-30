import { useState } from 'react';
import * as S from './Toggle.styles';

/** Pill switch used in account settings. Self-managed; visual matches the design. */
export function Toggle({ defaultOn = false, label }: { defaultOn?: boolean; label: string }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <S.Track
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      $on={on}
      onClick={() => setOn((v) => !v)}
    >
      <S.Knob $on={on} />
    </S.Track>
  );
}
