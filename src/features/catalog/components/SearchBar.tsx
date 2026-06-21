import { useEffect, useMemo, useRef } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useI18n } from '@shared/i18n';
import { useOnClickOutside } from '@shared/hooks/useOnClickOutside';
import { useCatalog } from '../state/CatalogProvider';
import { useLocalizedConcerts } from '../hooks/useConcert';

const Wrap = styled.div`
  position: relative;
  flex: 0 1 250px;
  min-width: 0;
`;
const Field = styled.div<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  height: 40px;
  padding: 0 10px 0 14px;
  border-radius: 11px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid ${(p) => (p.$active ? 'rgba(128,234,255,0.5)' : p.theme.line.l08)};
  transition: border-color ${(p) => p.theme.dur.base} ${(p) => p.theme.ease.standard};
`;
const SearchIcon = styled(Search)`
  color: ${(p) => p.theme.color.cyan};
  flex: none;
`;
const Input = styled.input`
  flex: 1;
  min-width: 0;
  background: none;
  border: none;
  outline: none;
  color: #fff;
  font-size: 13px;
  &::placeholder {
    color: ${(p) => p.theme.color.fg3};
  }
`;
const Kbd = styled.span`
  font-family: ${(p) => p.theme.font.mono};
  font-size: 11px;
  color: ${(p) => p.theme.color.fg3};
  padding: 3px 7px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid ${(p) => p.theme.line.l08};
  flex: none;
`;
const Dropdown = styled.div`
  position: absolute;
  top: 48px;
  right: 0;
  width: min(360px, 86vw);
  z-index: 60;
  background: linear-gradient(180deg, #13131d, #0b0b12);
  border: 1px solid ${(p) => p.theme.line.l12};
  border-radius: 14px;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.6);
  padding: 6px;
  max-height: 392px;
  overflow: auto;
`;
const Result = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  text-align: left;
  padding: 9px 10px;
  border: none;
  background: none;
  cursor: pointer;
  border-radius: 10px;
  transition: background ${(p) => p.theme.dur.fast} ${(p) => p.theme.ease.standard};
  &:hover {
    background: rgba(128, 234, 255, 0.08);
  }
`;
const Swatch = styled.span`
  width: 38px;
  height: 38px;
  border-radius: 9px;
  flex: none;
`;
const Meta = styled.span`
  flex: 1;
  min-width: 0;
`;
const ResultArtist = styled.span`
  display: block;
  font-family: ${(p) => p.theme.font.display};
  font-weight: 700;
  font-size: 14px;
  color: #fff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const ResultSub = styled.span`
  display: block;
  font-size: 12px;
  color: ${(p) => p.theme.color.fg3};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const Price = styled.span`
  font-family: ${(p) => p.theme.font.display};
  font-size: 12px;
  font-weight: 600;
  color: ${(p) => p.theme.color.cyan};
  flex: none;
`;
const Empty = styled.div`
  padding: 18px 14px;
  text-align: center;
  color: ${(p) => p.theme.color.fgMuted};
  font-size: 13px;
`;

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
    <Wrap ref={containerRef}>
      <Field $active={searchOpen}>
        <SearchIcon size={16} strokeWidth={2} />
        <Input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={openSearch}
          placeholder={t.searchPh}
          aria-label={t.searchPh}
        />
        <Kbd>⌘K</Kbd>
      </Field>

      {searchOpen && (
        <Dropdown role="listbox">
          {results.map((c) => (
            <Result
              key={c.id}
              role="option"
              aria-selected={false}
              onClick={() => {
                navigate(`/concert/${c.id}`);
                clearSearch();
              }}
            >
              <Swatch style={{ background: c.art }} />
              <Meta>
                <ResultArtist>{c.artist}</ResultArtist>
                <ResultSub>
                  {c.venue} · {c.city}
                </ResultSub>
              </Meta>
              <Price>
                {t.from} {fmt(c.priceFrom)}
              </Price>
            </Result>
          ))}
          {noResults && <Empty>{t.searchEmpty}</Empty>}
        </Dropdown>
      )}
    </Wrap>
  );
}
