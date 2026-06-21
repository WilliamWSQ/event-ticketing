import { useI18n } from '@shared/i18n';
import { cn } from '@shared/lib/cn';
import type { FilterKey } from '@shared/types';
import { useCatalog } from '../state/CatalogProvider';
import styles from './GenreFilter.module.css';

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
    <section className={styles.filterRow}>
      <h2 className={styles.sectionTitle}>{t.upcoming}</h2>
      <div className={styles.chips}>
        {FILTERS.map((f) => (
          <button
            key={f.key}
            className={cn(styles.chip, filter === f.key && styles.chipActive)}
            onClick={() => setFilter(f.key)}
          >
            {f.key === 'ALL' ? t.all : f.label}
          </button>
        ))}
      </div>
    </section>
  );
}
