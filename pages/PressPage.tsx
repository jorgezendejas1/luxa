import React from 'react';
import LazyImage from '../components/LazyImage';

const PressPage: React.FC = () => {
    const pressReleases = [
        {
            date: '15 de Julio, 2024',
            title: 'Pitaya Glam Lanza su Plataforma E-commerce para Revolucionar el Mercado de Lujo en México',
            link: '#'
        },
        {
            date: '1 de Agosto, 2024',
            title: 'Pitaya Glam Anuncia Colaboraciones Exclusivas con Marcas de Diseñador Internacionales',
            link: '#'
        },
        {
            date: '20 de Agosto, 2024',
            title: 'Reporte de Tendencias de Pitaya Glam: Lo que Viene para la Temporada Otoño/Invierno',
            link: '#'
        }
    ];

    return (
        <div className="bg-white animate-fade-in">
            <div className="relative h-64 md:h-80 bg-gray-900">
                <LazyImage src="https://images.unsplash.com/photo-1505238680356-6678fb750953?q=80&w=1994&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Prensa y medios" className="w-full h-full object-cover opacity-50"/>
                <div className="absolute inset-0 flex items-center justify-center">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-wider text-center">Prensa</h1>
                </div>
            </div>
            
            <div className="container mx-auto px-6 py-16 text-gray-700">
                <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-12">
                    <div className="md:col-span-2">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6">Comunicados de Prensa</h2>
                        <div className="space-y-8">
                            {pressReleases.map((release, index) => (
                                <div key={index} className="border-b pb-4">
                                    <p className="text-sm text-gray-500">{release.date}</p>
                                    <h3 className="text-xl font-semibold my-1">{release.title}</h3>
                                    <a href={release.link} className="text-pink-600 font-semibold hover:underline">Leer más &rarr;</a>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="md:col-span-1">
                        <div className="bg-gray-50 p-6 rounded-lg border">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">Contacto de Medios</h2>
                            <p className="mb-4">
                                Para todas las consultas de prensa, entrevistas, o solicitudes de imágenes de alta resolución, por favor contacta a nuestro equipo de relaciones públicas.
                            </p>
                            <p className="font-semibold">Equipo de Prensa Pitaya Glam</p>
                            <a href="mailto:prensa@pitayaglam.com" className="text-pink-600 break-words">prensa@pitayaglam.com</a>
                            <p className="mt-4">+52 55 1234 5678</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PressPage;