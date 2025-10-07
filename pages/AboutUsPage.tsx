import React from 'react';

const AboutUsPage: React.FC = () => {
    return (
        <div className="bg-white animate-fade-in">
            <div className="relative h-64 md:h-80 bg-gray-900">
                <img src="https://raw.githubusercontent.com/jorgezendejas1/luxa/main/img/about_1.jpg" alt="Equipo de LUXA trabajando" className="w-full h-full object-cover opacity-50" loading="lazy"/>
                <div className="absolute inset-0 flex items-center justify-center">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-wider text-center">Nuestra Historia</h1>
                </div>
            </div>
            
            <div className="container mx-auto px-6 py-16 text-gray-700 leading-relaxed">
                <div className="max-w-4xl mx-auto">
                    <p className="text-xl mb-8">
                        En el corazón de México, nació LUXA con una visión clara: redefinir el lujo y hacerlo accesible. Fundada por un grupo de apasionados de la moda, nuestra tienda surgió de la creencia de que el estilo no debería tener fronteras y que todos merecen experimentar la emoción de poseer piezas de diseñador auténticas y de alta calidad.
                    </p>

                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Nuestra Misión</h2>
                    <p className="mb-8">
                        Nuestra misión es ser el destino de moda premium de confianza en México. Nos dedicamos a curar una selección excepcional de las marcas más deseadas del mundo, ofreciendo una experiencia de compra en línea que es tan lujosa y personal como visitar una boutique de alta gama. Nos comprometemos a la autenticidad, la calidad y un servicio al cliente sin igual.
                    </p>

                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Nuestros Valores</h2>
                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        <div className="p-6 border rounded-lg">
                            <h3 className="text-xl font-semibold mb-2">💎 Curación Excepcional</h3>
                            <p>Cada artículo en LUXA es seleccionado a mano por nuestro equipo de expertos para asegurar que solo ofrecemos las piezas más relevantes y de la más alta calidad de cada temporada.</p>
                        </div>
                        <div className="p-6 border rounded-lg">
                             <h3 className="text-xl font-semibold mb-2">🤝 Confianza y Autenticidad</h3>
                            <p>Garantizamos la autenticidad de cada producto. Trabajamos directamente con las marcas y distribuidores autorizados para que compres con total tranquilidad.</p>
                        </div>
                        <div className="p-6 border rounded-lg">
                             <h3 className="text-xl font-semibold mb-2">💖 Pasión por el Cliente</h3>
                            <p>Tú eres el centro de todo lo que hacemos. Desde la navegación en nuestra web hasta la entrega de tu pedido, nos esforzamos por superar tus expectativas en cada paso.</p>
                        </div>
                    </div>
                     <p className="mt-12 text-center text-lg">
                        Gracias por ser parte de la comunidad LUXA. Juntos, estamos construyendo el futuro de la moda de lujo en México.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AboutUsPage;