import { useState } from 'react';
import { Pencil } from 'lucide-react';
import { api } from '../../lib/api';
import { rub } from '../../lib/format';
import { useAsync } from '../../lib/useAsync';
import { PageHeader } from '../../components/PageHeader';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Field, Input } from '../../components/ui/Form';
import {
  Actions,
  Badge,
  Empty,
  Row,
  Strong,
  Sub,
  Table,
  TableScroll,
  TableWrap,
  Td,
  Th,
} from '../../components/ui/Table';
import type { Tier } from '../../types';
import { ErrorText } from './Tiers.styles';

export function Tiers() {
  const { data, loading, error, reload } = useAsync(() => api.listTiers());
  const tiers = data ?? [];
  const [editing, setEditing] = useState<Tier | null>(null);

  return (
    <>
      <PageHeader title="Tiers" subtitle="Ticket zones & pricing" />

      <TableWrap>
        <TableScroll>
          <Table>
            <thead>
              <tr>
                <Th>Zone</Th>
                <Th>ID</Th>
                <Th>Description</Th>
                <Th $right>Price</Th>
                <Th $right>Actions</Th>
              </tr>
            </thead>
            <tbody>
              {tiers.map((t) => (
                <Row key={t.id}>
                  <Td>
                    <Strong>{t.ru.name}</Strong>
                    <br />
                    <Sub>{t.en.name}</Sub>
                  </Td>
                  <Td>
                    <Badge>{t.id}</Badge>
                  </Td>
                  <Td>{t.ru.desc}</Td>
                  <Td $right $strong>
                    {rub(t.price)}
                  </Td>
                  <Td>
                    <Actions>
                      <Button variant="ghost" size="sm" onClick={() => setEditing(t)}>
                        <Pencil size={14} />
                        Price
                      </Button>
                    </Actions>
                  </Td>
                </Row>
              ))}
              {!tiers.length && (
                <tr>
                  <Empty colSpan={5}>{loading ? 'Loading…' : (error ?? 'No tiers')}</Empty>
                </tr>
              )}
            </tbody>
          </Table>
        </TableScroll>
      </TableWrap>

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
      {error && <ErrorText>{error}</ErrorText>}
    </Modal>
  );
}
