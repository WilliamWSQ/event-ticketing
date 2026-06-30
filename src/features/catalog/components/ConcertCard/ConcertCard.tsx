import { useNavigate } from 'react-router-dom';
import { useI18n } from '@shared/i18n';
import type { LocalizedConcert } from '@shared/types';
import * as S from './ConcertCard.styles';

/** Concert card in the discover grid. */
export function ConcertCard({ concert }: { concert: LocalizedConcert }) {
  const { t, fmt } = useI18n();
  const navigate = useNavigate();
  const open = () => navigate(`/concert/${concert.id}`);

  return (
    <S.Card
      onClick={open}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          open();
        }
      }}
    >
      <S.Art style={{ background: concert.art }}>
        <S.ArtScrim aria-hidden="true" />
        <S.DateBadge>
          <S.Day>{concert.day}</S.Day>
          <S.Month>{concert.month}</S.Month>
        </S.DateBadge>
        <S.PricePill>
          {t.from} {fmt(concert.priceFrom)}
        </S.PricePill>
        <S.Genre>{concert.genre}</S.Genre>
      </S.Art>
      <S.Body>
        <S.Artist>{concert.artist}</S.Artist>
        <S.Tour>{concert.tour}</S.Tour>
        <S.Venue>
          <S.Pin size={14} strokeWidth={2} />
          {concert.venue} · {concert.city}
        </S.Venue>
      </S.Body>
    </S.Card>
  );
}
