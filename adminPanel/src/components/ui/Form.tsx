import type { ReactNode } from 'react';
import styled, { css } from 'styled-components';

const controlBase = css`
  width: 100%;
  padding: 10px 12px;
  border-radius: ${(p) => p.theme.radius.sm};
  background: ${(p) => p.theme.color.page};
  border: 1px solid ${(p) => p.theme.line.l12};
  color: #fff;
  font-size: 14px;
  outline: none;
  transition: border-color 0.15s ease;
  &::placeholder {
    color: ${(p) => p.theme.color.fgMuted};
  }
  &:focus {
    border-color: rgba(128, 234, 255, 0.5);
  }
`;

const FieldWrap = styled.label`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;
const FieldLabel = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: ${(p) => p.theme.color.fg3};
  text-transform: uppercase;
  letter-spacing: 0.04em;
`;
const Hint = styled.span`
  font-size: 12px;
  color: ${(p) => p.theme.color.fgMuted};
`;

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
    <FieldWrap>
      <FieldLabel>{label}</FieldLabel>
      {children}
      {hint && <Hint>{hint}</Hint>}
    </FieldWrap>
  );
}

export const Input = styled.input`
  ${controlBase}
`;

export const Textarea = styled.textarea`
  ${controlBase}
  resize: vertical;
  min-height: 64px;
  font-family: ${(p) => p.theme.font.mono};
  font-size: 13px;
  line-height: 1.5;
`;

export const Select = styled.select`
  ${controlBase}
`;

export const Row = styled.div`
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
  & > * {
    flex: 1 1 160px;
  }
`;
