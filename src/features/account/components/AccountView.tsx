import { useMemo } from 'react';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useI18n } from '@shared/i18n';
import { Button, Toggle } from '@shared/ui';
import { rise } from '@shared/theme';
import { useLocalizedConcerts } from '@features/catalog';
import { useBooking } from '@features/booking';
import { useAccount } from '../hooks/useAccount';

const STATS = [
  { field: 'shows', label: 'statShows', accent: 'cyan' },
  { field: 'cities', label: 'statCities', accent: 'purple' },
  { field: 'hours', label: 'statHours', accent: 'magenta' },
] as const;

const Main = styled.main`
  position: relative;
  z-index: 1;
  max-width: 1040px;
  margin: 0 auto;
  padding: clamp(24px, 3vw, 40px) clamp(20px, 5vw, 56px) 96px;
  animation: ${rise} 0.5s ${(p) => p.theme.ease.emphasis} both;
`;
const Profile = styled.section`
  position: relative;
  border-radius: ${(p) => p.theme.radius.xl3};
  overflow: hidden;
  padding: clamp(24px, 4vw, 40px);
  margin-bottom: 32px;
  background: ${(p) => p.theme.grad.panel120};
  border: 1px solid ${(p) => p.theme.line.l10};
`;
const ProfileGlow = styled.div`
  position: absolute;
  top: -40%;
  right: -5%;
  width: 40%;
  height: 180%;
  background: radial-gradient(circle, rgba(255, 0, 92, 0.18), transparent 65%);
  filter: blur(10px);
`;
const ProfileRow = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 24px;
  flex-wrap: wrap;
`;
const AvatarRing = styled.div`
  width: 96px;
  height: 96px;
  border-radius: ${(p) => p.theme.radius.pill};
  flex: none;
  background: ${(p) => p.theme.grad.brand};
  padding: 3px;
`;
const Avatar = styled.div`
  width: 100%;
  height: 100%;
  border-radius: ${(p) => p.theme.radius.pill};
  background: ${(p) => p.theme.color.surface3};
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${(p) => p.theme.font.display};
  font-weight: 700;
  font-size: 34px;
  color: #fff;
`;
const ProfileInfo = styled.div`
  flex: 1;
  min-width: 200px;
`;
const NameRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`;
const Name = styled.h1`
  font-family: ${(p) => p.theme.font.display};
  font-weight: 700;
  font-size: clamp(26px, 4vw, 38px);
  letter-spacing: -0.03em;
  margin: 0;
  color: #fff;
`;
const TierBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 13px;
  border-radius: ${(p) => p.theme.radius.btn};
  background: linear-gradient(135deg, rgba(128, 234, 255, 0.2), rgba(255, 0, 92, 0.2));
  border: 1px solid rgba(149, 128, 255, 0.4);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.06em;
  color: ${(p) => p.theme.color.purple};
`;
const Meta = styled.p`
  margin: 6px 0 0;
  color: ${(p) => p.theme.color.fg3};
  font-size: 15px;
`;
const FindBtn = styled(Button)`
  padding: 12px 22px;
  font-size: 14px;
  font-weight: 600;
`;
const Stats = styled.div`
  position: relative;
  display: flex;
  gap: 14px;
  margin-top: 28px;
  flex-wrap: wrap;
`;
const Stat = styled.div`
  flex: 1;
  min-width: 130px;
  padding: 16px 18px;
  border-radius: ${(p) => p.theme.radius.mid};
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid ${(p) => p.theme.line.l08};
`;
const StatValue = styled.div<{ $accent: 'cyan' | 'purple' | 'magenta' }>`
  font-family: ${(p) => p.theme.font.display};
  font-weight: 700;
  font-size: 30px;
  color: ${(p) =>
    p.$accent === 'cyan'
      ? p.theme.color.cyan
      : p.$accent === 'purple'
        ? p.theme.color.purple
        : p.theme.color.magenta400};
`;
const StatLabel = styled.div`
  font-size: 12px;
  color: ${(p) => p.theme.color.fg3};
`;
const H2 = styled.h2`
  font-family: ${(p) => p.theme.font.display};
  font-weight: 700;
  font-size: 24px;
  letter-spacing: -0.02em;
  margin: 0 0 16px;
  color: #fff;
`;
const Tickets = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-bottom: 40px;
`;
const TicketRow = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 16px;
  border-radius: ${(p) => p.theme.radius.lg};
  background: ${(p) => p.theme.color.surface};
  border: 1px solid ${(p) => p.theme.line.l10};
  cursor: pointer;
  transition:
    border-color ${(p) => p.theme.dur.base} ease,
    transform ${(p) => p.theme.dur.base} ease;
  &:hover {
    border-color: rgba(128, 234, 255, 0.4);
    transform: translateX(4px);
  }
`;
const TicketArt = styled.div`
  width: 70px;
  height: 70px;
  border-radius: ${(p) => p.theme.radius.mid};
  flex: none;
`;
const TicketInfo = styled.div`
  flex: 1;
  min-width: 0;
`;
const TicketArtist = styled.div`
  font-family: ${(p) => p.theme.font.display};
  font-weight: 700;
  font-size: 19px;
  color: #fff;
`;
const TicketMeta = styled.div`
  font-size: 13px;
  color: ${(p) => p.theme.color.fg3};
`;
const TicketTier = styled.span`
  padding: 7px 14px;
  border-radius: ${(p) => p.theme.radius.btn};
  background: rgba(128, 234, 255, 0.14);
  border: 1px solid rgba(128, 234, 255, 0.3);
  font-size: 12px;
  font-weight: 700;
  color: ${(p) => p.theme.color.cyan};
  white-space: nowrap;
