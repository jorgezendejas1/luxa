
import React from 'react';
import { Order, Page } from '../types';

interface ConfirmationPageProps {
  order: Order;
  onNavigate: (page: Page) => void;
}

const ConfirmationPage: React.FC<ConfirmationPageProps> = ({ order, onNavigate }) => {
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
            <p className="mb-2"><strong>Total:</strong> <span className="font-semibold">${order.total.toLocaleString('es-MX')} MXN</span></p>
            <p className="mb-2"><strong>Dirección de Envío:</strong> {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.state}, {order.shippingAddress.zip}</p>
            <p><strong>Método de Pago:</strong> {order.paymentMethod === 'card' ? 'Tarjeta' : order.paymentMethod === 'oxxo' ? 'OXXO' : 'Mercado Pago'}</p>
            {order.paymentMethod === 'oxxo' && <p className="mt-4 p-3 bg-yellow-100 border border-yellow-300 rounded-md">Referencia de pago OXXO simulada: <strong>9876-5432-1098-7654</strong></p>}
        </div>

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
