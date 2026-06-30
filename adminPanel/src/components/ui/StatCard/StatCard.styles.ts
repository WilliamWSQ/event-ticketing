import styled from 'styled-components';

export type Accent = 'cyan' | 'magenta' | 'purple' | 'green';

const accentBg: Record<Accent, string> = {
  cyan: 'rgba(128,234,255,0.14)',
  magenta: 'rgba(255,0,92,0.14)',
  purple: 'rgba(149,128,255,0.14)',
  green: 'rgba(46,204,113,0.14)',
};

export const Card = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  border-radius: ${(p) => p.theme.radius.lg};
  background: ${(p) => p.theme.color.surface};
  border: 1px solid ${(p) => p.theme.line.l10};
  flex: 1 1 200px;
`;
export const IconWrap = styled.span<{ $accent: Accent }>`
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
export const Value = styled.div`
  font-family: ${(p) => p.theme.font.display};
  font-weight: 700;
  font-size: 26px;
  color: #fff;
  line-height: 1.1;
`;
export const Label = styled.div`
  font-size: 13px;
  color: ${(p) => p.theme.color.fg3};
  margin-top: 2px;
`;
