import { LayoutDashboard, Layers, Receipt, Ticket, Users } from 'lucide-react';
import { NavLink, Outlet } from 'react-router-dom';
import { cn } from '../lib/cn';
import styles from './Layout.module.css';

const NAV = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/concerts', label: 'Concerts', icon: Ticket, end: false },
  { to: '/orders', label: 'Orders', icon: Receipt, end: false },
  { to: '/users', label: 'Users', icon: Users, end: false },
  { to: '/tiers', label: 'Tiers', icon: Layers, end: false },
];

export function Layout() {
  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}>
          <span className={styles.mark}>P</span>
          <span className={styles.brandText}>
            PULSE<span className={styles.brandSub}>ADMIN</span>
          </span>
        </div>
        <nav className={styles.nav}>
          {NAV.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) => cn(styles.link, isActive && styles.linkActive)}
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className={styles.foot}>Local admin · no auth</div>
      </aside>
      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
}
