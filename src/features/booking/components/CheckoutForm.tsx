import { useState } from 'react';
import { Check, Coins, CreditCard, Lock, Wallet } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { useI18n } from '@shared/i18n';
import { BackButton, Button } from '@shared/ui';
import { rise } from '@shared/theme';
import type { LocalizedConcert, PayMethod } from '@shared/types';
import { useBooking } from '../state/BookingProvider';
import { useQuote } from '../hooks/useQuote';

const TABS: { id: PayMethod; icon: typeof CreditCard; key: 'tabCard' | 'tabWallet' | 'tabCrypto' }[] = [
  { id: 'card', icon: CreditCard, key: 'tabCard' },
  { id: 'wallet', icon: Wallet, key: 'tabWallet' },
  { id: 'crypto', icon: Coins, key: 'tabCrypto' },
];

const Main = styled.main`
  position: relative;
  z-index: 1;
  max-width: 1080px;
  margin: 0 auto;
  padding: clamp(20px, 3vw, 32px) clamp(20px, 5vw, 56px) 120px;
  animation: ${rise} 0.5s ${(p) => p.theme.ease.emphasis} both;
`;
const Title = styled.h1`
  font-family: ${(p) => p.theme.font.display};
  font-weight: 700;
  font-size: clamp(30px, 4vw, 46px);
  letter-spacing: -0.03em;
  margin: 0 0 28px;
  color: #fff;
`;
const Cols = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
  align-items: flex-start;
`;
const PayCol = styled.div`
  flex: 1 1 440px;
  min-width: 300px;
`;
const Label = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  margin-bottom: 14px;
`;
const Tabs = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 24px;
  flex-wrap: wrap;
`;
const Tab = styled.button<{ $active: boolean }>`
  flex: 1;
  min-width: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px;
  border-radius: ${(p) => p.theme.radius.mid};
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  color: ${(p) => (p.$active ? '#fff' : p.theme.color.fg3)};
  background: ${(p) =>
    p.$active
      ? 'linear-gradient(135deg,rgba(128,234,255,0.18),rgba(255,0,92,0.18))'
      : 'rgba(255,255,255,0.04)'};
  border: 1.5px solid ${(p) => (p.$active ? 'rgba(149,128,255,0.6)' : p.theme.line.l12)};
  transition:
    background ${(p) => p.theme.dur.base} ease,
    border-color ${(p) => p.theme.dur.base} ease,
    color ${(p) => p.theme.dur.base} ease;
`;
const CardForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px;
  border-radius: ${(p) => p.theme.radius.lg};
  background: ${(p) => p.theme.color.surface};
  border: 1px solid ${(p) => p.theme.line.l10};
`;
const Field = styled.label`
  display: block;
`;
const FieldLabel = styled.span`
  display: block;
  font-size: 13px;
  color: ${(p) => p.theme.color.fg3};
  margin-bottom: 7px;
`;
const CardNumberBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 13px 15px;
  border-radius: ${(p) => p.theme.radius.icon};
  background: ${(p) => p.theme.color.page};
  border: 1px solid ${(p) => p.theme.line.l12};
  &:focus-within {
    border-color: rgba(128, 234, 255, 0.5);
  }
`;
const CardInput = styled.input`
  flex: 1;
  background: none;
  border: none;
  outline: none;
  color: #fff;
  font-family: ${(p) => p.theme.font.mono};
  font-size: 15px;
  letter-spacing: 0.04em;
  min-width: 0;
`;
const Mir = styled.span`
  display: flex;
  align-items: flex-end;
  flex: none;
`;
const MirA = styled.i`
  width: 22px;
  height: 14px;
  border-radius: 3px;
  background: ${(p) => p.theme.color.magenta};
`;
const MirB = styled.i`
  width: 22px;
  height: 14px;
  border-radius: 3px;
  background: ${(p) => p.theme.color.purple};
  margin-left: -9px;
  mix-blend-mode: screen;
`;
const FieldRow = styled.div`
  display: flex;
  gap: 14px;
`;
const FieldFlex = styled.label`
  flex: 1;
`;
const inputBase = css`
  width: 100%;
  padding: 13px 15px;
  border-radius: ${(p) => p.theme.radius.icon};
  background: ${(p) => p.theme.color.page};
  border: 1px solid ${(p) => p.theme.line.l12};
  color: #fff;
  font-size: 15px;
  outline: none;
  &:focus {
    border-color: rgba(128, 234, 255, 0.5);
  }
`;
const MonoInput = styled.input`
  ${inputBase}
  font-family: ${(p) => p.theme.font.mono};
