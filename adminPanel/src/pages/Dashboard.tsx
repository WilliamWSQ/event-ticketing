import { Receipt, Ticket, Users, Wallet } from 'lucide-react';
import styled from 'styled-components';
import { api } from '../lib/api';
import { dateTime, rub } from '../lib/format';
import { useAsync } from '../lib/useAsync';
import { PageHeader } from '../components/PageHeader';
import { StatCard } from '../components/ui/StatCard';
import { Empty, Row, Table, TableScroll, TableWrap, Td, Th } from '../components/ui/Table';

const Stats = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 36px;
`;
const H2 = styled.h2`
  font-size: 19px;
  color: #fff;
  margin: 0 0 16px;
`;

export function Dashboard() {
  const stats = useAsync(() => api.stats());
  const orders = useAsync(() => api.listOrders());
  const recent = (orders.data ?? []).slice(0, 6);

  return (
    <>
      <PageHeader title="Dashboard" subtitle="Catalogue and sales at a glance." />

      <Stats>
        <StatCard icon={Ticket} accent="cyan" label="Concerts" value={stats.data ? String(stats.data.concerts) : '—'} />
        <StatCard icon={Receipt} accent="purple" label="Orders" value={stats.data ? String(stats.data.orders) : '—'} />
        <StatCard icon={Wallet} accent="green" label="Revenue" value={stats.data ? rub(stats.data.revenue) : '—'} />
        <StatCard icon={Users} accent="magenta" label="Users" value={stats.data ? String(stats.data.users) : '—'} />
      </Stats>

      <H2>Recent orders</H2>
      <TableWrap>
        <TableScroll>
          <Table>
            <thead>
              <tr>
                <Th>Order</Th>
                <Th>Concert</Th>
                <Th>Tier</Th>
                <Th>Qty</Th>
                <Th $right>Total</Th>
                <Th>When</Th>
              </tr>
            </thead>
            <tbody>
              {recent.map((o) => (
                <Row key={o.id}>
                  <Td $mono>{o.id}</Td>
                  <Td $strong>{o.concertArtist.ru ?? o.concertId}</Td>
                  <Td>{o.tierName.ru ?? o.tierId}</Td>
                  <Td>{o.qty}</Td>
                  <Td $right $strong>
                    {rub(o.total)}
                  </Td>
                  <Td>{dateTime(o.createdAt)}</Td>
                </Row>
              ))}
              {!recent.length && (
                <tr>
                  <Empty colSpan={6}>
                    {orders.loading ? 'Loading…' : (orders.error ?? 'No orders yet')}
                  </Empty>
                </tr>
              )}
            </tbody>
          </Table>
        </TableScroll>
      </TableWrap>
    </>
  );
}
