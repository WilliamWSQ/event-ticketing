import type { ReactNode } from 'react';
import styled from 'styled-components';

const Header = styled.header`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 28px;
`;
const Title = styled.h1`
  margin: 0;
  font-size: clamp(24px, 3vw, 32px);
  color: #fff;
`;
const Subtitle = styled.p`
  margin: 6px 0 0;
  color: ${(p) => p.theme.color.fg3};
  font-size: 14px;
`;
const Action = styled.div`
  display: flex;
  gap: 10px;
`;

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
    <Header>
      <div>
        <Title>{title}</Title>
        {subtitle && <Subtitle>{subtitle}</Subtitle>}
      </div>
      {action && <Action>{action}</Action>}
    </Header>
  );
}
