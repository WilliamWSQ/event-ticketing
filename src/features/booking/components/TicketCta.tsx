import { ArrowRight, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '@shared/i18n';
import { Button } from '@shared/ui';
import { useBooking } from '../state/BookingProvider';
import styles from './TicketCta.module.css';

/** Sticky ticket card on the concert page — entry point into the booking flow. */
export function TicketCta({ concertId, priceFrom }: { concertId: string; priceFrom: number }) {
  const { t, fmt } = useI18n();
  const { setConcertId } = useBooking();
  const navigate = useNavigate();

  const choose = () => {
    setConcertId(concertId);
    navigate(`/concert/${concertId}/seats`);
  };

  return (
    <aside className={styles.ticketCard}>
      <div className={styles.fromLabel}>{t.ticketsFrom}</div>
      <div className={styles.priceRow}>
        <span className={styles.price}>{fmt(priceFrom)}</span>
        <span className={styles.perPerson}>{t.perPerson}</span>
      </div>
      <div className={styles.fastPill}>
        <span className={styles.fastDot} aria-hidden="true" />
        {t.sellingFast}
      </div>
      <Button variant="gradient" block animated onClick={choose} className={styles.cta}>
        {t.chooseTickets}
        <ArrowRight size={18} strokeWidth={2.4} />
      </Button>
      <div className={styles.secured}>
        <Lock size={14} strokeWidth={1.8} className={styles.iconCyan} />
        {t.securedBy}
      </div>
    </aside>
  );
}
