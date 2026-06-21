import { useEffect } from 'react';
import { ArrowRight, Check, Minus, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { localizeTier, useI18n } from '@shared/i18n';
import { BackButton, Button } from '@shared/ui';
import { rise } from '@shared/theme';
import type { LocalizedConcert, TierId } from '@shared/types';
import { useBooking } from '../state/BookingProvider';

/* per-zone color config */
const ZONES: {
  id: TierId;
  bg: string;
  outline: string;
  hover: string;
  desc: string;
  ring: string;
  ringShadow: string;
  pad: string;
  nameSize: string;
}[] = [
  {
    id: 'vip',
    bg: 'linear-gradient(120deg,rgba(255,0,92,0.32),rgba(255,0,92,0.14))',
    outline: 'rgba(255,0,92,0.4)',
    hover: '#FF005C',
    desc: '#FFC2D6',
    ring: '#FF005C',
    ringShadow: '0 0 26px rgba(255,0,92,0.6), inset 0 0 24px rgba(255,0,92,0.25)',
    pad: '18px 22px',
    nameSize: '17px',
  },
  {
    id: 'gap',
    bg: 'linear-gradient(120deg,rgba(149,128,255,0.3),rgba(149,128,255,0.12))',
    outline: 'rgba(149,128,255,0.4)',
    hover: '#9580FF',
    desc: '#D6CEFF',
    ring: '#9580FF',
    ringShadow: '0 0 26px rgba(149,128,255,0.6), inset 0 0 24px rgba(149,128,255,0.25)',
    pad: '18px 22px',
    nameSize: '17px',
  },
  {
    id: 'ga',
    bg: 'linear-gradient(120deg,rgba(128,234,255,0.26),rgba(128,234,255,0.1))',
    outline: 'rgba(128,234,255,0.4)',
    hover: '#80EAFF',
    desc: '#C2F2FF',
    ring: '#80EAFF',
    ringShadow: '0 0 26px rgba(128,234,255,0.6), inset 0 0 24px rgba(128,234,255,0.25)',
    pad: '22px',
    nameSize: '17px',
  },
  {
    id: 'cabana',
    bg: 'linear-gradient(135deg,rgba(255,0,92,0.2),rgba(128,234,255,0.18))',
    outline: 'rgba(255,255,255,0.25)',
    hover: '#fff',
    desc: '#E6E6EC',
    ring: '#fff',
    ringShadow: '0 0 26px rgba(255,255,255,0.5)',
    pad: '16px 18px',
    nameSize: '15px',
  },
];

const Main = styled.main`
  position: relative;
  z-index: 1;
  max-width: 1100px;
  margin: 0 auto;
  padding: clamp(20px, 3vw, 32px) clamp(20px, 5vw, 56px) 140px;
  animation: ${rise} 0.5s ${(p) => p.theme.ease.emphasis} both;
`;
const Head = styled.div`
  margin-bottom: 26px;
`;
const Eyebrow = styled.div`
  font-size: 13px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${(p) => p.theme.color.cyan};
  font-weight: 700;
`;
const Title = styled.h1`
  font-family: ${(p) => p.theme.font.display};
  font-weight: 700;
  font-size: clamp(28px, 4vw, 44px);
  letter-spacing: -0.03em;
  margin: 6px 0 0;
  color: #fff;
`;
const Arena = styled.div`
  position: relative;
  border-radius: ${(p) => p.theme.radius.xl3};
  padding: clamp(20px, 4vw, 40px);
  background: radial-gradient(120% 120% at 50% 0%, #15151d, #0a0a12 70%);
  border: 1px solid ${(p) => p.theme.line.l08};
  overflow: hidden;
  margin-bottom: 32px;
`;
const GridLines = styled.div`
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(128, 234, 255, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(128, 234, 255, 0.05) 1px, transparent 1px);
  background-size: 34px 34px;
  -webkit-mask-image: radial-gradient(80% 80% at 50% 30%, #000, transparent);
  mask-image: radial-gradient(80% 80% at 50% 30%, #000, transparent);
`;
const Stage = styled.div`
  position: relative;
  margin: 0 auto 8px;
  width: min(70%, 520px);
  height: 54px;
  border-radius: 14px 14px 4px 4px;
  background: linear-gradient(180deg, #80eaff, #9580ff);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${(p) => p.theme.font.display};
  font-weight: 700;
  letter-spacing: 0.3em;
  color: ${(p) => p.theme.color.page};
  font-size: 14px;
  box-shadow: 0 0 50px rgba(128, 234, 255, 0.5);
`;
const StageGlow = styled.div`
  position: relative;
  margin: 0 auto 22px;
  width: min(78%, 580px);
  height: 30px;
  background: radial-gradient(80% 200% at 50% 0%, rgba(128, 234, 255, 0.4), transparent 70%);
`;
const Zones = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 580px;
  margin: 0 auto;
`;
const Zone = styled.button<{ $z: (typeof ZONES)[number] }>`
  position: relative;
  border: none;
  cursor: pointer;
  text-align: left;
  border-radius: ${(p) => p.theme.radius.mid};
  color: #fff;
  transition: outline-color ${(p) => p.theme.dur.base} ease;
  padding: ${(p) => p.$z.pad};
  background: ${(p) => p.$z.bg};
  outline: 1.5px solid ${(p) => p.$z.outline};
  &:hover {
    outline-color: ${(p) => p.$z.hover};
  }
`;
const ZoneRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const ZoneName = styled.span<{ $size: string }>`
  font-family: ${(p) => p.theme.font.display};
  font-weight: 700;
  font-size: ${(p) => p.$size};
`;
const ZonePrice = styled.span`
  font-family: ${(p) => p.theme.font.display};
  font-weight: 700;
`;
const ZoneDesc = styled.div<{ $color: string }>`
  font-size: 12px;
  margin-top: 2px;
  color: ${(p) => p.$color};
`;
const Ring = styled.span<{ $z: (typeof ZONES)[number] }>`
  position: absolute;
  inset: -2px;
  border-radius: 11px;
  pointer-events: none;
  outline: 2.5px solid ${(p) => p.$z.ring};
  box-shadow: ${(p) => p.$z.ringShadow};
`;

const Lower = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  align-items: flex-start;
`;
const PerksCard = styled.div`
  flex: 1 1 320px;
  padding: 24px;
  border-radius: ${(p) => p.theme.radius.lg};
  background: ${(p) => p.theme.color.surface};
  border: 1px solid ${(p) => p.theme.line.l10};
`;
const PerksHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
`;
const SelectedLabel = styled.div`
  font-size: 12px;
  color: ${(p) => p.theme.color.fg3};
  text-transform: uppercase;
  letter-spacing: 0.08em;
`;
const SelectedName = styled.div`
  font-family: ${(p) => p.theme.font.display};
  font-weight: 700;
  font-size: 22px;
  color: #fff;
`;
const SelectedPrice = styled.div`
  font-family: ${(p) => p.theme.font.display};
  font-weight: 700;
  font-size: 26px;
  color: ${(p) => p.theme.color.cyan};
`;
const Perks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const Perk = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  color: ${(p) => p.theme.color.fg2};
`;
const CheckIcon = styled(Check)`
  color: ${(p) => p.theme.color.cyan};
  flex: none;
`;
const QtyCard = styled.div`
  flex: 1 1 240px;
  padding: 24px;
  border-radius: ${(p) => p.theme.radius.lg};
  background: ${(p) => p.theme.color.surface};
  border: 1px solid ${(p) => p.theme.line.l10};
`;
const QtyLabel = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  margin-bottom: 16px;
`;
const Stepper = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
`;
const stepBase = css`
  width: 46px;
  height: 46px;
  border-radius: ${(p) => p.theme.radius.icon};
  border: 1px solid ${(p) => p.theme.line.l18};
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    border-color ${(p) => p.theme.dur.base} ease,
    color ${(p) => p.theme.dur.base} ease;
`;
const StepMinus = styled.button`
  ${stepBase}
  &:hover {
    border-color: ${(p) => p.theme.color.magenta};
    color: ${(p) => p.theme.color.magenta};
  }
`;
const StepPlus = styled.button`
  ${stepBase}
  &:hover {
    border-color: ${(p) => p.theme.color.cyan};
    color: ${(p) => p.theme.color.cyan};
  }
`;
const QtyValue = styled.span`
  font-family: ${(p) => p.theme.font.display};
  font-weight: 700;
  font-size: 36px;
  min-width: 44px;
  text-align: center;
  color: #fff;
`;
const MaxNote = styled.div`
  margin-top: 16px;
  font-size: 13px;
  color: ${(p) => p.theme.color.fgMuted};
`;
const Bar = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 55;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
  padding: 16px clamp(20px, 5vw, 56px);
  background: rgba(8, 8, 14, 0.85);
  backdrop-filter: blur(16px);
  border-top: 1px solid ${(p) => p.theme.line.l10};
`;
const BarSummary = styled.div`
  display: flex;
  align-items: baseline;
  gap: 12px;
`;
const BarLine = styled.span`
  font-size: 13px;
  color: ${(p) => p.theme.color.fg3};
`;
const BarTotal = styled.span`
  font-family: ${(p) => p.theme.font.display};
  font-weight: 700;
  font-size: 26px;
  color: #fff;
`;

/** Pick zone & quantity for the given concert. */
export function ZoneSelection({ concert }: { concert: LocalizedConcert }) {
  const { t, fmt, lang } = useI18n();
  const { tiers, tierId, qty, subtotal, selectedTier, selectTier, inc, dec, setConcertId } =
    useBooking();
  const navigate = useNavigate();

  useEffect(() => {
    setConcertId(concert.id);
  }, [concert.id, setConcertId]);

  return (
    <>
      <Main>
        <BackButton label={t.back} onClick={() => navigate(`/concert/${concert.id}`)} />

        <Head>
          <Eyebrow>
            {concert.artist} · {concert.dateLong}
          </Eyebrow>
          <Title>{t.pickZone}</Title>
        </Head>

        <Arena>
          <GridLines aria-hidden="true" />
          <Stage>{t.stage}</Stage>
          <StageGlow aria-hidden="true" />

          <Zones>
            {ZONES.map((z) => {
              const zone = localizeTier(tiers.find((x) => x.id === z.id)!, lang);
              const selected = tierId === z.id;
              return (
                <Zone key={z.id} $z={z} onClick={() => selectTier(z.id)} aria-pressed={selected}>
                  {selected && <Ring $z={z} aria-hidden="true" />}
                  <ZoneRow>
                    <ZoneName $size={z.nameSize}>{zone.name}</ZoneName>
                    <ZonePrice>{fmt(zone.price)}</ZonePrice>
                  </ZoneRow>
                  <ZoneDesc $color={z.desc}>{zone.desc}</ZoneDesc>
                </Zone>
              );
            })}
          </Zones>
        </Arena>

        <Lower>
          <PerksCard>
            <PerksHead>
              <div>
                <SelectedLabel>{t.selected}</SelectedLabel>
                <SelectedName>{selectedTier.name}</SelectedName>
              </div>
              <SelectedPrice>{fmt(selectedTier.price)}</SelectedPrice>
            </PerksHead>
            <Perks>
              {selectedTier.perks.map((p) => (
                <Perk key={p}>
                  <CheckIcon size={18} strokeWidth={2.4} />
                  {p}
                </Perk>
              ))}
            </Perks>
          </PerksCard>

          <QtyCard>
            <QtyLabel>{t.howMany}</QtyLabel>
            <Stepper>
              <StepMinus onClick={dec} aria-label="−1">
                <Minus size={20} strokeWidth={2.4} />
              </StepMinus>
              <QtyValue>{qty}</QtyValue>
              <StepPlus onClick={inc} aria-label="+1">
                <Plus size={20} strokeWidth={2.4} />
              </StepPlus>
            </Stepper>
            <MaxNote>{t.maxOrder}</MaxNote>
          </QtyCard>
        </Lower>
      </Main>

      <Bar>
        <BarSummary>
          <BarLine>
            {qty} × {selectedTier.name}
          </BarLine>
          <BarTotal>{fmt(subtotal)}</BarTotal>
        </BarSummary>
        <Button variant="gradient" onClick={() => navigate('/checkout')}>
          {t.continueCheckout}
          <ArrowRight size={18} strokeWidth={2.4} />
        </Button>
      </Bar>
    </>
  );
}
