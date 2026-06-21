import { ChevronLeft } from 'lucide-react';
import styles from './BackButton.module.css';

/** Pill "back" control used at the top of detail screens. */
export function BackButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button className={styles.back} onClick={onClick}>
      <ChevronLeft size={16} strokeWidth={2.2} />
      {label}
    </button>
  );
}
