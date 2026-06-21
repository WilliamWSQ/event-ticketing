import { createGlobalStyle } from 'styled-components';

/** Global reset, document chrome, scrollbar, selection, and reduced-motion. */
export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after { box-sizing: border-box; }

  html, body {
    margin: 0;
    padding: 0;
    background: ${(p) => p.theme.color.page};
  }

  body {
    font-family: ${(p) => p.theme.font.body};
    color: ${(p) => p.theme.color.fg1};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
  }

  #root {
    position: relative;
    min-height: 100vh;
    isolation: isolate;
  }

  a { color: inherit; text-decoration: none; }
  button { font-family: inherit; }
  input { font-family: inherit; }

  ::selection { background: ${(p) => p.theme.color.magenta}; color: #fff; }

  ::-webkit-scrollbar { width: 10px; height: 10px; }
  ::-webkit-scrollbar-thumb {
    background: #2a2a35;
    border-radius: 9px;
    border: 2px solid ${(p) => p.theme.color.page};
  }
  ::-webkit-scrollbar-thumb:hover { background: #4a4a57; }

  :focus-visible {
    outline: 2px solid ${(p) => p.theme.color.cyan};
    outline-offset: 2px;
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.001ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.001ms !important;
      scroll-behavior: auto !important;
    }
  }
`;
