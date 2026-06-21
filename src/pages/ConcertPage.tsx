import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useI18n } from '@shared/i18n';
import { BackButton } from '@shared/ui';
import { rise } from '@shared/theme';
import { ConcertDetails, useConcert } from '@features/catalog';
import { TicketCta } from '@features/booking';

const Main = styled.main`
  position: relative;
  z-index: 1;
  max-width: ${(p) => p.theme.layout.maxw};
  margin: 0 auto;
  padding: clamp(20px, 3vw, 32px) clamp(20px, 5vw, 56px) 120px;
  animation: ${rise} 0.5s ${(p) => p.theme.ease.emphasis} both;
`;

/** Concert details — catalog content + the booking ticket card. */
export function ConcertPage() {
  const { id } = useParams<{ id: string }>();
  const { t } = useI18n();
  const navigate = useNavigate();
  const concert = useConcert(id ?? '');

  return (
    <Main>
      <BackButton label={t.backDiscover} onClick={() => navigate('/')} />
      <ConcertDetails
        concert={concert}
        aside={<TicketCta concertId={concert.id} priceFrom={concert.priceFrom} />}
      />
    </Main>
  );
}
