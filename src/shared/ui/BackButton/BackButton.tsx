import { ChevronLeft } from 'lucide-react';
import * as S from './BackButton.styles';

/** Pill "back" control used at the top of detail screens. */
export function BackButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <S.Back onClick={onClick}>
      <ChevronLeft size={16} strokeWidth={2.2} />
      {label}
    </S.Back>
  );
}
