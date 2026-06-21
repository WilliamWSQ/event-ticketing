import type { ReactNode } from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';
import styled from 'styled-components';
import { useI18n } from '@shared/i18n';
import { Equalizer } from '@shared/ui';
import { spinSlow } from '@shared/theme';
import type { LocalizedConcert } from '@shared/types';

const Hero = styled.section`
  position: relative;
  border-radius: 26px;
  overflow: hidden;
  min-height: 380px;
  display: flex;
  align-items: flex-end;
  padding: clamp(28px, 4vw, 48px);
  box-shadow: 0 30px 70px rgba(0, 0, 0, 0.45);
`;
const HeroScrim = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(0deg, rgba(6, 6, 10, 0.92) 0%, rgba(6, 6, 10, 0.2) 55%, transparent 100%);
`;
const HeroSweep = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 50%;
  height: 100%;
  opacity: 0.4;
  background: conic-gradient(from 0deg, transparent, rgba(255, 255, 255, 0.45), transparent 30%);
  mix-blend-mode: overlay;
  animation: ${spinSlow} 22s linear infinite;
  transform-origin: 70% 40%;
`;
const HeroBody = styled.div`
  position: relative;
  width: 100%;
`;
const Tags = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 14px;
`;
const TagGenre = styled.span`
  padding: 6px 13px;
  border-radius: ${(p) => p.theme.radius.btn};
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  background: rgba(128, 234, 255, 0.16);
  border: 1px solid rgba(128, 234, 255, 0.4);
  color: ${(p) => p.theme.color.cyan};
`;
const TagAge = styled.span`
  padding: 6px 13px;
  border-radius: ${(p) => p.theme.radius.btn};
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
`;
const Artist = styled.h1`
  font-family: ${(p) => p.theme.font.display};
  font-weight: 700;
  font-size: clamp(40px, 7vw, 76px);
  line-height: 0.92;
  letter-spacing: -0.04em;
  margin: 0;
  color: #fff;
`;
const Tour = styled.p`
  margin: 10px 0 0;
  font-size: 20px;
  color: ${(p) => p.theme.color.fg2};
  font-weight: 500;
`;
const Body = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
  margin-top: 36px;
  align-items: flex-start;
`;
const Left = styled.div`
  flex: 1 1 420px;
  min-width: 300px;
`;
const InfoChips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-bottom: 32px;
`;
const InfoChip = styled.div`
  flex: 1 1 150px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  border-radius: ${(p) => p.theme.radius.card};
  background: ${(p) => p.theme.color.surface};
  border: 1px solid ${(p) => p.theme.line.l08};
`;
const InfoLabel = styled.div`
  font-size: 12px;
  color: ${(p) => p.theme.color.fg3};
`;
const InfoValue = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: #fff;
`;
const CalIcon = styled(Calendar)`
  color: ${(p) => p.theme.color.cyan};
  flex: none;
`;
const ClockIcon = styled(Clock)`
  color: ${(p) => p.theme.color.purple};
  flex: none;
`;
const PinIcon = styled(MapPin)`
  color: ${(p) => p.theme.color.magenta400};
  flex: none;
`;
const H3 = styled.h3`
  font-family: ${(p) => p.theme.font.display};
  font-weight: 600;
  font-size: 24px;
  letter-spacing: -0.02em;
  margin: 0 0 14px;
  color: #fff;
`;
const About = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: ${(p) => p.theme.color.fg2};
  margin: 0 0 32px;
`;
const Lineup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;
const Act = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 14px 16px;
  border-radius: ${(p) => p.theme.radius.icon};
  background: ${(p) => p.theme.color.surface};
  border: 1px solid ${(p) => p.theme.line.l05};
  transition:
    border-color ${(p) => p.theme.dur.base} ease,
    background ${(p) => p.theme.dur.base} ease;
  &:hover {
    border-color: rgba(255, 0, 92, 0.3);
    background: ${(p) => p.theme.color.surface2};
  }
`;
const ActTime = styled.span`
  font-family: ${(p) => p.theme.font.mono};
  font-size: 13px;
  color: ${(p) => p.theme.color.cyan};
  min-width: 62px;
`;
const ActName = styled.span`
  flex: 1;
  font-family: ${(p) => p.theme.font.display};
  font-weight: 600;
  font-size: 17px;
  color: #fff;
`;

/**
 * Concert banner + info chips + about + lineup. `aside` is a slot for the
 * booking ticket card (composed by the page), keeping booking out of catalog.
 */
export function ConcertDetails({
  concert: sel,
  aside,
}: {
  concert: LocalizedConcert;
  aside: ReactNode;
}) {
  const { t } = useI18n();

  return (
    <>
      <Hero style={{ background: sel.art }}>
        <HeroScrim aria-hidden="true" />
        <HeroSweep aria-hidden="true" />
        <HeroBody>
          <Tags>
            <TagGenre>{sel.genre}</TagGenre>
            <TagAge>18+</TagAge>
          </Tags>
          <Artist>{sel.artist}</Artist>
          <Tour>{sel.tour}</Tour>
        </HeroBody>
      </Hero>

      <Body>
        <Left>
          <InfoChips>
            <InfoChip>
              <CalIcon size={22} strokeWidth={1.7} />
              <div>
                <InfoLabel>{t.date}</InfoLabel>
                <InfoValue>{sel.dateLong}</InfoValue>
              </div>
            </InfoChip>
            <InfoChip>
              <ClockIcon size={22} strokeWidth={1.7} />
              <div>
                <InfoLabel>{t.doors}</InfoLabel>
                <InfoValue>{sel.time}</InfoValue>
              </div>
            </InfoChip>
            <InfoChip>
              <PinIcon size={22} strokeWidth={1.7} />
              <div>
                <InfoLabel>{t.venue}</InfoLabel>
                <InfoValue>{sel.venue}</InfoValue>
              </div>
            </InfoChip>
          </InfoChips>

          <H3>{t.about}</H3>
          <About>
            {t.aboutPre}
            {sel.artist}
            {t.aboutPost}
          </About>

          <H3>{t.lineup}</H3>
          <Lineup>
            {sel.lineup.map((l) => (
              <Act key={l.time + l.name}>
                <ActTime>{l.time}</ActTime>
                <ActName>{l.name}</ActName>
                <Equalizer variant="lineup" />
              </Act>
            ))}
          </Lineup>
        </Left>

        {aside}
      </Body>
    </>
  );
}
