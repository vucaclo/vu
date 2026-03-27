import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { Order } from '../types';
import { formatPrice, cn } from '../lib/utils';
import { User, Package, Settings, LogOut, ChevronRight, ShoppingBag, Clock, Truck, CheckCircle, XCircle } from 'lucide-react';
import { motion } from 'motion/react';

export default function Profile() {
  const { profile, logout } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'shipping' | 'completed' | 'cancelled'>('all');

  useEffect(() => {
    const fetchOrders = async () => {
      if (!profile) return;
      try {
        const q = query(
          collection(db, 'orders'),
          where('userId', '==', profile.uid),
          orderBy('createdAt', 'desc')
        );
        const snapshot = await getDocs(q);
        setOrders(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Order)));
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [profile]);

  if (!profile) return null;

  const filteredOrders = activeTab === 'all' ? orders : orders.filter(o => o.status === activeTab);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock size={16} className="text-yellow-500" />;
      case 'shipping': return <Truck size={16} className="text-blue-500" />;
      case 'completed': return <CheckCircle size={16} className="text-green-500" />;
      case 'cancelled': return <XCircle size={16} className="text-red-500" />;
      default: return null;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return 'Chờ xác nhận';
      case 'shipping': return 'Đang giao';
      case 'completed': return 'Hoàn thành';
      case 'cancelled': return 'Đã hủy';
      default: return status;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full md:w-64 space-y-6 flex-shrink-0">
          <div className="flex items-center gap-4 p-4 bg-white rounded-sm shadow-sm">
            <img src={profile.photoURL || 'https://picsum.photos/seed/user/100/100'} alt={profile.displayName} className="w-12 h-12 rounded-full border border-gray-100" referrerPolicy="no-referrer" />
            <div className="flex flex-col">
              <span className="text-sm font-bold text-gray-900 line-clamp-1">{profile.displayName}</span>
              <span className="text-xs text-gray-500">Sửa hồ sơ</span>
            </div>
          </div>

          <nav className="bg-white rounded-sm shadow-sm overflow-hidden">
            <button className="w-full flex items-center gap-3 p-4 text-sm font-medium text-blue-600 bg-blue-50 border-l-4 border-blue-600">
              <User size={20} /> Hồ sơ của tôi
            </button>
            <button className="w-full flex items-center gap-3 p-4 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors border-l-4 border-transparent">
              <Package size={20} /> Đơn mua
            </button>
            <button className="w-full flex items-center gap-3 p-4 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors border-l-4 border-transparent">
              <Settings size={20} /> Cài đặt
            </button>
            <button onClick={logout} className="w-full flex items-center gap-3 p-4 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors border-l-4 border-transparent">
              <LogOut size={20} /> Đăng xuất
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-grow space-y-6">
          {/* Order Tabs */}
          <div className="bg-white rounded-sm shadow-sm flex overflow-x-auto">
            {['all', 'pending', 'shipping', 'completed', 'cancelled'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={cn(
                  "flex-1 py-4 px-6 text-sm font-medium whitespace-nowrap transition-colors border-b-2",
                  activeTab === tab ? "text-blue-600 border-blue-600" : "text-gray-600 border-transparent hover:text-blue-600"
                )}
              >
                {tab === 'all' ? 'Tất cả' : getStatusLabel(tab)}
              </button>
            ))}
          </div>

          {/* Orders List */}
          {loading ? (
            <div className="space-y-4 animate-pulse">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-gray-200 h-48 rounded-sm"></div>
              ))}
            </div>
          ) : filteredOrders.length > 0 ? (
            <div className="space-y-4">
              {filteredOrders.map((order) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={order.id}
                  className="bg-white rounded-sm shadow-sm overflow-hidden border border-transparent hover:border-blue-600 transition-colors"
                >
                  <div className="p-4 border-b border-gray-50 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm font-bold text-gray-900">
                      <ShoppingBag size={18} className="text-blue-600" />
                      <span>Shoppe Anh Vu Official</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-medium text-blue-600 uppercase tracking-tight">
                      {getStatusIcon(order.status)}
                      {getStatusLabel(order.status)}
                    </div>
                  </div>

                  <div className="p-4 space-y-4">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex gap-4">
                        <img src={item.image || 'https://picsum.photos/seed/electronics/200/200'} alt={item.name} className="w-20 h-20 object-cover rounded-sm border border-gray-100" referrerPolicy="no-referrer" />
                        <div className="flex-grow flex flex-col justify-between py-1">
                          <h4 className="text-sm font-medium text-gray-900 line-clamp-2">{item.name}</h4>
                          <div className="flex justify-between items-end">
                            <span className="text-xs text-gray-500">x{item.quantity}</span>
                            <span className="text-sm font-bold text-blue-600">{formatPrice(item.price)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-blue-50/30 p-4 border-t border-gray-50 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-xs text-gray-500">
                      Mã đơn hàng: <span className="font-mono">{order.id.slice(0, 8).toUpperCase()}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <span className="text-sm text-gray-600">Thành tiền:</span>
                        <span className="text-xl font-bold text-blue-600 ml-2">{formatPrice(order.total)}</span>
                      </div>
                      <button className="bg-blue-600 text-white px-6 py-2 rounded-sm text-sm font-bold hover:bg-blue-700 transition-colors shadow-md">
                        Mua lại
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="bg-white p-24 rounded-sm shadow-sm text-center space-y-4">
              <div className="flex justify-center text-gray-200">
                <Package size={100} />
              </div>
              <h3 className="text-lg font-medium text-gray-900">Chưa có đơn hàng nào</h3>
              <p className="text-gray-500">Hãy tiếp tục mua sắm để lấp đầy lịch sử đơn hàng của bạn!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
