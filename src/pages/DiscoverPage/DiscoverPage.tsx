import { useNavigate } from 'react-router-dom';
import { useI18n } from '@shared/i18n';
import { ConcertGrid, FEATURED_ID, GenreFilter } from '@features/catalog';
import * as S from './DiscoverPage.styles';

/** Discover (home) — hero, genre filters, and the concert grid. */
export function DiscoverPage() {
  const { t } = useI18n();
  const navigate = useNavigate();

  return (
    <S.Main>
      <S.Hero>
        <S.HeroScrim aria-hidden="true" />
        <S.HeroSweep aria-hidden="true" />

        <S.Eyebrow>
          <S.EyebrowDot aria-hidden="true" />
          {t.heroBadge}
        </S.Eyebrow>
        <S.HeroTitle>
          PULSE FESTIVAL
          <br />
          2026
        </S.HeroTitle>
        <S.HeroSub>{t.heroSub}</S.HeroSub>
        <S.HeroActions>
          <S.HeroPrimary onClick={() => navigate(`/concert/${FEATURED_ID}`)}>
            {t.getTickets}
            <S.HeroArrow size={18} strokeWidth={2.2} />
          </S.HeroPrimary>
          <S.HeroGhost>
            <S.PlayIcon size={16} />
            {t.trailer}
          </S.HeroGhost>
        </S.HeroActions>
      </S.Hero>

      <GenreFilter />
      <ConcertGrid />
    </S.Main>
  );
}
