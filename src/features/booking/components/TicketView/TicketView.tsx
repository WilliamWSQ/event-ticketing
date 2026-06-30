import { useNavigate } from 'react-router-dom';
import { useI18n } from '@shared/i18n';
import { Button, QRCode } from '@shared/ui';
import type { LocalizedConcert } from '@shared/types';
import { useBooking } from '../../state/BookingProvider';
import * as S from './TicketView.styles';

/** Confirmation — animated success ring and the purchased ticket stub. */
export function TicketView({ concert: sel }: { concert: LocalizedConcert }) {
  const { t } = useI18n();
  const { selectedTier, qty, orderId } = useBooking();
  const navigate = useNavigate();

  return (
    <S.Main>
      <S.SuccessRing>
        <S.RingCyan aria-hidden="true" />
        <S.RingMagenta aria-hidden="true" />
        <S.SuccessCheck size={40} strokeWidth={3} />
      </S.SuccessRing>
      <S.Title>{t.youreIn}</S.Title>
      <S.Subtext>{t.ticketLive}</S.Subtext>

      <S.Stub>
        <S.Shimmer aria-hidden="true" />

        <S.StubHeader style={{ background: sel.art }}>
          <S.StubHeaderScrim aria-hidden="true" />
          <S.StubHeaderText>
            <S.Admit>
              {t.admit} {qty}
            </S.Admit>
            <S.StubArtist>{sel.artist}</S.StubArtist>
          </S.StubHeaderText>
        </S.StubHeader>

        <S.Perf>
          <S.Notch $side="left" />
          <S.Notch $side="right" />
        </S.Perf>

        <S.StubBody>
          <S.DetailsGrid>
            <div>
              <S.DetailLabel>{t.date}</S.DetailLabel>
              <S.DetailValue>{sel.dateLong}</S.DetailValue>
            </div>
            <div>
              <S.DetailLabel>{t.doors}</S.DetailLabel>
              <S.DetailValue>{sel.time}</S.DetailValue>
            </div>
            <div>
              <S.DetailLabel>{t.venue}</S.DetailLabel>
              <S.DetailValue>{sel.venue}</S.DetailValue>
            </div>
            <div>
              <S.DetailLabel>{t.zone}</S.DetailLabel>
              <S.DetailZone>{selectedTier.name}</S.DetailZone>
            </div>
            <S.DetailWide>
              <S.DetailLabel>{t.order}</S.DetailLabel>
              <S.DetailOrder>{orderId}</S.DetailOrder>
            </S.DetailWide>
          </S.DetailsGrid>

          <S.QrCol>
            <S.Qr>
              <QRCode seed={orderId} />
            </S.Qr>
            <S.Scan>{t.scanGate}</S.Scan>
          </S.QrCol>
        </S.StubBody>
      </S.Stub>

      <S.Actions>
        <Button variant="gradientCP" onClick={() => navigate('/account')}>
          {t.viewAccount}
        </Button>
        <Button variant="ghost" onClick={() => navigate('/')}>
          {t.moreShows}
        </Button>
      </S.Actions>
    </S.Main>
  );
}
