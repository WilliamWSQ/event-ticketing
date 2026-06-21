import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import type { LocalizedConcert } from '../types';

/**
 * Reads the `:id` concert route param, mirrors it into booking state (so the
 * downstream checkout/ticket screens stay in sync), and returns the localized
 * concert. Rendering uses the param directly, so deep links don't flash.
 */
export function useConcertParam(): LocalizedConcert {
  const { id } = useParams<{ id: string }>();
  const { localize, syncSelected, selectedId } = useBooking();

  useEffect(() => {
    if (id && id !== selectedId) syncSelected(id);
  }, [id, selectedId, syncSelected]);

  return localize(id ?? selectedId);
}
