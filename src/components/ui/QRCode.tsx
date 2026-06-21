import { useMemo } from 'react';

const N = 23;

/**
 * Decorative QR-style glyph, deterministically generated from `seed` (the order
 * id) — matches the prototype. It does NOT encode a scannable payload; swap for
 * a real encoder (e.g. `qrcode.react`) once tickets carry a real token.
 */
export function QRCode({ seed }: { seed: string }) {
  const cells = useMemo(() => {
    let hsh = 0;
    for (const ch of seed || 'PULSE') hsh = (hsh * 131 + ch.charCodeAt(0)) >>> 0;
    const rnd = () => {
      hsh = (hsh * 1103515245 + 12345) >>> 0;
      return (hsh >>> 16) / 65536;
    };
    const inFinder = (r: number, c: number) => {
      const f = (R: number, C: number) => r >= R && r < R + 7 && c >= C && c < C + 7;
      return f(0, 0) || f(0, N - 7) || f(N - 7, 0);
    };
    const rects: Array<{ x: number; y: number }> = [];
    for (let r = 0; r < N; r++) {
      for (let c = 0; c < N; c++) {
        if (inFinder(r, c)) continue;
        if (rnd() > 0.52) rects.push({ x: c, y: r });
      }
    }
    return rects;
  }, [seed]);

  return (
    <svg
      viewBox={`0 0 ${N} ${N}`}
      width="100%"
      height="100%"
      shapeRendering="crispEdges"
      role="img"
      aria-label="Ticket QR code"
    >
      {cells.map(({ x, y }) => (
        <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill="#0A0A0F" />
      ))}
      {/* finder patterns */}
      {[
        [0, 0],
        [0, N - 7],
        [N - 7, 0],
      ].map(([R, C]) => (
        <g key={`f${R}-${C}`}>
          <rect x={C} y={R} width={7} height={7} fill="#0A0A0F" />
          <rect x={C + 1} y={R + 1} width={5} height={5} fill="#fff" />
          <rect x={C + 2} y={R + 2} width={3} height={3} fill="#FF005C" />
        </g>
      ))}
    </svg>
  );
}
