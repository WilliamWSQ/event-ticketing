import { Search } from 'lucide-react';
import styled from 'styled-components';

export const Wrap = styled.div`
  position: relative;
  flex: 0 1 250px;
  min-width: 0;
`;
export const Field = styled.div<{ $active: boolean }>`
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
export const SearchIcon = styled(Search)`
  color: ${(p) => p.theme.color.cyan};
  flex: none;
`;
export const Input = styled.input`
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
export const Kbd = styled.span`
  font-family: ${(p) => p.theme.font.mono};
  font-size: 11px;
  color: ${(p) => p.theme.color.fg3};
  padding: 3px 7px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid ${(p) => p.theme.line.l08};
  flex: none;
`;
export const Dropdown = styled.div`
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
export const Result = styled.button`
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
export const Swatch = styled.span`
  width: 38px;
  height: 38px;
  border-radius: 9px;
  flex: none;
`;
export const Meta = styled.span`
  flex: 1;
  min-width: 0;
`;
export const ResultArtist = styled.span`
  display: block;
  font-family: ${(p) => p.theme.font.display};
  font-weight: 700;
  font-size: 14px;
  color: #fff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
export const ResultSub = styled.span`
  display: block;
  font-size: 12px;
  color: ${(p) => p.theme.color.fg3};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
export const Price = styled.span`
  font-family: ${(p) => p.theme.font.display};
  font-size: 12px;
  font-weight: 600;
  color: ${(p) => p.theme.color.cyan};
  flex: none;
`;
export const Empty = styled.div`
  padding: 18px 14px;
  text-align: center;
  color: ${(p) => p.theme.color.fgMuted};
  font-size: 13px;
`;
