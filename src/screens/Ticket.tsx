import { Check } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { Button } from '../components/ui/Button';
import { QRCode } from '../components/ui/QRCode';
import styles from './Ticket.module.css';

/** Confirmation — animated success ring and the purchased ticket stub. */
export function Ticket() {
  const { t, selectedConcert: sel, selectedTier, qty, orderId, goAccount, goHome } = useBooking();

  return (
    <main className={styles.main}>
      <div className={styles.successRing}>
        <div className={styles.ringCyan} aria-hidden="true" />
        <div className={styles.ringMagenta} aria-hidden="true" />
        <Check size={40} strokeWidth={3} className={styles.successCheck} />
      </div>
      <h1 className={styles.title}>{t.youreIn}</h1>
      <p className={styles.subtext}>{t.ticketLive}</p>

      {/* Ticket stub */}
      <div className={styles.stub}>
        <div className={styles.shimmer} aria-hidden="true" />

        <div className={styles.stubHeader} style={{ background: sel.art }}>
          <div className={styles.stubHeaderScrim} aria-hidden="true" />
          <div className={styles.stubHeaderText}>
            <div className={styles.admit}>
              {t.admit} {qty}
            </div>
            <div className={styles.stubArtist}>{sel.artist}</div>
          </div>
        </div>

        {/* perforation */}
        <div className={styles.perf}>
          <span className={`${styles.notch} ${styles.notchLeft}`} />
          <span className={`${styles.notch} ${styles.notchRight}`} />
        </div>

        <div className={styles.stubBody}>
          <div className={styles.detailsGrid}>
            <div>
              <div className={styles.detailLabel}>{t.date}</div>
              <div className={styles.detailValue}>{sel.dateLong}</div>
            </div>
            <div>
              <div className={styles.detailLabel}>{t.doors}</div>
              <div className={styles.detailValue}>{sel.time}</div>
            </div>
            <div>
              <div className={styles.detailLabel}>{t.venue}</div>
              <div className={styles.detailValue}>{sel.venue}</div>
            </div>
            <div>
              <div className={styles.detailLabel}>{t.zone}</div>
              <div className={styles.detailZone}>{selectedTier.name}</div>
            </div>
            <div className={styles.detailWide}>
              <div className={styles.detailLabel}>{t.order}</div>
              <div className={styles.detailOrder}>{orderId}</div>
            </div>
          </div>

          <div className={styles.qrCol}>
            <div className={styles.qr}>
              <QRCode seed={orderId} />
            </div>
            <span className={styles.scan}>{t.scanGate}</span>
          </div>
        </div>
      </div>

      <div className={styles.actions}>
        <Button variant="gradientCP" onClick={goAccount}>
          {t.viewAccount}
        </Button>
        <Button variant="ghost" onClick={goHome}>
          {t.moreShows}
        </Button>
      </div>
    </main>
  );
}
