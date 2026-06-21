import { MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useI18n } from '@shared/i18n';
import type { LocalizedConcert } from '@shared/types';

const Card = styled.article`
  position: relative;
  border-radius: ${(p) => p.theme.radius.xl};
  overflow: hidden;
  cursor: pointer;
  background: ${(p) => p.theme.color.surface};
  border: 1px solid ${(p) => p.theme.line.l08};
  padding: 0;
  text-align: left;
  transition:
    transform 0.25s ${(p) => p.theme.ease.emphasis},
    box-shadow 0.25s ease,
    border-color 0.25s ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow: ${(p) => p.theme.shadow.cardHover};
    border-color: rgba(128, 234, 255, 0.4);
  }
`;

const Art = styled.div`
  position: relative;
  height: 190px;
  overflow: hidden;
`;
const ArtScrim = styled.div`
  position: absolute;
  inset: 0;
  background: radial-gradient(120% 100% at 50% 0%, transparent 40%, rgba(14, 14, 22, 0.9) 100%);
`;
const DateBadge = styled.div`
  position: absolute;
  top: 14px;
  left: 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 54px;
  height: 54px;
  border-radius: ${(p) => p.theme.radius.mid};
  background: rgba(6, 6, 10, 0.65);
  backdrop-filter: blur(8px);
  border: 1px solid ${(p) => p.theme.line.l12};
`;
const Day = styled.span`
  font-family: ${(p) => p.theme.font.display};
  font-weight: 700;
  font-size: 20px;
  line-height: 1;
  color: #fff;
`;
const Month = styled.span`
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: ${(p) => p.theme.color.cyan};
`;
const PricePill = styled.span`
  position: absolute;
  top: 14px;
  right: 14px;
  padding: 6px 12px;
  border-radius: ${(p) => p.theme.radius.btn};
  background: rgba(6, 6, 10, 0.65);
  backdrop-filter: blur(8px);
  font-family: ${(p) => p.theme.font.display};
  font-weight: 700;
  font-size: 14px;
  color: #fff;
`;
const Genre = styled.span`
  position: absolute;
  bottom: 14px;
  left: 16px;
  padding: 5px 11px;
  border-radius: ${(p) => p.theme.radius.btn};
  background: rgba(255, 255, 255, 0.14);
  backdrop-filter: blur(8px);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #fff;
`;
const Body = styled.div`
  padding: 18px 18px 20px;
`;
const Artist = styled.h3`
  font-family: ${(p) => p.theme.font.display};
  font-weight: 700;
  font-size: 22px;
  letter-spacing: -0.02em;
  margin: 0;
  color: #fff;
`;
const Tour = styled.p`
  margin: 4px 0 14px;
  font-size: 13px;
  color: ${(p) => p.theme.color.fg3};
`;
const Venue = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
  color: ${(p) => p.theme.color.fg2};
  font-size: 13px;
`;
const Pin = styled(MapPin)`
  color: ${(p) => p.theme.color.magenta400};
  flex: none;
`;

/** Concert card in the discover grid. */
export function ConcertCard({ concert }: { concert: LocalizedConcert }) {
  const { t, fmt } = useI18n();
  const navigate = useNavigate();
  const open = () => navigate(`/concert/${concert.id}`);

  return (
    <Card
      onClick={open}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          open();
        }
      }}
    >
      <Art style={{ background: concert.art }}>
        <ArtScrim aria-hidden="true" />
        <DateBadge>
          <Day>{concert.day}</Day>
          <Month>{concert.month}</Month>
        </DateBadge>
        <PricePill>
          {t.from} {fmt(concert.priceFrom)}
        </PricePill>
        <Genre>{concert.genre}</Genre>
      </Art>
      <Body>
        <Artist>{concert.artist}</Artist>
        <Tour>{concert.tour}</Tour>
        <Venue>
          <Pin size={14} strokeWidth={2} />
          {concert.venue} · {concert.city}
        </Venue>
      </Body>
    </Card>
  );
}
