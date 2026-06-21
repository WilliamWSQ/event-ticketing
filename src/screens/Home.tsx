import { ArrowRight, Play } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { cn } from '../lib/cn';
import { ConcertCard } from '../components/ConcertCard';
import type { FilterKey } from '../types';
import styles from './Home.module.css';

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: 'ALL', label: '' }, // label filled from strings (t.all)
  { key: 'Techno', label: 'Techno' },
  { key: 'Rave', label: 'Rave' },
  { key: 'Electro-Pop', label: 'Electro-Pop' },
  { key: 'Pop', label: 'Pop' },
  { key: 'Hip-Hop', label: 'Hip-Hop' },
];

/** Discover / home — hero, genre filters, and the concert grid. */
export function Home() {
  const { t, filter, setFilter, localize, openFeatured, concerts } = useBooking();

  const visible = (filter === 'ALL' ? concerts : concerts.filter((c) => c.genre === filter)).map(
    (c) => localize(c.id),
  );

  return (
    <main className={styles.main}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroScrim} aria-hidden="true" />
        <div className={styles.heroSweep} aria-hidden="true" />

        <div className={styles.eyebrow}>
          <span className={styles.eyebrowDot} aria-hidden="true" />
          {t.heroBadge}
        </div>
        <h1 className={styles.heroTitle}>
          PULSE FESTIVAL
          <br />
          2026
        </h1>
        <p className={styles.heroSub}>{t.heroSub}</p>
        <div className={styles.heroActions}>
          <button className={styles.heroPrimary} onClick={openFeatured}>
            {t.getTickets}
            <ArrowRight size={18} strokeWidth={2.2} className={styles.heroArrow} />
          </button>
          <button className={styles.heroGhost}>
            <Play size={16} className={styles.playIcon} />
            {t.trailer}
          </button>
        </div>
      </section>

      {/* Filter row */}
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

      {/* Concert grid */}
      <section className={styles.grid}>
        {visible.map((c) => (
          <ConcertCard key={c.id} concert={c} />
        ))}
      </section>
    </main>
  );
}
