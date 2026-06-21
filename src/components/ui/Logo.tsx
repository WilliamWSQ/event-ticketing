import { Equalizer } from './Equalizer';
import styles from './Logo.module.css';

/** PULSE wordmark: neon equalizer tile + stacked "PULSE / LIVE · {city}" lockup. */
export function Logo({ sub, onClick }: { sub: string; onClick: () => void }) {
  return (
    <button className={styles.logo} onClick={onClick} aria-label="PULSE — home">
      <span className={styles.tile}>
        <Equalizer variant="logo" />
      </span>
      <span className={styles.lockup}>
        <span className={styles.word}>PULSE</span>
        <span className={styles.sub}>{sub}</span>
      </span>
    </button>
  );
}
