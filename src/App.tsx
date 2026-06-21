import { Navigate, Route, Routes } from 'react-router-dom';
import { BookingProvider } from './context/BookingContext';
import { Layout } from './components/layout/Layout';
import { Home } from './screens/Home';
import { Details } from './screens/Details';
import { Seats } from './screens/Seats';
import { Checkout } from './screens/Checkout';
import { Ticket } from './screens/Ticket';
import { Account } from './screens/Account';

/**
 * Routes mirror the booking flow:
 *   /                      discover (home)
 *   /concert/:id           concert details
 *   /concert/:id/seats     pick zone & quantity
 *   /checkout              payment
 *   /ticket                confirmation
 *   /account               profile
 *
 * Shared booking state (language, tier, qty, payment, order id) lives in
 * <BookingProvider> so it persists across the flow.
 */
export default function App() {
  return (
    <BookingProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/concert/:id" element={<Details />} />
          <Route path="/concert/:id/seats" element={<Seats />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/ticket" element={<Ticket />} />
          <Route path="/account" element={<Account />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BookingProvider>
  );
}
