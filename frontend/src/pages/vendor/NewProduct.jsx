import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/common/Header.jsx';
import { useProducts } from '../../hooks/useProducts.js';
import { useVendors } from '../../hooks/useVendors.js';

export default function NewProduct() {
  const { createProduct } = useProducts();
  const { listCategories } = useVendors();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category_id, setCategoryId] = useState('');
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    listCategories().then(setCategories).catch(()=>{});
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null); setSuccess(null);
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('category_id', category_id);
      for (const file of images) formData.append('images', file);
      const res = await createProduct(formData);
      setSuccess('Product created');
      setTimeout(() => navigate('/vendor/products'), 800);
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to create product');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Create Product" />
      <div className="page-container p-6">
        <form onSubmit={onSubmit} className="card p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm mb-1 text-gray-600">Title</label>
            <input value={title} onChange={(e)=>setTitle(e.target.value)} className="input" />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm mb-1 text-gray-600">Description</label>
            <textarea value={description} onChange={(e)=>setDescription(e.target.value)} className="input h-28" rows={4} />
          </div>

          <div>
            <label className="block text-sm mb-1 text-gray-600">Price</label>
            <input value={price} onChange={(e)=>setPrice(e.target.value)} className="input" type="number" step="0.01" />
          </div>

          <div>
            <label className="block text-sm mb-1 text-gray-600">Category</label>
            <select value={category_id} onChange={(e)=>setCategoryId(e.target.value)} className="input">
              <option value="">Select category</option>
              {categories.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm mb-1 text-gray-600">Images</label>
            <input type="file" multiple accept="image/*" onChange={(e)=>setImages(Array.from(e.target.files))} />
          </div>

          <div className="md:col-span-2 flex items-center justify-between gap-4">
            <div>
              {error && <div className="text-red-600 text-sm">{error}</div>}
              {success && <div className="text-green-600 text-sm">{success}</div>}
            </div>
            <button type="submit" className="btn-primary">Create Product</button>
          </div>
        </form>
      </div>
    </div>
  );
}
