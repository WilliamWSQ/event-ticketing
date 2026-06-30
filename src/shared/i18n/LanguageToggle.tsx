import { useI18n } from './I18nProvider';
import type { Lang } from '../types';
import * as S from './LanguageToggle.styles';

const OPTIONS: Lang[] = ['ru', 'en'];

/** RU / EN segmented control. */
export function LanguageToggle() {
  const { lang, setLang } = useI18n();
  return (
    <S.Group role="group" aria-label="Language / Язык">
      {OPTIONS.map((opt) => (
        <S.Seg
          key={opt}
          type="button"
          $active={lang === opt}
          aria-pressed={lang === opt}
          onClick={() => setLang(opt)}
        >
          {opt.toUpperCase()}
        </S.Seg>
      ))}
    </S.Group>
  );
}
