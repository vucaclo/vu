import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart } from 'lucide-react';
import { Product } from '../types';
import { formatPrice, cn } from '../lib/utils';
import { useCart } from '../context/CartContext';
import { toast } from 'sonner';
import { motion } from 'motion/react';

interface ProductCardProps {
  product: Product;
  className?: string;
  key?: string | number;
}

export default function ProductCard({ product, className }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    toast.success(`Đã thêm ${product.name} vào giỏ hàng`);
  };

  const hasDiscount = product.discountPrice && product.discountPrice < product.price;
  const discountPercent = hasDiscount ? Math.round((1 - (product.discountPrice! / product.price)) * 100) : 0;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={cn(
        "bg-white rounded-sm shadow-sm hover:shadow-md transition-all border border-transparent hover:border-blue-600 group relative flex flex-col h-full",
        className
      )}
    >
      <Link to={`/product/${product.id}`} className="flex flex-col h-full">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <img
            src={product.image || 'https://picsum.photos/seed/electronics/400/400'}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            referrerPolicy="no-referrer"
          />
          {hasDiscount && (
            <div className="absolute top-0 right-0 bg-yellow-400 text-blue-600 text-[10px] font-bold px-1.5 py-0.5 rounded-bl-sm">
              -{discountPercent}%
            </div>
          )}
          {product.isFlashSale && (
            <div className="absolute top-0 left-0 bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-br-sm">
              FLASH SALE
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-2 flex flex-col flex-grow">
          {product.brand && (
            <span className="text-[10px] font-bold text-blue-600 uppercase mb-1">{product.brand}</span>
          )}
          <h3 className="text-xs font-medium text-gray-800 line-clamp-2 mb-2 min-h-[2.5rem]">
            {product.name}
          </h3>

          <div className="mt-auto">
            {/* Price */}
            <div className="flex items-center gap-1 flex-wrap">
              <span className="text-blue-600 font-bold text-sm">
                {formatPrice(product.discountPrice || product.price)}
              </span>
              {hasDiscount && (
                <span className="text-gray-400 line-through text-[10px]">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>

            {/* Rating & Sold */}
            <div className="flex items-center justify-between mt-2 text-[10px] text-gray-500">
              <div className="flex items-center gap-0.5">
                <Star size={10} className="fill-yellow-400 text-yellow-400" />
                <span>{product.rating || 5.0}</span>
              </div>
              <span>Đã bán 1.2k</span>
            </div>
          </div>
        </div>
      </Link>

      {/* Quick Add to Cart */}
      <button
        onClick={handleAddToCart}
        className="absolute bottom-2 right-2 p-1.5 bg-blue-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-blue-700"
      >
        <ShoppingCart size={14} />
      </button>
    </motion.div>
  );
}
