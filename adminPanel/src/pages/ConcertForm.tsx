import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { api } from '../lib/api';
import { Field, Input, Row, Select, Textarea } from '../components/ui/Form';
import { Button } from '../components/ui/Button';
import { PageHeader } from '../components/PageHeader';
import { emptyConcert, GENRES, type Concert, type ConcertLocale, type Lang } from '../types';

const Card = styled.div`
  background: ${(p) => p.theme.color.surface};
  border: 1px solid ${(p) => p.theme.line.l10};
  border-radius: ${(p) => p.theme.radius.lg};
  padding: 22px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 20px;
`;
const LocaleTitle = styled.h3`
  margin: 0;
  font-size: 16px;
  color: #fff;
`;
const Locales = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 20px;
`;
const Locale = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
const Preview = styled.div`
  height: 56px;
  border-radius: ${(p) => p.theme.radius.md};
  border: 1px solid ${(p) => p.theme.line.l12};
`;
const LineupHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 4px;
`;
const LineupLabel = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: ${(p) => p.theme.color.fg3};
  text-transform: uppercase;
  letter-spacing: 0.04em;
`;
const Act = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;
const ActTime = styled(Input)`
  max-width: 96px;
  font-family: ${(p) => p.theme.font.mono};
`;
const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 8px;
`;
const ErrorText = styled.p`
  color: ${(p) => p.theme.color.magenta400};
  font-size: 14px;
  margin: 0 0 12px;
`;

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

  const setTop = <K extends keyof Concert>(k: K, v: Concert[K]) => setC((p) => ({ ...p, [k]: v }));
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
      <Locale>
        <LocaleTitle>{title}</LocaleTitle>
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
          <Input
            value={loc.dateLong}
            onChange={set('dateLong')}
            placeholder={lang === 'ru' ? 'Сб · 21 июня 2026' : 'Sat · Jun 21, 2026'}
          />
        </Field>

        <LineupHead>
          <LineupLabel>Lineup</LineupLabel>
          <Button variant="subtle" size="sm" onClick={() => addAct(lang)}>
            <Plus size={14} />
            Add act
          </Button>
        </LineupHead>
        {loc.lineup.map((act, i) => (
          <Act key={i}>
            <ActTime value={act.time} onChange={(e) => setAct(lang, i, 'time', e.target.value)} placeholder="22:00" />
            <Input value={act.name} onChange={(e) => setAct(lang, i, 'name', e.target.value)} placeholder="Name" />
            <Button variant="danger" size="sm" onClick={() => removeAct(lang, i)} aria-label="Remove act">
              <Trash2 size={14} />
            </Button>
          </Act>
        ))}
      </Locale>
    );
  };

  if (loadError) {
    return (
      <>
        <PageHeader title="Edit concert" />
        <ErrorText>{loadError}</ErrorText>
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

      <Card>
        <LocaleTitle>Core</LocaleTitle>
        <Row>
          <Field label="ID" hint={editing ? 'Cannot be changed' : 'lowercase, e.g. nova'}>
            <Input value={c.id} onChange={(e) => setTop('id', e.target.value)} disabled={editing} placeholder="nova" />
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
        <Preview style={{ background: c.art }} aria-label="Art preview" />
      </Card>

      <Locales>
        <Card>{localeFields('ru', 'Russian')}</Card>
        <Card>{localeFields('en', 'English')}</Card>
      </Locales>

      {error && <ErrorText>{error}</ErrorText>}
      <Footer>
        <Button variant="ghost" onClick={() => navigate('/concerts')}>
          Cancel
        </Button>
        <Button type="submit" disabled={saving}>
          {saving ? 'Saving…' : editing ? 'Save changes' : 'Create concert'}
        </Button>
      </Footer>
    </form>
  );
}
