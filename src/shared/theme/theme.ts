/**
 * Design tokens as a typed theme object (consumed via <ThemeProvider>).
 * Sourced from the Xsolla dark palette + the prototype's surface values.
 * Headlines use Unbounded (Cyrillic-capable) since Russian is the default.
 */
export const theme = {
  color: {
    cyan: '#80EAFF',
    cyan300: '#99EEFF',
    cyan600: '#1FB8D8',
    magenta: '#FF005C',
    magenta400: '#FF3D85',
    purple: '#9580FF',
    success: '#2ECC71',
    page: '#06060A',
    surface: '#0E0E16',
    surface2: '#13131D',
    surface3: '#0A0A12',
    fg1: '#FFFFFF',
    fg2: '#C8C8D0',
    fg3: '#9A9AA8',
    fgMuted: '#6E6E7E',
    onBright: '#06060A',
  },
  line: {
    l05: 'rgba(255,255,255,0.05)',
    l08: 'rgba(255,255,255,0.08)',
    l10: 'rgba(255,255,255,0.1)',
    l12: 'rgba(255,255,255,0.12)',
    l14: 'rgba(255,255,255,0.14)',
    l18: 'rgba(255,255,255,0.18)',
  },
  grad: {
    brand: 'linear-gradient(135deg,#80EAFF,#FF005C)',
    brandCp: 'linear-gradient(135deg,#80EAFF,#9580FF)',
    soft: 'linear-gradient(135deg,rgba(128,234,255,0.2),rgba(255,0,92,0.2))',
    panel: 'linear-gradient(160deg,#13131D,#0A0A12)',
    panel120: 'linear-gradient(120deg,#13131D,#0A0A12)',
  },
  font: {
    display: "'Unbounded', 'Russo One', 'Oswald', system-ui, sans-serif",
    body: "'Inter', system-ui, -apple-system, sans-serif",
    mono: "'JetBrains Mono', ui-monospace, 'SF Mono', monospace",
  },
  radius: {
    btn: '9px',
    mid: '10px',
    icon: '12px',
    card: '16px',
    lg: '18px',
    xl: '20px',
    xl2: '22px',
    xl3: '24px',
    hero: '28px',
    pill: '999px',
  },
  shadow: {
    panel: '0 24px 60px rgba(0,0,0,0.5)',
    cardHover: '0 24px 50px rgba(0,0,0,0.5), 0 0 30px rgba(128,234,255,0.18)',
    cta: '0 12px 30px rgba(255,0,92,0.3)',
    ctaHover: '0 16px 40px rgba(255,0,92,0.45)',
    glowCyan: '0 0 30px rgba(128,234,255,0.18)',
  },
  ease: {
    emphasis: 'cubic-bezier(0.16,1,0.3,1)',
    standard: 'cubic-bezier(0.2,0.8,0.2,1)',
  },
  dur: {
    fast: '120ms',
    base: '200ms',
    slow: '320ms',
    slower: '520ms',
  },
  layout: {
    navH: '68px',
    maxw: '1240px',
  },
} as const;

export type AppTheme = typeof theme;
