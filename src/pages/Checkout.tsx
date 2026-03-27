import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { formatPrice, cn } from '../lib/utils';
import { MapPin, CreditCard, Truck, ChevronRight, CheckCircle2 } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'motion/react';

export default function Checkout() {
  const { items, total, clearCart } = useCart();
  const { profile, login } = useAuth();
  const navigate = useNavigate();
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'bank_transfer'>('COD');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!profile) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Vui lòng đăng nhập để thanh toán</h2>
        <button
          onClick={login}
          className="bg-blue-600 text-white px-12 py-3 rounded-sm font-bold hover:bg-blue-700 transition-colors shadow-lg"
        >
          ĐĂNG NHẬP NGAY
        </button>
      </div>
    );
  }

  if (items.length === 0 && !isSuccess) {
    navigate('/cart');
    return null;
  }

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address.trim()) {
      toast.error('Vui lòng nhập địa chỉ giao hàng');
      return;
    }

    setIsSubmitting(true);
    try {
      const orderData = {
        userId: profile.uid,
        items: items.map(item => ({
          productId: item.productId,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image || '',
        })),
        total,
        status: 'pending',
        address,
        paymentMethod,
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, 'orders'), orderData);
      setIsSuccess(true);
      clearCart();
      toast.success('Đặt hàng thành công!');
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <AnimatePresence mode="wait">
        {isSuccess ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto bg-white p-12 rounded-sm shadow-sm text-center space-y-8"
          >
            <div className="flex justify-center text-green-500">
              <CheckCircle2 size={120} />
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-gray-900 uppercase">Đặt hàng thành công!</h2>
              <p className="text-gray-500">Cảm ơn bạn đã mua sắm tại Shoppe Anh Vu. Đơn hàng của bạn đang được xử lý.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link to="/profile" className="bg-white text-blue-600 border border-blue-600 px-8 py-3 rounded-sm font-bold hover:bg-blue-50 transition-colors">
                XEM ĐƠN HÀNG
              </Link>
              <Link to="/" className="bg-blue-600 text-white px-8 py-3 rounded-sm font-bold hover:bg-blue-700 transition-colors shadow-lg">
                TIẾP TỤC MUA SẮM
              </Link>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col lg:flex-row gap-8"
          >
            {/* Checkout Form */}
            <form onSubmit={handlePlaceOrder} className="flex-grow space-y-6">
              {/* Address Section */}
              <section className="bg-white p-6 rounded-sm shadow-sm space-y-6">
                <h3 className="flex items-center gap-2 text-lg font-bold text-blue-600 uppercase tracking-tight">
                  <MapPin size={24} /> Địa chỉ nhận hàng
                </h3>
                <div className="space-y-4">
                  <div className="flex gap-4 text-sm font-bold text-gray-900">
                    <span>{profile.displayName}</span>
                    <span className="text-gray-300">|</span>
                    <span>(+84) 123 456 789</span>
                  </div>
                  <textarea
                    required
                    placeholder="Nhập địa chỉ nhận hàng chi tiết..."
                    className="w-full border border-gray-200 rounded-sm p-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 min-h-[100px]"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
              </section>

              {/* Products Section */}
              <section className="bg-white p-6 rounded-sm shadow-sm space-y-6">
                <h3 className="text-lg font-bold text-gray-900 uppercase tracking-tight">Sản phẩm</h3>
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.productId} className="flex items-center gap-4 py-2 border-b border-gray-50 last:border-0">
                      <img src={item.image || 'https://picsum.photos/seed/electronics/200/200'} alt={item.name} className="w-16 h-16 object-cover rounded-sm border border-gray-100" referrerPolicy="no-referrer" />
                      <div className="flex-grow">
                        <h4 className="text-sm font-medium text-gray-900 line-clamp-1">{item.name}</h4>
                        <p className="text-xs text-gray-500">Số lượng: {item.quantity}</p>
                      </div>
                      <span className="text-sm font-medium text-gray-900">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Payment Method */}
              <section className="bg-white p-6 rounded-sm shadow-sm space-y-6">
                <h3 className="flex items-center gap-2 text-lg font-bold text-gray-900 uppercase tracking-tight">
                  <CreditCard size={24} /> Phương thức thanh toán
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className={cn(
                    "flex items-center gap-4 p-4 border rounded-sm cursor-pointer transition-all",
                    paymentMethod === 'COD' ? "border-blue-600 bg-blue-50" : "border-gray-200 hover:border-blue-300"
                  )}>
                    <input
                      type="radio"
                      name="payment"
                      className="text-blue-600 focus:ring-blue-500"
                      checked={paymentMethod === 'COD'}
                      onChange={() => setPaymentMethod('COD')}
                    />
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-gray-900">Thanh toán khi nhận hàng (COD)</span>
                      <span className="text-xs text-gray-500">Phí thu hộ: ₫0. Ưu đãi miễn phí vận chuyển.</span>
                    </div>
                  </label>
                  <label className={cn(
                    "flex items-center gap-4 p-4 border rounded-sm cursor-pointer transition-all",
                    paymentMethod === 'bank_transfer' ? "border-blue-600 bg-blue-50" : "border-gray-200 hover:border-blue-300"
                  )}>
                    <input
                      type="radio"
                      name="payment"
                      className="text-blue-600 focus:ring-blue-500"
                      checked={paymentMethod === 'bank_transfer'}
                      onChange={() => setPaymentMethod('bank_transfer')}
                    />
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-gray-900">Chuyển khoản ngân hàng</span>
                      <span className="text-xs text-gray-500">Hỗ trợ tất cả ngân hàng nội địa.</span>
                    </div>
                  </label>
                </div>
              </section>
            </form>

            {/* Order Summary Sidebar */}
            <aside className="w-full lg:w-96 space-y-6">
              <div className="bg-white p-6 rounded-sm shadow-sm space-y-6 sticky top-24 border-t-4 border-blue-600">
                <h3 className="text-lg font-bold text-gray-900 uppercase">Chi tiết thanh toán</h3>
                
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Tổng tiền hàng</span>
                    <span className="text-gray-900 font-medium">{formatPrice(total)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Phí vận chuyển</span>
                    <span className="text-gray-900 font-medium">{formatPrice(0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Giảm giá phí vận chuyển</span>
                    <span className="text-gray-900 font-medium">-{formatPrice(0)}</span>
                  </div>
                  <div className="border-t border-gray-100 pt-4 flex justify-between items-end">
                    <span className="text-gray-900 font-bold text-lg">Tổng thanh toán</span>
                    <span className="text-3xl font-bold text-blue-600 leading-none">{formatPrice(total)}</span>
                  </div>
                </div>

                <div className="bg-yellow-50 p-4 rounded-sm border border-yellow-100 flex gap-3">
                  <Truck size={20} className="text-blue-600 flex-shrink-0" />
                  <p className="text-[10px] text-gray-600">Nhấn "Đặt hàng" đồng nghĩa với việc bạn đồng ý tuân theo Điều khoản Shoppe Anh Vu</p>
                </div>

                <button
                  onClick={handlePlaceOrder}
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 text-white py-4 rounded-sm font-bold hover:bg-blue-700 transition-colors shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'ĐANG XỬ LÝ...' : 'ĐẶT HÀNG'} <ChevronRight size={20} />
                </button>
              </div>
            </aside>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
