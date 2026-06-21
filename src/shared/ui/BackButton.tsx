import { ChevronLeft } from 'lucide-react';
import styled from 'styled-components';

const Back = styled.button`
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

/** Pill "back" control used at the top of detail screens. */
export function BackButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <Back onClick={onClick}>
      <ChevronLeft size={16} strokeWidth={2.2} />
      {label}
    </Back>
  );
}
