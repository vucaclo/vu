import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, limit, where, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { Product, Category } from '../types';
import { MOCK_PRODUCTS } from '../constants';
import ProductCard from '../components/ProductCard';
import { motion } from 'motion/react';
import { ChevronRight, Zap, Laptop, Smartphone, Headphones, Watch, Camera, Gamepad2, Mail, Users, Gift, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

import { useAuth } from '../context/AuthContext';

const MOCK_CATEGORIES = [
  { id: '1', name: 'Điện thoại', icon: <Smartphone size={24} /> },
  { id: '2', name: 'Laptop', icon: <Laptop size={24} /> },
  { id: '3', name: 'Phụ kiện', icon: <Headphones size={24} /> },
  { id: '4', name: 'Đồng hồ', icon: <Watch size={24} /> },
  { id: '5', name: 'Máy ảnh', icon: <Camera size={24} /> },
  { id: '6', name: 'Gaming', icon: <Gamepad2 size={24} /> },
];

export default function Home() {
  const { profile, login } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast.success('Cảm ơn bạn đã đăng ký nhận tin!');
    setEmail('');
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const q = query(collection(db, 'products'), limit(12));
        const snapshot = await getDocs(q);
        const fetchedProducts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
        
        if (fetchedProducts.length === 0) {
          setProducts(MOCK_PRODUCTS);
        } else {
          setProducts(fetchedProducts);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts(MOCK_PRODUCTS);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      {/* Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[300px] sm:h-[400px]">
        <div className="lg:col-span-2 relative rounded-sm overflow-hidden group">
          <img
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80"
            alt="Main Banner"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent flex flex-col justify-center p-8 text-white">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-4xl sm:text-6xl font-bold mb-4 tracking-tighter uppercase italic">Kỷ Nguyên Công Nghệ</h2>
              <p className="text-lg mb-6 text-gray-200 max-w-md font-medium">Trải nghiệm những thiết bị điện tử tối tân nhất. Nâng tầm cuộc sống số của bạn ngay hôm nay.</p>
              <Link to="/search" className="bg-blue-600 text-white px-10 py-4 rounded-sm font-bold w-fit hover:bg-blue-700 transition-all shadow-2xl hover:shadow-blue-600/40 active:scale-95 uppercase tracking-widest">
                Khám phá ngay
              </Link>
            </motion.div>
          </div>
        </div>
        <div className="hidden lg:flex flex-col gap-4">
          <Link 
            to="/search?brand=Apple"
            className="flex-1 relative rounded-sm overflow-hidden group cursor-pointer"
          >
            <img 
              src="https://images.unsplash.com/photo-1491933382434-500287f9b54b?auto=format&fit=crop&w=600&q=80" 
              alt="Sub Banner 1" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
              referrerPolicy="no-referrer" 
            />
            <div className="absolute inset-0 bg-black/50 flex items-center p-6 text-white group-hover:bg-black/30 transition-colors">
              <h3 className="text-2xl font-bold uppercase tracking-tighter leading-tight">Apple Universe<br/><span className="text-blue-500 text-sm">Đẳng cấp & Tinh tế</span></h3>
            </div>
          </Link>
          <Link 
            to="/search?category=Gaming"
            className="flex-1 relative rounded-sm overflow-hidden group cursor-pointer"
          >
            <img 
              src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80" 
              alt="Sub Banner 2" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
              referrerPolicy="no-referrer" 
            />
            <div className="absolute inset-0 bg-black/50 flex items-center p-6 text-white group-hover:bg-black/30 transition-colors">
              <h3 className="text-2xl font-bold uppercase tracking-tighter leading-tight">Gaming Zone<br/><span className="text-blue-500 text-sm">Bứt phá mọi giới hạn</span></h3>
            </div>
          </Link>
        </div>
      </div>

      {/* Categories */}
      <section className="bg-white p-4 rounded-sm shadow-sm">
        <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Danh mục</h2>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
          {MOCK_CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              to={`/search?category=${cat.name}`}
              className="flex flex-col items-center gap-2 p-4 hover:bg-gray-50 transition-colors border border-gray-100 rounded-sm group"
            >
              <div className="text-blue-600 group-hover:scale-110 transition-transform">
                {cat.icon}
              </div>
              <span className="text-xs font-medium text-gray-700">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Flash Sale */}
      <section className="bg-white rounded-sm shadow-sm overflow-hidden">
        <div className="bg-blue-600 p-4 flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <Zap className="fill-white" size={24} />
            <h2 className="text-xl font-bold italic uppercase tracking-tighter">Flash Sale</h2>
            <div className="flex items-center gap-1 ml-4">
              <span className="bg-black text-white px-1.5 py-0.5 rounded text-sm font-bold">02</span>
              <span className="text-black font-bold">:</span>
              <span className="bg-black text-white px-1.5 py-0.5 rounded text-sm font-bold">45</span>
              <span className="text-black font-bold">:</span>
              <span className="bg-black text-white px-1.5 py-0.5 rounded text-sm font-bold">12</span>
            </div>
          </div>
          <Link to="/search?flashSale=true" className="text-sm font-medium hover:underline flex items-center gap-1">
            Xem tất cả <ChevronRight size={16} />
          </Link>
        </div>
        <div className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {products.filter(p => p.isFlashSale).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800 uppercase border-b-2 border-blue-600 pb-1">Gợi ý hôm nay</h2>
          <Link to="/search" className="text-blue-600 text-sm font-medium hover:underline">Xem thêm</Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6 py-8 border-t border-b border-gray-100">
        <div className="flex items-center gap-4 p-4">
          <div className="bg-blue-100 p-3 rounded-full text-blue-600">
            <ShieldCheck size={24} />
          </div>
          <div>
            <h3 className="font-bold text-sm">Chính hãng 100%</h3>
            <p className="text-xs text-gray-500">Cam kết chất lượng</p>
          </div>
        </div>
        <div className="flex items-center gap-4 p-4">
          <div className="bg-blue-100 p-3 rounded-full text-blue-600">
            <Gift size={24} />
          </div>
          <div>
            <h3 className="font-bold text-sm">Ưu đãi hấp dẫn</h3>
            <p className="text-xs text-gray-500">Quà tặng mỗi ngày</p>
          </div>
        </div>
        <div className="flex items-center gap-4 p-4">
          <div className="bg-blue-100 p-3 rounded-full text-blue-600">
            <Users size={24} />
          </div>
          <div>
            <h3 className="font-bold text-sm">Hỗ trợ 24/7</h3>
            <p className="text-xs text-gray-500">Tư vấn tận tâm</p>
          </div>
        </div>
        <div className="flex items-center gap-4 p-4">
          <div className="bg-blue-100 p-3 rounded-full text-blue-600">
            <Mail size={24} />
          </div>
          <div>
            <h3 className="font-bold text-sm">Tin tức mới nhất</h3>
            <p className="text-xs text-gray-500">Cập nhật nhanh chóng</p>
          </div>
        </div>
      </section>

      {/* Newsletter & Registration Section */}
      <section className="bg-gray-900 rounded-sm overflow-hidden relative">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80" 
            alt="Tech Background" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="relative z-10 px-8 py-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-white max-w-xl">
            <h2 className="text-3xl font-bold mb-4 tracking-tight uppercase">Đăng ký nhận bản tin công nghệ</h2>
            <p className="text-gray-400">Đừng bỏ lỡ những sản phẩm mới nhất và ưu đãi độc quyền dành riêng cho thành viên. Đăng ký ngay để nhận voucher giảm giá 100k!</p>
          </div>
          <div className="w-full md:w-auto">
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
              <input 
                type="email" 
                placeholder="Nhập email của bạn..." 
                className="px-4 py-3 rounded-sm bg-white/10 border border-white/20 text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-600 min-w-[300px]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button 
                type="submit"
                className="bg-blue-600 text-white px-8 py-3 rounded-sm font-bold hover:bg-blue-700 transition-all uppercase whitespace-nowrap"
              >
                Đăng ký ngay
              </button>
            </form>
            <p className="text-xs text-gray-500 mt-3 text-center md:text-left">
              Bằng cách đăng ký, bạn đồng ý với <Link to="#" className="underline">Chính sách bảo mật</Link> của chúng tôi.
            </p>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="bg-blue-50 rounded-sm p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-blue-100">
        <div className="flex items-center gap-6">
          <div className="hidden sm:flex -space-x-4">
            {[1, 2, 3, 4].map((i) => (
              <img 
                key={i}
                src={`https://i.pravatar.cc/150?u=${i}`} 
                alt="User" 
                className="w-12 h-12 rounded-full border-2 border-white shadow-sm"
                referrerPolicy="no-referrer"
              />
            ))}
            <div className="w-12 h-12 rounded-full bg-blue-600 border-2 border-white flex items-center justify-center text-white text-xs font-bold shadow-sm">
              +10k
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Tham gia cộng đồng Shoppe Anh Vu</h3>
            <p className="text-gray-600 text-sm">Hơn 10,000 người đã đăng ký để nhận những thông tin công nghệ mới nhất.</p>
          </div>
        </div>
        {!profile ? (
          <button 
            onClick={login}
            className="bg-white text-blue-600 border border-blue-600 px-8 py-3 rounded-sm font-bold hover:bg-blue-50 transition-all uppercase whitespace-nowrap shadow-sm active:scale-95"
          >
            Đăng ký ngay
          </button>
        ) : (
          <Link 
            to="/profile" 
            className="bg-white text-blue-600 border border-blue-600 px-8 py-3 rounded-sm font-bold hover:bg-blue-50 transition-all uppercase whitespace-nowrap shadow-sm active:scale-95"
          >
            Xem hồ sơ
          </Link>
        )}
      </section>
    </div>
  );
}
