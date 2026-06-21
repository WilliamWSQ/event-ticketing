import { Pencil, Plus, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { api } from '../lib/api';
import { rub } from '../lib/format';
import { useAsync } from '../lib/useAsync';
import { PageHeader } from '../components/PageHeader';
import { Button } from '../components/ui/Button';
import {
  Actions,
  CellFlex,
  Empty,
  Genre,
  Row,
  Strong,
  Sub,
  Swatch,
  Table,
  TableScroll,
  TableWrap,
  Td,
  Th,
} from '../components/ui/Table';

export function Concerts() {
  const navigate = useNavigate();
  const { data, loading, error, reload } = useAsync(() => api.listConcerts());
  const concerts = data ?? [];

  const remove = async (id: string, artist: string) => {
    if (!window.confirm(`Delete "${artist}"? This also removes its orders.`)) return;
    try {
      await api.deleteConcert(id);
      reload();
    } catch (e) {
      alert(e instanceof Error ? e.message : 'Delete failed');
    }
  };

  return (
    <>
      <PageHeader
        title="Concerts"
        subtitle={`${concerts.length} in the catalogue`}
        action={
          <Button onClick={() => navigate('/concerts/new')}>
            <Plus size={16} />
            New concert
          </Button>
        }
      />

      <TableWrap>
        <TableScroll>
          <Table>
            <thead>
              <tr>
                <Th>Artist</Th>
                <Th>Genre</Th>
                <Th>Date</Th>
                <Th>City</Th>
                <Th $right>From</Th>
                <Th $right>Actions</Th>
              </tr>
            </thead>
            <tbody>
              {concerts.map((c) => (
                <Row key={c.id}>
                  <Td>
                    <CellFlex>
                      <Swatch style={{ background: c.art }} />
                      <span>
                        <Strong>{c.ru.artist}</Strong>
                        <br />
                        <Sub>{c.ru.tour}</Sub>
                      </span>
                    </CellFlex>
                  </Td>
                  <Td>
                    <Genre>{c.genre}</Genre>
                  </Td>
                  <Td>{c.ru.dateLong}</Td>
                  <Td>{c.ru.city}</Td>
                  <Td $right $strong>
                    {rub(c.priceFrom)}
                  </Td>
                  <Td>
                    <Actions>
                      <Button variant="ghost" size="sm" onClick={() => navigate(`/concerts/${c.id}`)}>
                        <Pencil size={14} />
                        Edit
                      </Button>
                      <Button variant="danger" size="sm" onClick={() => remove(c.id, c.ru.artist)}>
                        <Trash2 size={14} />
                      </Button>
                    </Actions>
                  </Td>
                </Row>
              ))}
              {!concerts.length && (
                <tr>
                  <Empty colSpan={6}>{loading ? 'Loading…' : (error ?? 'No concerts yet')}</Empty>
                </tr>
              )}
            </tbody>
          </Table>
        </TableScroll>
      </TableWrap>
    </>
  );
}