`;
const TextInput = styled.input`
  ${inputBase}
  font-family: ${(p) => p.theme.font.body};
`;
const WalletList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
const walletBase = css`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 18px;
  border-radius: ${(p) => p.theme.radius.mid};
  border: 1px solid ${(p) => p.theme.line.l14};
  font-size: 16px;
  cursor: pointer;
  transition: transform ${(p) => p.theme.dur.base} ease;
  &:hover {
    transform: translateY(-2px);
  }
`;
const MirPay = styled.button`
  ${walletBase}
  background: #fff;
  color: #000;
  font-family: ${(p) => p.theme.font.display};
  font-weight: 700;
`;
const Sber = styled.button`
  ${walletBase}
  background: ${(p) => p.theme.color.surface};
  color: #fff;
  font-family: ${(p) => p.theme.font.body};
  font-weight: 600;
`;
const SberS = styled.span`
  font-weight: 800;
  color: #21a038;
`;
const Yoomoney = styled.button`
  ${walletBase}
  background: rgba(149, 128, 255, 0.1);
  border-color: rgba(149, 128, 255, 0.3);
  color: ${(p) => p.theme.color.purple};
  font-family: ${(p) => p.theme.font.display};
  font-weight: 700;
`;
const CryptoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
const CryptoTiles = styled.div`
  display: flex;
  gap: 12px;
`;
const CryptoTile = styled.div<{ $active?: boolean }>`
  flex: 1;
  padding: 18px;
  border-radius: ${(p) => p.theme.radius.mid};
  background: ${(p) => p.theme.color.surface};
  border: ${(p) => (p.$active ? '1.5px solid rgba(128,234,255,0.4)' : `1px solid ${p.theme.line.l12}`)};
  text-align: center;
  cursor: pointer;
`;
const CryptoSym = styled.div`
  font-family: ${(p) => p.theme.font.display};
  font-weight: 700;
  font-size: 18px;
  color: #fff;
`;
const CryptoSub = styled.div`
  font-size: 12px;
  color: ${(p) => p.theme.color.fg3};
`;
const CryptoSubCyan = styled.div`
  font-size: 12px;
  color: ${(p) => p.theme.color.cyan};
`;
const DepositBox = styled.div`
  padding: 18px;
  border-radius: ${(p) => p.theme.radius.mid};
  background: ${(p) => p.theme.color.page};
  border: 1px dashed ${(p) => p.theme.line.l18};
`;
const DepositLabel = styled.div`
  font-size: 12px;
  color: ${(p) => p.theme.color.fg3};
  margin-bottom: 6px;
`;
const DepositAddr = styled.div`
  font-family: ${(p) => p.theme.font.mono};
  font-size: 13px;
  color: ${(p) => p.theme.color.cyan};
  word-break: break-all;
`;
const Summary = styled.aside`
  flex: 0 0 340px;
  max-width: 100%;
  border-radius: ${(p) => p.theme.radius.xl};
  padding: 26px;
  background: ${(p) => p.theme.grad.panel};
  border: 1px solid ${(p) => p.theme.line.l10};
  box-shadow: ${(p) => p.theme.shadow.panel};
`;
const SummaryHead = styled.div`
  display: flex;
  gap: 14px;
  align-items: center;
  padding-bottom: 18px;
  border-bottom: 1px solid ${(p) => p.theme.line.l10};
  margin-bottom: 18px;
`;
const Thumb = styled.div`
  width: 58px;
  height: 58px;
  border-radius: ${(p) => p.theme.radius.icon};
  flex: none;
`;
const SumArtist = styled.div`
  font-family: ${(p) => p.theme.font.display};
  font-weight: 700;
  font-size: 17px;
  color: #fff;
`;
const SumMeta = styled.div`
  font-size: 12px;
  color: ${(p) => p.theme.color.fg3};
`;
const Lines = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-size: 14px;
`;
const Line = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${(p) => p.theme.color.fg2};
`;
const LineVal = styled.span`
  color: #fff;
  font-weight: 600;
`;
const Free = styled.span`
  color: ${(p) => p.theme.color.success};
  font-weight: 600;
`;
const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin: 18px 0;
  padding-top: 18px;
  border-top: 1px solid ${(p) => p.theme.line.l10};
`;
const TotalLabel = styled.span`
  font-size: 15px;
  color: #fff;
  font-weight: 600;
`;
const TotalVal = styled.span`
  font-family: ${(p) => p.theme.font.display};
  font-weight: 700;
  font-size: 30px;
  color: ${(p) => p.theme.color.cyan};
`;
const PayError = styled.div`
  margin-top: 12px;
  text-align: center;
  font-size: 13px;
  color: ${(p) => p.theme.color.magenta400};
`;
const Encrypted = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: center;
  margin-top: 14px;
  font-size: 12px;
  color: ${(p) => p.theme.color.fgMuted};
