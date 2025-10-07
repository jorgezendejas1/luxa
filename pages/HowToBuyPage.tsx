import React from 'react';

const Step = ({ number, title, description, icon }: { number: number, title: string, description: string, icon: string }) => (
    <div className="flex">
        <div className="flex flex-col items-center mr-4">
            <div>
                <div className="flex items-center justify-center w-12 h-12 border-2 border-pink-500 text-pink-500 rounded-full">
                    <span className="text-2xl font-bold">{icon}</span>
                </div>
            </div>
            <div className="w-px h-full bg-gray-300"></div>
        </div>
        <div className="pb-12">
            <p className="mb-2 text-sm font-semibold text-gray-500">PASO {number}</p>
            <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
        </div>
    </div>
);

const HowToBuyPage: React.FC = () => {
    return (
        <div className="bg-white py-16 animate-fade-in">
            <div className="container mx-auto px-6">
                <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-4">Comprar en LUXA es Fácil y Seguro</h1>
                <p className="text-center text-lg text-gray-600 mb-12">Sigue estos sencillos pasos para adquirir tus productos de lujo favoritos.</p>
                <div className="max-w-2xl mx-auto">
                    <Step 
                        number={1} 
                        title="Explora y Descubre" 
                        icon="🔍"
                        description="Navega por nuestras categorías o utiliza la barra de búsqueda para encontrar ese artículo especial que estás buscando. Haz clic en cualquier producto para ver más detalles, fotos y descripciones."
                    />
                    <Step 
                        number={2} 
                        title="Agrega al Carrito" 
                        icon="🛒"
                        description="¿Encontraste algo que te encanta? Selecciona la cantidad que deseas y haz clic en el botón 'Agregar al Carrito'. Puedes seguir comprando o proceder al pago cuando estés listo."
                    />
                     <Step 
                        number={3} 
                        title="Revisa tu Carrito y Procede al Pago" 
                        icon="💳"
                        description="Cuando termines de comprar, haz clic en el ícono del carrito en la esquina superior derecha. Revisa que tus productos y cantidades sean correctos y haz clic en 'Proceder al Pago'."
                    />
                     <Step 
                        number={4} 
                        title="Completa tu Información" 
                        icon="🚚"
                        description="Ingresa tu dirección de envío y selecciona tu método de pago preferido (Tarjeta, OXXO o Mercado Pago). Llena los campos requeridos de forma segura."
                    />
                     <Step 
                        number={5} 
                        title="Confirma y ¡Listo!" 
                        icon="✨"
                        description="Revisa por última vez todos los detalles de tu pedido. Si todo es correcto, haz clic en 'Confirmar Pedido'. Recibirás una confirmación por correo electrónico y te notificaremos cuando tu pedido sea enviado."
                    />
                     <div className="flex">
                        <div className="flex flex-col items-center mr-4">
                            <div>
                                <div className="flex items-center justify-center w-12 h-12 bg-green-500 text-white rounded-full">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                </div>
                            </div>
                        </div>
                        <div className="pt-1">
                            <h3 className="text-xl font-bold text-gray-800">¡Disfruta tu compra!</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HowToBuyPage;