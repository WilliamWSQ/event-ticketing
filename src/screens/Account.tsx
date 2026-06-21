import { useEffect, useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { api, type MeProfile, type MyTicket } from '../lib/api';
import { Button } from '../components/ui/Button';
import { Toggle } from '../components/ui/Toggle';
import styles from './Account.module.css';

const STATS = [
  { field: 'shows', label: 'statShows', cls: 'statCyan' },
  { field: 'cities', label: 'statCities', cls: 'statPurple' },
  { field: 'hours', label: 'statHours', cls: 'statMagenta' },
] as const;

/** Account — profile, upcoming tickets, payment methods, settings. */
export function Account() {
  const { t, lang, localize, tierName, openConcert, goHome } = useBooking();

  const [profile, setProfile] = useState<MeProfile | null>(null);
  const [tickets, setTickets] = useState<MyTicket[]>([]);

  useEffect(() => {
    let cancelled = false;
    api.me().then((p) => !cancelled && setProfile(p)).catch(() => {});
    api.myTickets().then((ts) => !cancelled && setTickets(ts)).catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  const name = profile?.name[lang] ?? t.userName;
  const meta = profile ? `${profile.email} · ${profile.city[lang]}` : t.userMeta;
  const initials = profile?.initials ?? t.initials;

  return (
    <main className={styles.main}>
      {/* Profile header */}
      <section className={styles.profile}>
        <div className={styles.profileGlow} aria-hidden="true" />
        <div className={styles.profileRow}>
          <div className={styles.avatarRing}>
            <div className={styles.avatar}>{initials}</div>
          </div>
          <div className={styles.profileInfo}>
            <div className={styles.nameRow}>
              <h1 className={styles.name}>{name}</h1>
              <span className={styles.tierBadge}>★ {t.neonTier}</span>
            </div>
            <p className={styles.meta}>{meta}</p>
          </div>
          <Button variant="gradientCP" onClick={goHome} className={styles.findBtn}>
            {t.findShows}
          </Button>
        </div>
        <div className={styles.stats}>
          {STATS.map((s) => (
            <div key={s.field} className={styles.stat}>
              <div className={`${styles.statValue} ${styles[s.cls]}`}>
                {profile ? profile.stats[s.field] : '—'}
              </div>
              <div className={styles.statLabel}>{t[s.label]}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Upcoming tickets */}
      <h2 className={styles.h2}>{t.myTickets}</h2>
      <div className={styles.tickets}>
        {tickets.map(({ orderId, concertId, tierId }) => {
          const c = localize(concertId);
          return (
            <div
              key={orderId}
              className={styles.ticketRow}
              role="button"
              tabIndex={0}
              onClick={() => openConcert(concertId)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  openConcert(concertId);
                }
              }}
            >
              <div className={styles.ticketArt} style={{ background: c.art }} />
              <div className={styles.ticketInfo}>
                <div className={styles.ticketArtist}>{c.artist}</div>
                <div className={styles.ticketMeta}>
                  {c.dateLong} · {c.venue}, {c.city}
                </div>
              </div>
              <span className={styles.ticketTier}>{tierName(tierId)}</span>
              <ChevronRight size={20} strokeWidth={2} className={styles.chevron} />
            </div>
          );
        })}
      </div>

      {/* Payment methods + settings */}
      <div className={styles.cols}>
        <div className={styles.col}>
          <h2 className={styles.h2}>{t.payMethods}</h2>
          <div className={styles.list}>
            <div className={styles.payRow}>
              <span className={styles.mir} aria-hidden="true">
                <i className={styles.mirA} />
                <i className={styles.mirB} />
              </span>
              <div className={styles.payInfo}>
                <div className={styles.payName}>{t.cardLabel}</div>
                <div className={styles.paySub}>{t.cardExpires}</div>
              </div>
              <span className={styles.defaultPill}>{t.cardDefault}</span>
            </div>
            <div className={styles.payRow}>
              <span className={styles.tonBadge}>TON</span>
              <div className={styles.payInfo}>
                <div className={styles.payName}>pulse.ton</div>
                <div className={styles.paySub}>{t.walletConnected}</div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.col}>
          <h2 className={styles.h2}>{t.settings}</h2>
          <div className={styles.list}>
            <div className={styles.settingRow}>
              <span className={styles.settingLabel}>{t.setAlerts}</span>
              <Toggle defaultOn label={t.setAlerts} />
            </div>
            <div className={styles.settingRow}>
              <span className={styles.settingLabel}>{t.setPresale}</span>
              <Toggle defaultOn label={t.setPresale} />
            </div>
            <div className={styles.settingRow}>
              <span className={styles.settingLabelMuted}>{t.setMarketing}</span>
              <Toggle label={t.setMarketing} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
