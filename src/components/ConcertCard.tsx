import { MapPin } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import type { LocalizedConcert } from '../types';
import styles from './ConcertCard.module.css';

/** Concert card in the discover grid. */
export function ConcertCard({ concert }: { concert: LocalizedConcert }) {
  const { t, fmt, openConcert } = useBooking();
  return (
    <article
      className={styles.card}
      onClick={() => openConcert(concert.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openConcert(concert.id);
        }
      }}
    >
      <div className={styles.art} style={{ background: concert.art }}>
        <div className={styles.artScrim} aria-hidden="true" />
        <div className={styles.dateBadge}>
          <span className={styles.day}>{concert.day}</span>
          <span className={styles.month}>{concert.month}</span>
        </div>
        <span className={styles.pricePill}>
          {t.from} {fmt(concert.priceFrom)}
        </span>
        <span className={styles.genre}>{concert.genre}</span>
      </div>
      <div className={styles.body}>
        <h3 className={styles.artist}>{concert.artist}</h3>
        <p className={styles.tour}>{concert.tour}</p>
        <div className={styles.venue}>
          <MapPin size={14} strokeWidth={2} className={styles.pin} />
          {concert.venue} · {concert.city}
        </div>
      </div>
    </article>
  );
}
