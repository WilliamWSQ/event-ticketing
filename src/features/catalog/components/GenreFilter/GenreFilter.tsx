import { useI18n } from '@shared/i18n';
import type { FilterKey } from '@shared/types';
import { useCatalog } from '../../state/CatalogProvider';
import * as S from './GenreFilter.styles';

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: 'ALL', label: '' }, // label filled from strings (t.all)
  { key: 'Techno', label: 'Techno' },
  { key: 'Rave', label: 'Rave' },
  { key: 'Electro-Pop', label: 'Electro-Pop' },
  { key: 'Pop', label: 'Pop' },
  { key: 'Hip-Hop', label: 'Hip-Hop' },
];

/** Section title + genre filter chips for the discover grid. */
export function GenreFilter() {
  const { filter, setFilter } = useCatalog();
  const { t } = useI18n();
  return (
    <S.Row>
      <S.Title>{t.upcoming}</S.Title>
      <S.Chips>
        {FILTERS.map((f) => (
          <S.Chip key={f.key} $active={filter === f.key} onClick={() => setFilter(f.key)}>
            {f.key === 'ALL' ? t.all : f.label}
          </S.Chip>
        ))}
      </S.Chips>
    </S.Row>
  );
}
