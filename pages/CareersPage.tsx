import React from 'react';

const CareersPage: React.FC = () => {
    const openPositions = [
        { title: 'Gerente de E-commerce', location: 'Ciudad de México', type: 'Tiempo Completo' },
        { title: 'Especialista en Marketing Digital', location: 'Remoto (México)', type: 'Tiempo Completo' },
        { title: 'Asistente de Compras de Moda', location: 'Ciudad de México', type: 'Medio Tiempo' },
        { title: 'Representante de Atención al Cliente de Lujo', location: 'Remoto (México)', type: 'Tiempo Completo' },
    ];

    return (
        <div className="bg-white">
            <div className="relative h-64 md:h-80 bg-gray-900">
                <img src="https://raw.githubusercontent.com/jorgezendejas1/luxa/main/img/careers_1.jpg" alt="Equipo colaborando" className="w-full h-full object-cover opacity-50" loading="lazy"/>
                <div className="absolute inset-0 flex items-center justify-center">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-wider text-center">Únete a Nuestro Equipo</h1>
                </div>
            </div>
            
            <div className="container mx-auto px-6 py-16 text-gray-700">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">Trabaja en LUXA</h2>
                    <p className="text-xl text-center mb-12">
                        Somos un equipo dinámico, innovador y apasionado por la moda y la tecnología. Si quieres ser parte de la revolución del e-commerce de lujo en México, este es tu lugar.
                    </p>

                    <div className="bg-pink-50 p-8 rounded-lg mb-12">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">¿Por qué trabajar con nosotros?</h3>
                        <ul className="list-disc list-inside space-y-2">
                            <li><strong>Cultura Innovadora:</strong> Fomentamos la creatividad y las nuevas ideas.</li>
                            <li><strong>Crecimiento Profesional:</strong> Ofrecemos oportunidades de desarrollo y aprendizaje continuo.</li>
                            <li><strong>Beneficios Competitivos:</strong> Salario atractivo, descuentos en productos y un gran ambiente laboral.</li>
                            <li><strong>Impacto Real:</strong> Tu trabajo contribuirá directamente al éxito de una marca en crecimiento.</li>
                        </ul>
                    </div>

                    <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Posiciones Abiertas</h2>
                    <div className="space-y-6">
                        {openPositions.map((job, index) => (
                            <div key={index} className="border p-6 rounded-lg flex flex-col md:flex-row justify-between items-center hover:shadow-md transition-shadow">
                                <div>
                                    <h3 className="text-xl font-semibold text-pink-600">{job.title}</h3>
                                    <p className="text-gray-500">{job.location} &middot; {job.type}</p>
                                </div>
                                <div className="mt-4 md:mt-0">
                                    <button className="bg-black text-white font-bold py-2 px-6 rounded-md hover:bg-gray-800 transition-colors">
                                        Aplicar Ahora
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                     <p className="text-center mt-12">
                        ¿No ves una posición que se ajuste a tu perfil? Envíanos tu CV a <a href="mailto:talento@luxa.com" className="text-pink-600 font-semibold">talento@luxa.com</a>. ¡Siempre estamos buscando gente increíble!
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CareersPage;