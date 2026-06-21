import { useEffect, useMemo, useRef } from 'react';
import { Search } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import { cn } from '../../lib/cn';
import styles from './SearchBar.module.css';

/** Live concert search with a results dropdown. Closes on outside click / Esc. */
export function SearchBar() {
  const { t, fmt, query, searchOpen, localize, setQuery, openSearch, closeSearch, clearSearch, openConcert, concerts } =
    useBooking();
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useOnClickOutside(containerRef, closeSearch, searchOpen);

  // ⌘K / Ctrl+K focuses the search; Esc closes it.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
        openSearch();
      } else if (e.key === 'Escape' && searchOpen) {
        closeSearch();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [openSearch, closeSearch, searchOpen]);

  const results = useMemo(() => {
    const sq = query.trim().toLowerCase();
    return concerts
      .map((c) => localize(c.id))
      .filter(
        (c) =>
          !sq || `${c.artist} ${c.venue} ${c.city} ${c.genre}`.toLowerCase().includes(sq),
      )
      .slice(0, 6);
  }, [query, localize, concerts]);

  const noResults = query.trim().length > 0 && results.length === 0;

  return (
    <div className={styles.wrap} ref={containerRef}>
      <div className={cn(styles.field, searchOpen && styles.fieldActive)}>
        <Search size={16} strokeWidth={2} className={styles.searchIcon} />
        <input
          ref={inputRef}
          className={styles.input}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={openSearch}
          placeholder={t.searchPh}
          aria-label={t.searchPh}
        />
        <span className={styles.kbd}>⌘K</span>
      </div>

      {searchOpen && (
        <div className={styles.dropdown} role="listbox">
          {results.map((c) => (
            <button
              key={c.id}
              className={styles.result}
              role="option"
              aria-selected={false}
              onClick={() => {
                openConcert(c.id);
                clearSearch();
              }}
            >
              <span className={styles.swatch} style={{ background: c.art }} />
              <span className={styles.meta}>
                <span className={styles.artist}>{c.artist}</span>
                <span className={styles.sub}>
                  {c.venue} · {c.city}
                </span>
              </span>
              <span className={styles.price}>
                {t.from} {fmt(c.priceFrom)}
              </span>
            </button>
          ))}
          {noResults && <div className={styles.empty}>{t.searchEmpty}</div>}
        </div>
      )}
    </div>
  );
}
