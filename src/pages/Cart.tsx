import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatPrice, cn } from '../lib/utils';
import { Trash2, Minus, Plus, ShoppingBag, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function Cart() {
  const { items, removeFromCart, updateQuantity, total, itemCount } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center space-y-6">
        <div className="flex justify-center text-gray-200">
          <ShoppingBag size={120} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Giỏ hàng của bạn còn trống</h2>
        <p className="text-gray-500">Hãy tiếp tục mua sắm để tìm thấy những sản phẩm ưng ý nhất!</p>
        <Link
          to="/"
          className="inline-block bg-blue-600 text-white px-12 py-3 rounded-sm font-bold hover:bg-blue-700 transition-colors shadow-lg"
        >
          MUA NGAY
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <h1 className="text-2xl font-bold text-gray-900 uppercase tracking-tight">Giỏ hàng ({itemCount})</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="flex-grow space-y-4">
          <div className="bg-white p-4 rounded-sm shadow-sm hidden md:grid grid-cols-12 gap-4 text-sm font-medium text-gray-500 border-b border-gray-100">
            <div className="col-span-6">Sản phẩm</div>
            <div className="col-span-2 text-center">Đơn giá</div>
            <div className="col-span-2 text-center">Số lượng</div>
            <div className="col-span-2 text-center">Số tiền</div>
          </div>

          {items.map((item) => (
            <motion.div
              layout
              key={item.productId}
              className="bg-white p-4 rounded-sm shadow-sm grid grid-cols-1 md:grid-cols-12 gap-4 items-center border border-transparent hover:border-blue-600 transition-colors"
            >
              <div className="col-span-1 md:col-span-6 flex gap-4">
                <Link to={`/product/${item.productId}`} className="w-20 h-20 flex-shrink-0 rounded-sm overflow-hidden border border-gray-100">
                  <img src={item.image || 'https://picsum.photos/seed/electronics/200/200'} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </Link>
                <div className="flex flex-col justify-between py-1">
                  <Link to={`/product/${item.productId}`} className="text-sm font-medium text-gray-900 line-clamp-2 hover:text-blue-600 transition-colors">
                    {item.name}
                  </Link>
                  <button
                    onClick={() => removeFromCart(item.productId)}
                    className="text-xs text-gray-400 hover:text-red-600 flex items-center gap-1 transition-colors"
                  >
                    <Trash2 size={12} /> Xóa
                  </button>
                </div>
              </div>

              <div className="col-span-1 md:col-span-2 text-center">
                <span className="text-sm font-medium text-gray-900">{formatPrice(item.price)}</span>
              </div>

              <div className="col-span-1 md:col-span-2 flex justify-center">
                <div className="flex items-center border border-gray-200 rounded-sm">
                  <button
                    onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                    className="p-1 hover:bg-gray-50 text-gray-600"
                  >
                    <Minus size={14} />
                  </button>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.productId, parseInt(e.target.value) || 1)}
                    className="w-10 text-center text-sm border-x border-gray-200 py-0.5 focus:outline-none"
                  />
                  <button
                    onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                    className="p-1 hover:bg-gray-50 text-gray-600"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              <div className="col-span-1 md:col-span-2 text-center">
                <span className="text-sm font-bold text-blue-600">{formatPrice(item.price * item.quantity)}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Summary */}
        <aside className="w-full lg:w-96 space-y-6">
          <div className="bg-white p-6 rounded-sm shadow-sm space-y-6 sticky top-24">
            <h3 className="text-lg font-bold text-gray-900 uppercase">Tổng cộng</h3>
            
            <div className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Tạm tính ({itemCount} sản phẩm)</span>
                <span className="text-gray-900 font-medium">{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Phí vận chuyển</span>
                <span className="text-green-600 font-medium">Miễn phí</span>
              </div>
              <div className="border-t border-gray-100 pt-4 flex justify-between items-end">
                <span className="text-gray-900 font-bold">Tổng tiền</span>
                <span className="text-2xl font-bold text-blue-600 leading-none">{formatPrice(total)}</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full bg-blue-600 text-white py-4 rounded-sm font-bold hover:bg-blue-700 transition-colors shadow-lg flex items-center justify-center gap-2"
            >
              MUA HÀNG <ChevronRight size={20} />
            </button>

            <div className="pt-4 border-t border-gray-100 space-y-4">
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                  <ShoppingBag size={16} />
                </div>
                <span>Shoppe Anh Vu đảm bảo hàng chính hãng 100%</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
