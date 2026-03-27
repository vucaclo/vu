import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, ShoppingCart, User, LogOut, Menu } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { cn } from '../../lib/utils';

export default function Navbar() {
  const { profile, login, logout } = useAuth();
  const { itemCount } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get('q');
    if (q) {
      setSearchQuery(q);
    } else if (location.pathname !== '/search') {
      setSearchQuery('');
    }
  }, [location]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <nav className="bg-blue-600 text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center gap-2">
            <span className="text-2xl font-bold tracking-tighter">Shoppe Anh Vu</span>
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex-grow max-w-2xl hidden sm:block">
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm sản phẩm, thương hiệu..."
                className="w-full bg-white text-gray-900 rounded-sm py-2 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-blue-600 hover:text-blue-700">
                <Search size={20} />
              </button>
            </div>
          </form>

          {/* Actions */}
          <div className="flex items-center gap-6">
            <Link to="/cart" className="relative hover:text-blue-200 transition-colors">
              <ShoppingCart size={24} />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-white text-blue-600 text-[10px] font-bold px-1.5 py-0.5 rounded-full border border-blue-600">
                  {itemCount}
                </span>
              )}
            </Link>

            {profile ? (
              <div className="flex items-center gap-4">
                <Link to="/profile" className="flex items-center gap-2 hover:text-blue-200 transition-colors">
                  {profile.photoURL ? (
                    <img src={profile.photoURL} alt={profile.displayName} className="w-8 h-8 rounded-full border border-white" referrerPolicy="no-referrer" />
                  ) : (
                    <User size={24} />
                  )}
                  <span className="hidden md:inline text-sm font-medium">{profile.displayName || 'Tài khoản'}</span>
                </Link>
                {profile.role === 'admin' && (
                  <Link to="/admin" className="text-xs font-bold bg-white text-blue-600 px-2 py-1 rounded hover:bg-blue-50">
                    ADMIN
                  </Link>
                )}
                <button onClick={logout} className="hover:text-blue-200 transition-colors">
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <button onClick={login} className="text-sm font-bold hover:text-blue-200 transition-colors">
                Đăng nhập
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
