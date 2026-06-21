import { ArrowRight, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useI18n } from '@shared/i18n';
import { Button } from '@shared/ui';
import { glowBreath } from '@shared/theme';
import { useBooking } from '../state/BookingProvider';

const Card = styled.aside`
  flex: 0 0 340px;
  max-width: 100%;
  position: sticky;
  top: 90px;
  border-radius: ${(p) => p.theme.radius.xl2};
  padding: 26px;
  background: ${(p) => p.theme.grad.panel};
  border: 1px solid ${(p) => p.theme.line.l10};
  box-shadow: ${(p) => p.theme.shadow.panel};
`;
const FromLabel = styled.div`
  font-size: 13px;
  color: ${(p) => p.theme.color.fg3};
`;
const PriceRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin: 2px 0 4px;
`;
const Price = styled.span`
  font-family: ${(p) => p.theme.font.display};
  font-weight: 700;
  font-size: 44px;
  letter-spacing: -0.03em;
  color: #fff;
`;
const PerPerson = styled.span`
  font-size: 14px;
  color: ${(p) => p.theme.color.fgMuted};
`;
const FastPill = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 6px 12px;
  border-radius: ${(p) => p.theme.radius.btn};
  background: rgba(255, 0, 92, 0.12);
  border: 1px solid rgba(255, 0, 92, 0.3);
  font-size: 12px;
  font-weight: 600;
  color: ${(p) => p.theme.color.magenta400};
  margin-bottom: 20px;
`;
const FastDot = styled.span`
  width: 6px;
  height: 6px;
  border-radius: ${(p) => p.theme.radius.pill};
  background: ${(p) => p.theme.color.magenta};
  box-shadow: 0 0 8px ${(p) => p.theme.color.magenta};
  animation: ${glowBreath} 1.4s infinite;
`;
const Secured = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: center;
  margin-top: 14px;
  font-size: 12px;
  color: ${(p) => p.theme.color.fgMuted};
`;
const LockIcon = styled(Lock)`
  color: ${(p) => p.theme.color.cyan};
  flex: none;
`;

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
    <Card>
      <FromLabel>{t.ticketsFrom}</FromLabel>
      <PriceRow>
        <Price>{fmt(priceFrom)}</Price>
        <PerPerson>{t.perPerson}</PerPerson>
      </PriceRow>
      <FastPill>
        <FastDot aria-hidden="true" />
        {t.sellingFast}
      </FastPill>
      <Button variant="gradient" block animated onClick={choose}>
        {t.chooseTickets}
        <ArrowRight size={18} strokeWidth={2.4} />
      </Button>
      <Secured>
        <LockIcon size={14} strokeWidth={1.8} />
        {t.securedBy}
      </Secured>
    </Card>
  );
}
