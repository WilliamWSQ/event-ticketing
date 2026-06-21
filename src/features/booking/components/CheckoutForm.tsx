import { useState } from 'react';
import { Check, Coins, CreditCard, Lock, Wallet } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '@shared/i18n';
import { cn } from '@shared/lib/cn';
import { BackButton, Button } from '@shared/ui';
import type { LocalizedConcert, PayMethod } from '@shared/types';
import { useBooking } from '../state/BookingProvider';
import { useQuote } from '../hooks/useQuote';
import styles from './CheckoutForm.module.css';

const TABS: { id: PayMethod; icon: typeof CreditCard; key: 'tabCard' | 'tabWallet' | 'tabCrypto' }[] = [
  { id: 'card', icon: CreditCard, key: 'tabCard' },
  { id: 'wallet', icon: Wallet, key: 'tabWallet' },
  { id: 'crypto', icon: Coins, key: 'tabCrypto' },
];

/** Checkout — payment method + order summary for the given concert. */
export function CheckoutForm({ concert }: { concert: LocalizedConcert }) {
  const { t, fmt, lang } = useI18n();
  const { pay, setPay, selectedTier, qty, confirmOrder } = useBooking();
  const navigate = useNavigate();

  // Server-authoritative pricing; show an optimistic value until it arrives.
  const quote = useQuote(selectedTier.id, qty);
  const [submitting, setSubmitting] = useState(false);
  const [payError, setPayError] = useState<string | null>(null);

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
      <BackButton label={t.back} onClick={() => navigate(`/concert/${concert.id}/seats`)} />
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
            <div className={styles.thumb} style={{ background: concert.art }} />
            <div>
              <div className={styles.sumArtist}>{concert.artist}</div>
              <div className={styles.sumMeta}>
                {concert.dateLong} · {concert.venue}
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
