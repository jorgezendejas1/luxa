import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';
import { Order } from '../types';

interface CheckoutPageProps {
  onPlaceOrder: (order: Order) => void;
}

// Define field names for type safety
type ShippingField = 'name' | 'address' | 'city' | 'state' | 'zip' | 'phone';
type CardField = 'cardName' | 'cardNumber' | 'expiry' | 'cvv';
type FormField = ShippingField | CardField;

// Helper function outside the component to keep it pure.
// It takes the current state and returns an object of errors.
const getValidationErrors = (
  shippingInfo: { name: string, address: string, city: string, state: string, zip: string, phone: string },
  cardInfo: { cardName: string, cardNumber: string, expiry: string, cvv: string },
  paymentMethod: string
): Partial<Record<FormField, string>> => {
    const tempErrors: Partial<Record<FormField, string>> = {};
    
    // --- Shipping Validation ---
    if (!shippingInfo.name.trim()) tempErrors.name = "El nombre es requerido.";
    if (!/^\d{10}$/.test(shippingInfo.phone.replace(/\s/g, ''))) tempErrors.phone = "El teléfono debe tener 10 dígitos.";
    if (!shippingInfo.address.trim()) tempErrors.address = "La dirección es requerida.";
    if (!shippingInfo.city.trim()) tempErrors.city = "La ciudad es requerida.";
    if (!/^\d{5}$/.test(shippingInfo.zip)) tempErrors.zip = "El código postal debe tener 5 dígitos.";

    // --- Payment Validation (only if card is selected) ---
    if (paymentMethod === 'card') {
      if (!cardInfo.cardName.trim()) tempErrors.cardName = "El nombre en la tarjeta es requerido.";
      if (!/^\d{16}$/.test(cardInfo.cardNumber.replace(/\s/g, ''))) tempErrors.cardNumber = "El número de tarjeta debe tener 16 dígitos.";
      
      const match = cardInfo.expiry.match(/^(0[1-9]|1[0-2])\s*\/\s*(\d{2})$/);
      if (!match) {
          tempErrors.expiry = "El formato debe ser MM/AA.";
      } else {
          const month = parseInt(match[1], 10);
          const year = parseInt(`20${match[2]}`, 10);
          const now = new Date();
          // Card is valid until the last day of its expiry month.
          // Create a date for the first day of the *next* month to compare.
          const expiryDate = new Date(year, month, 1);
          if (expiryDate <= now) {
              tempErrors.expiry = "La tarjeta ha expirado.";
          }
      }

      if (!/^\d{3,4}$/.test(cardInfo.cvv)) tempErrors.cvv = "El CVV debe tener 3 o 4 dígitos.";
    }
    
    return tempErrors;
};


