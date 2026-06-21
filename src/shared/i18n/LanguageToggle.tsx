import { useI18n } from './I18nProvider';
import { cn } from '../lib/cn';
import type { Lang } from '../types';
import styles from './LanguageToggle.module.css';

const OPTIONS: Lang[] = ['ru', 'en'];

/** RU / EN segmented control. */
export function LanguageToggle() {
  const { lang, setLang } = useI18n();
  return (
    <div className={styles.group} role="group" aria-label="Language / Язык">
      {OPTIONS.map((opt) => (
        <button
          key={opt}
          type="button"
          className={cn(styles.seg, lang === opt && styles.active)}
          aria-pressed={lang === opt}
          onClick={() => setLang(opt)}
        >
          {opt.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
