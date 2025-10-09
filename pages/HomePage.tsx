import React from 'react';
import { Product } from '../types';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import LazyImage from '../components/LazyImage';

interface HomePageProps {
    onSelectProduct: (product: Product) => void;
    onSelectCategory: (category: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onSelectProduct, onSelectCategory }) => {

    const newArrivals = products.slice(0, 4);
    const bestSellers = products.slice(4, 8);
    const dailyDeals = products.filter(p => p.discountPrice).slice(0, 4);

    return (
        <div className="animate-fade-in">
            {/* Main Banner */}
            <div className="relative bg-gray-200 h-64 md:h-96 flex items-center justify-center text-center overflow-hidden">
                <LazyImage src="https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Fashion Banner" className="absolute w-full h-full object-cover"/>
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
                    <LazyImage src="https://images.unsplash.com/photo-1553062407-98eeb6e0e843?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Bolsas"/>
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                        <h3 className="text-white text-4xl font-bold">Bolsas</h3>
                    </div>
                </div>
                 <div onClick={() => onSelectCategory('Accesorios')} className="relative h-80 rounded-lg overflow-hidden group cursor-pointer">
                    <LazyImage src="https://images.unsplash.com/photo-1620912189879-c73e1b01a1e0?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Accesorios"/>
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