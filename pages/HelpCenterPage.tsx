import React, { useState } from 'react';
import { Page } from '../types';

// Define explicit types for better type safety and code clarity
interface Faq {
    question: string;
    answer: React.ReactNode;
}

interface FaqCategories {
    [category: string]: Faq[];
}


const FaqItem: React.FC<Faq> = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex justify-between items-center w-full py-5 text-left"
                aria-expanded={isOpen}
            >
                <span className="font-semibold text-lg text-gray-800">{question}</span>
                <svg
                    className={`w-6 h-6 transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
            </button>
            {isOpen && (
                <div className="pb-5 pr-4 text-gray-600 animate-fade-in">
                    {answer}
                </div>
            )}
        </div>
    );
};

interface HelpCenterPageProps {
    onNavigate: (page: Page) => void;
}

const HelpCenterPage: React.FC<HelpCenterPageProps> = ({ onNavigate }) => {
    // Apply the defined type to the faqs data
    const faqs: FaqCategories = {
        "Pedidos y Pagos": [
            {
                question: "¿Qué métodos de pago aceptan?",
                answer: <p>Aceptamos todas las principales tarjetas de crédito y débito (Visa, Mastercard, American Express), pagos a través de Mercado Pago y pagos en efectivo en cualquier tienda OXXO del país.</p>
            },
            {
                question: "¿Es seguro comprar en LUXA?",
                answer: <p>¡Absolutamente! Nuestro sitio utiliza encriptación SSL para proteger todos tus datos personales y de pago. La seguridad de tu información es nuestra máxima prioridad.</p>
            }
        ],
        "Envíos y Entregas": [
            {
                question: "¿Cuánto cuesta el envío?",
                answer: <p>Ofrecemos envío estándar gratuito en todas las compras superiores a $999 MXN. Para pedidos inferiores a ese monto, el costo de envío es de $150 MXN a cualquier parte de México.</p>
            },
            {
                question: "¿Cuánto tiempo tarda en llegar mi pedido?",
                answer: <p>El tiempo de entrega estándar es de 3 a 5 días hábiles. Una vez que tu pedido sea enviado, recibirás un correo electrónico con el número de seguimiento para que puedas rastrearlo.</p>
            }
        ],
        "Devoluciones": [
            {
                question: "¿Puedo devolver un producto?",
                answer: (
                    <p>
                        Sí, tienes 15 días a partir de la fecha de recepción para solicitar una devolución. 
                        El producto debe estar en su estado original, sin usar y con todas sus etiquetas. 
                        Consulta nuestra{' '}
                        <button onClick={() => onNavigate('returns')} className="text-pink-600 underline hover:text-pink-800 font-semibold">
                            Política de Devoluciones
                        </button>
                        {' '}para más detalles.
                    </p>
                )
            }
        ]
    };

    return (
        <div className="bg-white py-16 animate-fade-in">
            <div className="container mx-auto px-6">
                <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-12">Centro de Ayuda</h1>
                <div className="max-w-3xl mx-auto">
                    {Object.entries(faqs).map(([category, items]) => (
                        <section key={category} className="mb-10" aria-labelledby={category.replace(/\s+/g, '-')}>
                            <h2 id={category.replace(/\s+/g, '-')} className="text-2xl font-bold text-pink-600 mb-4">{category}</h2>
                            {items.map((faq, index) => (
                                <FaqItem key={index} {...faq} />
                            ))}
                        </section>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HelpCenterPage;