import styled, { css } from 'styled-components';

export const TableWrap = styled.div`
  border: 1px solid ${(p) => p.theme.line.l10};
  border-radius: ${(p) => p.theme.radius.lg};
  overflow: hidden;
  background: ${(p) => p.theme.color.surface};
`;
export const TableScroll = styled.div`
  overflow-x: auto;
`;
export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
`;
export const Th = styled.th<{ $right?: boolean }>`
  text-align: ${(p) => (p.$right ? 'right' : 'left')};
  padding: 14px 16px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${(p) => p.theme.color.fg3};
  background: rgba(255, 255, 255, 0.02);
  border-bottom: 1px solid ${(p) => p.theme.line.l10};
  white-space: nowrap;
`;
export const Td = styled.td<{ $right?: boolean; $strong?: boolean; $mono?: boolean }>`
  padding: 14px 16px;
  border-bottom: 1px solid ${(p) => p.theme.line.l08};
  color: ${(p) => p.theme.color.fg2};
  vertical-align: middle;
  ${(p) => p.$right && 'text-align: right;'}
  ${(p) =>
    p.$strong &&
    css`
      color: #fff;
      font-weight: 600;
    `}
  ${(p) =>
    p.$mono &&
    css`
      font-family: ${p.theme.font.mono};
      font-size: 13px;
    `}
`;
export const Row = styled.tr`
  &:last-child ${Td} {
    border-bottom: none;
  }
  &:hover ${Td} {
    background: rgba(255, 255, 255, 0.02);
  }
`;
export const Strong = styled.span`
  color: #fff;
  font-weight: 600;
`;
export const Sub = styled.span`
  color: ${(p) => p.theme.color.fgMuted};
  font-size: 12px;
`;
export const Actions = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
`;
export const Empty = styled.td`
  padding: 40px;
  text-align: center;
  color: ${(p) => p.theme.color.fgMuted};
`;
export const Swatch = styled.span`
  width: 34px;
  height: 34px;
  border-radius: 8px;
  flex: none;
  border: 1px solid ${(p) => p.theme.line.l12};
`;
export const CellFlex = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;
export const Badge = styled.span`
  display: inline-block;
  padding: 4px 10px;
  border-radius: ${(p) => p.theme.radius.pill};
  font-size: 12px;
  font-weight: 700;
  background: rgba(128, 234, 255, 0.14);
  color: ${(p) => p.theme.color.cyan};
  white-space: nowrap;
`;
export const Genre = styled.span`
  display: inline-block;
  padding: 4px 10px;
  border-radius: ${(p) => p.theme.radius.sm};
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  background: rgba(149, 128, 255, 0.14);
  color: ${(p) => p.theme.color.purple};
`;
