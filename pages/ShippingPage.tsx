import React from 'react';

const ShippingPage: React.FC = () => {
    return (
        <div className="bg-white py-16 animate-fade-in">
            <div className="container mx-auto px-6 text-gray-700">
                <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-12">Envíos y Entregas</h1>
                <div className="max-w-4xl mx-auto">
                    <div className="p-8 border rounded-lg mb-8 bg-gray-50">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Costos de Envío</h2>
                        <p className="text-lg">
                            <span className="font-bold text-pink-600">Envío Gratis:</span> En todas las órdenes superiores a <span className="font-semibold">$999.00 MXN</span>.
                        </p>
                        <p className="mt-2">
                            <span className="font-bold">Envío Estándar:</span> Para órdenes menores a $999.00 MXN, se aplica una tarifa fija de <span className="font-semibold">$150.00 MXN</span> a cualquier parte de la República Mexicana.
                        </p>
                    </div>

                    <div className="p-8 border rounded-lg mb-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Tiempos de Entrega</h2>
                        <ul className="list-disc list-inside space-y-2">
                            <li><strong>Procesamiento del pedido:</strong> Los pedidos se procesan en un plazo de 1 a 2 días hábiles después de la confirmación del pago.</li>
                            <li><strong>Tiempo de tránsito:</strong> Una vez enviado, el tiempo de entrega estimado es de <span className="font-semibold">3 a 5 días hábiles</span>.</li>
                            <li><strong>Horario de entrega:</strong> Las entregas se realizan de lunes a viernes en horario laboral.</li>
                            <li><strong>Zonas extendidas:</strong> Algunas áreas remotas pueden experimentar tiempos de entrega ligeramente más largos.</li>
                        </ul>
                    </div>

                    <div className="p-8 border rounded-lg mb-8 bg-gray-50">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Seguimiento de Pedido</h2>
                        <p>
                            Una vez que tu pedido haya sido enviado, recibirás un correo electrónico de confirmación de envío que incluirá un número de seguimiento. Podrás usar este número para rastrear el estado de tu paquete directamente en el sitio web de la paquetería (Estafeta, FedEx, o DHL).
                        </p>
                    </div>
                     <div className="p-8 border rounded-lg">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Consideraciones Importantes</h2>
                         <ul className="list-disc list-inside space-y-2">
                            <li>Los días hábiles no incluyen fines de semana ni días festivos.</li>
                            <li>No nos hacemos responsables por retrasos causados por la paquetería o por información de envío incorrecta proporcionada por el cliente.</li>
                             <li>Es responsabilidad del cliente proporcionar una dirección de entrega completa y correcta.</li>
                             <li>Si tienes alguna pregunta sobre tu envío, no dudes en contactar a nuestro equipo de <a href="mailto:soporte@luxa.com" className="text-pink-600 font-semibold">atención al cliente</a>.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShippingPage;