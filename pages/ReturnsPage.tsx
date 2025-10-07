import React from 'react';

const ReturnsPage: React.FC = () => {
    return (
        <div className="bg-white py-16">
            <div className="container mx-auto px-6 text-gray-700">
                <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-12">Política de Devoluciones</h1>
                <div className="max-w-4xl mx-auto">
                    <div className="p-8 border rounded-lg mb-8 bg-pink-50">
                         <p className="text-lg text-center mb-4">
                           En LUXA, tu satisfacción es nuestra prioridad. Si no estás completamente satisfecho con tu compra, estamos aquí para ayudarte.
                        </p>
                         <h2 className="text-2xl font-bold text-gray-800 mb-4">Plazo de Devolución</h2>
                        <p>
                            Aceptamos devoluciones dentro de los <span className="font-semibold">15 días naturales</span> a partir de la fecha en que recibiste tu pedido.
                        </p>
                    </div>

                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Condiciones para la Devolución</h2>
                    <p className="mb-6">Para que una devolución sea aceptada, el producto debe cumplir con las siguientes condiciones:</p>
                    <ul className="list-disc list-inside space-y-3 mb-8 bg-gray-50 p-6 rounded-md border">
                        <li>El artículo debe estar <span className="font-semibold">sin usar, sin lavar y en perfecto estado</span>, tal como lo recibiste.</li>
                        <li>Debe conservar todas sus <span className="font-semibold">etiquetas y empaques originales</span> intactos.</li>
                        <li>No se aceptan devoluciones en productos de ropa interior, trajes de baño, suplementos o artículos marcados como "Venta Final".</li>
                        <li>Debe incluirse el comprobante de compra o número de pedido.</li>
                    </ul>
                    
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Proceso de Devolución</h2>
                     <ol className="list-decimal list-inside space-y-4">
                        <li>
                            <strong>Inicia la solicitud:</strong> Envía un correo electrónico a <a href="mailto:devoluciones@luxa.com" className="text-pink-600 font-semibold">devoluciones@luxa.com</a> con tu número de pedido y el motivo de la devolución.
                        </li>
                        <li>
                           <strong>Recibe tu guía de envío:</strong> Nuestro equipo revisará tu solicitud. Si cumple con las condiciones, te enviaremos una guía de envío prepagada para que nos hagas llegar el producto.
                        </li>
                         <li>
                           <strong>Empaca el producto:</strong> Empaca el artículo de forma segura, idealmente en su caja original, y pega la guía de envío en el exterior del paquete.
                        </li>
                         <li>
                           <strong>Envía el paquete:</strong> Lleva el paquete a la sucursal de la paquetería indicada en la guía.
                        </li>
                         <li>
                           <strong>Recibe tu reembolso:</strong> Una vez que recibamos y verifiquemos el estado del producto, procesaremos tu reembolso en un plazo de 5 a 7 días hábiles. El reembolso se realizará al método de pago original.
                        </li>
                    </ol>

                     <div className="mt-10 p-6 bg-yellow-100 border border-yellow-300 rounded-md text-yellow-800">
                        <strong>Nota Importante:</strong> El costo del envío original no es reembolsable. LUXA cubrirá el costo del envío de la devolución.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReturnsPage;
