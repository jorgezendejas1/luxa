export interface Review {
  id: number;
  author: string;
  rating: number;
  comment: string;
}

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  discountPrice?: number;
  description: string;
  images: string[];
  rating: number;
  reviews: Review[];
  stock: number;
  brand: string;
  colors: string[];
  sizes: string[];
}

// FIX: Add CartItem type, which extends Product with a quantity.
export interface CartItem extends Product {
  quantity: number;
}

// FIX: Add Page type for navigation across the application.
export type Page =
  | 'home'
  | 'category'
  | 'product'
  | 'cart'
  | 'checkout'
  | 'confirmation'
  | 'about'
  | 'careers'
  | 'press'
  | 'help'
  | 'how-to-buy'
  | 'shipping'
  | 'returns'
  | 'wishlist';

// FIX: Add Order type for checkout process.
export interface Order {
  orderId: string;
  items: CartItem[];
  total: number;
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    phone: string;
  };
  paymentMethod: string;
}
