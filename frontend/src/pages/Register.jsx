import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';

export default function Register() {
  const { registerVendor } = useAuth();
  const [business_name, setBusinessName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null); setSuccess(null);
    try {
      await registerVendor({ business_name, email, password, phone });
      setSuccess('Registered successfully. Please login.');
      setTimeout(() => navigate('/login'), 1000);
    } catch (err) {
      setError(err?.response?.data?.message || err.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12">
      <div className="page-container max-w-md">
        <div className="card p-6">
          <h2 className="text-xl font-semibold mb-2">Create vendor account</h2>
          <p className="text-sm text-gray-500 mb-4">Setup your store and start listing products</p>
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="block text-sm mb-1 text-gray-600">Business Name</label>
              <input value={business_name} onChange={(e)=>setBusinessName(e.target.value)} className="input" />
            </div>
            <div>
              <label className="block text-sm mb-1 text-gray-600">Email</label>
              <input value={email} onChange={(e)=>setEmail(e.target.value)} className="input" type="email" />
            </div>
            <div>
              <label className="block text-sm mb-1 text-gray-600">Password</label>
              <input value={password} onChange={(e)=>setPassword(e.target.value)} className="input" type="password" />
            </div>
            <div>
              <label className="block text-sm mb-1 text-gray-600">Phone</label>
              <input value={phone} onChange={(e)=>setPhone(e.target.value)} className="input" />
            </div>
            {error && <div className="text-red-600 text-sm">{error}</div>}
            {success && <div className="text-green-600 text-sm">{success}</div>}
            <button type="submit" className="w-full btn-primary">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
}
