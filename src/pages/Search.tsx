import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase';
import { Product } from '../types';
import { MOCK_PRODUCTS } from '../constants';
import ProductCard from '../components/ProductCard';
import { Filter, ChevronDown, LayoutGrid, List, Search as SearchIcon } from 'lucide-react';
import { cn, formatPrice } from '../lib/utils';

const CATEGORIES = ['Tất cả', 'Điện thoại', 'Laptop', 'Phụ kiện', 'Đồng hồ', 'Máy ảnh', 'Gaming'];
const BRANDS = ['Tất cả', 'Apple', 'Samsung', 'Sony', 'Dell', 'Logitech', 'Nintendo'];
const PRICE_RANGES = [
  { label: 'Tất cả', min: 0, max: Infinity },
  { label: 'Dưới 5 triệu VNĐ', min: 0, max: 5000000 },
  { label: '5 - 15 triệu VNĐ', min: 5000000, max: 15000000 },
  { label: '15 - 30 triệu VNĐ', min: 15000000, max: 30000000 },
  { label: 'Trên 30 triệu VNĐ', min: 30000000, max: Infinity },
];

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('newest');

  const queryParam = searchParams.get('q') || '';
  const categoryParam = searchParams.get('category') || 'Tất cả';
  const brandParam = searchParams.get('brand') || 'Tất cả';
  const flashSaleParam = searchParams.get('flashSale') === 'true';
  const minPriceParam = searchParams.get('minPrice') !== null ? Number(searchParams.get('minPrice')) : 0;
  const maxPriceParam = searchParams.get('maxPrice') !== null ? Number(searchParams.get('maxPrice')) : Infinity;

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let q = query(collection(db, 'products'), limit(50));
        
        // Note: Firestore doesn't support full-text search natively without external services.
        // For this demo, we'll fetch and filter client-side for simplicity.
        const snapshot = await getDocs(q);
        let fetchedProducts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));

        if (fetchedProducts.length === 0) {
          fetchedProducts = MOCK_PRODUCTS;
        }

        // Client-side filtering
        if (queryParam) {
          fetchedProducts = fetchedProducts.filter(p => 
            p.name.toLowerCase().includes(queryParam.toLowerCase()) ||
            p.brand?.toLowerCase().includes(queryParam.toLowerCase())
          );
        }

        if (categoryParam !== 'Tất cả') {
          fetchedProducts = fetchedProducts.filter(p => p.category === categoryParam);
        }

        if (brandParam !== 'Tất cả') {
          fetchedProducts = fetchedProducts.filter(p => p.brand === brandParam);
        }

        if (flashSaleParam) {
          fetchedProducts = fetchedProducts.filter(p => p.isFlashSale);
        }

        fetchedProducts = fetchedProducts.filter(p => 
          (p.discountPrice || p.price) >= minPriceParam && 
          (p.discountPrice || p.price) <= maxPriceParam
        );

        // Sorting
        if (sortBy === 'priceAsc') {
          fetchedProducts.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
        } else if (sortBy === 'priceDesc') {
          fetchedProducts.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
        } else {
          fetchedProducts.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
        }

        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Error searching products:', error);
        // On error, we still want to show something if possible
        if (products.length === 0) {
           setProducts(MOCK_PRODUCTS.slice(0, 8));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [queryParam, categoryParam, brandParam, flashSaleParam, minPriceParam, maxPriceParam, sortBy]);

  const updateFilter = (key: string, value: string | number) => {
    const newParams = new URLSearchParams(searchParams);
    if (value === 'Tất cả' || value === 0 || value === Infinity) {
      newParams.delete(key);
    } else {
      newParams.set(key, value.toString());
    }
    setSearchParams(newParams);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 space-y-8 flex-shrink-0">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="flex items-center gap-2 text-sm font-bold text-gray-900 uppercase tracking-wider">
                <Filter size={18} /> Bộ lọc tìm kiếm
              </h3>
              {(categoryParam !== 'Tất cả' || brandParam !== 'Tất cả' || minPriceParam !== 0 || maxPriceParam !== Infinity || flashSaleParam || queryParam) && (
                <button 
                  onClick={() => setSearchParams({})}
                  className="text-[10px] font-bold text-blue-600 hover:underline uppercase"
                >
                  Xóa tất cả
                </button>
              )}
            </div>
            
            <div className="space-y-6">
              {/* Categories */}
              <div>
                <h4 className="text-xs font-bold text-gray-700 mb-3">Theo Danh Mục</h4>
                <div className="space-y-2">
                  {CATEGORIES.map((cat) => (
                    <label key={cat} className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="radio"
                        name="category"
                        className="text-blue-600 focus:ring-blue-500"
                        checked={categoryParam === cat}
                        onChange={() => updateFilter('category', cat)}
                      />
                      <span className={cn("text-sm group-hover:text-blue-600 transition-colors", categoryParam === cat ? "text-blue-600 font-medium" : "text-gray-600")}>
                        {cat}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Brands */}
              <div>
                <h4 className="text-xs font-bold text-gray-700 mb-3">Theo Thương Hiệu</h4>
                <div className="space-y-2">
                  {BRANDS.map((brand) => (
                    <label key={brand} className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="radio"
                        name="brand"
                        className="text-blue-600 focus:ring-blue-500"
                        checked={brandParam === brand}
                        onChange={() => updateFilter('brand', brand)}
                      />
                      <span className={cn("text-sm group-hover:text-blue-600 transition-colors", brandParam === brand ? "text-blue-600 font-medium" : "text-gray-600")}>
                        {brand}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h4 className="text-xs font-bold text-gray-700 mb-3">Khoảng Giá</h4>
                <div className="space-y-2">
                  {PRICE_RANGES.map((range) => (
                    <label key={range.label} className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="radio"
                        name="price"
                        className="text-blue-600 focus:ring-blue-500"
                        checked={minPriceParam === range.min && maxPriceParam === range.max}
                        onChange={() => {
                          const newParams = new URLSearchParams(searchParams);
                          if (range.min === 0 && range.max === Infinity) {
                            newParams.delete('minPrice');
                            newParams.delete('maxPrice');
                          } else {
                            newParams.set('minPrice', range.min.toString());
                            newParams.set('maxPrice', range.max.toString());
                          }
                          setSearchParams(newParams);
                        }}
                      />
                      <span className={cn("text-sm group-hover:text-blue-600 transition-colors", minPriceParam === range.min && maxPriceParam === range.max ? "text-blue-600 font-medium" : "text-gray-600")}>
                        {range.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-grow space-y-6">
          {queryParam && (
            <div className="flex items-center gap-2 text-gray-600">
              <SearchIcon size={18} />
              <span>Kết quả tìm kiếm cho: <strong className="text-blue-600">"{queryParam}"</strong></span>
            </div>
          )}

          {/* Toolbar */}
          <div className="bg-white p-4 rounded-sm shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Sắp xếp theo:</span>
              <div className="flex gap-2">
                <button
                  onClick={() => setSortBy('newest')}
                  className={cn("px-4 py-1.5 text-sm rounded-sm transition-colors", sortBy === 'newest' ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200")}
                >
                  Mới nhất
                </button>
                <select
                  value={sortBy.startsWith('price') ? sortBy : ''}
                  onChange={(e) => setSortBy(e.target.value)}
                  className={cn("px-4 py-1.5 text-sm rounded-sm border-none focus:ring-0 transition-colors", sortBy.startsWith('price') ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200")}
                >
                  <option value="" disabled hidden>Giá</option>
                  <option value="priceAsc">Giá: Thấp đến Cao</option>
                  <option value="priceDesc">Giá: Cao đến Thấp</option>
                </select>
              </div>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <button className="p-1 hover:text-blue-600"><LayoutGrid size={20} /></button>
              <button className="p-1 hover:text-blue-600"><List size={20} /></button>
            </div>
          </div>

          {/* Results */}
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 animate-pulse">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-gray-200 aspect-[3/4] rounded-sm"></div>
              ))}
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-white p-12 rounded-sm shadow-sm text-center space-y-4">
              <div className="flex justify-center text-gray-300">
                <Filter size={64} />
              </div>
              <h3 className="text-lg font-medium text-gray-900">Không tìm thấy sản phẩm nào</h3>
              <p className="text-gray-500">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm của bạn.</p>
              <button
                onClick={() => setSearchParams({})}
                className="text-blue-600 font-bold hover:underline"
              >
                Xóa tất cả bộ lọc
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
