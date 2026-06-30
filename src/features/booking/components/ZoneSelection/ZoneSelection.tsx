import { useEffect } from 'react';
import { ArrowRight, Minus, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { localizeTier, useI18n } from '@shared/i18n';
import { BackButton, Button } from '@shared/ui';
import type { LocalizedConcert } from '@shared/types';
import { useBooking } from '../../state/BookingProvider';
import { ZONES } from './ZoneSelection.styles';
import * as S from './ZoneSelection.styles';

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
      <S.Main>
        <BackButton label={t.back} onClick={() => navigate(`/concert/${concert.id}`)} />

        <S.Head>
          <S.Eyebrow>
            {concert.artist} · {concert.dateLong}
          </S.Eyebrow>
          <S.Title>{t.pickZone}</S.Title>
        </S.Head>

        <S.Arena>
          <S.GridLines aria-hidden="true" />
          <S.Stage>{t.stage}</S.Stage>
          <S.StageGlow aria-hidden="true" />

          <S.Zones>
            {ZONES.map((z) => {
              const zone = localizeTier(tiers.find((x) => x.id === z.id)!, lang);
              const selected = tierId === z.id;
              return (
                <S.Zone key={z.id} $z={z} onClick={() => selectTier(z.id)} aria-pressed={selected}>
                  {selected && <S.Ring $z={z} aria-hidden="true" />}
                  <S.ZoneRow>
                    <S.ZoneName $size={z.nameSize}>{zone.name}</S.ZoneName>
                    <S.ZonePrice>{fmt(zone.price)}</S.ZonePrice>
                  </S.ZoneRow>
                  <S.ZoneDesc $color={z.desc}>{zone.desc}</S.ZoneDesc>
                </S.Zone>
              );
            })}
          </S.Zones>
        </S.Arena>

        <S.Lower>
          <S.PerksCard>
            <S.PerksHead>
              <div>
                <S.SelectedLabel>{t.selected}</S.SelectedLabel>
                <S.SelectedName>{selectedTier.name}</S.SelectedName>
              </div>
              <S.SelectedPrice>{fmt(selectedTier.price)}</S.SelectedPrice>
            </S.PerksHead>
            <S.Perks>
              {selectedTier.perks.map((p) => (
                <S.Perk key={p}>
                  <S.CheckIcon size={18} strokeWidth={2.4} />
                  {p}
                </S.Perk>
              ))}
            </S.Perks>
          </S.PerksCard>

          <S.QtyCard>
            <S.QtyLabel>{t.howMany}</S.QtyLabel>
            <S.Stepper>
              <S.StepMinus onClick={dec} aria-label="−1">
                <Minus size={20} strokeWidth={2.4} />
              </S.StepMinus>
              <S.QtyValue>{qty}</S.QtyValue>
              <S.StepPlus onClick={inc} aria-label="+1">
                <Plus size={20} strokeWidth={2.4} />
              </S.StepPlus>
            </S.Stepper>
            <S.MaxNote>{t.maxOrder}</S.MaxNote>
          </S.QtyCard>
        </S.Lower>
      </S.Main>

      <S.Bar>
        <S.BarSummary>
          <S.BarLine>
            {qty} × {selectedTier.name}
          </S.BarLine>
          <S.BarTotal>{fmt(subtotal)}</S.BarTotal>
        </S.BarSummary>
        <Button variant="gradient" onClick={() => navigate('/checkout')}>
          {t.continueCheckout}
          <ArrowRight size={18} strokeWidth={2.4} />
        </Button>
      </S.Bar>
    </>
  );
}
