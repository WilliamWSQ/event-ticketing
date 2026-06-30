import type { ReactNode } from 'react';
import { useI18n } from '@shared/i18n';
import { Equalizer } from '@shared/ui';
import type { LocalizedConcert } from '@shared/types';
import * as S from './ConcertDetails.styles';

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
      <S.Hero style={{ background: sel.art }}>
        <S.HeroScrim aria-hidden="true" />
        <S.HeroSweep aria-hidden="true" />
        <S.HeroBody>
          <S.Tags>
            <S.TagGenre>{sel.genre}</S.TagGenre>
            <S.TagAge>18+</S.TagAge>
          </S.Tags>
          <S.Artist>{sel.artist}</S.Artist>
          <S.Tour>{sel.tour}</S.Tour>
        </S.HeroBody>
      </S.Hero>

      <S.Body>
        <S.Left>
          <S.InfoChips>
            <S.InfoChip>
              <S.CalIcon size={22} strokeWidth={1.7} />
              <div>
                <S.InfoLabel>{t.date}</S.InfoLabel>
                <S.InfoValue>{sel.dateLong}</S.InfoValue>
              </div>
            </S.InfoChip>
            <S.InfoChip>
              <S.ClockIcon size={22} strokeWidth={1.7} />
              <div>
                <S.InfoLabel>{t.doors}</S.InfoLabel>
                <S.InfoValue>{sel.time}</S.InfoValue>
              </div>
            </S.InfoChip>
            <S.InfoChip>
              <S.PinIcon size={22} strokeWidth={1.7} />
              <div>
                <S.InfoLabel>{t.venue}</S.InfoLabel>
                <S.InfoValue>{sel.venue}</S.InfoValue>
              </div>
            </S.InfoChip>
          </S.InfoChips>

          <S.H3>{t.about}</S.H3>
          <S.About>
            {t.aboutPre}
            {sel.artist}
            {t.aboutPost}
          </S.About>

          <S.H3>{t.lineup}</S.H3>
          <S.Lineup>
            {sel.lineup.map((l) => (
              <S.Act key={l.time + l.name}>
                <S.ActTime>{l.time}</S.ActTime>
                <S.ActName>{l.name}</S.ActName>
                <Equalizer variant="lineup" />
              </S.Act>
            ))}
          </S.Lineup>
        </S.Left>

        {aside}
      </S.Body>
    </>
  );
}
