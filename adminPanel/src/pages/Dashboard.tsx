import { Receipt, Ticket, Users, Wallet } from 'lucide-react';
import { api } from '../lib/api';
import { dateTime, rub } from '../lib/format';
import { useAsync } from '../lib/useAsync';
import { PageHeader } from '../components/PageHeader';
import { StatCard } from '../components/ui/StatCard';
import table from '../components/table.module.css';
import styles from './Dashboard.module.css';

export function Dashboard() {
  const stats = useAsync(() => api.stats());
  const orders = useAsync(() => api.listOrders());
  const recent = (orders.data ?? []).slice(0, 6);

  return (
    <>
      <PageHeader title="Dashboard" subtitle="Catalogue and sales at a glance." />

      <div className={styles.stats}>
        <StatCard icon={Ticket} accent="cyan" label="Concerts" value={stats.data ? String(stats.data.concerts) : '—'} />
        <StatCard icon={Receipt} accent="purple" label="Orders" value={stats.data ? String(stats.data.orders) : '—'} />
        <StatCard icon={Wallet} accent="green" label="Revenue" value={stats.data ? rub(stats.data.revenue) : '—'} />
        <StatCard icon={Users} accent="magenta" label="Users" value={stats.data ? String(stats.data.users) : '—'} />
      </div>

      <h2 className={styles.h2}>Recent orders</h2>
      <div className={table.wrap}>
        <div className={table.scroll}>
          <table className={table.table}>
            <thead>
              <tr>
                <th className={table.th}>Order</th>
                <th className={table.th}>Concert</th>
                <th className={table.th}>Tier</th>
                <th className={table.th}>Qty</th>
                <th className={`${table.th} ${table.right}`}>Total</th>
                <th className={table.th}>When</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((o) => (
                <tr key={o.id} className={table.row}>
                  <td className={`${table.td} ${table.mono}`}>{o.id}</td>
                  <td className={`${table.td} ${table.strong}`}>{o.concertArtist.ru ?? o.concertId}</td>
                  <td className={table.td}>{o.tierName.ru ?? o.tierId}</td>
                  <td className={table.td}>{o.qty}</td>
                  <td className={`${table.td} ${table.right} ${table.strong}`}>{rub(o.total)}</td>
                  <td className={table.td}>{dateTime(o.createdAt)}</td>
                </tr>
              ))}
              {!recent.length && (
                <tr>
                  <td className={table.empty} colSpan={6}>
                    {orders.loading ? 'Loading…' : (orders.error ?? 'No orders yet')}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
