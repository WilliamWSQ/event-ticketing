import { Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '@shared/i18n';
import { Button, QRCode } from '@shared/ui';
import type { LocalizedConcert } from '@shared/types';
import { useBooking } from '../state/BookingProvider';
import styles from './TicketView.module.css';

/** Confirmation — animated success ring and the purchased ticket stub. */
export function TicketView({ concert: sel }: { concert: LocalizedConcert }) {
  const { t } = useI18n();
  const { selectedTier, qty, orderId } = useBooking();
  const navigate = useNavigate();

  return (
    <main className={styles.main}>
      <div className={styles.successRing}>
        <div className={styles.ringCyan} aria-hidden="true" />
        <div className={styles.ringMagenta} aria-hidden="true" />
        <Check size={40} strokeWidth={3} className={styles.successCheck} />
      </div>
      <h1 className={styles.title}>{t.youreIn}</h1>
      <p className={styles.subtext}>{t.ticketLive}</p>

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
        <Button variant="gradientCP" onClick={() => navigate('/account')}>
          {t.viewAccount}
        </Button>
        <Button variant="ghost" onClick={() => navigate('/')}>
          {t.moreShows}
        </Button>
      </div>
    </main>
  );
}
