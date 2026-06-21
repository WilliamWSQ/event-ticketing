import styled from 'styled-components';
import { useI18n } from '@shared/i18n';
import type { FilterKey } from '@shared/types';
import { useCatalog } from '../state/CatalogProvider';

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: 'ALL', label: '' }, // label filled from strings (t.all)
  { key: 'Techno', label: 'Techno' },
  { key: 'Rave', label: 'Rave' },
  { key: 'Electro-Pop', label: 'Electro-Pop' },
  { key: 'Pop', label: 'Pop' },
  { key: 'Hip-Hop', label: 'Hip-Hop' },
];

const Row = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  margin: 48px 0 24px;
`;
const Title = styled.h2`
  font-family: ${(p) => p.theme.font.display};
  font-weight: 700;
  font-size: clamp(26px, 3.5vw, 38px);
  letter-spacing: -0.03em;
  margin: 0;
  color: #fff;
`;
const Chips = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;
const Chip = styled.button<{ $active: boolean }>`
  background: ${(p) => (p.$active ? p.theme.grad.soft : 'rgba(255,255,255,0.04)')};
  border: 1px solid ${(p) => (p.$active ? 'rgba(149,128,255,0.5)' : p.theme.line.l10)};
  color: ${(p) => (p.$active ? '#fff' : p.theme.color.fg3)};
  font-family: ${(p) => p.theme.font.body};
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  padding: 9px 16px;
  border-radius: ${(p) => p.theme.radius.btn};
  transition:
    border-color ${(p) => p.theme.dur.base} ease,
    background ${(p) => p.theme.dur.base} ease,
    color ${(p) => p.theme.dur.base} ease;

  &:hover {
    border-color: rgba(128, 234, 255, 0.5);
  }
`;

/** Section title + genre filter chips for the discover grid. */
export function GenreFilter() {
  const { filter, setFilter } = useCatalog();
  const { t } = useI18n();
  return (
    <Row>
      <Title>{t.upcoming}</Title>
      <Chips>
        {FILTERS.map((f) => (
          <Chip key={f.key} $active={filter === f.key} onClick={() => setFilter(f.key)}>
            {f.key === 'ALL' ? t.all : f.label}
          </Chip>
        ))}
      </Chips>
    </Row>
  );
}
