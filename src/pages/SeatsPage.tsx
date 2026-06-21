import { useParams } from 'react-router-dom';
import { useConcert } from '@features/catalog';
import { ZoneSelection } from '@features/booking';

/** Pick zone & quantity for the concert in the URL. */
export function SeatsPage() {
  const { id } = useParams<{ id: string }>();
  const concert = useConcert(id ?? '');
  return <ZoneSelection concert={concert} />;
}
