import React, { useState, useMemo } from 'react';
import { useCart } from '../context/CartContext';
import { Page } from '../types';
import ConfirmationDialog from '../components/ConfirmationDialog';

interface CartPageProps {
  onNavigate: (page: Page) => void;
}

const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const CartPage: React.FC<CartPageProps> = ({ onNavigate }) => {
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [showConfirm, setShowConfirm] = useState(false);

  const subtotal = useMemo(() => {
    return cartItems.reduce((total, item) => total + (item.discountPrice || item.price) * item.quantity, 0);
  }, [cartItems]);

  const handleApplyCoupon = () => {
    if (coupon.toUpperCase() === 'BIENVENIDA10') {
      setDiscount(0.10); // 10% discount
    } else {
      alert('Cupón no válido');
    }
  };

  const handleConfirmEmptyCart = () => {
    clearCart();
    setShowConfirm(false);
  };

  const shippingCost = subtotal > 999 ? 0 : 150;
  const total = subtotal * (1 - discount) + shippingCost;
  
  if (cartItems.length === 0) {
    return (
        <div className="container mx-auto px-4 py-20 text-center">
            <h1 className="text-3xl font-bold mb-4">Tu carrito está vacío</h1>
            <p className="text-gray-600 mb-8">Parece que no has agregado nada a tu carrito. ¡Explora nuestros productos!</p>
            <button onClick={() => onNavigate('home')} className="bg-black text-white font-bold py-3 px-8 rounded-md hover:bg-gray-800 transition-colors">
                Seguir Comprando
            </button>
        </div>
    )
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Carrito de Compras</h1>
          {cartItems.length > 0 && (
              <button
                  onClick={() => setShowConfirm(true)}
                  className="text-sm text-gray-500 hover:text-red-500 hover:underline transition-colors"
                  aria-label="Vaciar el carrito de compras"
              >
                  Vaciar carrito
              </button>
          )}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md">
                  {cartItems.map(item => (
                      <div key={item.id} className="flex items-center p-4 border-b last:border-b-0">
                          <img src={item.images[0]} alt={item.name} className="w-24 h-24 object-cover rounded-md" />
                          <div className="flex-grow ml-4">
                              <h2 className="font-semibold">{item.name}</h2>
                              <p className="text-sm text-gray-500">{item.category}</p>
                              <p className="font-bold mt-1">${(item.discountPrice || item.price).toLocaleString('es-MX')} MXN</p>
                          </div>
                          <div className="flex items-center space-x-4">
                              <input
                                  type="number"
                                  value={item.quantity}
                                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                                  min="1"
                                  className="w-16 border text-center rounded-md"
                                  aria-label={`Cantidad para ${item.name}`}
                              />
                              <button onClick={() => removeFromCart(item.id)} className="text-gray-500 hover:text-red-500" aria-label={`Quitar ${item.name} del carrito`}>
                                 <TrashIcon />
                              </button>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
          <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-bold mb-4 border-b pb-2">Resumen de Compra</h2>
                  <div className="space-y-2">
                      <div className="flex justify-between">
                          <span>Subtotal</span>
                          <span>${subtotal.toLocaleString('es-MX')} MXN</span>
                      </div>
                       <div className="flex justify-between">
                          <span>Envío</span>
                          <span>{shippingCost === 0 ? 'Gratis' : `$${shippingCost.toLocaleString('es-MX')} MXN`}</span>
                      </div>
                      {discount > 0 && (
                          <div className="flex justify-between text-green-600">
                              <span>Descuento (10%)</span>
                              <span>-${(subtotal * discount).toLocaleString('es-MX')} MXN</span>
                          </div>
                      )}
                  </div>
                  <div className="mt-4 pt-4 border-t">
                      <div className="flex justify-between font-bold text-lg">
                          <span>Total</span>
                          <span>${total.toLocaleString('es-MX')} MXN</span>
                      </div>
                  </div>

                  <div className="mt-6">
                      <label htmlFor="coupon" className="font-semibold block mb-2">Código de Descuento</label>
                      <div className="flex">
                          <input
                              type="text"
                              id="coupon"
                              value={coupon}
                              onChange={(e) => setCoupon(e.target.value)}
                              placeholder="BIENVENIDA10"
                              className="w-full border rounded-l-md px-3 py-2"
                          />
                          <button onClick={handleApplyCoupon} className="bg-gray-200 text-gray-700 font-semibold px-4 rounded-r-md hover:bg-gray-300">Aplicar</button>
                      </div>
                  </div>

                  <button onClick={() => onNavigate('checkout')} className="w-full bg-black text-white font-bold py-3 mt-6 rounded-md hover:bg-gray-800 transition-colors">
                      Proceder al Pago
                  </button>
              </div>
          </div>
        </div>
      </div>

      <ConfirmationDialog
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleConfirmEmptyCart}
        title="Vaciar Carrito"
      >
        <p>¿Estás seguro de que quieres vaciar tu carrito?</p>
      </ConfirmationDialog>
    </>
  );
};

export default CartPage;
