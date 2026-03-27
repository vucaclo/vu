import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-600 border-t border-gray-200 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Chăm sóc khách hàng</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-blue-600">Trung tâm trợ giúp</a></li>
              <li><a href="#" className="hover:text-blue-600">Shoppe Anh Vu Blog</a></li>
              <li><a href="#" className="hover:text-blue-600">Shoppe Anh Vu Mall</a></li>
              <li><a href="#" className="hover:text-blue-600">Hướng dẫn mua hàng</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Về Shoppe Anh Vu</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-blue-600">Giới thiệu về Shoppe Anh Vu</a></li>
              <li><a href="#" className="hover:text-blue-600">Tuyển dụng</a></li>
              <li><a href="#" className="hover:text-blue-600">Điều khoản Shoppe Anh Vu</a></li>
              <li><a href="#" className="hover:text-blue-600">Chính sách bảo mật</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Thanh toán</h3>
            <div className="flex flex-wrap gap-2">
              <span className="bg-white border border-gray-200 px-2 py-1 rounded text-[10px] font-bold">VISA</span>
              <span className="bg-white border border-gray-200 px-2 py-1 rounded text-[10px] font-bold">MASTERCARD</span>
              <span className="bg-white border border-gray-200 px-2 py-1 rounded text-[10px] font-bold">COD</span>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Theo dõi chúng tôi</h3>
            <div className="flex gap-4">
              <a href="#" className="hover:text-blue-600"><Facebook size={20} /></a>
              <a href="#" className="hover:text-blue-600"><Instagram size={20} /></a>
              <a href="#" className="hover:text-blue-600"><Twitter size={20} /></a>
              <a href="#" className="hover:text-blue-600"><Youtube size={20} /></a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-12 pt-8 text-center text-xs">
          <p>© 2026 Shoppe Anh Vu. Tất cả các quyền được bảo lưu.</p>
          <p className="mt-2">Quốc gia & Khu vực: Việt Nam | Singapore | Indonesia | Thái Lan | Malaysia | Đài Loan</p>
        </div>
      </div>
    </footer>
  );
}
