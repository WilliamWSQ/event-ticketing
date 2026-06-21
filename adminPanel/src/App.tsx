import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Concerts } from './pages/Concerts';
import { ConcertForm } from './pages/ConcertForm';
import { Orders } from './pages/Orders';
import { Users } from './pages/Users';
import { Tiers } from './pages/Tiers';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/concerts" element={<Concerts />} />
        <Route path="/concerts/new" element={<ConcertForm />} />
        <Route path="/concerts/:id" element={<ConcertForm />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/users" element={<Users />} />
        <Route path="/tiers" element={<Tiers />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
