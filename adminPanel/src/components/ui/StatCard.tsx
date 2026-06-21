import type { LucideIcon } from 'lucide-react';
import styles from './StatCard.module.css';

export function StatCard({
  icon: Icon,
  label,
  value,
  accent,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  accent: 'cyan' | 'magenta' | 'purple' | 'green';
}) {
  return (
    <div className={styles.card}>
      <span className={`${styles.icon} ${styles[accent]}`}>
        <Icon size={20} />
      </span>
      <div>
        <div className={styles.value}>{value}</div>
        <div className={styles.label}>{label}</div>
      </div>
    </div>
  );
}
