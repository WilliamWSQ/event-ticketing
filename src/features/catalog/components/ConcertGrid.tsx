import { useCatalog } from '../state/CatalogProvider';
import { useLocalizedConcerts } from '../hooks/useConcert';
import { ConcertCard } from './ConcertCard';
import styles from './ConcertGrid.module.css';

/** Responsive grid of concert cards, filtered by the active genre. */
export function ConcertGrid() {
  const { filter } = useCatalog();
  const all = useLocalizedConcerts();
  const visible = filter === 'ALL' ? all : all.filter((c) => c.genre === filter);

  return (
    <section className={styles.grid}>
      {visible.map((c) => (
        <ConcertCard key={c.id} concert={c} />
      ))}
    </section>
  );
}
