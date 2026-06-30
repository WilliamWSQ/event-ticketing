import styled from 'styled-components';
import { Input } from '../../components/ui/Form';

export const Card = styled.div`
  background: ${(p) => p.theme.color.surface};
  border: 1px solid ${(p) => p.theme.line.l10};
  border-radius: ${(p) => p.theme.radius.lg};
  padding: 22px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 20px;
`;
export const LocaleTitle = styled.h3`
  margin: 0;
  font-size: 16px;
  color: #fff;
`;
export const Locales = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 20px;
`;
export const Locale = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
export const Preview = styled.div`
  height: 56px;
  border-radius: ${(p) => p.theme.radius.md};
  border: 1px solid ${(p) => p.theme.line.l12};
`;
export const LineupHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 4px;
`;
export const LineupLabel = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: ${(p) => p.theme.color.fg3};
  text-transform: uppercase;
  letter-spacing: 0.04em;
`;
export const Act = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;
export const ActTime = styled(Input)`
  max-width: 96px;
  font-family: ${(p) => p.theme.font.mono};
`;
export const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 8px;
`;
export const ErrorText = styled.p`
  color: ${(p) => p.theme.color.magenta400};
  font-size: 14px;
  margin: 0 0 12px;
`;
