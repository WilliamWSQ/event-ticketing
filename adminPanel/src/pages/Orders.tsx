import { api } from '../lib/api';
import { dateTime, rub } from '../lib/format';
import { useAsync } from '../lib/useAsync';
import { PageHeader } from '../components/PageHeader';
import table from '../components/table.module.css';

export function Orders() {
  const { data, loading, error } = useAsync(() => api.listOrders());
  const orders = data ?? [];
  const gross = orders.reduce((s, o) => s + o.total, 0);

  return (
    <>
      <PageHeader
        title="Orders"
        subtitle={`${orders.length} transactions · ${rub(gross)} gross`}
      />
      <div className={table.wrap}>
        <div className={table.scroll}>
          <table className={table.table}>
            <thead>
              <tr>
                <th className={table.th}>Order</th>
                <th className={table.th}>When</th>
                <th className={table.th}>Concert</th>
                <th className={table.th}>Tier</th>
                <th className={table.th}>Qty</th>
                <th className={`${table.th} ${table.right}`}>Subtotal</th>
                <th className={`${table.th} ${table.right}`}>Fees</th>
                <th className={`${table.th} ${table.right}`}>Total</th>
                <th className={table.th}>Method</th>
                <th className={table.th}>User</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id} className={table.row}>
                  <td className={`${table.td} ${table.mono}`}>{o.id}</td>
                  <td className={table.td}>{dateTime(o.createdAt)}</td>
                  <td className={`${table.td} ${table.strong}`}>{o.concertArtist.ru ?? o.concertId}</td>
                  <td className={table.td}>{o.tierName.ru ?? o.tierId}</td>
                  <td className={table.td}>{o.qty}</td>
                  <td className={`${table.td} ${table.right}`}>{rub(o.subtotal)}</td>
                  <td className={`${table.td} ${table.right}`}>{rub(o.fees)}</td>
                  <td className={`${table.td} ${table.right} ${table.strong}`}>{rub(o.total)}</td>
                  <td className={table.td}>{o.payMethod ?? '—'}</td>
                  <td className={table.td}>{o.userEmail ?? '—'}</td>
                </tr>
              ))}
              {!orders.length && (
                <tr>
                  <td className={table.empty} colSpan={10}>
                    {loading ? 'Loading…' : (error ?? 'No orders yet')}
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
