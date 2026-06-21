import styled from 'styled-components';
import { Equalizer } from './Equalizer';

const Wrap = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  background: ${(p) => p.theme.color.page};
  z-index: 100;
  padding: 24px;
  text-align: center;
`;

const LogoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

const Tile = styled.span`
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 13px;
  background: radial-gradient(120% 120% at 50% 0%, #15151d, #0a0a12);
  border: 1px solid rgba(128, 234, 255, 0.22);
  box-shadow:
    0 0 18px rgba(128, 234, 255, 0.18),
    inset 0 0 12px rgba(128, 234, 255, 0.06);
  padding-bottom: 13px;
`;

const Word = styled.span`
  font-family: ${(p) => p.theme.font.display};
  font-weight: 800;
  font-size: 26px;
  letter-spacing: 0.02em;
  color: #fff;
`;

const Loading = styled.p`
  color: ${(p) => p.theme.color.fg3};
  font-size: 14px;
  letter-spacing: 0.04em;
`;

const ErrorBox = styled.div`
  max-width: 440px;
`;
const ErrorTitle = styled.p`
  color: #fff;
  font-weight: 600;
  margin: 0 0 6px;
`;
const ErrorMsg = styled.p`
  color: ${(p) => p.theme.color.magenta400};
  font-family: ${(p) => p.theme.font.mono};
  font-size: 13px;
  margin: 0 0 10px;
  word-break: break-word;
`;
const ErrorHint = styled.p`
  color: ${(p) => p.theme.color.fgMuted};
  font-size: 13px;
  margin: 0;
`;

/** Full-screen splash shown while the catalogue loads, or if it fails. */
export function BootSplash({ error }: { error?: string }) {
  return (
    <Wrap>
      <LogoRow>
        <Tile>
          <Equalizer variant="logo" />
        </Tile>
        <Word>PULSE</Word>
      </LogoRow>
      {error ? (
        <ErrorBox>
          <ErrorTitle>Не удалось загрузить данные</ErrorTitle>
          <ErrorMsg>{error}</ErrorMsg>
          <ErrorHint>Проверьте, что API запущен на :4000 — npm run dev в backend/</ErrorHint>
        </ErrorBox>
      ) : (
        <Loading>Загрузка афиши…</Loading>
      )}
    </Wrap>
  );
}
