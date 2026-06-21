import { Navigate, Route, Routes } from 'react-router-dom';
import { I18nProvider } from '@shared/i18n';
import { CatalogProvider } from '@features/catalog';
import { BookingProvider } from '@features/booking';
import { DiscoverPage } from '@pages/DiscoverPage';
import { ConcertPage } from '@pages/ConcertPage';
import { SeatsPage } from '@pages/SeatsPage';
import { CheckoutPage } from '@pages/CheckoutPage';
import { TicketPage } from '@pages/TicketPage';
import { AccountPage } from '@pages/AccountPage';
import { Layout } from './Layout';

/**
 * Providers compose outermost-first: i18n (no deps) → catalog (concerts) →
 * booking (tiers + order). Catalog/booking boot-gate on their data, so pages
 * render only once the catalogue is ready.
 */
export default function App() {
  return (
    <I18nProvider>
      <CatalogProvider>
        <BookingProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<DiscoverPage />} />
              <Route path="/concert/:id" element={<ConcertPage />} />
              <Route path="/concert/:id/seats" element={<SeatsPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/ticket" element={<TicketPage />} />
              <Route path="/account" element={<AccountPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </BookingProvider>
      </CatalogProvider>
    </I18nProvider>
  );
}
