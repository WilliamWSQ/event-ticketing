import { LayoutDashboard, Layers, Receipt, Ticket, Users } from 'lucide-react';
import { Outlet } from 'react-router-dom';
import * as S from './Layout.styles';

const NAV = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/concerts', label: 'Concerts', icon: Ticket, end: false },
  { to: '/orders', label: 'Orders', icon: Receipt, end: false },
  { to: '/users', label: 'Users', icon: Users, end: false },
  { to: '/tiers', label: 'Tiers', icon: Layers, end: false },
];

export function Layout() {
  return (
    <S.Shell>
      <S.Sidebar>
        <S.Brand>
          <S.Mark>P</S.Mark>
          <S.BrandText>
            PULSE
            <S.BrandSub>ADMIN</S.BrandSub>
          </S.BrandText>
        </S.Brand>
        <S.Nav>
          {NAV.map(({ to, label, icon: Icon, end }) => (
            <S.Link key={to} to={to} end={end}>
              <Icon size={18} />
              {label}
            </S.Link>
          ))}
        </S.Nav>
        <S.Foot>Local admin · no auth</S.Foot>
      </S.Sidebar>
      <S.Content>
        <Outlet />
      </S.Content>
    </S.Shell>
  );
}
