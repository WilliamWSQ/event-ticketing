import type { ReactNode } from 'react';
import * as S from './Form.styles';

export { Input, Textarea, Select, Row } from './Form.styles';

/** Labeled field wrapper. */
export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <S.FieldWrap>
      <S.FieldLabel>{label}</S.FieldLabel>
      {children}
      {hint && <S.Hint>{hint}</S.Hint>}
    </S.FieldWrap>
  );
}
