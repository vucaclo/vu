import { Product } from './types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'iPhone 15 Pro Max 256GB - Chính hãng VN/A',
    price: 34990000,
    discountPrice: 31990000,
    category: 'Điện thoại',
    image: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1696446701796-da61225697cc?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1695048133137-400199049755?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1695048133133-7e699245100a?auto=format&fit=crop&w=800&q=80'
    ],
    stock: 50,
    rating: 4.9,
    isFlashSale: true,
    brand: 'Apple',
    description: 'iPhone 15 Pro Max. Thiết kế titan bền bỉ, nhẹ nhàng. Nút Tác Vụ mới. Chip A17 Pro mạnh mẽ nhất từng có trên iPhone.'
  },
  {
    id: 'p2',
    name: 'MacBook Air M2 13 inch 8GB/256GB',
    price: 26990000,
    discountPrice: 24490000,
    category: 'Laptop',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1611186871348-b1ec696e5237?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=800&q=80'
    ],
    stock: 30,
    rating: 4.8,
    brand: 'Apple',
    description: 'MacBook Air M2 với thiết kế siêu mỏng, hiệu năng vượt trội từ chip M2, màn hình Liquid Retina rực rỡ.'
  },
  {
    id: 'p3',
    name: 'AirPods Pro (Gen 2) MagSafe USB-C',
    price: 6190000,
    discountPrice: 5490000,
    category: 'Phụ kiện',
    image: 'https://images.unsplash.com/photo-1603351154351-5e2d0600bb77?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1603351154351-5e2d0600bb77?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1588423770574-f199ba263075?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80'
    ],
    stock: 100,
    rating: 4.7,
    isFlashSale: true,
    brand: 'Apple',
    description: 'Chống ồn chủ động gấp 2 lần. Âm thanh không gian cá nhân hóa. Thời lượng pin lên đến 6 giờ.'
  },
  {
    id: 'p4',
    name: 'Sony WH-1000XM5 Wireless Noise Cancelling',
    price: 8490000,
    discountPrice: 7990000,
    category: 'Phụ kiện',
    image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80'
    ],
    stock: 20,
    rating: 4.9,
    brand: 'Sony',
    description: 'Tai nghe chống ồn hàng đầu thế giới với công nghệ Multi Noise Sensor và chip xử lý V1.'
  },
  {
    id: 'p5',
    name: 'Samsung Galaxy S24 Ultra 12GB/256GB',
    price: 33990000,
    discountPrice: 29990000,
    category: 'Điện thoại',
    image: 'https://images.unsplash.com/photo-1707230560023-e9d653139886?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1707230560023-e9d653139886?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1610945264801-687c88b39b8a?auto=format&fit=crop&w=800&q=80'
    ],
    stock: 40,
    rating: 4.8,
    brand: 'Samsung',
    description: 'Galaxy AI đã xuất hiện. Camera 200MP siêu phân giải. Chip Snapdragon 8 Gen 3 for Galaxy.'
  },
  {
    id: 'p6',
    name: 'Dell XPS 13 9315 i5-1230U/8GB/256GB',
    price: 24990000,
    discountPrice: 21990000,
    category: 'Laptop',
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1593642634367-d91a135587b5?auto=format&fit=crop&w=800&q=80'
    ],
    stock: 15,
    rating: 4.6,
    brand: 'Dell',
    description: 'Laptop 13 inch mỏng nhẹ nhất của Dell. Màn hình InfinityEdge 4 cạnh tuyệt đẹp.'
  },
  {
    id: 'p7',
    name: 'Apple Watch Series 9 GPS 41mm',
    price: 10490000,
    discountPrice: 9490000,
    category: 'Đồng hồ',
    image: 'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1508685096489-7aac291ba59e?auto=format&fit=crop&w=800&q=80'
    ],
    stock: 25,
    rating: 4.8,
    brand: 'Apple',
    description: 'Thông minh hơn, sáng hơn, mạnh mẽ hơn. Thao tác Chạm Hai Lần kỳ diệu.'
  },
  {
    id: 'p8',
    name: 'Sony Alpha A7 IV (Body Only)',
    price: 59990000,
    discountPrice: 54990000,
    category: 'Máy ảnh',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80'
    ],
    stock: 10,
    rating: 4.9,
    brand: 'Sony',
    description: 'Cảm biến Full-frame 33MP. Quay phim 4K 60p. Lấy nét theo ánh mắt thời gian thực.'
  },
  {
    id: 'p9',
    name: 'PlayStation 5 (PS5) Standard Edition',
    price: 15990000,
    discountPrice: 14490000,
    category: 'Gaming',
    image: 'https://images.unsplash.com/photo-1606813907291-d86ebb9b7427?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1606813907291-d86ebb9b7427?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1592155931584-901ac15763e3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1622239434110-fd47443e72cd?auto=format&fit=crop&w=800&q=80'
    ],
    stock: 15,
    rating: 4.9,
    isFlashSale: true,
    brand: 'Sony',
    description: 'Trải nghiệm tốc độ tải dữ liệu cực nhanh với ổ SSD siêu tốc, đắm chìm hơn với phản hồi xúc giác.'
  },
  {
    id: 'p10',
    name: 'Nintendo Switch OLED Model',
    price: 8990000,
    discountPrice: 7990000,
    category: 'Gaming',
    image: 'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1612033448550-9d6f9c17f07d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1595164502740-5f8f7f01f70f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1519332978332-21b7d621d05e?auto=format&fit=crop&w=800&q=80'
    ],
    stock: 40,
    rating: 4.7,
    brand: 'Nintendo',
    description: 'Màn hình OLED 7 inch rực rỡ. Chân đứng rộng có thể điều chỉnh. Bộ nhớ trong 64GB.'
  },
  {
    id: 'p11',
    name: 'iPad Pro M2 11 inch WiFi 128GB',
    price: 21990000,
    discountPrice: 19990000,
    category: 'Laptop',
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1585503418537-88331351ad99?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1551250939-335057f80bbf?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80'
    ],
    stock: 20,
    rating: 4.8,
    brand: 'Apple',
    description: 'Hiệu năng cực đỉnh từ chip M2. Màn hình Liquid Retina tiên tiến. Kết nối không dây siêu nhanh.'
  },
  {
    id: 'p12',
    name: 'Logitech G Pro X Superlight Wireless',
    price: 3290000,
    discountPrice: 2890000,
    category: 'Phụ kiện',
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?auto=format&fit=crop&w=800&q=80'
    ],
    stock: 60,
    rating: 4.9,
    isFlashSale: true,
    brand: 'Logitech',
    description: 'Chuột chơi game không dây nhẹ nhất, nhanh nhất của Logitech G. Trọng lượng chưa đầy 63 gram.'
  },
  {
    id: 'p13',
    name: 'Bàn phím cơ Keychron K2 Wireless',
    price: 2500000,
    discountPrice: 1990000,
    category: 'Phụ kiện',
    image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1587829741301-dc798b83dadc?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1618384881928-bbcc80553008?auto=format&fit=crop&w=800&q=80'
    ],
    stock: 45,
    rating: 4.8,
    brand: 'Keychron',
    description: 'Bàn phím cơ không dây 75% với đèn LED RGB, hỗ trợ cả Windows và macOS.'
  },
  {
    id: 'p14',
    name: 'Màn hình LG UltraGear 27 inch 2K 144Hz',
    price: 9500000,
    discountPrice: 8490000,
    category: 'Gaming',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1547119957-637f8679db1e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1552831388-6a0b3575b32a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1586210579191-33b45e38fa2c?auto=format&fit=crop&w=800&q=80'
    ],
    stock: 12,
    rating: 4.9,
    brand: 'LG',
    description: 'Màn hình chơi game IPS 1ms, hỗ trợ G-Sync Compatible và HDR10.'
  },
  {
    id: 'p15',
    name: 'Loa thông minh Google Nest Audio',
    price: 2900000,
    discountPrice: 2490000,
    category: 'Phụ kiện',
    image: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1543512214-318c7553f230?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1589003077984-894e133dabab?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512446813987-4403f14ad3a9?auto=format&fit=crop&w=800&q=80'
    ],
    stock: 30,
    rating: 4.7,
    brand: 'Google',
    description: 'Âm thanh tuyệt vời, điều khiển bằng giọng nói với Google Assistant.'
  },
  {
    id: 'p16',
    name: 'Flycam DJI Mini 3 Pro (DJI RC)',
    price: 25000000,
    discountPrice: 22900000,
    category: 'Máy ảnh',
    image: 'https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1524143909107-a412f383074a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=800&q=80'
    ],
    stock: 8,
    rating: 4.9,
    brand: 'DJI',
    description: 'Flycam siêu nhẹ dưới 249g, quay phim 4K/60fps, cảm biến chướng ngại vật 3 hướng.'
  },
  {
    id: 'p17',
    name: 'Áo Thun Nam Cotton Cao Cấp',
    price: 350000,
    discountPrice: 199000,
    category: 'Thời trang',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1576566582418-b5446123c993?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1554568218-0f1715e72254?auto=format&fit=crop&w=800&q=80'
    ],
    stock: 200,
    rating: 4.5,
    brand: 'Shoppe Anh Vu',
    description: 'Áo thun nam chất liệu cotton 100% co giãn 4 chiều, thấm hút mồ hôi tốt.'
  },
  {
    id: 'p18',
    name: 'Giày Sneaker Nam Phong Cách Hàn Quốc',
    price: 1200000,
    discountPrice: 850000,
    category: 'Thời trang',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=800&q=80'
    ],
    stock: 50,
    rating: 4.6,
    brand: 'Shoppe Anh Vu',
    description: 'Giày sneaker nam thiết kế trẻ trung, năng động, phù hợp đi chơi, đi làm.'
  },
  {
    id: 'p19',
    name: 'Nồi Chiên Không Dầu 5L Đa Năng',
    price: 2500000,
    discountPrice: 1450000,
    category: 'Gia dụng',
    image: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506368249639-73a05d6f6488?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80'
    ],
    stock: 35,
    rating: 4.8,
    isFlashSale: true,
    brand: 'Shoppe Anh Vu',
    description: 'Nồi chiên không dầu công nghệ Rapid Air, giảm 80% lượng chất béo, an toàn cho sức khỏe.'
  },
  {
    id: 'p20',
    name: 'Máy Lọc Không Khí Thông Minh',
    price: 4500000,
    discountPrice: 3200000,
    category: 'Gia dụng',
    image: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1612151855475-877969f4e6cc?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1558383331-f520f2888351?auto=format&fit=crop&w=800&q=80'
    ],
    stock: 20,
    rating: 4.7,
    brand: 'Shoppe Anh Vu',
    description: 'Máy lọc không khí màng lọc HEPA, loại bỏ 99.9% bụi mịn và vi khuẩn.'
  },
  {
    id: 'p21',
    name: 'Samsung Galaxy Tab S9 Ultra 5G 12GB/256GB',
    price: 32990000,
    discountPrice: 28990000,
    category: 'Laptop',
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1585503418537-88331351ad99?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1551250939-335057f80bbf?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80'
    ],
    stock: 15,
    rating: 4.8,
    brand: 'Samsung',
    description: 'Máy tính bảng màn hình Dynamic AMOLED 2X 14.6 inch cực đại. Kháng nước và bụi IP68.'
  },
  {
    id: 'p22',
    name: 'Sony WH-CH720N Wireless Noise Cancelling',
    price: 2990000,
    discountPrice: 2490000,
    category: 'Phụ kiện',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80'
    ],
    stock: 45,
    rating: 4.6,
    brand: 'Sony',
    description: 'Tai nghe chụp tai không dây chống ồn nhẹ nhất của Sony. Thời lượng pin lên đến 35 giờ.'
  },
  {
    id: 'p23',
    name: 'Màn hình Dell UltraSharp 27 U2723QE 4K',
    price: 15500000,
    discountPrice: 13990000,
    category: 'Gaming',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1547119957-637f8679db1e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1552831388-6a0b3575b32a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1586210579191-33b45e38fa2c?auto=format&fit=crop&w=800&q=80'
    ],
    stock: 10,
    rating: 4.9,
    brand: 'Dell',
    description: 'Màn hình 4K 27 inch đầu tiên trên thế giới có công nghệ IPS Black và kết nối USB-C Hub.'
  },
  {
    id: 'p24',
    name: 'Chuột Logitech MX Master 3S Wireless',
    price: 2990000,
    discountPrice: 2450000,
    category: 'Phụ kiện',
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80'
    ],
    stock: 50,
    rating: 4.9,
    brand: 'Logitech',
    description: 'Chuột biểu tượng được tái thiết kế. Cảm biến 8K DPI có thể di chuyển trên mọi bề mặt, kể cả kính.'
  },
  {
    id: 'p25',
    name: 'Bàn phím Razer BlackWidow V4 Pro',
    price: 5990000,
    discountPrice: 5490000,
    category: 'Gaming',
    image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1587829741301-dc798b83dadc?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1618384881928-bbcc80553008?auto=format&fit=crop&w=800&q=80'
    ],
    stock: 20,
    rating: 4.8,
    brand: 'Razer',
    description: 'Bàn phím cơ chơi game đầy đủ tính năng với Razer Command Dial và 8 phím macro chuyên dụng.'
  },
  {
    id: 'p26',
    name: 'Canon EOS R6 Mark II (Body Only)',
    price: 65000000,
    discountPrice: 59900000,
    category: 'Máy ảnh',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80'
    ],
    stock: 5,
    rating: 4.9,
    brand: 'Canon',
    description: 'Máy ảnh Mirrorless Full-frame đa năng. Chụp liên tiếp 40fps. Quay video 4K 60p không crop.'
  },
  {
    id: 'p27',
    name: 'GoPro Hero 12 Black',
    price: 10500000,
    discountPrice: 9490000,
    category: 'Máy ảnh',
    image: 'https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1524143909107-a412f383074a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=800&q=80'
    ],
    stock: 30,
    rating: 4.8,
    brand: 'GoPro',
    description: 'Chất lượng hình ảnh tốt nhất trong phân khúc. Chống rung HyperSmooth 6.0 đạt giải Emmy.'
  },
  {
    id: 'p28',
    name: 'Loa Bluetooth JBL Charge 5',
    price: 3990000,
    discountPrice: 3490000,
    category: 'Phụ kiện',
    image: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1543512214-318c7553f230?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1589003077984-894e133dabab?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512446813987-4403f14ad3a9?auto=format&fit=crop&w=800&q=80'
    ],
    stock: 40,
    rating: 4.7,
    brand: 'JBL',
    description: 'Âm thanh JBL Pro Sound mạnh mẽ. Kháng nước và bụi IP67. Thời gian chơi nhạc lên đến 20 giờ.'
  },
  {
    id: 'p29',
    name: 'Loa Bluetooth Marshall Emberton II',
    price: 4990000,
    discountPrice: 4490000,
    category: 'Phụ kiện',
    image: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1543512214-318c7553f230?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1589003077984-894e133dabab?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512446813987-4403f14ad3a9?auto=format&fit=crop&w=800&q=80'
    ],
    stock: 25,
    rating: 4.8,
    brand: 'Marshall',
    description: 'Âm thanh đa hướng 360 độ đặc trưng của Marshall. Hơn 30 giờ chơi nhạc di động.'
  },
  {
    id: 'p30',
    name: 'Máy Hút Bụi Dyson V15 Detect Absolute',
    price: 22000000,
    discountPrice: 19900000,
    category: 'Gia dụng',
    image: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1612151855475-877969f4e6cc?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1558383331-f520f2888351?auto=format&fit=crop&w=800&q=80'
    ],
    stock: 12,
    rating: 4.9,
    brand: 'Dyson',
    description: 'Máy hút bụi không dây mạnh mẽ nhất. Tia laser giúp phát hiện bụi siêu nhỏ không thể nhìn thấy.'
  },
  {
    id: 'p31',
    name: 'Bộ Đèn Thông Minh Philips Hue Starter Kit',
    price: 4500000,
    discountPrice: 3990000,
    category: 'Gia dụng',
    image: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1543512214-318c7553f230?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1589003077984-894e133dabab?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512446813987-4403f14ad3a9?auto=format&fit=crop&w=800&q=80'
    ],
    stock: 30,
    rating: 4.7,
    brand: 'Philips',
    description: 'Hệ thống chiếu sáng thông minh cá nhân. Điều khiển bằng giọng nói và ứng dụng.'
  },
  {
    id: 'p32',
    name: 'Vòng Đeo Tay Thông Minh Xiaomi Mi Band 8',
    price: 990000,
    discountPrice: 850000,
    category: 'Đồng hồ',
    image: 'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1508685096489-7aac291ba59e?auto=format&fit=crop&w=800&q=80'
    ],
    stock: 150,
    rating: 4.6,
    brand: 'Xiaomi',
    description: 'Màn hình AMOLED 1.62 inch mượt mà. Hơn 150 chế độ thể thao. Thời lượng pin lên đến 16 ngày.'
  },
  {
    id: 'p33',
    name: 'Đồng Hồ Garmin Fenix 7 Pro Sapphire Solar',
    price: 22500000,
    discountPrice: 20990000,
    category: 'Đồng hồ',
    image: 'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1508685096489-7aac291ba59e?auto=format&fit=crop&w=800&q=80'
    ],
    stock: 15,
    rating: 4.9,
    brand: 'Garmin',
    description: 'Đồng hồ GPS đa môn thể thao cao cấp. Sạc bằng năng lượng mặt trời. Tích hợp đèn pin LED.'
  },
  {
    id: 'p34',
    name: 'Giày Chạy Bộ Adidas Ultraboost Light',
    price: 5200000,
    discountPrice: 3890000,
    category: 'Thời trang',
    image: 'https://images.unsplash.com/photo-1587563877366-c458b32b8121?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1587563877366-c458b32b8121?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=800&q=80'
    ],
    stock: 60,
    rating: 4.8,
    brand: 'Adidas',
    description: 'Thế hệ Ultraboost nhẹ nhất từ trước đến nay. Đệm Light BOOST mang lại phản hồi năng lượng tuyệt vời.'
  },
  {
    id: 'p35',
    name: "Giày Nike Air Force 1 '07 White",
    price: 2990000,
    discountPrice: 2650000,
    category: 'Thời trang',
    image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=800&q=80'
    ],
    stock: 100,
    rating: 4.9,
    brand: 'Nike',
    description: 'Huyền thoại bóng rổ nay trở thành biểu tượng thời trang đường phố. Da thật bền bỉ và đệm Air êm ái.'
  },
  {
    id: 'p36',
    name: 'Balo The North Face Recon 30L',
    price: 2500000,
    discountPrice: 1990000,
    category: 'Thời trang',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1576566582418-b5446123c993?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1554568218-0f1715e72254?auto=format&fit=crop&w=800&q=80'
    ],
    stock: 40,
    rating: 4.7,
    brand: 'The North Face',
    description: 'Balo đa năng cho cả đi học, đi làm và dã ngoại. Ngăn đựng laptop riêng biệt và đệm lưng thoải mái.'
  },
  {
    id: 'p37',
    name: 'Kính Mát Ray-Ban Wayfarer Classic',
    price: 4500000,
    discountPrice: 3890000,
    category: 'Thời trang',
    image: 'https://images.unsplash.com/photo-1511499767390-903390e6fbc4?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1511499767390-903390e6fbc4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1576566582418-b5446123c993?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1554568218-0f1715e72254?auto=format&fit=crop&w=800&q=80'
    ],
    stock: 20,
    rating: 4.8,
    brand: 'Ray-Ban',
    description: 'Thiết kế kính mát dễ nhận diện nhất trong lịch sử. Phong cách vượt thời gian.'
  },
  {
    id: 'p38',
    name: 'Nồi Áp Suất Instant Pot Duo Plus 9-in-1',
    price: 3990000,
    discountPrice: 3450000,
    category: 'Gia dụng',
    image: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506368249639-73a05d6f6488?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=800&q=80'
    ],
    stock: 25,
    rating: 4.8,
    brand: 'Instant Pot',
    description: 'Nồi áp suất điện đa năng thay thế 9 thiết bị nhà bếp. Nấu ăn nhanh hơn đến 70%.'
  },
  {
    id: 'p39',
    name: 'Máy Pha Cà Phê Nespresso Vertuo Next',
    price: 5500000,
    discountPrice: 4890000,
    category: 'Gia dụng',
    image: 'https://images.unsplash.com/photo-1520970014086-2208d157c9e2?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1520970014086-2208d157c9e2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506368249639-73a05d6f6488?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80'
    ],
    stock: 18,
    rating: 4.7,
    brand: 'Nespresso',
    description: 'Trải nghiệm cà phê chất lượng barista tại nhà. Công nghệ Centrifusion độc quyền.'
  },
  {
    id: 'p40',
    name: 'Máy Đọc Sách Kindle Paperwhite (16 GB)',
    price: 4200000,
    discountPrice: 3850000,
    category: 'Phụ kiện',
    image: 'https://images.unsplash.com/photo-1592434134753-a70baf7979d7?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1592434134753-a70baf7979d7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1585503418537-88331351ad99?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1551250939-335057f80bbf?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80'
    ],
    stock: 50,
    rating: 4.9,
    brand: 'Amazon',
    description: 'Màn hình 6.8 inch với ánh sáng ấm có thể điều chỉnh. Chống nước IPX8. Pin dùng hàng tuần.'
  }
];
