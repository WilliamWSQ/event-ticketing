import { useConcert } from '@features/catalog';
import { TicketView, useBooking } from '@features/booking';

/** Confirmation / ticket for the completed booking. */
export function TicketPage() {
  const { concertId } = useBooking();
  const concert = useConcert(concertId);
  return <TicketView concert={concert} />;
}
