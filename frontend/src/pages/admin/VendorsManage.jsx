import { useEffect, useState } from 'react';
import Header from '../../components/common/Header.jsx';
import { useVendors } from '../../hooks/useVendors.js';

export default function VendorsManage() {
  const { listVendors, updateVendorStatus } = useVendors();
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listVendors().then(setVendors).finally(()=>setLoading(false));
  }, []);

  const changeStatus = async (id, status) => {
    await updateVendorStatus(id, status);
    setVendors(prev => prev.map(v => v.id === id ? { ...v, status } : v));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Manage Vendors" />
      <div className="page-container p-6">
        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {vendors.map(v => (
              <div key={v.id} className="card p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <div className="font-semibold text-gray-800">{v.business_name}</div>
                  <div className="text-sm text-gray-500">{v.email}</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-sm px-3 py-1 rounded-full ${v.status==='active'?'bg-green-100 text-green-700':'bg-yellow-100 text-yellow-700'}`}>{v.status}</span>
                  <button onClick={()=>changeStatus(v.id,'approved')} className="px-3 py-1 bg-green-600 text-white rounded transition hover:opacity-90">Approve</button>
                  <button onClick={()=>changeStatus(v.id,'rejected')} className="px-3 py-1 bg-red-600 text-white rounded transition hover:opacity-90">Reject</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
