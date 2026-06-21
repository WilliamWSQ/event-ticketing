import { LayoutDashboard, Layers, Receipt, Ticket, Users } from 'lucide-react';
import { NavLink, Outlet } from 'react-router-dom';
import styled from 'styled-components';

const NAV = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/concerts', label: 'Concerts', icon: Ticket, end: false },
  { to: '/orders', label: 'Orders', icon: Receipt, end: false },
  { to: '/users', label: 'Users', icon: Users, end: false },
  { to: '/tiers', label: 'Tiers', icon: Layers, end: false },
];

const Shell = styled.div`
  display: flex;
  min-height: 100vh;
`;
const Sidebar = styled.aside`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  width: ${(p) => p.theme.layout.sidebar};
  display: flex;
  flex-direction: column;
  padding: 22px 16px;
  background: ${(p) => p.theme.color.surface};
  border-right: 1px solid ${(p) => p.theme.line.l10};
`;
const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 4px 8px 22px;
`;
const Mark = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 11px;
  background: ${(p) => p.theme.grad.brand};
  color: ${(p) => p.theme.color.onBright};
  font-family: ${(p) => p.theme.font.display};
  font-weight: 800;
  font-size: 20px;
`;
const BrandText = styled.span`
  display: flex;
  flex-direction: column;
  font-family: ${(p) => p.theme.font.display};
  font-weight: 800;
  font-size: 17px;
  letter-spacing: 0.02em;
  line-height: 1;
  color: #fff;
`;
const BrandSub = styled.span`
  font-size: 9px;
  letter-spacing: 0.34em;
  color: ${(p) => p.theme.color.cyan};
  margin-top: 4px;
`;
const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
const Link = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 11px 14px;
  border-radius: ${(p) => p.theme.radius.md};
  color: ${(p) => p.theme.color.fg3};
  font-weight: 600;
  font-size: 14px;
  transition:
    background 0.15s ease,
    color 0.15s ease;
  &:hover {
    color: #fff;
    background: rgba(255, 255, 255, 0.04);
  }
  &.active {
    color: #fff;
    background: linear-gradient(135deg, rgba(128, 234, 255, 0.16), rgba(255, 0, 92, 0.16));
    box-shadow: inset 0 0 0 1px rgba(149, 128, 255, 0.4);
  }
`;
const Foot = styled.div`
  margin-top: auto;
  padding: 12px 14px 4px;
  font-size: 11px;
  color: ${(p) => p.theme.color.fgMuted};
  border-top: 1px solid ${(p) => p.theme.line.l08};
`;
const Content = styled.main`
  flex: 1;
  margin-left: ${(p) => p.theme.layout.sidebar};
  padding: 32px clamp(20px, 4vw, 48px) 64px;
  min-width: 0;
`;

export function Layout() {
  return (
    <Shell>
      <Sidebar>
        <Brand>
          <Mark>P</Mark>
          <BrandText>
            PULSE
            <BrandSub>ADMIN</BrandSub>
          </BrandText>
        </Brand>
        <Nav>
          {NAV.map(({ to, label, icon: Icon, end }) => (
            <Link key={to} to={to} end={end}>
              <Icon size={18} />
              {label}
            </Link>
          ))}
        </Nav>
        <Foot>Local admin · no auth</Foot>
      </Sidebar>
      <Content>
        <Outlet />
      </Content>
    </Shell>
  );
}
