import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';

export default function Login() {
  const [mode, setMode] = useState('vendor');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { loginVendor, loginAdmin } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      if (mode === 'vendor') {
        await loginVendor(email, password);
        navigate('/vendor');
      } else {
        await loginAdmin(username, password);
        navigate('/admin');
      }
    } catch (err) {
      setError(err?.response?.data?.message || err.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12">
      <div className="page-container max-w-md">
        <div className="card p-6">
          <div className="text-center mb-4">
            <div className="text-2xl font-bold text-gray-800">Welcome back</div>
            <div className="text-sm text-gray-500">Sign in to continue to VenderMart</div>
          </div>
          <div className="flex gap-2 mb-4">
            <button onClick={() => setMode('vendor')} className={`flex-1 py-2 ${mode==='vendor'?'btn-primary':'bg-gray-100 text-gray-700 rounded-lg'}`}>Vendor</button>
            <button onClick={() => setMode('admin')} className={`flex-1 py-2 ${mode==='admin'?'btn-primary':'bg-gray-100 text-gray-700 rounded-lg'}`}>Admin</button>
          </div>
          <form onSubmit={onSubmit} className="space-y-4">
            {mode === 'admin' ? (
              <div>
                <label className="block text-sm mb-1 text-gray-600">Username</label>
                <input value={username} onChange={(e)=>setUsername(e.target.value)} className="input" placeholder="admin" />
              </div>
            ) : (
              <div>
                <label className="block text-sm mb-1 text-gray-600">Email</label>
                <input value={email} onChange={(e)=>setEmail(e.target.value)} className="input" type="email" placeholder="vendor@email.com" />
              </div>
            )}
            <div>
              <label className="block text-sm mb-1 text-gray-600">Password</label>
              <input value={password} onChange={(e)=>setPassword(e.target.value)} className="input" type="password" placeholder="••••••••" />
            </div>
            {error && <div className="text-red-600 text-sm">{error}</div>}
            <button type="submit" className="w-full btn-primary">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}
