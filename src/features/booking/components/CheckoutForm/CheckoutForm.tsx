import { useState } from 'react';
import { Check, Coins, CreditCard, Wallet } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '@shared/i18n';
import { BackButton, Button } from '@shared/ui';
import type { LocalizedConcert, PayMethod } from '@shared/types';
import { useBooking } from '../../state/BookingProvider';
import { useQuote } from '../../hooks/useQuote';
import * as S from './CheckoutForm.styles';

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
    <S.Main>
      <BackButton label={t.back} onClick={() => navigate(`/concert/${concert.id}/seats`)} />
      <S.Title>{t.checkout}</S.Title>

      <S.Cols>
        <S.PayCol>
          <S.Label>{t.payMethod}</S.Label>
          <S.Tabs>
            {TABS.map(({ id, icon: Icon, key }) => (
              <S.Tab key={id} $active={pay === id} onClick={() => setPay(id)} aria-pressed={pay === id}>
                <Icon size={18} strokeWidth={1.8} />
                {t[key]}
              </S.Tab>
            ))}
          </S.Tabs>

          {pay === 'card' && (
            <S.CardForm>
              <S.Field>
                <S.FieldLabel>{t.cardNumber}</S.FieldLabel>
                <S.CardNumberBox>
                  <S.CardInput defaultValue="2200 7708 1234 5678" inputMode="numeric" aria-label={t.cardNumber} />
                  <S.Mir aria-hidden="true">
                    <S.MirA />
                    <S.MirB />
                  </S.Mir>
                </S.CardNumberBox>
              </S.Field>
              <S.FieldRow>
                <S.FieldFlex>
                  <S.FieldLabel>{t.expiry}</S.FieldLabel>
                  <S.MonoInput defaultValue="09 / 27" aria-label={t.expiry} />
                </S.FieldFlex>
                <S.FieldFlex>
                  <S.FieldLabel>CVC</S.FieldLabel>
                  <S.MonoInput defaultValue="•••" aria-label="CVC" />
                </S.FieldFlex>
              </S.FieldRow>
              <S.Field>
                <S.FieldLabel>{t.nameOnCard}</S.FieldLabel>
                <S.TextInput key={lang} defaultValue={t.cardName} aria-label={t.nameOnCard} />
              </S.Field>
            </S.CardForm>
          )}

          {pay === 'wallet' && (
            <S.WalletList>
              <S.MirPay>MIR Pay</S.MirPay>
              <S.Sber>
                <S.SberS>S</S.SberS>
                <span>berPay</span>
              </S.Sber>
              <S.Yoomoney>ЮMoney</S.Yoomoney>
            </S.WalletList>
          )}

          {pay === 'crypto' && (
            <S.CryptoList>
              <S.CryptoTiles>
                <S.CryptoTile $active>
                  <S.CryptoSym>TON</S.CryptoSym>
                  <S.CryptoSubCyan>The Open Network</S.CryptoSubCyan>
                </S.CryptoTile>
                <S.CryptoTile>
                  <S.CryptoSym>USDT</S.CryptoSym>
                  <S.CryptoSub>{t.stablecoin}</S.CryptoSub>
                </S.CryptoTile>
                <S.CryptoTile>
                  <S.CryptoSym>BTC</S.CryptoSym>
                  <S.CryptoSub>Bitcoin</S.CryptoSub>
                </S.CryptoTile>
              </S.CryptoTiles>
              <S.DepositBox>
                <S.DepositLabel>{t.sendToWallet}</S.DepositLabel>
                <S.DepositAddr>UQA7f3k…aE92 · pulse.ton</S.DepositAddr>
              </S.DepositBox>
            </S.CryptoList>
          )}
        </S.PayCol>

        <S.Summary>
          <S.SummaryHead>
            <S.Thumb style={{ background: concert.art }} />
            <div>
              <S.SumArtist>{concert.artist}</S.SumArtist>
              <S.SumMeta>
                {concert.dateLong} · {concert.venue}
              </S.SumMeta>
            </div>
          </S.SummaryHead>
          <S.Lines>
            <S.Line>
              <span>
                {selectedTier.name} × {qty}
              </span>
              <S.LineVal>{fmt(subtotal)}</S.LineVal>
            </S.Line>
            <S.Line>
              <span>{t.serviceFees}</span>
              <S.LineVal>{fmt(fees)}</S.LineVal>
            </S.Line>
            <S.Line>
              <span>{t.eticket}</span>
              <S.Free>{t.free}</S.Free>
            </S.Line>
          </S.Lines>
          <S.TotalRow>
            <S.TotalLabel>{t.total}</S.TotalLabel>
            <S.TotalVal>{fmt(total)}</S.TotalVal>
          </S.TotalRow>
          <Button variant="gradient" block animated onClick={handlePay} disabled={submitting} aria-busy={submitting}>
            {t.payPrefix}
            {fmt(total)}
            <Check size={18} strokeWidth={2.6} />
          </Button>
          {payError && <S.PayError>{payError}</S.PayError>}
          <S.Encrypted>
            <S.LockIcon size={14} strokeWidth={1.8} />
            {t.encrypted}
          </S.Encrypted>
        </S.Summary>
      </S.Cols>
    </S.Main>
  );
}
