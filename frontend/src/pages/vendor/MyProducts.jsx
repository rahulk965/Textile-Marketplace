import { useEffect, useState } from 'react';
import Header from '../../components/common/Header.jsx';
import { useProducts } from '../../hooks/useProducts.js';

export default function MyProducts() {
  const { getMyProducts } = useProducts();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyProducts().then((data)=>{ setItems(data); }).finally(()=>setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="My Products" />
      <div className="p-6 max-w-4xl mx-auto">
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
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
