import { Navigate, Route, Routes } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Dashboard from './pages/admin/Dashboard';
import AdminProducts from './pages/admin/Products';
export default function App(){return <Routes><Route element={<PublicLayout/>}><Route index element={<Home/>}/><Route path="produtos/:id" element={<ProductDetails/>}/><Route path="carrinho" element={<Cart/>}/><Route path="login" element={<Login/>}/><Route element={<ProtectedRoute/>}><Route path="admin" element={<AdminLayout/>}><Route index element={<Dashboard/>}/><Route path="produtos" element={<AdminProducts/>}/></Route></Route><Route path="*" element={<Navigate to="/" replace/>}/></Route></Routes>}
