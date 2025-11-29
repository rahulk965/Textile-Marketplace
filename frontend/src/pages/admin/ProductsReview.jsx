import { useEffect, useState } from 'react';
import Header from '../../components/common/Header.jsx';
import { useProducts } from '../../hooks/useProducts.js';

export default function ProductsReview() {
  const { getAdminProducts, updateProductStatus } = useProducts();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('pending');

  useEffect(() => {
    setLoading(true);
    getAdminProducts({ status: filter }).then(setItems).finally(()=>setLoading(false));
  }, [filter]);

  const changeStatus = async (id, status) => {
    await updateProductStatus(id, status);
    setItems(prev => prev.map(p => p.id === id ? { ...p, status } : p));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Review Products" />
      <div className="p-6 max-w-5xl mx-auto">
        <div className="mb-4">
          <select value={filter} onChange={(e)=>setFilter(e.target.value)} className="border rounded p-2">
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {items.map(p => (
              <div key={p.id} className="bg-white border rounded shadow p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{p.title}</h3>
                  <span className="text-sm px-2 py-1 rounded bg-gray-200">{p.status}</span>
                </div>
                <p className="text-sm text-gray-600">{p.description}</p>
                <div className="mt-2 text-sm">Price: ${p.price}</div>
                {p.images?.length ? (
                  <div className="mt-3 grid grid-cols-4 gap-2">
                    {p.images.map(img => (
                      <img key={img.id} src={img.image_url} alt="" className="w-full h-20 object-cover rounded" />
                    ))}
                  </div>
                ) : null}
                <div className="mt-4 flex gap-2">
                  <button onClick={()=>changeStatus(p.id,'approved')} className="px-3 py-1 bg-green-600 text-white rounded">Approve</button>
                  <button onClick={()=>changeStatus(p.id,'rejected')} className="px-3 py-1 bg-red-600 text-white rounded">Reject</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
