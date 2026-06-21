import { useNavigate, useParams } from 'react-router-dom';
import { useI18n } from '@shared/i18n';
import { BackButton } from '@shared/ui';
import { ConcertDetails, useConcert } from '@features/catalog';
import { TicketCta } from '@features/booking';
import styles from './ConcertPage.module.css';

/** Concert details — catalog content + the booking ticket card. */
export function ConcertPage() {
  const { id } = useParams<{ id: string }>();
  const { t } = useI18n();
  const navigate = useNavigate();
  const concert = useConcert(id ?? '');

  return (
    <main className={styles.main}>
      <BackButton label={t.backDiscover} onClick={() => navigate('/')} />
      <ConcertDetails
        concert={concert}
        aside={<TicketCta concertId={concert.id} priceFrom={concert.priceFrom} />}
      />
    </main>
  );
}
