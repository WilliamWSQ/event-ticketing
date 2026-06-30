import { useState } from 'react';
import { Pencil } from 'lucide-react';
import { api } from '../../lib/api';
import { useAsync } from '../../lib/useAsync';
import { PageHeader } from '../../components/PageHeader';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Field, Input, Row as FieldRow } from '../../components/ui/Form';
import {
  Actions,
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
import type { AdminUser } from '../../types';
import { ErrorText } from './Users.styles';

export function Users() {
  const { data, loading, error, reload } = useAsync(() => api.listUsers());
  const users = data ?? [];
  const [editing, setEditing] = useState<AdminUser | null>(null);

  return (
    <>
      <PageHeader title="Users" subtitle={`${users.length} account(s)`} />

      <TableWrap>
        <TableScroll>
          <Table>
            <thead>
              <tr>
                <Th>User</Th>
                <Th>Email</Th>
                <Th>City</Th>
                <Th $right>Shows</Th>
                <Th $right>Cities</Th>
                <Th $right>Hours</Th>
                <Th $right>Actions</Th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <Row key={u.id}>
                  <Td>
                    <Strong>{u.nameRu}</Strong>
                    <br />
                    <Sub>{u.nameEn}</Sub>
                  </Td>
                  <Td $mono>{u.email}</Td>
                  <Td>{u.cityRu}</Td>
                  <Td $right>{u.statShows}</Td>
                  <Td $right>{u.statCities}</Td>
                  <Td $right>{u.statHours}</Td>
                  <Td>
                    <Actions>
                      <Button variant="ghost" size="sm" onClick={() => setEditing(u)}>
                        <Pencil size={14} />
                        Edit
                      </Button>
                    </Actions>
                  </Td>
                </Row>
              ))}
              {!users.length && (
                <tr>
                  <Empty colSpan={7}>{loading ? 'Loading…' : (error ?? 'No users')}</Empty>
                </tr>
              )}
            </tbody>
          </Table>
        </TableScroll>
      </TableWrap>

      {editing && (
        <UserEditModal
          user={editing}
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

function UserEditModal({
  user,
  onClose,
  onSaved,
}: {
  user: AdminUser;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [form, setForm] = useState<AdminUser>(user);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = (patch: Partial<AdminUser>) => setForm((p) => ({ ...p, ...patch }));

  const save = async () => {
    setSaving(true);
    setError(null);
    try {
      await api.updateUser(user.id, {
        initials: form.initials,
        email: form.email,
        nameRu: form.nameRu,
        nameEn: form.nameEn,
        cityRu: form.cityRu,
        cityEn: form.cityEn,
        statShows: form.statShows,
        statCities: form.statCities,
        statHours: form.statHours,
      });
      onSaved();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Save failed');
      setSaving(false);
    }
  };

  return (
    <Modal
      title={`Edit · ${user.nameRu}`}
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
      <FieldRow>
        <Field label="Email">
          <Input value={form.email} onChange={(e) => set({ email: e.target.value })} />
        </Field>
        <Field label="Initials">
          <Input value={form.initials} onChange={(e) => set({ initials: e.target.value })} />
        </Field>
      </FieldRow>
      <FieldRow>
        <Field label="Name (RU)">
          <Input value={form.nameRu} onChange={(e) => set({ nameRu: e.target.value })} />
        </Field>
        <Field label="Name (EN)">
          <Input value={form.nameEn} onChange={(e) => set({ nameEn: e.target.value })} />
        </Field>
      </FieldRow>
      <FieldRow>
        <Field label="City (RU)">
          <Input value={form.cityRu} onChange={(e) => set({ cityRu: e.target.value })} />
        </Field>
        <Field label="City (EN)">
          <Input value={form.cityEn} onChange={(e) => set({ cityEn: e.target.value })} />
        </Field>
      </FieldRow>
      <FieldRow>
        <Field label="Shows">
          <Input type="number" value={form.statShows} onChange={(e) => set({ statShows: Number(e.target.value) })} />
        </Field>
        <Field label="Cities">
          <Input type="number" value={form.statCities} onChange={(e) => set({ statCities: Number(e.target.value) })} />
        </Field>
        <Field label="Hours">
          <Input type="number" value={form.statHours} onChange={(e) => set({ statHours: Number(e.target.value) })} />
        </Field>
      </FieldRow>
      {error && <ErrorText>{error}</ErrorText>}
    </Modal>
  );
}
