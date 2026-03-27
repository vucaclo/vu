export interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  role: 'user' | 'admin';
  createdAt?: string;
}

export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  image?: string;
  images?: string[];
  category: string;
  brand?: string;
  rating?: number;
  stock: number;
  isFlashSale?: boolean;
  discountPrice?: number;
  createdAt?: string;
}

export interface Category {
  id: string;
  name: string;
  icon?: string;
}

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'shipping' | 'completed' | 'cancelled';
  address: string;
  paymentMethod: 'COD' | 'bank_transfer';
  createdAt?: string;
}
