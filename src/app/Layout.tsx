import { Outlet } from 'react-router-dom';
import { AmbientBackground } from '@shared/ui';
import { Nav } from './Nav';
import { ScrollToTop } from './ScrollToTop';
import styles from './Layout.module.css';

/** App shell: ambient backdrop, fixed glass nav, then the routed page. */
export function Layout() {
  return (
    <>
      <ScrollToTop />
      <AmbientBackground />
      <Nav />
      <div className={styles.navSpacer} />
      <div className={styles.content}>
        <Outlet />
      </div>
    </>
  );
}
