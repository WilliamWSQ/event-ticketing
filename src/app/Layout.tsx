import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { AmbientBackground } from '@shared/ui';
import { Nav } from './Nav';
import { ScrollToTop } from './ScrollToTop';

const NavSpacer = styled.div`
  height: ${(p) => p.theme.layout.navH};
  flex: none;
`;
const Content = styled.div`
  position: relative;
  z-index: 1;
`;

/** App shell: ambient backdrop, fixed glass nav, then the routed page. */
export function Layout() {
  return (
    <>
      <ScrollToTop />
      <AmbientBackground />
      <Nav />
      <NavSpacer />
      <Content>
        <Outlet />
      </Content>
    </>
  );
}
