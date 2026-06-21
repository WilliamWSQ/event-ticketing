import { useEffect, useState } from 'react';
import { Check, Coins, CreditCard, Lock, Wallet } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { api, type Quote } from '../lib/api';
import { cn } from '../lib/cn';
import { BackButton } from '../components/ui/BackButton';
import { Button } from '../components/ui/Button';
import type { PayMethod } from '../types';
import styles from './Checkout.module.css';

const TABS: { id: PayMethod; icon: typeof CreditCard; key: 'tabCard' | 'tabWallet' | 'tabCrypto' }[] = [
  { id: 'card', icon: CreditCard, key: 'tabCard' },
  { id: 'wallet', icon: Wallet, key: 'tabWallet' },
  { id: 'crypto', icon: Coins, key: 'tabCrypto' },
];

/** Checkout — payment method + order summary. */
export function Checkout() {
  const { t, fmt, lang, pay, setPay, selectedConcert, selectedTier, qty, goSeats, confirmOrder } =
    useBooking();

  // Server-authoritative pricing. Show an optimistic value until it arrives.
  const [quote, setQuote] = useState<Quote | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [payError, setPayError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setQuote(null);
    api
      .quote(selectedTier.id, qty)
      .then((q) => {
        if (!cancelled) setQuote(q);
      })
      .catch(() => {
        /* fall back to the optimistic figures below */
      });
    return () => {
      cancelled = true;
    };
  }, [selectedTier.id, qty]);

  const subtotal = quote?.subtotal ?? selectedTier.price * qty;
  const fees = quote?.fees ?? Math.round(subtotal * 0.12);
  const total = quote?.total ?? subtotal + fees;

  const handlePay = async () => {
    setSubmitting(true);
    setPayError(null);
    try {
      await confirmOrder();
    } catch (e) {
      setPayError(e instanceof Error ? e.message : 'Payment failed');
      setSubmitting(false);
    }
  };

  return (
    <main className={styles.main}>
      <BackButton label={t.back} onClick={goSeats} />
      <h1 className={styles.title}>{t.checkout}</h1>

      <div className={styles.cols}>
        {/* Payment */}
        <div className={styles.payCol}>
          <div className={styles.label}>{t.payMethod}</div>
          <div className={styles.tabs}>
            {TABS.map(({ id, icon: Icon, key }) => (
              <button
                key={id}
                className={cn(styles.tab, pay === id && styles.tabActive)}
                onClick={() => setPay(id)}
                aria-pressed={pay === id}
              >
                <Icon size={18} strokeWidth={1.8} />
                {t[key]}
              </button>
            ))}
          </div>

          {pay === 'card' && (
            <div className={styles.cardForm}>
              <label className={styles.field}>
                <span className={styles.fieldLabel}>{t.cardNumber}</span>
                <div className={styles.cardNumberBox}>
                  <input
                    className={styles.cardInput}
                    defaultValue="2200 7708 1234 5678"
                    inputMode="numeric"
                    aria-label={t.cardNumber}
                  />
                  <span className={styles.mir} aria-hidden="true">
                    <i className={styles.mirA} />
                    <i className={styles.mirB} />
                  </span>
                </div>
              </label>
              <div className={styles.fieldRow}>
                <label className={styles.fieldFlex}>
                  <span className={styles.fieldLabel}>{t.expiry}</span>
                  <input className={styles.monoInput} defaultValue="09 / 27" aria-label={t.expiry} />
                </label>
                <label className={styles.fieldFlex}>
                  <span className={styles.fieldLabel}>CVC</span>
                  <input className={styles.monoInput} defaultValue="•••" aria-label="CVC" />
                </label>
              </div>
              <label className={styles.field}>
                <span className={styles.fieldLabel}>{t.nameOnCard}</span>
                <input
                  key={lang}
                  className={styles.textInput}
                  defaultValue={t.cardName}
                  aria-label={t.nameOnCard}
                />
              </label>
            </div>
          )}

          {pay === 'wallet' && (
            <div className={styles.walletList}>
              <button className={cn(styles.walletBtn, styles.mirPay)}>MIR Pay</button>
              <button className={cn(styles.walletBtn, styles.sber)}>
                <span className={styles.sberS}>S</span>
                <span>berPay</span>
              </button>
              <button className={cn(styles.walletBtn, styles.yoomoney)}>ЮMoney</button>
            </div>
          )}

          {pay === 'crypto' && (
            <div className={styles.cryptoList}>
              <div className={styles.cryptoTiles}>
                <div className={cn(styles.cryptoTile, styles.cryptoTileActive)}>
                  <div className={styles.cryptoSym}>TON</div>
                  <div className={styles.cryptoSubCyan}>The Open Network</div>
                </div>
                <div className={styles.cryptoTile}>
                  <div className={styles.cryptoSym}>USDT</div>
                  <div className={styles.cryptoSub}>{t.stablecoin}</div>
                </div>
                <div className={styles.cryptoTile}>
                  <div className={styles.cryptoSym}>BTC</div>
                  <div className={styles.cryptoSub}>Bitcoin</div>
                </div>
              </div>
              <div className={styles.depositBox}>
                <div className={styles.depositLabel}>{t.sendToWallet}</div>
                <div className={styles.depositAddr}>UQA7f3k…aE92 · pulse.ton</div>
              </div>
            </div>
          )}
        </div>

        {/* Order summary */}
        <aside className={styles.summary}>
          <div className={styles.summaryHead}>
            <div className={styles.thumb} style={{ background: selectedConcert.art }} />
            <div>
              <div className={styles.sumArtist}>{selectedConcert.artist}</div>
              <div className={styles.sumMeta}>
                {selectedConcert.dateLong} · {selectedConcert.venue}
              </div>
            </div>
          </div>
          <div className={styles.lines}>
            <div className={styles.line}>
              <span>
                {selectedTier.name} × {qty}
              </span>
              <span className={styles.lineVal}>{fmt(subtotal)}</span>
            </div>
            <div className={styles.line}>
              <span>{t.serviceFees}</span>
              <span className={styles.lineVal}>{fmt(fees)}</span>
            </div>
            <div className={styles.line}>
              <span>{t.eticket}</span>
              <span className={styles.free}>{t.free}</span>
            </div>
          </div>
          <div className={styles.totalRow}>
            <span className={styles.totalLabel}>{t.total}</span>
            <span className={styles.totalVal}>{fmt(total)}</span>
          </div>
          <Button
            variant="gradient"
            block
            animated
            onClick={handlePay}
            disabled={submitting}
            aria-busy={submitting}
          >
            {t.payPrefix}
            {fmt(total)}
            <Check size={18} strokeWidth={2.6} />
          </Button>
          {payError && <div className={styles.payError}>{payError}</div>}
          <div className={styles.encrypted}>
            <Lock size={14} strokeWidth={1.8} className={styles.lockIcon} />
            {t.encrypted}
          </div>
        </aside>
      </div>
    </main>
  );
}
