import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '@shared/i18n';
import { Toggle } from '@shared/ui';
import { useLocalizedConcerts } from '@features/catalog';
import { useBooking } from '@features/booking';
import { useAccount } from '../../hooks/useAccount';
import * as S from './AccountView.styles';

const STATS = [
  { field: 'shows', label: 'statShows', accent: 'cyan' },
  { field: 'cities', label: 'statCities', accent: 'purple' },
  { field: 'hours', label: 'statHours', accent: 'magenta' },
] as const;

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
    <S.Main>
      <S.Profile>
        <S.ProfileGlow aria-hidden="true" />
        <S.ProfileRow>
          <S.AvatarRing>
            <S.Avatar>{initials}</S.Avatar>
          </S.AvatarRing>
          <S.ProfileInfo>
            <S.NameRow>
              <S.Name>{name}</S.Name>
              <S.TierBadge>★ {t.neonTier}</S.TierBadge>
            </S.NameRow>
            <S.Meta>{meta}</S.Meta>
          </S.ProfileInfo>
          <S.FindBtn variant="gradientCP" onClick={() => navigate('/')}>
            {t.findShows}
          </S.FindBtn>
        </S.ProfileRow>
        <S.Stats>
          {STATS.map((s) => (
            <S.Stat key={s.field}>
              <S.StatValue $accent={s.accent}>{profile ? profile.stats[s.field] : '—'}</S.StatValue>
              <S.StatLabel>{t[s.label]}</S.StatLabel>
            </S.Stat>
          ))}
        </S.Stats>
      </S.Profile>

      <S.H2>{t.myTickets}</S.H2>
      <S.Tickets>
        {tickets.map(({ orderId, concertId, tierId }) => {
          const c = byId.get(concertId);
          if (!c) return null;
          return (
            <S.TicketRow
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
              <S.TicketArt style={{ background: c.art }} />
              <S.TicketInfo>
                <S.TicketArtist>{c.artist}</S.TicketArtist>
                <S.TicketMeta>
                  {c.dateLong} · {c.venue}, {c.city}
                </S.TicketMeta>
              </S.TicketInfo>
              <S.TicketTier>{tierName(tierId)}</S.TicketTier>
              <S.Chevron size={20} strokeWidth={2} />
            </S.TicketRow>
          );
        })}
      </S.Tickets>

      <S.Cols>
        <S.Col>
          <S.H2>{t.payMethods}</S.H2>
          <S.List>
            <S.PayRow>
              <S.Mir aria-hidden="true">
                <S.MirA />
                <S.MirB />
              </S.Mir>
              <S.PayInfo>
                <S.PayName>{t.cardLabel}</S.PayName>
                <S.PaySub>{t.cardExpires}</S.PaySub>
              </S.PayInfo>
              <S.DefaultPill>{t.cardDefault}</S.DefaultPill>
            </S.PayRow>
            <S.PayRow>
              <S.TonBadge>TON</S.TonBadge>
              <S.PayInfo>
                <S.PayName>pulse.ton</S.PayName>
                <S.PaySub>{t.walletConnected}</S.PaySub>
              </S.PayInfo>
            </S.PayRow>
          </S.List>
        </S.Col>

        <S.Col>
          <S.H2>{t.settings}</S.H2>
          <S.List>
            <S.SettingRow>
              <S.SettingLabel>{t.setAlerts}</S.SettingLabel>
              <Toggle defaultOn label={t.setAlerts} />
            </S.SettingRow>
            <S.SettingRow>
              <S.SettingLabel>{t.setPresale}</S.SettingLabel>
              <Toggle defaultOn label={t.setPresale} />
            </S.SettingRow>
            <S.SettingRow>
              <S.SettingLabel $muted>{t.setMarketing}</S.SettingLabel>
              <Toggle label={t.setMarketing} />
            </S.SettingRow>
          </S.List>
        </S.Col>
      </S.Cols>
    </S.Main>
  );
}
