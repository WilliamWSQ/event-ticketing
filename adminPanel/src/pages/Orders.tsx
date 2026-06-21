import { api } from '../lib/api';
import { dateTime, rub } from '../lib/format';
import { useAsync } from '../lib/useAsync';
import { PageHeader } from '../components/PageHeader';
import { Empty, Row, Table, TableScroll, TableWrap, Td, Th } from '../components/ui/Table';

export function Orders() {
  const { data, loading, error } = useAsync(() => api.listOrders());
  const orders = data ?? [];
  const gross = orders.reduce((s, o) => s + o.total, 0);

  return (
    <>
      <PageHeader title="Orders" subtitle={`${orders.length} transactions · ${rub(gross)} gross`} />
      <TableWrap>
        <TableScroll>
          <Table>
            <thead>
              <tr>
                <Th>Order</Th>
                <Th>When</Th>
                <Th>Concert</Th>
                <Th>Tier</Th>
                <Th>Qty</Th>
                <Th $right>Subtotal</Th>
                <Th $right>Fees</Th>
                <Th $right>Total</Th>
                <Th>Method</Th>
                <Th>User</Th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <Row key={o.id}>
                  <Td $mono>{o.id}</Td>
                  <Td>{dateTime(o.createdAt)}</Td>
                  <Td $strong>{o.concertArtist.ru ?? o.concertId}</Td>
                  <Td>{o.tierName.ru ?? o.tierId}</Td>
                  <Td>{o.qty}</Td>
                  <Td $right>{rub(o.subtotal)}</Td>
                  <Td $right>{rub(o.fees)}</Td>
                  <Td $right $strong>
                    {rub(o.total)}
                  </Td>
                  <Td>{o.payMethod ?? '—'}</Td>
                  <Td>{o.userEmail ?? '—'}</Td>
                </Row>
              ))}
              {!orders.length && (
                <tr>
                  <Empty colSpan={10}>{loading ? 'Loading…' : (error ?? 'No orders yet')}</Empty>
                </tr>
              )}
            </tbody>
          </Table>
        </TableScroll>
      </TableWrap>
    </>
  );
}
