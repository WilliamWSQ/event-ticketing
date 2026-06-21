import { ArrowRight, Check, Minus, Plus } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { useConcertParam } from '../hooks/useConcertParam';
import { localizeTier } from '../lib/localize';
import { cn } from '../lib/cn';
import { BackButton } from '../components/ui/BackButton';
import { Button } from '../components/ui/Button';
import type { TierId } from '../types';
import styles from './Seats.module.css';

/** Visual top-to-bottom order of the arena zones. */
const ZONE_ORDER: { id: TierId; cls: string }[] = [
  { id: 'vip', cls: styles.zoneVip },
  { id: 'gap', cls: styles.zoneGap },
  { id: 'ga', cls: styles.zoneGa },
  { id: 'cabana', cls: styles.zoneCabana },
];

/** Pick zone & quantity. */
export function Seats() {
  const { t, fmt, lang, tierId, qty, subtotal, selectedTier, selectTier, inc, dec, goDetails, goCheckout, tiers } =
    useBooking();
  const sel = useConcertParam();

  return (
    <>
      <main className={styles.main}>
        <BackButton label={t.back} onClick={goDetails} />

        <div className={styles.head}>
          <div className={styles.eyebrow}>
            {sel.artist} · {sel.dateLong}
          </div>
          <h1 className={styles.title}>{t.pickZone}</h1>
        </div>

        {/* Arena map */}
        <div className={styles.arena}>
          <div className={styles.gridLines} aria-hidden="true" />
          <div className={styles.stage}>{t.stage}</div>
          <div className={styles.stageGlow} aria-hidden="true" />

          <div className={styles.zones}>
            {ZONE_ORDER.map(({ id, cls }) => {
              const zone = localizeTier(
                tiers.find((x) => x.id === id)!,
                lang,
              );
              const selected = tierId === id;
              return (
                <button
                  key={id}
                  className={cn(styles.zone, cls, selected && styles.zoneSelected)}
                  onClick={() => selectTier(id)}
                  aria-pressed={selected}
                >
                  {selected && <span className={styles.ring} aria-hidden="true" />}
                  <div className={styles.zoneRow}>
                    <span className={styles.zoneName}>{zone.name}</span>
                    <span className={styles.zonePrice}>{fmt(zone.price)}</span>
                  </div>
                  <div className={styles.zoneDesc}>{zone.desc}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Perks + quantity */}
        <div className={styles.lower}>
          <div className={styles.perksCard}>
            <div className={styles.perksHead}>
              <div>
                <div className={styles.selectedLabel}>{t.selected}</div>
                <div className={styles.selectedName}>{selectedTier.name}</div>
              </div>
              <div className={styles.selectedPrice}>{fmt(selectedTier.price)}</div>
            </div>
            <div className={styles.perks}>
              {selectedTier.perks.map((p) => (
                <div key={p} className={styles.perk}>
                  <Check size={18} strokeWidth={2.4} className={styles.check} />
                  {p}
                </div>
              ))}
            </div>
          </div>

          <div className={styles.qtyCard}>
            <div className={styles.qtyLabel}>{t.howMany}</div>
            <div className={styles.stepper}>
              <button
                className={cn(styles.stepBtn, styles.stepMinus)}
                onClick={dec}
                aria-label="−1"
              >
                <Minus size={20} strokeWidth={2.4} />
              </button>
              <span className={styles.qtyValue}>{qty}</span>
              <button
                className={cn(styles.stepBtn, styles.stepPlus)}
                onClick={inc}
                aria-label="+1"
              >
                <Plus size={20} strokeWidth={2.4} />
              </button>
            </div>
            <div className={styles.maxNote}>{t.maxOrder}</div>
          </div>
        </div>
      </main>

      {/* Fixed checkout bar */}
      <div className={styles.bar}>
        <div className={styles.barSummary}>
          <span className={styles.barLine}>
            {qty} × {selectedTier.name}
          </span>
          <span className={styles.barTotal}>{fmt(subtotal)}</span>
        </div>
        <Button variant="gradient" onClick={goCheckout}>
          {t.continueCheckout}
          <ArrowRight size={18} strokeWidth={2.4} />
        </Button>
      </div>
    </>
  );
}
