import React from 'react';
import { Product } from '../types';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

interface HomePageProps {
    onSelectProduct: (product: Product) => void;
    onSelectCategory: (category: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onSelectProduct, onSelectCategory }) => {

    const newArrivals = products.slice(0, 4);
    const bestSellers = products.slice(4, 8);
    const dailyDeals = products.filter(p => p.discountPrice).slice(0, 4);

    return (
        <div>
            {/* Main Banner */}
            <div className="relative bg-gray-200 h-64 md:h-96 flex items-center justify-center text-center overflow-hidden">
                <img src="https://raw.githubusercontent.com/jorgezendejas1/luxa/main/img/banner_1.jpg" alt="Fashion Banner" className="absolute w-full h-full object-cover"/>
                <div className="relative bg-black bg-opacity-40 p-8 rounded-lg">
                    <h2 className="text-4xl md:text-6xl font-extrabold text-white tracking-wider">NUEVA COLECCIÓN</h2>
                    <p className="text-white text-lg mt-2 mb-6">Descubre las últimas tendencias de la temporada.</p>
                    <button onClick={() => onSelectCategory('all')} className="bg-white text-black font-bold py-3 px-8 rounded-full hover:bg-gray-200 transition-colors duration-300">
                        COMPRAR AHORA
                    </button>
                </div>
            </div>
            
            {/* Novedades Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Novedades</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                        {newArrivals.map(product => (
                            <ProductCard key={product.id} product={product} onSelectProduct={onSelectProduct} />
                        ))}
                    </div>
                </div>
            </section>
            
            {/* Category Banners */}
            <section className="container mx-auto px-4 my-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div onClick={() => onSelectCategory('Bolsas')} className="relative h-80 rounded-lg overflow-hidden group cursor-pointer">
                    <img src="https://raw.githubusercontent.com/jorgezendejas1/luxa/main/img/banner_2.jpg" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Bolsas"/>
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                        <h3 className="text-white text-4xl font-bold">Bolsas</h3>
                    </div>
                </div>
                 <div onClick={() => onSelectCategory('Accesorios')} className="relative h-80 rounded-lg overflow-hidden group cursor-pointer">
                    <img src="https://raw.githubusercontent.com/jorgezendejas1/luxa/main/img/banner_3.jpg" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Accesorios"/>
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                        <h3 className="text-white text-4xl font-bold">Accesorios</h3>
                    </div>
                </div>
            </section>

             {/* Ofertas del día Section */}
            <section className="py-16 bg-pink-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Ofertas del Día</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                        {dailyDeals.map(product => (
                            <ProductCard key={product.id} product={product} onSelectProduct={onSelectProduct} />
                        ))}
                    </div>
                </div>
            </section>

             {/* Más vendidos Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Más Vendidos</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                        {bestSellers.map(product => (
                            <ProductCard key={product.id} product={product} onSelectProduct={onSelectProduct} />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;