`;
const LockIcon = styled(Lock)`
  color: ${(p) => p.theme.color.cyan};
`;

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
    <Main>
      <BackButton label={t.back} onClick={() => navigate(`/concert/${concert.id}/seats`)} />
      <Title>{t.checkout}</Title>

      <Cols>
        <PayCol>
          <Label>{t.payMethod}</Label>
          <Tabs>
            {TABS.map(({ id, icon: Icon, key }) => (
              <Tab key={id} $active={pay === id} onClick={() => setPay(id)} aria-pressed={pay === id}>
                <Icon size={18} strokeWidth={1.8} />
                {t[key]}
              </Tab>
            ))}
          </Tabs>

          {pay === 'card' && (
            <CardForm>
              <Field>
                <FieldLabel>{t.cardNumber}</FieldLabel>
                <CardNumberBox>
                  <CardInput defaultValue="2200 7708 1234 5678" inputMode="numeric" aria-label={t.cardNumber} />
                  <Mir aria-hidden="true">
                    <MirA />
                    <MirB />
                  </Mir>
                </CardNumberBox>
              </Field>
              <FieldRow>
                <FieldFlex>
                  <FieldLabel>{t.expiry}</FieldLabel>
                  <MonoInput defaultValue="09 / 27" aria-label={t.expiry} />
                </FieldFlex>
                <FieldFlex>
                  <FieldLabel>CVC</FieldLabel>
                  <MonoInput defaultValue="•••" aria-label="CVC" />
                </FieldFlex>
              </FieldRow>
              <Field>
                <FieldLabel>{t.nameOnCard}</FieldLabel>
                <TextInput key={lang} defaultValue={t.cardName} aria-label={t.nameOnCard} />
              </Field>
            </CardForm>
          )}

          {pay === 'wallet' && (
            <WalletList>
              <MirPay>MIR Pay</MirPay>
              <Sber>
                <SberS>S</SberS>
                <span>berPay</span>
              </Sber>
              <Yoomoney>ЮMoney</Yoomoney>
            </WalletList>
          )}

          {pay === 'crypto' && (
            <CryptoList>
              <CryptoTiles>
                <CryptoTile $active>
                  <CryptoSym>TON</CryptoSym>
                  <CryptoSubCyan>The Open Network</CryptoSubCyan>
                </CryptoTile>
                <CryptoTile>
                  <CryptoSym>USDT</CryptoSym>
                  <CryptoSub>{t.stablecoin}</CryptoSub>
                </CryptoTile>
                <CryptoTile>
                  <CryptoSym>BTC</CryptoSym>
                  <CryptoSub>Bitcoin</CryptoSub>
                </CryptoTile>
              </CryptoTiles>
              <DepositBox>
                <DepositLabel>{t.sendToWallet}</DepositLabel>
                <DepositAddr>UQA7f3k…aE92 · pulse.ton</DepositAddr>
              </DepositBox>
            </CryptoList>
          )}
        </PayCol>

        <Summary>
          <SummaryHead>
            <Thumb style={{ background: concert.art }} />
            <div>
              <SumArtist>{concert.artist}</SumArtist>
              <SumMeta>
                {concert.dateLong} · {concert.venue}
              </SumMeta>
            </div>
          </SummaryHead>
          <Lines>
            <Line>
              <span>
                {selectedTier.name} × {qty}
              </span>
              <LineVal>{fmt(subtotal)}</LineVal>
            </Line>
            <Line>
              <span>{t.serviceFees}</span>
              <LineVal>{fmt(fees)}</LineVal>
            </Line>
            <Line>
              <span>{t.eticket}</span>
              <Free>{t.free}</Free>
            </Line>
          </Lines>
          <TotalRow>
            <TotalLabel>{t.total}</TotalLabel>
            <TotalVal>{fmt(total)}</TotalVal>
          </TotalRow>
          <Button variant="gradient" block animated onClick={handlePay} disabled={submitting} aria-busy={submitting}>
            {t.payPrefix}
            {fmt(total)}
            <Check size={18} strokeWidth={2.6} />
          </Button>
          {payError && <PayError>{payError}</PayError>}
          <Encrypted>
            <LockIcon size={14} strokeWidth={1.8} />
            {t.encrypted}
          </Encrypted>
        </Summary>
      </Cols>
    </Main>
  );
}
