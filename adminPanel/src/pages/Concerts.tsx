import { Pencil, Plus, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { api } from '../lib/api';
import { rub } from '../lib/format';
import { useAsync } from '../lib/useAsync';
import { PageHeader } from '../components/PageHeader';
import { Button } from '../components/ui/Button';
import table from '../components/table.module.css';

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

      <div className={table.wrap}>
        <div className={table.scroll}>
          <table className={table.table}>
            <thead>
              <tr>
                <th className={table.th}>Artist</th>
                <th className={table.th}>Genre</th>
                <th className={table.th}>Date</th>
                <th className={table.th}>City</th>
                <th className={`${table.th} ${table.right}`}>From</th>
                <th className={`${table.th} ${table.right}`}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {concerts.map((c) => (
                <tr key={c.id} className={table.row}>
                  <td className={table.td}>
                    <div className={table.cellFlex}>
                      <span className={table.swatch} style={{ background: c.art }} />
                      <span>
                        <span className={table.strong}>{c.ru.artist}</span>
                        <br />
                        <span className={table.sub}>{c.ru.tour}</span>
                      </span>
                    </div>
                  </td>
                  <td className={table.td}>
                    <span className={table.genre}>{c.genre}</span>
                  </td>
                  <td className={table.td}>{c.ru.dateLong}</td>
                  <td className={table.td}>{c.ru.city}</td>
                  <td className={`${table.td} ${table.right} ${table.strong}`}>{rub(c.priceFrom)}</td>
                  <td className={table.td}>
                    <div className={table.actions}>
                      <Button variant="ghost" size="sm" onClick={() => navigate(`/concerts/${c.id}`)}>
                        <Pencil size={14} />
                        Edit
                      </Button>
                      <Button variant="danger" size="sm" onClick={() => remove(c.id, c.ru.artist)}>
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {!concerts.length && (
                <tr>
                  <td className={table.empty} colSpan={6}>
                    {loading ? 'Loading…' : (error ?? 'No concerts yet')}
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
