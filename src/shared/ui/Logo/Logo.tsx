import { Equalizer } from '../Equalizer';
import * as S from './Logo.styles';

/** PULSE wordmark: neon equalizer tile + stacked "PULSE / LIVE · {city}" lockup. */
export function Logo({ sub, onClick }: { sub: string; onClick: () => void }) {
  return (
    <S.Root onClick={onClick} aria-label="PULSE — home">
      <S.Tile>
        <Equalizer variant="logo" />
      </S.Tile>
      <S.Lockup>
        <S.Word>PULSE</S.Word>
        <S.Sub>{sub}</S.Sub>
      </S.Lockup>
    </S.Root>
  );
}
