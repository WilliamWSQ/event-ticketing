import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../lib/api';
import { Field, Input, Row, Select, Textarea } from '../components/ui/Form';
import { Button } from '../components/ui/Button';
import { PageHeader } from '../components/PageHeader';
import { emptyConcert, GENRES, type ConcertLocale, type Concert, type Lang } from '../types';
import styles from './ConcertForm.module.css';

export function ConcertForm() {
  const { id } = useParams<{ id: string }>();
  const editing = Boolean(id);
  const navigate = useNavigate();

  const [c, setC] = useState<Concert>(emptyConcert());
  const [loadError, setLoadError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    api
      .getConcert(id)
      .then(setC)
      .catch((e: unknown) => setLoadError(e instanceof Error ? e.message : 'Failed to load'));
  }, [id]);

  // immutable updaters
  const setTop = <K extends keyof Concert>(k: K, v: Concert[K]) =>
    setC((p) => ({ ...p, [k]: v }));
  const setLoc = (lang: Lang, key: keyof ConcertLocale, value: string) =>
    setC((p) => ({ ...p, [lang]: { ...p[lang], [key]: value } }));
  const setAct = (lang: Lang, idx: number, field: 'time' | 'name', value: string) =>
    setC((p) => ({
      ...p,
      [lang]: { ...p[lang], lineup: p[lang].lineup.map((l, i) => (i === idx ? { ...l, [field]: value } : l)) },
    }));
  const addAct = (lang: Lang) =>
    setC((p) => ({ ...p, [lang]: { ...p[lang], lineup: [...p[lang].lineup, { time: '', name: '' }] } }));
  const removeAct = (lang: Lang, idx: number) =>
    setC((p) => ({ ...p, [lang]: { ...p[lang], lineup: p[lang].lineup.filter((_, i) => i !== idx) } }));

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      if (editing) await api.updateConcert(c.id, c);
      else await api.createConcert(c);
      navigate('/concerts');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed');
      setSaving(false);
    }
  };

  const localeFields = (lang: Lang, title: string) => {
    const loc = c[lang];
    const set = (k: keyof ConcertLocale) => (e: ChangeEvent<HTMLInputElement>) =>
      setLoc(lang, k, e.target.value);
    return (
      <div className={styles.locale}>
        <h3 className={styles.localeTitle}>{title}</h3>
        <Field label="Artist">
          <Input value={loc.artist} onChange={set('artist')} />
        </Field>
        <Field label="Tour">
          <Input value={loc.tour} onChange={set('tour')} />
        </Field>
        <Row>
          <Field label="Venue">
            <Input value={loc.venue} onChange={set('venue')} />
          </Field>
          <Field label="City">
            <Input value={loc.city} onChange={set('city')} />
          </Field>
        </Row>
        <Row>
          <Field label="Month (abbr)">
            <Input value={loc.month} onChange={set('month')} placeholder={lang === 'ru' ? 'ИЮН' : 'JUN'} />
          </Field>
          <Field label="Doors time">
            <Input value={loc.time} onChange={set('time')} placeholder={lang === 'ru' ? '20:00' : '8:00 PM'} />
          </Field>
        </Row>
        <Field label="Date (long)">
          <Input value={loc.dateLong} onChange={set('dateLong')} placeholder={lang === 'ru' ? 'Сб · 21 июня 2026' : 'Sat · Jun 21, 2026'} />
        </Field>

        <div className={styles.lineupHead}>
          <span className={styles.lineupLabel}>Lineup</span>
          <Button variant="subtle" size="sm" onClick={() => addAct(lang)}>
            <Plus size={14} />
            Add act
          </Button>
        </div>
        {loc.lineup.map((act, i) => (
          <div className={styles.act} key={i}>
            <Input
              className={styles.actTime}
              value={act.time}
              onChange={(e) => setAct(lang, i, 'time', e.target.value)}
              placeholder="22:00"
            />
            <Input
              value={act.name}
              onChange={(e) => setAct(lang, i, 'name', e.target.value)}
              placeholder="Name"
            />
            <Button variant="danger" size="sm" onClick={() => removeAct(lang, i)} aria-label="Remove act">
              <Trash2 size={14} />
            </Button>
          </div>
        ))}
      </div>
    );
  };

  if (loadError) {
    return (
      <>
        <PageHeader title="Edit concert" />
        <p className={styles.error}>{loadError}</p>
      </>
    );
  }

  return (
    <form onSubmit={onSubmit}>
      <PageHeader
        title={editing ? `Edit · ${c.ru.artist || c.id}` : 'New concert'}
        subtitle={editing ? `id: ${c.id}` : 'Add a concert to the catalogue'}
        action={
          <Button variant="ghost" onClick={() => navigate('/concerts')}>
            <ArrowLeft size={16} />
            Back
          </Button>
        }
      />

      <div className={styles.card}>
        <h3 className={styles.localeTitle}>Core</h3>
        <Row>
          <Field label="ID" hint={editing ? 'Cannot be changed' : 'lowercase, e.g. nova'}>
            <Input
              value={c.id}
              onChange={(e) => setTop('id', e.target.value)}
              disabled={editing}
              placeholder="nova"
            />
          </Field>
          <Field label="Genre">
            <Select value={c.genre} onChange={(e) => setTop('genre', e.target.value as Concert['genre'])}>
              {GENRES.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Day">
            <Input value={c.day} onChange={(e) => setTop('day', e.target.value)} placeholder="21" />
          </Field>
          <Field label="Price from (₽)">
            <Input
              type="number"
              min={0}
              value={c.priceFrom}
              onChange={(e) => setTop('priceFrom', Number(e.target.value))}
            />
          </Field>
        </Row>
        <Field label="Art (CSS gradient)" hint="Used as placeholder artwork">
          <Textarea value={c.art} onChange={(e) => setTop('art', e.target.value)} rows={2} />
        </Field>
        <div className={styles.preview} style={{ background: c.art }} aria-label="Art preview" />
      </div>

      <div className={styles.locales}>
        <div className={styles.card}>{localeFields('ru', 'Russian')}</div>
        <div className={styles.card}>{localeFields('en', 'English')}</div>
      </div>

      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.footer}>
        <Button variant="ghost" onClick={() => navigate('/concerts')}>
          Cancel
        </Button>
        <Button type="submit" disabled={saving}>
          {saving ? 'Saving…' : editing ? 'Save changes' : 'Create concert'}
        </Button>
      </div>
    </form>
  );
}
