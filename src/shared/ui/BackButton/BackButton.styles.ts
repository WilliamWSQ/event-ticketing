import styled from 'styled-components';

export const Back = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid ${(p) => p.theme.line.l10};
  color: ${(p) => p.theme.color.fg2};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  padding: 9px 16px;
  border-radius: ${(p) => p.theme.radius.btn};
  margin-bottom: 22px;
  transition:
    color ${(p) => p.theme.dur.base} ease,
    border-color ${(p) => p.theme.dur.base} ease;

  &:hover {
    color: #fff;
    border-color: rgba(255, 255, 255, 0.25);
  }
`;
