import { Ticket } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LanguageToggle, useI18n } from '@shared/i18n';
import { useScrolled } from '@shared/hooks/useScrolled';
import { Logo } from '@shared/ui';
import { SearchBar } from '@features/catalog';
import * as S from './Nav.styles';

/** Persistent glass nav. Solidifies on scroll; re-localizes live. */
export function Nav() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const scrolled = useScrolled(8);
  const onAccount = useLocation().pathname === '/account';

  return (
    <S.Bar $scrolled={scrolled}>
      <S.Hairline aria-hidden="true" />
      <S.Inner>
        <Logo sub={t.logoSub} onClick={() => navigate('/')} />

        <S.Links>
          <S.Link $active={!onAccount} onClick={() => navigate('/')}>
            {t.navAfisha}
            {!onAccount && <S.Underline aria-hidden="true" />}
          </S.Link>
          <S.Link onClick={() => navigate('/')}>{t.navFest}</S.Link>
          <S.Link onClick={() => navigate('/')}>{t.navVenues}</S.Link>
        </S.Links>

        <S.Spacer />

        <SearchBar />
        <LanguageToggle />

        <S.IconBtn onClick={() => navigate('/ticket')} title={t.myTickets} aria-label={t.myTickets}>
          <Ticket size={18} strokeWidth={1.7} />
          <S.Dot aria-hidden="true" />
        </S.IconBtn>

        <S.Account $active={onAccount} onClick={() => navigate('/account')}>
          <S.Avatar>{t.initials}</S.Avatar>
          <S.UserName>{t.userShort}</S.UserName>
        </S.Account>
      </S.Inner>
    </S.Bar>
  );
}
