import type { ReactNode } from 'react';
import * as S from './PageHeader.styles';

export function PageHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <S.Header>
      <div>
        <S.Title>{title}</S.Title>
        {subtitle && <S.Subtitle>{subtitle}</S.Subtitle>}
      </div>
      {action && <S.Action>{action}</S.Action>}
    </S.Header>
  );
}
