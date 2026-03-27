import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Product } from '../types';
import { MOCK_PRODUCTS } from '../constants';
import { formatPrice, cn } from '../lib/utils';
import { useCart } from '../context/CartContext';
import { Star, ShoppingCart, ShieldCheck, Truck, RefreshCw, Minus, Plus, Heart, Share2 } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'motion/react';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      try {
        const docRef = doc(db, 'products', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() } as Product);
        } else {
          // Check if it's a mock product
          const mockProduct = MOCK_PRODUCTS.find(p => p.id === id);
          if (mockProduct) {
            setProduct(mockProduct);
          } else {
            toast.error('Không tìm thấy sản phẩm');
            navigate('/');
          }
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        // Also check mock products on error
        const mockProduct = MOCK_PRODUCTS.find(p => p.id === id);
        if (mockProduct) {
          setProduct(mockProduct);
        } else {
          toast.error('Có lỗi xảy ra khi tải sản phẩm');
          navigate('/');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-pulse">
        <div className="bg-white p-6 rounded-sm shadow-sm grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="aspect-square bg-gray-200 rounded-sm"></div>
          <div className="space-y-6">
            <div className="h-8 bg-gray-200 w-3/4 rounded"></div>
            <div className="h-4 bg-gray-200 w-1/2 rounded"></div>
            <div className="h-12 bg-gray-200 w-full rounded"></div>
            <div className="h-24 bg-gray-200 w-full rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) return null;

  const hasDiscount = product.discountPrice && product.discountPrice < product.price;
  const discountPercent = hasDiscount ? Math.round((1 - (product.discountPrice! / product.price)) * 100) : 0;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success(`Đã thêm ${quantity} ${product.name} vào giỏ hàng`);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/cart');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Product Main Info */}
      <div className="bg-white p-6 rounded-sm shadow-sm grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Image Section */}
        <div className="space-y-4">
          <div className="aspect-square rounded-sm overflow-hidden border border-gray-100 relative group">
            <img
              src={product.image || 'https://picsum.photos/seed/electronics/800/800'}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            {hasDiscount && (
              <div className="absolute top-4 right-4 bg-yellow-400 text-blue-600 text-xs font-bold px-3 py-1 rounded-sm shadow-md">
                -{discountPercent}% GIẢM
              </div>
            )}
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {(product.images || [product.image]).map((img, i) => (
              <div 
                key={i} 
                className="w-20 h-20 flex-shrink-0 rounded-sm border border-gray-200 overflow-hidden cursor-pointer hover:border-blue-600 transition-colors"
                onClick={() => setProduct({ ...product, image: img })}
              >
                <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-8 pt-4">
            <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors">
              <Share2 size={18} /> Chia sẻ
            </button>
            <div className="w-px h-4 bg-gray-200"></div>
            <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors">
              <Heart size={18} /> Thích (1.2k)
            </button>
          </div>
        </div>

        {/* Details Section */}
        <div className="space-y-6">
          <div className="space-y-2">
            {product.isFlashSale && (
              <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider">Flash Sale</span>
            )}
            <h1 className="text-2xl font-medium text-gray-900 leading-tight">{product.name}</h1>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1 text-blue-600 border-r border-gray-200 pr-4">
                <span className="underline font-bold">{product.rating || 5.0}</span>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className={cn("fill-blue-600", i >= Math.floor(product.rating || 5) && "text-gray-300 fill-gray-300")} />
                  ))}
                </div>
              </div>
              <div className="border-r border-gray-200 pr-4">
                <span className="underline font-bold">1.5k</span> <span className="text-gray-500">Đánh giá</span>
              </div>
              <div>
                <span className="font-bold">4.2k</span> <span className="text-gray-500">Đã bán</span>
              </div>
            </div>
          </div>

          {/* Price Section */}
          <div className="bg-gray-50 p-6 rounded-sm flex items-center gap-4">
            {hasDiscount && (
              <span className="text-gray-400 line-through text-lg">{formatPrice(product.price)}</span>
            )}
            <span className="text-3xl font-bold text-blue-600">
              {formatPrice(product.discountPrice || product.price)}
            </span>
            {hasDiscount && (
              <span className="bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-sm uppercase">
                {discountPercent}% Giảm
              </span>
            )}
          </div>

          {/* Shipping */}
          <div className="space-y-4 text-sm">
            <div className="flex gap-12">
              <span className="text-gray-500 w-24 flex-shrink-0">Vận chuyển</span>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Truck size={18} className="text-green-600" />
                  <span className="font-medium">Miễn phí vận chuyển</span>
                </div>
                <p className="text-gray-500 text-xs">Miễn phí vận chuyển cho đơn hàng trên ₫150.000</p>
              </div>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-12">
              <span className="text-gray-500 w-24 flex-shrink-0">Số lượng</span>
              <div className="flex items-center border border-gray-200 rounded-sm">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="p-2 hover:bg-gray-50 text-gray-600 disabled:opacity-50"
                  disabled={quantity <= 1}
                >
                  <Minus size={16} />
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-12 text-center border-x border-gray-200 py-1 focus:outline-none"
                />
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="p-2 hover:bg-gray-50 text-gray-600"
                >
                  <Plus size={16} />
                </button>
              </div>
              <span className="text-gray-500 text-xs">{product.stock} sản phẩm có sẵn</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-4">
            <button
              onClick={handleAddToCart}
              className="flex-1 flex items-center justify-center gap-2 bg-blue-50 text-blue-600 border border-blue-600 py-3 px-6 rounded-sm font-medium hover:bg-blue-100 transition-colors"
            >
              <ShoppingCart size={20} /> Thêm vào giỏ hàng
            </button>
            <button
              onClick={handleBuyNow}
              className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-sm font-medium hover:bg-blue-700 transition-colors shadow-lg"
            >
              Mua ngay
            </button>
          </div>

          {/* Guarantees */}
          <div className="grid grid-cols-3 gap-4 pt-8 border-t border-gray-100">
            <div className="flex flex-col items-center text-center gap-1">
              <RefreshCw size={20} className="text-blue-600" />
              <span className="text-[10px] text-gray-600">7 ngày miễn phí trả hàng</span>
            </div>
            <div className="flex flex-col items-center text-center gap-1">
              <ShieldCheck size={20} className="text-blue-600" />
              <span className="text-[10px] text-gray-600">Hàng chính hãng 100%</span>
            </div>
            <div className="flex flex-col items-center text-center gap-1">
              <Truck size={20} className="text-blue-600" />
              <span className="text-[10px] text-gray-600">Miễn phí vận chuyển</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Description */}
      <div className="bg-white p-6 rounded-sm shadow-sm space-y-6">
        <h2 className="text-lg font-bold text-gray-900 uppercase bg-gray-50 p-4 -mx-6 -mt-6 mb-6">Chi tiết sản phẩm</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            <div className="flex gap-8 text-sm">
              <span className="text-gray-500 w-32 flex-shrink-0">Danh mục</span>
              <span className="text-blue-600 font-medium">{product.category}</span>
            </div>
            <div className="flex gap-8 text-sm">
              <span className="text-gray-500 w-32 flex-shrink-0">Thương hiệu</span>
              <span className="text-blue-600 font-medium">{product.brand || 'No Brand'}</span>
            </div>
            <div className="flex gap-8 text-sm">
              <span className="text-gray-500 w-32 flex-shrink-0">Kho hàng</span>
              <span className="text-gray-900">{product.stock}</span>
            </div>
            <div className="flex gap-8 text-sm">
              <span className="text-gray-500 w-32 flex-shrink-0">Gửi từ</span>
              <span className="text-gray-900">Quận 1, TP. Hồ Chí Minh</span>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 uppercase mb-6">Mô tả sản phẩm</h2>
          <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-line leading-relaxed">
            {product.description || `Sản phẩm ${product.name} là lựa chọn tuyệt vời cho bạn. Với thiết kế hiện đại, hiệu năng mạnh mẽ và độ bền cao, sản phẩm này chắc chắn sẽ làm bạn hài lòng.

Đặc điểm nổi bật:
- Thiết kế sang trọng, tinh tế.
- Công nghệ tiên tiến nhất hiện nay.
- Bảo hành chính hãng 12 tháng.
- Hỗ trợ trả góp 0% lãi suất.

Hãy đặt hàng ngay hôm nay để nhận được những ưu đãi hấp dẫn nhất từ Shoppe Anh Vu!`}
          </div>
        </div>
      </div>
    </div>
  );
}
