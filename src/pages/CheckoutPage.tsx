import { useConcert } from '@features/catalog';
import { CheckoutForm, useBooking } from '@features/booking';

/** Checkout for the in-flight booking. */
export function CheckoutPage() {
  const { concertId } = useBooking();
  const concert = useConcert(concertId);
  return <CheckoutForm concert={concert} />;
}
