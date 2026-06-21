import { Ticket } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LanguageToggle, useI18n } from '@shared/i18n';
import { useScrolled } from '@shared/hooks/useScrolled';
import { cn } from '@shared/lib/cn';
import { Logo } from '@shared/ui';
import { SearchBar } from '@features/catalog';
import styles from './Nav.module.css';

/** Persistent glass nav. Solidifies on scroll; re-localizes live. */
export function Nav() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const scrolled = useScrolled(8);
  const onAccount = useLocation().pathname === '/account';

  return (
    <nav className={cn(styles.nav, scrolled && styles.scrolled)}>
      <span className={styles.hairline} aria-hidden="true" />
      <div className={styles.inner}>
        <Logo sub={t.logoSub} onClick={() => navigate('/')} />

        <div className={styles.links}>
          <button
            className={cn(styles.link, !onAccount && styles.linkActive)}
            onClick={() => navigate('/')}
          >
            {t.navAfisha}
            {!onAccount && <span className={styles.underline} aria-hidden="true" />}
          </button>
          <button className={styles.link} onClick={() => navigate('/')}>
            {t.navFest}
          </button>
          <button className={styles.link} onClick={() => navigate('/')}>
            {t.navVenues}
          </button>
        </div>

        <div className={styles.spacer} />

        <SearchBar />
        <LanguageToggle />

        <button
          className={styles.iconBtn}
          onClick={() => navigate('/ticket')}
          title={t.myTickets}
          aria-label={t.myTickets}
        >
          <Ticket size={18} strokeWidth={1.7} />
          <span className={styles.dot} aria-hidden="true" />
        </button>

        <button
          className={cn(styles.account, onAccount && styles.accountActive)}
          onClick={() => navigate('/account')}
        >
          <span className={styles.avatar}>{t.initials}</span>
          <span className={styles.userName}>{t.userShort}</span>
        </button>
      </div>
    </nav>
  );
}
