
import React from 'react';
import { Order, Page } from '../types';
import { useCurrency } from '../context/CurrencyContext';

interface ConfirmationPageProps {
  order: Order;
  onNavigate: (page: Page) => void;
}

const ConfirmationPage: React.FC<ConfirmationPageProps> = ({ order, onNavigate }) => {
  const { convertPrice } = useCurrency();

  const handleMercadoPagoClick = () => {
    // In a real application, you would generate a specific payment link.
    // For this simulation, we'll redirect to the Mercado Pago homepage.
    window.location.href = 'https://www.mercadopago.com.mx/';
  };


  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <div className="bg-white max-w-2xl mx-auto p-8 rounded-lg shadow-lg">
        <svg className="w-16 h-16 mx-auto text-green-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">¡Gracias por tu compra!</h1>
        <p className="text-gray-600">Tu pedido ha sido recibido y será procesado en breve.</p>
        <p className="text-gray-600 mb-6">Recibirás una confirmación por correo electrónico.</p>
        
        <div className="text-left bg-gray-50 p-6 rounded-lg border my-8">
            <h2 className="font-bold text-lg mb-4">Resumen del Pedido</h2>
            <p className="mb-2"><strong>Número de Pedido:</strong> {order.orderId}</p>
            <p className="mb-2"><strong>Total:</strong> <span className="font-semibold">{convertPrice(order.total)}</span></p>
            <p className="mb-2"><strong>Dirección de Envío:</strong> {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.state}, {order.shippingAddress.zip}</p>
            <p><strong>Método de Pago:</strong> {order.paymentMethod === 'card' ? 'Tarjeta' : order.paymentMethod === 'oxxo' ? 'OXXO' : 'Mercado Pago'}</p>
            {order.paymentMethod === 'oxxo' && <p className="mt-4 p-3 bg-yellow-100 border border-yellow-300 rounded-md">Referencia de pago OXXO simulada: <strong>9876-5432-1098-7654</strong></p>}
        </div>

        {order.paymentMethod === 'mercado' && (
            <div className="my-8 text-left bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h2 className="font-bold text-lg mb-2">Completa tu Compra</h2>
                <p className="mb-4 text-gray-700">Para finalizar tu pedido, serás redirigido al portal seguro de Mercado Pago para completar el pago.</p>
                <button 
                  onClick={handleMercadoPagoClick} 
                  className="bg-blue-500 text-white font-bold py-3 px-10 rounded-md hover:bg-blue-600 transition-colors w-full"
                >
                  Pagar con Mercado Pago
                </button>
            </div>
        )}

        <button 
          onClick={() => onNavigate('home')} 
          className="bg-black text-white font-bold py-3 px-10 rounded-md hover:bg-gray-800 transition-colors"
        >
          Seguir Comprando
        </button>
      </div>
    </div>
  );
};

export default ConfirmationPage;
