/** PULSE Admin design tokens as a typed theme object (subset of the brand system). */
export const theme = {
  color: {
    cyan: '#80EAFF',
    cyan600: '#1FB8D8',
    magenta: '#FF005C',
    magenta400: '#FF3D85',
    purple: '#9580FF',
    success: '#2ECC71',
    warning: '#F5A623',
    page: '#06060A',
    surface: '#0E0E16',
    surface2: '#13131D',
    fg1: '#FFFFFF',
    fg2: '#C8C8D0',
    fg3: '#9A9AA8',
    fgMuted: '#6E6E7E',
    onBright: '#06060A',
  },
  elev: 'linear-gradient(160deg,#13131D,#0A0A12)',
  line: {
    l08: 'rgba(255,255,255,0.08)',
    l10: 'rgba(255,255,255,0.1)',
    l12: 'rgba(255,255,255,0.12)',
    l14: 'rgba(255,255,255,0.14)',
  },
  grad: {
    brand: 'linear-gradient(135deg,#80EAFF,#FF005C)',
    brandCp: 'linear-gradient(135deg,#80EAFF,#9580FF)',
  },
  font: {
    display: "'Unbounded', system-ui, sans-serif",
    body: "'Inter', system-ui, -apple-system, sans-serif",
    mono: "'JetBrains Mono', ui-monospace, monospace",
  },
  radius: {
    sm: '8px',
    md: '10px',
    lg: '14px',
    xl: '18px',
    pill: '999px',
  },
  shadow: {
    panel: '0 24px 60px rgba(0,0,0,0.5)',
  },
  ease: 'cubic-bezier(0.2,0.8,0.2,1)',
  layout: {
    sidebar: '244px',
  },
} as const;

export type AdminTheme = typeof theme;
