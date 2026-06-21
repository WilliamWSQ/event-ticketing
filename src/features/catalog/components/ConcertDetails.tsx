import type { ReactNode } from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { useI18n } from '@shared/i18n';
import { Equalizer } from '@shared/ui';
import type { LocalizedConcert } from '@shared/types';
import styles from './ConcertDetails.module.css';

/**
 * Concert banner + info chips + about + lineup. `aside` is a slot for the
 * booking ticket card (composed by the page), keeping booking out of catalog.
 */
export function ConcertDetails({
  concert: sel,
  aside,
}: {
  concert: LocalizedConcert;
  aside: ReactNode;
}) {
  const { t } = useI18n();

  return (
    <>
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

        {aside}
      </div>
    </>
  );
}
