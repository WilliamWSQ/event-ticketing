import styled from 'styled-components';

export const Header = styled.header`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 28px;
`;
export const Title = styled.h1`
  margin: 0;
  font-size: clamp(24px, 3vw, 32px);
  color: #fff;
`;
export const Subtitle = styled.p`
  margin: 6px 0 0;
  color: ${(p) => p.theme.color.fg3};
  font-size: 14px;
`;
export const Action = styled.div`
  display: flex;
  gap: 10px;
`;
