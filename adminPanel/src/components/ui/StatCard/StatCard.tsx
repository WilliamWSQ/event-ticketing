import type { LucideIcon } from 'lucide-react';
import * as S from './StatCard.styles';

export function StatCard({
  icon: Icon,
  label,
  value,
  accent,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  accent: S.Accent;
}) {
  return (
    <S.Card>
      <S.IconWrap $accent={accent}>
        <Icon size={20} />
      </S.IconWrap>
      <div>
        <S.Value>{value}</S.Value>
        <S.Label>{label}</S.Label>
      </div>
    </S.Card>
  );
}
