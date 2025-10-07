
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Order } from '../types';

interface CheckoutPageProps {
  onPlaceOrder: (order: Order) => void;
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({ onPlaceOrder }) => {
  const { cartItems, clearCart } = useCart();
  const [shippingInfo, setShippingInfo] = useState({
    name: '', address: '', city: '', state: 'CDMX', zip: '', phone: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('card');
  
  const subtotal = cartItems.reduce((total, item) => total + (item.discountPrice || item.price) * item.quantity, 0);
  const shippingCost = subtotal > 999 ? 0 : 150;
  const total = subtotal + shippingCost;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newOrder: Order = {
        orderId: `MX${Date.now()}`,
        items: cartItems,
        total: total,
        shippingAddress: shippingInfo,
        paymentMethod: paymentMethod
    };
    onPlaceOrder(newOrder);
    clearCart();
  };

  const mexicanStates = ["Aguascalientes", "Baja California", "Baja California Sur", "Campeche", "Chiapas", "Chihuahua", "Coahuila", "Colima", "CDMX", "Durango", "Guanajuato", "Guerrero", "Hidalgo", "Jalisco", "México", "Michoacán", "Morelos", "Nayarit", "Nuevo León", "Oaxaca", "Puebla", "Querétaro", "Quintana Roo", "San Luis Potosí", "Sinaloa", "Sonora", "Tabasco", "Tamaulipas", "Tlaxcala", "Veracruz", "Yucatán", "Zacatecas"];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Finalizar Compra</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Shipping Info */}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Información de Envío</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="name" placeholder="Nombre completo" required onChange={handleInputChange} className="p-2 border rounded-md" />
            <input name="phone" placeholder="Teléfono" type="tel" required onChange={handleInputChange} className="p-2 border rounded-md" />
            <input name="address" placeholder="Dirección (Calle y número)" required onChange={handleInputChange} className="p-2 border rounded-md md:col-span-2" />
            <input name="city" placeholder="Ciudad" required onChange={handleInputChange} className="p-2 border rounded-md" />
            <select name="state" value={shippingInfo.state} required onChange={handleInputChange} className="p-2 border rounded-md bg-white">
                {mexicanStates.map(state => <option key={state} value={state}>{state}</option>)}
            </select>
            <input name="zip" placeholder="Código Postal" required onChange={handleInputChange} className="p-2 border rounded-md" />
          </div>

          <h2 className="text-xl font-bold mt-8 mb-4">Método de Pago</h2>
          <div className="space-y-3">
             <label className="flex items-center p-4 border rounded-lg cursor-pointer">
                <input type="radio" name="payment" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} className="form-radio text-pink-500" />
                <span className="ml-3 font-semibold">💳 Tarjeta de Crédito/Débito</span>
             </label>
             <label className="flex items-center p-4 border rounded-lg cursor-pointer">
                <input type="radio" name="payment" value="oxxo" checked={paymentMethod === 'oxxo'} onChange={() => setPaymentMethod('oxxo')} className="form-radio text-pink-500"/>
                <span className="ml-3 font-semibold">🏪 Pago en OXXO</span>
             </label>
             <label className="flex items-center p-4 border rounded-lg cursor-pointer">
                <input type="radio" name="payment" value="mercado" checked={paymentMethod === 'mercado'} onChange={() => setPaymentMethod('mercado')} className="form-radio text-pink-500"/>
                <span className="ml-3 font-semibold">💰 Mercado Pago</span>
             </label>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md h-fit">
          <h2 className="text-xl font-bold mb-4 border-b pb-2">Resumen de Pedido</h2>
          {cartItems.map(item => (
            <div key={item.id} className="flex justify-between items-center text-sm mb-2">
                <span>{item.name} x {item.quantity}</span>
                <span className="font-medium">${(item.price * item.quantity).toLocaleString('es-MX')}</span>
            </div>
          ))}
          <div className="border-t mt-4 pt-4 space-y-2">
            <div className="flex justify-between"><span>Subtotal</span><span>${subtotal.toLocaleString('es-MX')}</span></div>
            <div className="flex justify-between"><span>Envío</span><span>{shippingCost === 0 ? 'Gratis' : `$${shippingCost.toLocaleString('es-MX')}`}</span></div>
            <div className="flex justify-between font-bold text-lg"><span>Total (IVA Incluido)</span><span>${total.toLocaleString('es-MX')}</span></div>
          </div>
           <button type="submit" className="w-full bg-black text-white font-bold py-3 mt-6 rounded-md hover:bg-gray-800 transition-colors">
              Confirmar Pedido
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;
