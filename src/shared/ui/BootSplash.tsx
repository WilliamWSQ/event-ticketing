import { Equalizer } from './Equalizer';
import styles from './BootSplash.module.css';

/** Full-screen splash shown while the catalogue loads, or if it fails. */
export function BootSplash({ error }: { error?: string }) {
  return (
    <div className={styles.wrap}>
      <div className={styles.logo}>
        <span className={styles.tile}>
          <Equalizer variant="logo" />
        </span>
        <span className={styles.word}>PULSE</span>
      </div>
      {error ? (
        <div className={styles.error}>
          <p className={styles.errorTitle}>Не удалось загрузить данные</p>
          <p className={styles.errorMsg}>{error}</p>
          <p className={styles.errorHint}>Проверьте, что API запущен на :4000 — npm run dev в backend/</p>
        </div>
      ) : (
        <p className={styles.loading}>Загрузка афиши…</p>
      )}
    </div>
  );
}
