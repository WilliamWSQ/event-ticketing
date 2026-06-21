import { ArrowRight, Calendar, Clock, Lock, MapPin } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { useConcertParam } from '../hooks/useConcertParam';
import { BackButton } from '../components/ui/BackButton';
import { Button } from '../components/ui/Button';
import { Equalizer } from '../components/ui/Equalizer';
import styles from './Details.module.css';

/** Concert details — banner, info, lineup, and a sticky ticket card. */
export function Details() {
  const { t, fmt, goHome, goSeats } = useBooking();
  const sel = useConcertParam();

  return (
    <main className={styles.main}>
      <BackButton label={t.backDiscover} onClick={goHome} />

      {/* Hero banner */}
      <section className={styles.hero} style={{ background: sel.art }}>
        <div className={styles.heroScrim} aria-hidden="true" />
        <div className={styles.heroSweep} aria-hidden="true" />
        <div className={styles.heroBody}>
          <div className={styles.tags}>
            <span className={styles.tagGenre}>{sel.genre}</span>
            <span className={styles.tagAge}>18+</span>
          </div>
          <h1 className={styles.artist}>{sel.artist}</h1>
          <p className={styles.tour}>{sel.tour}</p>
        </div>
      </section>

      {/* Two-column body */}
      <div className={styles.body}>
        <div className={styles.left}>
          <div className={styles.infoChips}>
            <div className={styles.infoChip}>
              <Calendar size={22} strokeWidth={1.7} className={styles.iconCyan} />
              <div>
                <div className={styles.infoLabel}>{t.date}</div>
                <div className={styles.infoValue}>{sel.dateLong}</div>
              </div>
            </div>
            <div className={styles.infoChip}>
              <Clock size={22} strokeWidth={1.7} className={styles.iconPurple} />
              <div>
                <div className={styles.infoLabel}>{t.doors}</div>
                <div className={styles.infoValue}>{sel.time}</div>
              </div>
            </div>
            <div className={styles.infoChip}>
              <MapPin size={22} strokeWidth={1.7} className={styles.iconMagenta} />
              <div>
                <div className={styles.infoLabel}>{t.venue}</div>
                <div className={styles.infoValue}>{sel.venue}</div>
              </div>
            </div>
          </div>

          <h3 className={styles.h3}>{t.about}</h3>
          <p className={styles.about}>
            {t.aboutPre}
            {sel.artist}
            {t.aboutPost}
          </p>

          <h3 className={styles.h3}>{t.lineup}</h3>
          <div className={styles.lineup}>
            {sel.lineup.map((l) => (
              <div key={l.time + l.name} className={styles.act}>
                <span className={styles.actTime}>{l.time}</span>
                <span className={styles.actName}>{l.name}</span>
                <Equalizer variant="lineup" />
              </div>
            ))}
          </div>
        </div>

        {/* Sticky ticket card */}
        <aside className={styles.ticketCard}>
          <div className={styles.fromLabel}>{t.ticketsFrom}</div>
          <div className={styles.priceRow}>
            <span className={styles.price}>{fmt(sel.priceFrom)}</span>
            <span className={styles.perPerson}>{t.perPerson}</span>
          </div>
          <div className={styles.fastPill}>
            <span className={styles.fastDot} aria-hidden="true" />
            {t.sellingFast}
          </div>
          <Button variant="gradient" block animated onClick={goSeats} className={styles.cta}>
            {t.chooseTickets}
            <ArrowRight size={18} strokeWidth={2.4} />
          </Button>
          <div className={styles.secured}>
            <Lock size={14} strokeWidth={1.8} className={styles.iconCyan} />
            {t.securedBy}
          </div>
        </aside>
      </div>
    </main>
  );
}
