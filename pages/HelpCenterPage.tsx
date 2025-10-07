
import React, { useState } from 'react';

// Fix: Used React.FC to correctly type the component and allow the special `key` prop.
const FaqItem: React.FC<{ question: string, answer: string }> = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex justify-between items-center w-full py-5 text-left"
            >
                <span className="font-semibold text-lg text-gray-800">{question}</span>
                <svg
                    className={`w-6 h-6 transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
                <div className="pb-5 pr-4 text-gray-600">
                    {answer}
                </div>
            </div>
        </div>
    );
};

const HelpCenterPage: React.FC = () => {
    const faqs = {
        "Pedidos y Pagos": [
            {
                question: "¿Qué métodos de pago aceptan?",
                answer: "Aceptamos todas las principales tarjetas de crédito y débito (Visa, Mastercard, American Express), pagos a través de Mercado Pago y pagos en efectivo en cualquier tienda OXXO del país."
            },
            {
                question: "¿Es seguro comprar en LUXA?",
                answer: "¡Absolutamente! Nuestro sitio utiliza encriptación SSL para proteger todos tus datos personales y de pago. La seguridad de tu información es nuestra máxima prioridad."
            }
        ],
        "Envíos y Entregas": [
            {
                question: "¿Cuánto cuesta el envío?",
                answer: "Ofrecemos envío estándar gratuito en todas las compras superiores a $999 MXN. Para pedidos inferiores a ese monto, el costo de envío es de $150 MXN a cualquier parte de México."
            },
            {
                question: "¿Cuánto tiempo tarda en llegar mi pedido?",
                answer: "El tiempo de entrega estándar es de 3 a 5 días hábiles. Una vez que tu pedido sea enviado, recibirás un correo electrónico con el número de seguimiento para que puedas rastrearlo."
            }
        ],
        "Devoluciones": [
            {
                question: "¿Puedo devolver un producto?",
                answer: "Sí, tienes 15 días a partir de la fecha de recepción para solicitar una devolución. El producto debe estar en su estado original, sin usar y con todas sus etiquetas. Consulta nuestra Política de Devoluciones para más detalles."
            }
        ]
    };

    return (
        <div className="bg-white py-16">
            <div className="container mx-auto px-6">
                <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-12">Centro de Ayuda</h1>
                <div className="max-w-3xl mx-auto">
                    {Object.entries(faqs).map(([category, items]) => (
                        <div key={category} className="mb-10">
                            <h2 className="text-2xl font-bold text-pink-600 mb-4">{category}</h2>
                            {items.map((faq, index) => (
                                <FaqItem key={index} question={faq.question} answer={faq.answer} />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HelpCenterPage;