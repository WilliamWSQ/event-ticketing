import { useEffect, useState } from 'react';
import { accountApi, type MeProfile, type MyTicket } from '../api/account.api';

/** Fetches the current user's profile and upcoming tickets. */
export function useAccount() {
  const [profile, setProfile] = useState<MeProfile | null>(null);
  const [tickets, setTickets] = useState<MyTicket[]>([]);

  useEffect(() => {
    let cancelled = false;
    accountApi.me().then((p) => !cancelled && setProfile(p)).catch(() => {});
    accountApi.myTickets().then((ts) => !cancelled && setTickets(ts)).catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  return { profile, tickets };
}
