import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="max-w-xl w-full space-y-6 text-center">
        <h1 className="text-3xl font-bold">Textile Marketplace</h1>
        <p className="text-gray-600">Welcome! Please login or register to continue.</p>
        <div className="flex items-center justify-center gap-3">
          <Link to="/login" className="px-4 py-2 bg-blue-600 text-white rounded">Login</Link>
          <Link to="/register" className="px-4 py-2 bg-gray-800 text-white rounded">Register</Link>
        </div>
      </div>
    </div>
  );
}
