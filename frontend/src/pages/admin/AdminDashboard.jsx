import { Link } from 'react-router-dom';
import Header from '../../components/common/Header.jsx';
import { useAuth } from '../../hooks/useAuth.js';

export default function AdminDashboard() {
  const { logout } = useAuth();
  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Admin Dashboard" right={<button onClick={logout} className="px-3 py-1 bg-gray-800 text-white rounded">Logout</button>} />
      <div className="p-6 space-y-4 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link to="/admin/products" className="p-4 bg-white rounded shadow hover:shadow-md border">Review Products</Link>
          <Link to="/admin/vendors" className="p-4 bg-white rounded shadow hover:shadow-md border">Manage Vendors</Link>
          <Link to="/admin/categories" className="p-4 bg-white rounded shadow hover:shadow-md border">Manage Categories</Link>
        </div>
      </div>
    </div>
  );
}
