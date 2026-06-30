import { useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '@shared/i18n';
import { useOnClickOutside } from '@shared/hooks/useOnClickOutside';
import { useCatalog } from '../../state/CatalogProvider';
import { useLocalizedConcerts } from '../../hooks/useConcert';
import * as S from './SearchBar.styles';

/** Live concert search with a results dropdown. Closes on outside click / Esc. */
export function SearchBar() {
  const { query, searchOpen, setQuery, openSearch, closeSearch, clearSearch } = useCatalog();
  const { t, fmt } = useI18n();
  const all = useLocalizedConcerts();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useOnClickOutside(containerRef, closeSearch, searchOpen);

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
    return all
      .filter((c) => !sq || `${c.artist} ${c.venue} ${c.city} ${c.genre}`.toLowerCase().includes(sq))
      .slice(0, 6);
  }, [query, all]);

  const noResults = query.trim().length > 0 && results.length === 0;

  return (
    <S.Wrap ref={containerRef}>
      <S.Field $active={searchOpen}>
        <S.SearchIcon size={16} strokeWidth={2} />
        <S.Input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={openSearch}
          placeholder={t.searchPh}
          aria-label={t.searchPh}
        />
        <S.Kbd>⌘K</S.Kbd>
      </S.Field>

      {searchOpen && (
        <S.Dropdown role="listbox">
          {results.map((c) => (
            <S.Result
              key={c.id}
              role="option"
              aria-selected={false}
              onClick={() => {
                navigate(`/concert/${c.id}`);
                clearSearch();
              }}
            >
              <S.Swatch style={{ background: c.art }} />
              <S.Meta>
                <S.ResultArtist>{c.artist}</S.ResultArtist>
                <S.ResultSub>
                  {c.venue} · {c.city}
                </S.ResultSub>
              </S.Meta>
              <S.Price>
                {t.from} {fmt(c.priceFrom)}
              </S.Price>
            </S.Result>
          ))}
          {noResults && <S.Empty>{t.searchEmpty}</S.Empty>}
        </S.Dropdown>
      )}
    </S.Wrap>
  );
}
