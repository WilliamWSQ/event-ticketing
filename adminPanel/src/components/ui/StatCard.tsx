import type { LucideIcon } from 'lucide-react';
import styled from 'styled-components';

type Accent = 'cyan' | 'magenta' | 'purple' | 'green';

const accentBg: Record<Accent, string> = {
  cyan: 'rgba(128,234,255,0.14)',
  magenta: 'rgba(255,0,92,0.14)',
  purple: 'rgba(149,128,255,0.14)',
  green: 'rgba(46,204,113,0.14)',
};

const Card = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  border-radius: ${(p) => p.theme.radius.lg};
  background: ${(p) => p.theme.color.surface};
  border: 1px solid ${(p) => p.theme.line.l10};
  flex: 1 1 200px;
`;
const IconWrap = styled.span<{ $accent: Accent }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: ${(p) => p.theme.radius.md};
  flex: none;
  background: ${(p) => accentBg[p.$accent]};
  color: ${(p) =>
    p.$accent === 'cyan'
      ? p.theme.color.cyan
      : p.$accent === 'magenta'
        ? p.theme.color.magenta400
        : p.$accent === 'purple'
          ? p.theme.color.purple
          : p.theme.color.success};
`;
const Value = styled.div`
  font-family: ${(p) => p.theme.font.display};
  font-weight: 700;
  font-size: 26px;
  color: #fff;
  line-height: 1.1;
`;
const Label = styled.div`
  font-size: 13px;
  color: ${(p) => p.theme.color.fg3};
  margin-top: 2px;
`;

export function StatCard({
  icon: Icon,
  label,
  value,
  accent,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  accent: Accent;
}) {
  return (
    <Card>
      <IconWrap $accent={accent}>
        <Icon size={20} />
      </IconWrap>
      <div>
        <Value>{value}</Value>
        <Label>{label}</Label>
      </div>
    </Card>
  );
}
