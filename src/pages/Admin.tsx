import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { Product, Order } from '../types';
import { MOCK_PRODUCTS } from '../constants';
import { formatPrice, cn } from '../lib/utils';
import { Plus, Edit2, Trash2, Package, ShoppingBag, Users, DollarSign, ChevronRight, X, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'motion/react';

export default function Admin() {
  const { profile, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    category: 'Điện thoại',
    stock: 0,
    description: '',
    image: '',
    brand: '',
    isFlashSale: false,
    discountPrice: 0,
  });

  useEffect(() => {
    if (!authLoading && (!profile || profile.role !== 'admin')) {
      navigate('/');
      return;
    }

    const fetchData = async () => {
      try {
        const [productsSnap, ordersSnap] = await Promise.all([
          getDocs(query(collection(db, 'products'), orderBy('createdAt', 'desc'))),
          getDocs(query(collection(db, 'orders'), orderBy('createdAt', 'desc')))
        ]);

        setProducts(productsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product)));
        setOrders(ordersSnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Order)));
      } catch (error) {
        console.error('Error fetching admin data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (profile?.role === 'admin') {
      fetchData();
    }
  }, [profile, authLoading, navigate]);

  const handleSeedData = async () => {
    if (!window.confirm('Bạn có muốn nạp dữ liệu mẫu vào hệ thống? Thao tác này sẽ thêm 12 sản phẩm mới.')) return;
    
    const SEED_PRODUCTS = MOCK_PRODUCTS;

    setLoading(true);
    try {
      const promises = SEED_PRODUCTS.map(product => 
        addDoc(collection(db, 'products'), {
          ...product,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        })
      );
      await Promise.all(promises);
      toast.success('Đã nạp dữ liệu mẫu thành công!');
      
      // Refresh products list
      const productsSnap = await getDocs(query(collection(db, 'products'), orderBy('createdAt', 'desc')));
      setProducts(productsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product)));
    } catch (error) {
      console.error('Error seeding data:', error);
      toast.error('Lỗi khi nạp dữ liệu mẫu');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        await updateDoc(doc(db, 'products', editingProduct.id), {
          ...formData,
          updatedAt: serverTimestamp(),
        });
        toast.success('Đã cập nhật sản phẩm');
      } else {
        await addDoc(collection(db, 'products'), {
          ...formData,
          createdAt: serverTimestamp(),
        });
        toast.success('Đã thêm sản phẩm mới');
      }
      setIsModalOpen(false);
      setEditingProduct(null);
      // Refresh data
      const productsSnap = await getDocs(query(collection(db, 'products'), orderBy('createdAt', 'desc')));
      setProducts(productsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product)));
    } catch (error) {
      console.error('Error saving product:', error);
      toast.error('Có lỗi xảy ra');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) return;
    try {
      await deleteDoc(doc(db, 'products', id));
      setProducts(prev => prev.filter(p => p.id !== id));
      toast.success('Đã xóa sản phẩm');
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Có lỗi xảy ra');
    }
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      category: product.category,
      stock: product.stock,
      description: product.description || '',
      image: product.image || '',
      brand: product.brand || '',
      isFlashSale: product.isFlashSale || false,
      discountPrice: product.discountPrice || 0,
    });
    setIsModalOpen(true);
  };

  if (authLoading || loading) return <div className="p-8 text-center">Đang tải...</div>;

  const totalRevenue = orders.reduce((acc, o) => acc + o.total, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 uppercase tracking-tight">Quản trị hệ thống</h1>
        <div className="flex gap-4">
          <button
            onClick={handleSeedData}
            className="bg-gray-800 text-white px-6 py-2 rounded-sm font-bold hover:bg-gray-900 transition-colors shadow-lg flex items-center gap-2"
          >
            NẠP DỮ LIỆU MẪU
          </button>
          <button
            onClick={() => {
              setEditingProduct(null);
              setFormData({
                name: '',
                price: 0,
                category: 'Điện thoại',
                stock: 0,
                description: '',
                image: '',
                brand: '',
                isFlashSale: false,
                discountPrice: 0,
              });
              setIsModalOpen(true);
            }}
            className="bg-orange-600 text-white px-6 py-2 rounded-sm font-bold hover:bg-orange-700 transition-colors shadow-lg flex items-center gap-2"
          >
            <Plus size={20} /> THÊM SẢN PHẨM
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-sm shadow-sm border-l-4 border-blue-500 flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-500 rounded-full"><ShoppingBag size={24} /></div>
          <div>
            <p className="text-xs text-gray-500 uppercase font-bold">Tổng đơn hàng</p>
            <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-sm shadow-sm border-l-4 border-green-500 flex items-center gap-4">
          <div className="p-3 bg-green-50 text-green-500 rounded-full"><DollarSign size={24} /></div>
          <div>
            <p className="text-xs text-gray-500 uppercase font-bold">Doanh thu</p>
            <p className="text-2xl font-bold text-gray-900">{formatPrice(totalRevenue)}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-sm shadow-sm border-l-4 border-orange-500 flex items-center gap-4">
          <div className="p-3 bg-orange-50 text-orange-500 rounded-full"><Package size={24} /></div>
          <div>
            <p className="text-xs text-gray-500 uppercase font-bold">Sản phẩm</p>
            <p className="text-2xl font-bold text-gray-900">{products.length}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-sm shadow-sm border-l-4 border-purple-500 flex items-center gap-4">
          <div className="p-3 bg-purple-50 text-purple-500 rounded-full"><Users size={24} /></div>
          <div>
            <p className="text-xs text-gray-500 uppercase font-bold">Khách hàng</p>
            <p className="text-2xl font-bold text-gray-900">1.2k</p>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-sm shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900 uppercase">Danh sách sản phẩm</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500 uppercase text-xs font-bold">
              <tr>
                <th className="px-6 py-4">Sản phẩm</th>
                <th className="px-6 py-4">Danh mục</th>
                <th className="px-6 py-4">Giá</th>
                <th className="px-6 py-4">Kho</th>
                <th className="px-6 py-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 flex items-center gap-3">
                    <img src={product.image || 'https://picsum.photos/seed/electronics/100/100'} alt="" className="w-10 h-10 rounded-sm object-cover border border-gray-100" referrerPolicy="no-referrer" />
                    <span className="font-medium text-gray-900 line-clamp-1">{product.name}</span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{product.category}</td>
                  <td className="px-6 py-4 font-bold text-orange-600">{formatPrice(product.price)}</td>
                  <td className="px-6 py-4 text-gray-600">{product.stock}</td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button onClick={() => openEditModal(product)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"><Edit2 size={16} /></button>
                    <button onClick={() => handleDelete(product.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"><Trash2 size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Product Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white w-full max-w-2xl rounded-sm shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-orange-600 text-white">
                <h3 className="text-lg font-bold uppercase">{editingProduct ? 'Cập nhật sản phẩm' : 'Thêm sản phẩm mới'}</h3>
                <button onClick={() => setIsModalOpen(false)} className="hover:rotate-90 transition-transform"><X size={24} /></button>
              </div>
              <form onSubmit={handleSubmit} className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6 max-h-[70vh] overflow-y-auto">
                <div className="sm:col-span-2 space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase">Tên sản phẩm</label>
                  <input
                    required
                    type="text"
                    className="w-full border border-gray-200 rounded-sm p-3 focus:ring-2 focus:ring-orange-300 outline-none"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase">Giá gốc (₫)</label>
                  <input
                    required
                    type="number"
                    className="w-full border border-gray-200 rounded-sm p-3 focus:ring-2 focus:ring-orange-300 outline-none"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase">Giá khuyến mãi (₫)</label>
                  <input
                    type="number"
                    className="w-full border border-gray-200 rounded-sm p-3 focus:ring-2 focus:ring-orange-300 outline-none"
                    value={formData.discountPrice}
                    onChange={(e) => setFormData({ ...formData, discountPrice: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase">Danh mục</label>
                  <select
                    className="w-full border border-gray-200 rounded-sm p-3 focus:ring-2 focus:ring-orange-300 outline-none"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    {['Điện thoại', 'Laptop', 'Phụ kiện', 'Đồng hồ', 'Máy ảnh', 'Gaming'].map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase">Số lượng kho</label>
                  <input
                    required
                    type="number"
                    className="w-full border border-gray-200 rounded-sm p-3 focus:ring-2 focus:ring-orange-300 outline-none"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div className="sm:col-span-2 space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase">Link ảnh sản phẩm</label>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      className="flex-grow border border-gray-200 rounded-sm p-3 focus:ring-2 focus:ring-orange-300 outline-none"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      placeholder="https://example.com/image.jpg"
                    />
                    <div className="w-12 h-12 bg-gray-100 rounded-sm flex items-center justify-center text-gray-400 border border-gray-200 overflow-hidden">
                      {formData.image ? <img src={formData.image} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" /> : <ImageIcon size={20} />}
                    </div>
                  </div>
                </div>
                <div className="sm:col-span-2 space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase">Mô tả sản phẩm</label>
                  <textarea
                    className="w-full border border-gray-200 rounded-sm p-3 focus:ring-2 focus:ring-orange-300 outline-none min-h-[100px]"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>
                <div className="sm:col-span-2 flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="flashsale"
                    className="text-orange-600 focus:ring-orange-500"
                    checked={formData.isFlashSale}
                    onChange={(e) => setFormData({ ...formData, isFlashSale: e.target.checked })}
                  />
                  <label htmlFor="flashsale" className="text-sm font-bold text-gray-700">Sản phẩm Flash Sale</label>
                </div>
                <div className="sm:col-span-2 pt-4">
                  <button
                    type="submit"
                    className="w-full bg-orange-600 text-white py-4 rounded-sm font-bold hover:bg-orange-700 transition-colors shadow-lg"
                  >
                    {editingProduct ? 'CẬP NHẬT SẢN PHẨM' : 'THÊM SẢN PHẨM'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
