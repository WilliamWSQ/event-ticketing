import { useState } from 'react';
import { Pencil } from 'lucide-react';
import { api } from '../lib/api';
import { useAsync } from '../lib/useAsync';
import { PageHeader } from '../components/PageHeader';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { Field, Input, Row } from '../components/ui/Form';
import type { AdminUser } from '../types';
import table from '../components/table.module.css';

export function Users() {
  const { data, loading, error, reload } = useAsync(() => api.listUsers());
  const users = data ?? [];
  const [editing, setEditing] = useState<AdminUser | null>(null);

  return (
    <>
      <PageHeader title="Users" subtitle={`${users.length} account(s)`} />

      <div className={table.wrap}>
        <div className={table.scroll}>
          <table className={table.table}>
            <thead>
              <tr>
                <th className={table.th}>User</th>
                <th className={table.th}>Email</th>
                <th className={table.th}>City</th>
                <th className={`${table.th} ${table.right}`}>Shows</th>
                <th className={`${table.th} ${table.right}`}>Cities</th>
                <th className={`${table.th} ${table.right}`}>Hours</th>
                <th className={`${table.th} ${table.right}`}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className={table.row}>
                  <td className={table.td}>
                    <span className={table.strong}>{u.nameRu}</span>
                    <br />
                    <span className={table.sub}>{u.nameEn}</span>
                  </td>
                  <td className={`${table.td} ${table.mono}`}>{u.email}</td>
                  <td className={table.td}>{u.cityRu}</td>
                  <td className={`${table.td} ${table.right}`}>{u.statShows}</td>
                  <td className={`${table.td} ${table.right}`}>{u.statCities}</td>
                  <td className={`${table.td} ${table.right}`}>{u.statHours}</td>
                  <td className={table.td}>
                    <div className={table.actions}>
                      <Button variant="ghost" size="sm" onClick={() => setEditing(u)}>
                        <Pencil size={14} />
                        Edit
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {!users.length && (
                <tr>
                  <td className={table.empty} colSpan={7}>
                    {loading ? 'Loading…' : (error ?? 'No users')}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

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
      <Row>
        <Field label="Email">
          <Input value={form.email} onChange={(e) => set({ email: e.target.value })} />
        </Field>
        <Field label="Initials">
          <Input value={form.initials} onChange={(e) => set({ initials: e.target.value })} />
        </Field>
      </Row>
      <Row>
        <Field label="Name (RU)">
          <Input value={form.nameRu} onChange={(e) => set({ nameRu: e.target.value })} />
        </Field>
        <Field label="Name (EN)">
          <Input value={form.nameEn} onChange={(e) => set({ nameEn: e.target.value })} />
        </Field>
      </Row>
      <Row>
        <Field label="City (RU)">
          <Input value={form.cityRu} onChange={(e) => set({ cityRu: e.target.value })} />
        </Field>
        <Field label="City (EN)">
          <Input value={form.cityEn} onChange={(e) => set({ cityEn: e.target.value })} />
        </Field>
      </Row>
      <Row>
        <Field label="Shows">
          <Input type="number" value={form.statShows} onChange={(e) => set({ statShows: Number(e.target.value) })} />
        </Field>
        <Field label="Cities">
          <Input type="number" value={form.statCities} onChange={(e) => set({ statCities: Number(e.target.value) })} />
        </Field>
        <Field label="Hours">
          <Input type="number" value={form.statHours} onChange={(e) => set({ statHours: Number(e.target.value) })} />
        </Field>
      </Row>
      {error && <p style={{ color: 'var(--c-magenta-400)', fontSize: 14, margin: 0 }}>{error}</p>}
    </Modal>
  );
}
