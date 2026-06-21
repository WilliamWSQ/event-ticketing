import styled from 'styled-components';
import { useI18n } from './I18nProvider';
import type { Lang } from '../types';

const OPTIONS: Lang[] = ['ru', 'en'];

const Group = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  padding: 0 4px;
  border-radius: 11px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid ${(p) => p.theme.line.l08};
  gap: 2px;
  flex: none;
`;

const Seg = styled.button<{ $active: boolean }>`
  padding: 5px 9px;
  border-radius: 8px;
  border: none;
  background: ${(p) => (p.$active ? p.theme.grad.brand : 'transparent')};
  color: ${(p) => (p.$active ? p.theme.color.onBright : p.theme.color.fg3)};
  font-family: ${(p) => p.theme.font.body};
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.02em;
  cursor: pointer;
  transition:
    background ${(p) => p.theme.dur.base} ${(p) => p.theme.ease.standard},
    color ${(p) => p.theme.dur.base} ${(p) => p.theme.ease.standard};
`;

/** RU / EN segmented control. */
export function LanguageToggle() {
  const { lang, setLang } = useI18n();
  return (
    <Group role="group" aria-label="Language / Язык">
      {OPTIONS.map((opt) => (
        <Seg
          key={opt}
          type="button"
          $active={lang === opt}
          aria-pressed={lang === opt}
          onClick={() => setLang(opt)}
        >
          {opt.toUpperCase()}
        </Seg>
      ))}
    </Group>
  );
}
