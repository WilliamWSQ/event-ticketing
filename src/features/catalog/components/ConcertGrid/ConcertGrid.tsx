import { useCatalog } from '../../state/CatalogProvider';
import { useLocalizedConcerts } from '../../hooks/useConcert';
import { ConcertCard } from '../ConcertCard';
import * as S from './ConcertGrid.styles';

/** Responsive grid of concert cards, filtered by the active genre. */
export function ConcertGrid() {
  const { filter } = useCatalog();
  const all = useLocalizedConcerts();
  const visible = filter === 'ALL' ? all : all.filter((c) => c.genre === filter);

  return (
    <S.Grid>
      {visible.map((c) => (
        <ConcertCard key={c.id} concert={c} />
      ))}
    </S.Grid>
  );
}