`;
const Chevron = styled(ChevronRight)`
  color: ${(p) => p.theme.color.fgMuted};
  flex: none;
`;
const Cols = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  align-items: flex-start;
`;
const Col = styled.div`
  flex: 1 1 300px;
`;
const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
const PayRow = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px;
  border-radius: ${(p) => p.theme.radius.card};
  background: ${(p) => p.theme.color.surface};
  border: 1px solid ${(p) => p.theme.line.l10};
`;
const Mir = styled.span`
  display: flex;
  align-items: flex-end;
  flex: none;
`;
const MirA = styled.i`
  width: 30px;
  height: 20px;
  border-radius: 4px;
  background: ${(p) => p.theme.color.magenta};
`;
const MirB = styled.i`
  width: 30px;
  height: 20px;
  border-radius: 4px;
  background: ${(p) => p.theme.color.purple};
  margin-left: -12px;
  mix-blend-mode: screen;
`;
const PayInfo = styled.div`
  flex: 1;
`;
const PayName = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #fff;
`;
const PaySub = styled.div`
  font-size: 12px;
  color: ${(p) => p.theme.color.fg3};
`;
const DefaultPill = styled.span`
  font-size: 11px;
  font-weight: 700;
  color: ${(p) => p.theme.color.success};
  padding: 5px 10px;
  border-radius: ${(p) => p.theme.radius.btn};
  background: rgba(46, 204, 113, 0.12);
`;
const TonBadge = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 24px;
  border-radius: 5px;
  background: rgba(128, 234, 255, 0.14);
  font-family: ${(p) => p.theme.font.mono};
  font-size: 11px;
  color: ${(p) => p.theme.color.cyan};
  flex: none;
`;
const SettingRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-radius: ${(p) => p.theme.radius.card};
  background: ${(p) => p.theme.color.surface};
  border: 1px solid ${(p) => p.theme.line.l10};
`;
const SettingLabel = styled.span<{ $muted?: boolean }>`
  font-size: 14px;
  color: ${(p) => (p.$muted ? p.theme.color.fg3 : '#fff')};
`;

/** Account — profile, upcoming tickets, payment methods, settings. */
export function AccountView() {
  const { t, lang } = useI18n();
  const { tierName } = useBooking();
  const { profile, tickets } = useAccount();
  const navigate = useNavigate();

  const concerts = useLocalizedConcerts();
  const byId = useMemo(() => new Map(concerts.map((c) => [c.id, c])), [concerts]);

  const name = profile?.name[lang] ?? t.userName;
  const meta = profile ? `${profile.email} · ${profile.city[lang]}` : t.userMeta;
  const initials = profile?.initials ?? t.initials;

  return (
    <Main>
      <Profile>
        <ProfileGlow aria-hidden="true" />
        <ProfileRow>
          <AvatarRing>
            <Avatar>{initials}</Avatar>
          </AvatarRing>
          <ProfileInfo>
            <NameRow>
              <Name>{name}</Name>
              <TierBadge>★ {t.neonTier}</TierBadge>
            </NameRow>
            <Meta>{meta}</Meta>
          </ProfileInfo>
          <FindBtn variant="gradientCP" onClick={() => navigate('/')}>
            {t.findShows}
          </FindBtn>
        </ProfileRow>
        <Stats>
          {STATS.map((s) => (
            <Stat key={s.field}>
              <StatValue $accent={s.accent}>{profile ? profile.stats[s.field] : '—'}</StatValue>
              <StatLabel>{t[s.label]}</StatLabel>
            </Stat>
          ))}
        </Stats>
      </Profile>

      <H2>{t.myTickets}</H2>
      <Tickets>
        {tickets.map(({ orderId, concertId, tierId }) => {
          const c = byId.get(concertId);
          if (!c) return null;
          return (
            <TicketRow
              key={orderId}
              role="button"
              tabIndex={0}
              onClick={() => navigate(`/concert/${concertId}`)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  navigate(`/concert/${concertId}`);
                }
              }}
            >
              <TicketArt style={{ background: c.art }} />
              <TicketInfo>
                <TicketArtist>{c.artist}</TicketArtist>
                <TicketMeta>
                  {c.dateLong} · {c.venue}, {c.city}
                </TicketMeta>
              </TicketInfo>
              <TicketTier>{tierName(tierId)}</TicketTier>
              <Chevron size={20} strokeWidth={2} />
            </TicketRow>
          );
        })}
      </Tickets>

      <Cols>
        <Col>
          <H2>{t.payMethods}</H2>
          <List>
            <PayRow>
              <Mir aria-hidden="true">
                <MirA />
                <MirB />
              </Mir>
              <PayInfo>
                <PayName>{t.cardLabel}</PayName>
                <PaySub>{t.cardExpires}</PaySub>
              </PayInfo>
              <DefaultPill>{t.cardDefault}</DefaultPill>
            </PayRow>
            <PayRow>
              <TonBadge>TON</TonBadge>
              <PayInfo>
                <PayName>pulse.ton</PayName>
                <PaySub>{t.walletConnected}</PaySub>
              </PayInfo>
            </PayRow>
          </List>
        </Col>

        <Col>
          <H2>{t.settings}</H2>
          <List>
            <SettingRow>
              <SettingLabel>{t.setAlerts}</SettingLabel>
              <Toggle defaultOn label={t.setAlerts} />
            </SettingRow>
            <SettingRow>
              <SettingLabel>{t.setPresale}</SettingLabel>
              <Toggle defaultOn label={t.setPresale} />
            </SettingRow>
            <SettingRow>
              <SettingLabel $muted>{t.setMarketing}</SettingLabel>
              <Toggle label={t.setMarketing} />
            </SettingRow>
          </List>
        </Col>
      </Cols>
    </Main>
  );
}
