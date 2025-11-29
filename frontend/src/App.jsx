import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/common/ProtectedRoute.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import VendorDashboard from './pages/vendor/Dashboard.jsx';
import MyProducts from './pages/vendor/MyProducts.jsx';
import NewProduct from './pages/vendor/NewProduct.jsx';
import Profile from './pages/vendor/Profile.jsx';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import ProductsReview from './pages/admin/ProductsReview.jsx';
import VendorsManage from './pages/admin/VendorsManage.jsx';
import CategoriesManage from './pages/admin/CategoriesManage.jsx';

// Routes are protected using the shared ProtectedRoute component

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<ProtectedRoute role="vendor" />}> 
        <Route path="/vendor" element={<VendorDashboard />} />
        <Route path="/vendor/products" element={<MyProducts />} />
        <Route path="/vendor/products/new" element={<NewProduct />} />
        <Route path="/vendor/profile" element={<Profile />} />
      </Route>

      <Route element={<ProtectedRoute role="admin" />}> 
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/products" element={<ProductsReview />} />
        <Route path="/admin/vendors" element={<VendorsManage />} />
        <Route path="/admin/categories" element={<CategoriesManage />} />
      </Route>
    </Routes>
  );
}
