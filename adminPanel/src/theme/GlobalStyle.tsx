import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after { box-sizing: border-box; }

  html, body { margin: 0; padding: 0; background: ${(p) => p.theme.color.page}; }

  body {
    font-family: ${(p) => p.theme.font.body};
    color: ${(p) => p.theme.color.fg1};
    -webkit-font-smoothing: antialiased;
  }

  a { color: inherit; text-decoration: none; }
  button, input, select, textarea { font-family: inherit; }

  ::selection { background: ${(p) => p.theme.color.magenta}; color: #fff; }

  ::-webkit-scrollbar { width: 10px; height: 10px; }
  ::-webkit-scrollbar-thumb {
    background: #2a2a35;
    border-radius: 9px;
    border: 2px solid ${(p) => p.theme.color.page};
  }

  :focus-visible { outline: 2px solid ${(p) => p.theme.color.cyan}; outline-offset: 2px; }

  h1, h2, h3 { font-family: ${(p) => p.theme.font.display}; letter-spacing: -0.02em; }
`;
