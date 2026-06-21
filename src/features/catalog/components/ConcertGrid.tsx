import styled from 'styled-components';
import { useCatalog } from '../state/CatalogProvider';
import { useLocalizedConcerts } from '../hooks/useConcert';
import { ConcertCard } from './ConcertCard';

const Grid = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
  gap: 22px;
`;

/** Responsive grid of concert cards, filtered by the active genre. */
export function ConcertGrid() {
  const { filter } = useCatalog();
  const all = useLocalizedConcerts();
  const visible = filter === 'ALL' ? all : all.filter((c) => c.genre === filter);

  return (
    <Grid>
      {visible.map((c) => (
        <ConcertCard key={c.id} concert={c} />
      ))}
    </Grid>
  );
}
