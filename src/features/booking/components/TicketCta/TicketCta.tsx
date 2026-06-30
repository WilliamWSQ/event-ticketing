import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '@shared/i18n';
import { Button } from '@shared/ui';
import { useBooking } from '../../state/BookingProvider';
import * as S from './TicketCta.styles';

/** Sticky ticket card on the concert page — entry point into the booking flow. */
export function TicketCta({ concertId, priceFrom }: { concertId: string; priceFrom: number }) {
  const { t, fmt } = useI18n();
  const { setConcertId } = useBooking();
  const navigate = useNavigate();

  const choose = () => {
    setConcertId(concertId);
    navigate(`/concert/${concertId}/seats`);
  };

  return (
    <S.Card>
      <S.FromLabel>{t.ticketsFrom}</S.FromLabel>
      <S.PriceRow>
        <S.Price>{fmt(priceFrom)}</S.Price>
        <S.PerPerson>{t.perPerson}</S.PerPerson>
      </S.PriceRow>
      <S.FastPill>
        <S.FastDot aria-hidden="true" />
        {t.sellingFast}
      </S.FastPill>
      <Button variant="gradient" block animated onClick={choose}>
        {t.chooseTickets}
        <ArrowRight size={18} strokeWidth={2.4} />
      </Button>
      <S.Secured>
        <S.LockIcon size={14} strokeWidth={1.8} />
        {t.securedBy}
      </S.Secured>
    </S.Card>
  );
}
