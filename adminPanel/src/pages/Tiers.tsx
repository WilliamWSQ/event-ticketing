import { useState } from 'react';
import { Pencil } from 'lucide-react';
import { api } from '../lib/api';
import { rub } from '../lib/format';
import { useAsync } from '../lib/useAsync';
import { PageHeader } from '../components/PageHeader';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { Field, Input } from '../components/ui/Form';
import type { Tier } from '../types';
import table from '../components/table.module.css';

export function Tiers() {
  const { data, loading, error, reload } = useAsync(() => api.listTiers());
  const tiers = data ?? [];
  const [editing, setEditing] = useState<Tier | null>(null);

  return (
    <>
      <PageHeader title="Tiers" subtitle="Ticket zones & pricing" />

      <div className={table.wrap}>
        <div className={table.scroll}>
          <table className={table.table}>
            <thead>
              <tr>
                <th className={table.th}>Zone</th>
                <th className={table.th}>ID</th>
                <th className={table.th}>Description</th>
                <th className={`${table.th} ${table.right}`}>Price</th>
                <th className={`${table.th} ${table.right}`}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tiers.map((t) => (
                <tr key={t.id} className={table.row}>
                  <td className={table.td}>
                    <span className={table.strong}>{t.ru.name}</span>
                    <br />
                    <span className={table.sub}>{t.en.name}</span>
                  </td>
                  <td className={table.td}>
                    <span className={table.badge}>{t.id}</span>
                  </td>
                  <td className={table.td}>{t.ru.desc}</td>
                  <td className={`${table.td} ${table.right} ${table.strong}`}>{rub(t.price)}</td>
                  <td className={table.td}>
                    <div className={table.actions}>
                      <Button variant="ghost" size="sm" onClick={() => setEditing(t)}>
                        <Pencil size={14} />
                        Price
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {!tiers.length && (
                <tr>
                  <td className={table.empty} colSpan={5}>
                    {loading ? 'Loading…' : (error ?? 'No tiers')}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {editing && (
        <TierEditModal
          tier={editing}
          onClose={() => setEditing(null)}
          onSaved={() => {
            setEditing(null);
            reload();
          }}
        />
      )}
    </>
  );
}

function TierEditModal({
  tier,
  onClose,
  onSaved,
}: {
  tier: Tier;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [price, setPrice] = useState(tier.price);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const save = async () => {
    setSaving(true);
    setError(null);
    try {
      await api.updateTierPrice(tier.id, price);
      onSaved();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Save failed');
      setSaving(false);
    }
  };

  return (
    <Modal
      title={`Price · ${tier.ru.name}`}
      onClose={onClose}
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={save} disabled={saving}>
            {saving ? 'Saving…' : 'Save'}
          </Button>
        </>
      }
    >
      <Field label="Price (₽)" hint="Names and perks are managed in the catalogue seed.">
        <Input type="number" min={0} value={price} onChange={(e) => setPrice(Number(e.target.value))} />
      </Field>
      {error && <p style={{ color: 'var(--c-magenta-400)', fontSize: 14, margin: 0 }}>{error}</p>}
    </Modal>
  );
}
