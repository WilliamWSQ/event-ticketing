import { Outlet } from 'react-router-dom';
import { AmbientBackground } from '@shared/ui';
import { Nav } from './Nav';
import { ScrollToTop } from './ScrollToTop';
import * as S from './Layout.styles';

/** App shell: ambient backdrop, fixed glass nav, then the routed page. */
export function Layout() {
  return (
    <>
      <ScrollToTop />
      <AmbientBackground />
      <Nav />
      <S.NavSpacer />
      <S.Content>
        <Outlet />
      </S.Content>
    </>
  );
}
