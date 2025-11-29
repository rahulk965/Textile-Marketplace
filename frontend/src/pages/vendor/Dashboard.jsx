import { Link } from 'react-router-dom';
import Header from '../../components/common/Header.jsx';
import { useAuth } from '../../hooks/useAuth.js';

export default function VendorDashboard() {
  const { logout } = useAuth();
  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Vendor Dashboard" right={<button onClick={logout} className="px-3 py-1 bg-gray-800 text-white rounded">Logout</button>} />
      <div className="p-6 space-y-4 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link to="/vendor/products/new" className="p-4 bg-white rounded shadow hover:shadow-md border">Create Product</Link>
          <Link to="/vendor/products" className="p-4 bg-white rounded shadow hover:shadow-md border">My Products</Link>
          <Link to="/vendor/profile" className="p-4 bg-white rounded shadow hover:shadow-md border">My Profile</Link>
        </div>
      </div>
    </div>
  );
}
