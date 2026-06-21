import { Ticket } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useBooking } from '../../context/BookingContext';
import { useScrolled } from '../../hooks/useScrolled';
import { cn } from '../../lib/cn';
import { Logo } from '../ui/Logo';
import { LanguageToggle } from './LanguageToggle';
import { SearchBar } from './SearchBar';
import styles from './Nav.module.css';

/** Persistent glass nav. Solidifies on scroll; re-localizes live. */
export function Nav() {
  const { t, goHome, goTickets, goAccount } = useBooking();
  const scrolled = useScrolled(8);
  const onAccount = useLocation().pathname === '/account';

  return (
    <nav className={cn(styles.nav, scrolled && styles.scrolled)}>
      <span className={styles.hairline} aria-hidden="true" />
      <div className={styles.inner}>
        <Logo sub={t.logoSub} onClick={goHome} />

        <div className={styles.links}>
          <button className={cn(styles.link, !onAccount && styles.linkActive)} onClick={goHome}>
            {t.navAfisha}
            {!onAccount && <span className={styles.underline} aria-hidden="true" />}
          </button>
          <button className={styles.link} onClick={goHome}>
            {t.navFest}
          </button>
          <button className={styles.link} onClick={goHome}>
            {t.navVenues}
          </button>
        </div>

        <div className={styles.spacer} />

        <SearchBar />
        <LanguageToggle />

        <button
          className={styles.iconBtn}
          onClick={goTickets}
          title={t.myTickets}
          aria-label={t.myTickets}
        >
          <Ticket size={18} strokeWidth={1.7} />
          <span className={styles.dot} aria-hidden="true" />
        </button>

        <button
          className={cn(styles.account, onAccount && styles.accountActive)}
          onClick={goAccount}
        >
          <span className={styles.avatar}>{t.initials}</span>
          <span className={styles.userName}>{t.userShort}</span>
        </button>
      </div>
    </nav>
  );
}
