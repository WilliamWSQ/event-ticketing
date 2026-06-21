import { ArrowRight, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '@shared/i18n';
import { ConcertGrid, FEATURED_ID, GenreFilter } from '@features/catalog';
import styles from './DiscoverPage.module.css';

/** Discover (home) — hero, genre filters, and the concert grid. */
export function DiscoverPage() {
  const { t } = useI18n();
  const navigate = useNavigate();

  return (
    <main className={styles.main}>
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
          <button className={styles.heroPrimary} onClick={() => navigate(`/concert/${FEATURED_ID}`)}>
            {t.getTickets}
            <ArrowRight size={18} strokeWidth={2.2} className={styles.heroArrow} />
          </button>
          <button className={styles.heroGhost}>
            <Play size={16} className={styles.playIcon} />
            {t.trailer}
          </button>
        </div>
      </section>

      <GenreFilter />
      <ConcertGrid />
    </main>
  );
}
