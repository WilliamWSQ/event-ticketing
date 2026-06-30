import { Lock } from 'lucide-react';
import styled, { css } from 'styled-components';
import { rise } from '@shared/theme';

export const Main = styled.main`
  position: relative;
  z-index: 1;
  max-width: 1080px;
  margin: 0 auto;
  padding: clamp(20px, 3vw, 32px) clamp(20px, 5vw, 56px) 120px;
  animation: ${rise} 0.5s ${(p) => p.theme.ease.emphasis} both;
`;
export const Title = styled.h1`
  font-family: ${(p) => p.theme.font.display};
  font-weight: 700;
  font-size: clamp(30px, 4vw, 46px);
  letter-spacing: -0.03em;
  margin: 0 0 28px;
  color: #fff;
`;
export const Cols = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
  align-items: flex-start;
`;
export const PayCol = styled.div`
  flex: 1 1 440px;
  min-width: 300px;
`;
export const Label = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  margin-bottom: 14px;
`;
export const Tabs = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 24px;
  flex-wrap: wrap;
`;
export const Tab = styled.button<{ $active: boolean }>`
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
export const CardForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px;
  border-radius: ${(p) => p.theme.radius.lg};
  background: ${(p) => p.theme.color.surface};
  border: 1px solid ${(p) => p.theme.line.l10};
`;
export const Field = styled.label`
  display: block;
`;
export const FieldLabel = styled.span`
  display: block;
  font-size: 13px;
  color: ${(p) => p.theme.color.fg3};
  margin-bottom: 7px;
`;
export const CardNumberBox = styled.div`
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
export const CardInput = styled.input`
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
export const Mir = styled.span`
  display: flex;
  align-items: flex-end;
  flex: none;
`;
export const MirA = styled.i`
  width: 22px;
  height: 14px;
  border-radius: 3px;
  background: ${(p) => p.theme.color.magenta};
`;
export const MirB = styled.i`
  width: 22px;
  height: 14px;
  border-radius: 3px;
  background: ${(p) => p.theme.color.purple};
  margin-left: -9px;
  mix-blend-mode: screen;
`;
export const FieldRow = styled.div`
  display: flex;
  gap: 14px;
`;
export const FieldFlex = styled.label`
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
export const MonoInput = styled.input`
  ${inputBase}
  font-family: ${(p) => p.theme.font.mono};
`;
export const TextInput = styled.input`
  ${inputBase}
  font-family: ${(p) => p.theme.font.body};
`;
export const WalletList = styled.div`
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
export const MirPay = styled.button`
  ${walletBase}
  background: #fff;
  color: #000;
  font-family: ${(p) => p.theme.font.display};
  font-weight: 700;
`;
export const Sber = styled.button`
  ${walletBase}
  background: ${(p) => p.theme.color.surface};
  color: #fff;
  font-family: ${(p) => p.theme.font.body};
  font-weight: 600;
`;
export const SberS = styled.span`
  font-weight: 800;
  color: #21a038;
`;
export const Yoomoney = styled.button`
  ${walletBase}
  background: rgba(149, 128, 255, 0.1);
  border-color: rgba(149, 128, 255, 0.3);
  color: ${(p) => p.theme.color.purple};
  font-family: ${(p) => p.theme.font.display};
  font-weight: 700;
`;
export const CryptoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
export const CryptoTiles = styled.div`
  display: flex;
  gap: 12px;
`;
export const CryptoTile = styled.div<{ $active?: boolean }>`
  flex: 1;
  padding: 18px;
  border-radius: ${(p) => p.theme.radius.mid};
  background: ${(p) => p.theme.color.surface};
  border: ${(p) => (p.$active ? '1.5px solid rgba(128,234,255,0.4)' : `1px solid ${p.theme.line.l12}`)};
  text-align: center;
  cursor: pointer;
`;
export const CryptoSym = styled.div`
  font-family: ${(p) => p.theme.font.display};
  font-weight: 700;
  font-size: 18px;
  color: #fff;
`;
export const CryptoSub = styled.div`
  font-size: 12px;
  color: ${(p) => p.theme.color.fg3};
`;
export const CryptoSubCyan = styled.div`
  font-size: 12px;
  color: ${(p) => p.theme.color.cyan};
`;
export const DepositBox = styled.div`
  padding: 18px;
  border-radius: ${(p) => p.theme.radius.mid};
  background: ${(p) => p.theme.color.page};
  border: 1px dashed ${(p) => p.theme.line.l18};
`;
export const DepositLabel = styled.div`
  font-size: 12px;
  color: ${(p) => p.theme.color.fg3};
  margin-bottom: 6px;
`;
export const DepositAddr = styled.div`
  font-family: ${(p) => p.theme.font.mono};
  font-size: 13px;
  color: ${(p) => p.theme.color.cyan};
  word-break: break-all;
`;
export const Summary = styled.aside`
  flex: 0 0 340px;
  max-width: 100%;
  border-radius: ${(p) => p.theme.radius.xl};
  padding: 26px;
  background: ${(p) => p.theme.grad.panel};
  border: 1px solid ${(p) => p.theme.line.l10};
  box-shadow: ${(p) => p.theme.shadow.panel};
`;
export const SummaryHead = styled.div`
  display: flex;
  gap: 14px;
  align-items: center;
  padding-bottom: 18px;
  border-bottom: 1px solid ${(p) => p.theme.line.l10};
  margin-bottom: 18px;
`;
export const Thumb = styled.div`
  width: 58px;
  height: 58px;
  border-radius: ${(p) => p.theme.radius.icon};
  flex: none;
`;
export const SumArtist = styled.div`
  font-family: ${(p) => p.theme.font.display};
  font-weight: 700;
  font-size: 17px;
  color: #fff;
`;
export const SumMeta = styled.div`
  font-size: 12px;
  color: ${(p) => p.theme.color.fg3};
`;
export const Lines = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-size: 14px;
`;
export const Line = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${(p) => p.theme.color.fg2};
`;
export const LineVal = styled.span`
  color: #fff;
  font-weight: 600;
`;
export const Free = styled.span`
  color: ${(p) => p.theme.color.success};
  font-weight: 600;
`;
export const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin: 18px 0;
  padding-top: 18px;
  border-top: 1px solid ${(p) => p.theme.line.l10};
`;
export const TotalLabel = styled.span`
  font-size: 15px;
  color: #fff;
  font-weight: 600;
`;
export const TotalVal = styled.span`
  font-family: ${(p) => p.theme.font.display};
  font-weight: 700;
  font-size: 30px;
  color: ${(p) => p.theme.color.cyan};
`;
export const PayError = styled.div`
  margin-top: 12px;
  text-align: center;
  font-size: 13px;
  color: ${(p) => p.theme.color.magenta400};
`;
export const Encrypted = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: center;
  margin-top: 14px;
  font-size: 12px;
  color: ${(p) => p.theme.color.fgMuted};
`;
export const LockIcon = styled(Lock)`
  color: ${(p) => p.theme.color.cyan};
`;