const CheckoutPage: React.FC<CheckoutPageProps> = ({ onPlaceOrder }) => {
  const { cartItems, clearCart } = useCart();
  const { convertPrice } = useCurrency();
  const [shippingInfo, setShippingInfo] = useState({
    name: '', address: '', city: '', state: 'CDMX', zip: '', phone: ''
  });
  const [cardInfo, setCardInfo] = useState({
    cardName: '', cardNumber: '', expiry: '', cvv: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('card');
  
  const [errors, setErrors] = useState<Partial<Record<FormField, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<FormField, boolean>>>({});
  
  const subtotal = cartItems.reduce((total, item) => total + (item.discountPrice || item.price) * item.quantity, 0);
  const shippingCost = subtotal > 999 ? 0 : 150;
  const total = subtotal + shippingCost;

  useEffect(() => {
    // Run validation on every change for real-time feedback.
    const newErrors = getValidationErrors(shippingInfo, cardInfo, paymentMethod);
    setErrors(newErrors);
  }, [shippingInfo, cardInfo, paymentMethod]);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleCardInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardInfo(prev => ({ ...prev, [name]: value }));
  };
  
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name } = e.target as { name: FormField };
      setTouched(prev => ({ ...prev, [name]: true }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all fields as touched to show all errors on submit attempt
    const allFormFields = { ...shippingInfo, ...(paymentMethod === 'card' ? cardInfo : {}) };
    const allTouched = Object.keys(allFormFields).reduce((acc, key) => ({ ...acc, [key as FormField]: true }), {});
    setTouched(allTouched);

    const formErrors = getValidationErrors(shippingInfo, cardInfo, paymentMethod);
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      if (cartItems.length === 0) {
        alert("Tu carrito está vacío.");
        return;
      }
      const newOrder: Order = {
          orderId: `MX${Date.now()}`,
          items: cartItems,
          total: total,
          shippingAddress: shippingInfo,
          paymentMethod: paymentMethod
      };
      onPlaceOrder(newOrder);
      clearCart();
    }
  };

  const mexicanStates = ["Aguascalientes", "Baja California", "Baja California Sur", "Campeche", "Chiapas", "Chihuahua", "Coahuila", "Colima", "CDMX", "Durango", "Guanajuato", "Guerrero", "Hidalgo", "Jalisco", "México", "Michoacán", "Morelos", "Nayarit", "Nuevo León", "Oaxaca", "Puebla", "Querétaro", "Quintana Roo", "San Luis Potosí", "Sinaloa", "Sonora", "Tabasco", "Tamaulipas", "Tlaxcala", "Veracruz", "Yucatán", "Zacatecas"];

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <h1 className="text-3xl font-bold mb-6">Finalizar Compra</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8" noValidate>
        {/* Shipping Info */}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Información de Envío</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input name="name" placeholder="Nombre completo" required onChange={handleInputChange} onBlur={handleBlur} value={shippingInfo.name} className={`p-2 border rounded-md w-full ${touched.name && errors.name ? 'border-red-500' : 'border-gray-300'}`} />
              {touched.name && errors.name && <p className="text-red-500 text-xs mt-1 animate-fade-in">{errors.name}</p>}
            </div>
            <div>
              <input name="phone" placeholder="Teléfono" type="tel" required onChange={handleInputChange} onBlur={handleBlur} value={shippingInfo.phone} className={`p-2 border rounded-md w-full ${touched.phone && errors.phone ? 'border-red-500' : 'border-gray-300'}`} />
              {touched.phone && errors.phone && <p className="text-red-500 text-xs mt-1 animate-fade-in">{errors.phone}</p>}
            </div>
            <div className="md:col-span-2">
              <input name="address" placeholder="Dirección (Calle y número)" required onChange={handleInputChange} onBlur={handleBlur} value={shippingInfo.address} className={`p-2 border rounded-md w-full ${touched.address && errors.address ? 'border-red-500' : 'border-gray-300'}`} />
              {touched.address && errors.address && <p className="text-red-500 text-xs mt-1 animate-fade-in">{errors.address}</p>}
            </div>
            <div>
              <input name="city" placeholder="Ciudad" required onChange={handleInputChange} onBlur={handleBlur} value={shippingInfo.city} className={`p-2 border rounded-md w-full ${touched.city && errors.city ? 'border-red-500' : 'border-gray-300'}`} />
              {touched.city && errors.city && <p className="text-red-500 text-xs mt-1 animate-fade-in">{errors.city}</p>}
            </div>
            <select name="state" value={shippingInfo.state} required onChange={handleInputChange} onBlur={handleBlur} className="p-2 border border-gray-300 rounded-md bg-white">
                {mexicanStates.map(state => <option key={state} value={state}>{state}</option>)}
            </select>
            <div>
              <input name="zip" placeholder="Código Postal" required onChange={handleInputChange} onBlur={handleBlur} value={shippingInfo.zip} className={`p-2 border rounded-md w-full ${touched.zip && errors.zip ? 'border-red-500' : 'border-gray-300'}`} />
              {touched.zip && errors.zip && <p className="text-red-500 text-xs mt-1 animate-fade-in">{errors.zip}</p>}
            </div>
          </div>

          <h2 className="text-xl font-bold mt-8 mb-4">Método de Pago</h2>
          <div className="space-y-3">
             <label className="flex items-center p-4 border rounded-lg cursor-pointer has-[:checked]:bg-pink-50 has-[:checked]:border-pink-400">
                <input type="radio" name="payment" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} className="form-radio text-pink-500" />
                <span className="ml-3 font-semibold">💳 Tarjeta de Crédito/Débito</span>
             </label>
              {paymentMethod === 'card' && (
                  <div className="p-4 border rounded-lg bg-gray-50 space-y-3 ml-8 animate-fade-in">
                      <div>
                        <input name="cardName" placeholder="Nombre en la tarjeta" value={cardInfo.cardName} required={paymentMethod === 'card'} onChange={handleCardInputChange} onBlur={handleBlur} className={`p-2 border rounded-md w-full ${touched.cardName && errors.cardName ? 'border-red-500' : 'border-gray-300'}`} />
                        {touched.cardName && errors.cardName && <p className="text-red-500 text-xs mt-1 animate-fade-in">{errors.cardName}</p>}
                      </div>
                      <div>
                        <input name="cardNumber" placeholder="Número de tarjeta (16 dígitos)" value={cardInfo.cardNumber} type="tel" inputMode="numeric" pattern="[0-9\s]{13,19}" maxLength={19} required={paymentMethod === 'card'} onChange={handleCardInputChange} onBlur={handleBlur} className={`p-2 border rounded-md w-full ${touched.cardNumber && errors.cardNumber ? 'border-red-500' : 'border-gray-300'}`} />
                        {touched.cardNumber && errors.cardNumber && <p className="text-red-500 text-xs mt-1 animate-fade-in">{errors.cardNumber}</p>}
                      </div>
                      <div className="flex gap-4">
                          <div className="w-1/2">
                            <input name="expiry" placeholder="MM/AA" value={cardInfo.expiry} required={paymentMethod === 'card'} onChange={handleCardInputChange} onBlur={handleBlur} className={`p-2 border rounded-md w-full ${touched.expiry && errors.expiry ? 'border-red-500' : 'border-gray-300'}`} />
                            {touched.expiry && errors.expiry && <p className="text-red-500 text-xs mt-1 animate-fade-in">{errors.expiry}</p>}
                          </div>
                          <div className="w-1/2">
                            <input name="cvv" placeholder="CVV" value={cardInfo.cvv} type="tel" inputMode="numeric" pattern="\d{3,4}" maxLength={4} required={paymentMethod === 'card'} onChange={handleCardInputChange} onBlur={handleBlur} className={`p-2 border rounded-md w-full ${touched.cvv && errors.cvv ? 'border-red-500' : 'border-gray-300'}`} />
                            {touched.cvv && errors.cvv && <p className="text-red-500 text-xs mt-1 animate-fade-in">{errors.cvv}</p>}
                          </div>
                      </div>
                  </div>
              )}

             <label className="flex items-center p-4 border rounded-lg cursor-pointer has-[:checked]:bg-pink-50 has-[:checked]:border-pink-400">
                <input type="radio" name="payment" value="oxxo" checked={paymentMethod === 'oxxo'} onChange={() => setPaymentMethod('oxxo')} className="form-radio text-pink-500"/>
                <span className="ml-3 font-semibold">🏪 Pago en OXXO</span>
             </label>
              {paymentMethod === 'oxxo' && (
                  <div className="p-4 border rounded-lg bg-gray-50 text-sm ml-8 animate-fade-in">
                      <p>Al confirmar tu pedido, se generará una referencia de pago que podrás usar en cualquier tienda OXXO. La referencia aparecerá en la página de confirmación.</p>
                  </div>
              )}
             <label className="flex items-center p-4 border rounded-lg cursor-pointer has-[:checked]:bg-pink-50 has-[:checked]:border-pink-400">
                <input type="radio" name="payment" value="mercado" checked={paymentMethod === 'mercado'} onChange={() => setPaymentMethod('mercado')} className="form-radio text-pink-500"/>
                <span className="ml-3 font-semibold">💰 Mercado Pago</span>
             </label>
              {paymentMethod === 'mercado' && (
                  <div className="p-4 border rounded-lg bg-gray-50 text-sm ml-8 animate-fade-in">
                      <p>Serás redirigido a la página segura de Mercado Pago para completar tu compra después de hacer clic en "Confirmar Pedido".</p>
                  </div>
              )}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md h-fit">
          <h2 className="text-xl font-bold mb-4 border-b pb-2">Resumen de Pedido</h2>
          {cartItems.map(item => (
            <div key={item.id} className="flex justify-between items-center text-sm mb-2">
                <span className="truncate pr-2">{item.name} x {item.quantity}</span>
                <span className="font-medium whitespace-nowrap">{convertPrice((item.discountPrice || item.price) * item.quantity)}</span>
            </div>
          ))}
          <div className="border-t mt-4 pt-4 space-y-2">
            <div className="flex justify-between"><span>Subtotal</span><span>{convertPrice(subtotal)}</span></div>
            <div className="flex justify-between"><span>Envío</span><span>{shippingCost === 0 ? 'Gratis' : convertPrice(shippingCost)}</span></div>
            <div className="flex justify-between font-bold text-lg"><span>Total (IVA Incluido)</span><span>{convertPrice(total)}</span></div>
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