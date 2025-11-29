import { useEffect, useState } from 'react';
import Header from '../../components/common/Header.jsx';
import api from '../../utils/api.js';

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [business_name, setBusinessName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState(null);

  useEffect(() => {
    api.get('/vendors/me').then(({data})=>{
      setProfile(data);
      setBusinessName(data.business_name || '');
      setPhone(data.phone || '');
    });
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    try {
      const { data } = await api.put('/vendors/me', { business_name, phone });
      setMessage('Profile updated');
      setProfile(data);
    } catch (err) {
      setMessage(err?.response?.data?.message || 'Update failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="My Profile" />
      <div className="p-6 max-w-2xl mx-auto">
        {!profile ? (
          <div>Loading...</div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-4 bg-white p-6 rounded shadow">
            <div>
              <label className="block text-sm mb-1">Business Name</label>
              <input value={business_name} onChange={(e)=>setBusinessName(e.target.value)} className="w-full border rounded p-2" />
            </div>
            <div>
              <label className="block text-sm mb-1">Phone</label>
              <input value={phone} onChange={(e)=>setPhone(e.target.value)} className="w-full border rounded p-2" />
            </div>
            {message && <div className="text-sm">{message}</div>}
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
          </form>
        )}
      </div>
    </div>
  );
}
