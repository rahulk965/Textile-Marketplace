import { useEffect, useState } from 'react';
import Header from '../../components/common/Header.jsx';
import { useVendors } from '../../hooks/useVendors.js';

export default function CategoriesManage() {
  const { listCategories, createCategory } = useVendors();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    listCategories().then(setItems).finally(()=>setLoading(false));
  }, []);

  const onCreate = async (e) => {
    e.preventDefault();
    const cat = await createCategory(name, description);
    setItems(prev => [cat, ...prev]);
    setName(''); setDescription('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Manage Categories" />
      <div className="p-6 max-w-3xl mx-auto space-y-6">
        <form onSubmit={onCreate} className="bg-white p-4 rounded shadow flex gap-2">
          <input value={name} onChange={(e)=>setName(e.target.value)} placeholder="Name" className="border rounded p-2 flex-1" />
          <input value={description} onChange={(e)=>setDescription(e.target.value)} placeholder="Description" className="border rounded p-2 flex-1" />
          <button className="px-3 py-2 bg-blue-600 text-white rounded">Create</button>
        </form>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {items.map(c => (
              <div key={c.id} className="bg-white border rounded shadow p-4">
                <div className="font-semibold">{c.name}</div>
                <div className="text-sm text-gray-600">{c.description}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
