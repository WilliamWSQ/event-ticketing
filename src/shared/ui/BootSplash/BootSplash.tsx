import { Equalizer } from '../Equalizer';
import * as S from './BootSplash.styles';

/** Full-screen splash shown while the catalogue loads, or if it fails. */
export function BootSplash({ error }: { error?: string }) {
  return (
    <S.Wrap>
      <S.LogoRow>
        <S.Tile>
          <Equalizer variant="logo" />
        </S.Tile>
        <S.Word>PULSE</S.Word>
      </S.LogoRow>
      {error ? (
        <S.ErrorBox>
          <S.ErrorTitle>Не удалось загрузить данные</S.ErrorTitle>
          <S.ErrorMsg>{error}</S.ErrorMsg>
          <S.ErrorHint>Проверьте, что API запущен на :4000 — yarn dev в backend/</S.ErrorHint>
        </S.ErrorBox>
      ) : (
        <S.Loading>Загрузка афиши…</S.Loading>
      )}
    </S.Wrap>
  );
}
