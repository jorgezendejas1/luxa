import React from 'react';
import { useFavorites } from '../context/FavoritesContext';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';
import { products } from '../data/products';
import { Product, Page } from '../types';

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

interface WishlistPageProps {
    onSelectProduct: (product: Product) => void;
    onNavigate: (page: Page) => void;
}

const WishlistPage: React.FC<WishlistPageProps> = ({ onSelectProduct, onNavigate }) => {
    const { favorites, toggleFavorite } = useFavorites();
    const { addToCart } = useCart();
    const { convertPrice } = useCurrency();
    const favoritedProducts = products.filter(product => favorites.includes(product.id));

    const handleAddToCart = (product: Product) => {
        addToCart(product, 1);
        alert(`${product.name} ha sido agregado al carrito.`);
    };

    if (favoritedProducts.length === 0) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <h1 className="text-3xl font-bold mb-4">Tu wishlist está vacía</h1>
                <p className="text-gray-600 mb-8">Guarda tus productos favoritos haciendo clic en el corazón.</p>
                <button onClick={() => onNavigate('home')} className="bg-black text-white font-bold py-3 px-8 rounded-md hover:bg-gray-800 transition-colors">
                    Explorar Productos
                </button>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Mi Wishlist</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {favoritedProducts.map(product => (
                    <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden group relative flex flex-col">
                         <button 
                            onClick={() => toggleFavorite(product.id)}
                            className="absolute top-2 right-2 bg-white rounded-full p-1.5 z-10 text-gray-500 hover:text-red-500 transition-colors"
                            aria-label="Eliminar de la wishlist"
                        >
                            <CloseIcon />
                        </button>
                        <div onClick={() => onSelectProduct(product)} className="cursor-pointer overflow-hidden">
                            <img src={product.images[0]} alt={product.name} className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy"/>
                        </div>
                        <div className="p-4 flex flex-col flex-grow">
                            <h3 className="text-sm font-semibold text-gray-700 truncate flex-grow cursor-pointer" onClick={() => onSelectProduct(product)}>{product.name}</h3>
                            <div className="flex items-baseline mt-2 mb-4">
                                {product.discountPrice ? (
                                    <>
                                        <p className="text-lg font-bold text-red-500">{convertPrice(product.discountPrice)}</p>
                                        <p className="text-sm text-gray-500 line-through ml-2">{convertPrice(product.price)}</p>
                                    </>
                                ) : (
                                    <p className="text-lg font-bold text-gray-800">{convertPrice(product.price)}</p>
                                )}
                            </div>
                            <button 
                                onClick={() => handleAddToCart(product)}
                                className="w-full bg-pink-500 text-white font-bold py-2 rounded-md hover:bg-pink-600 transition-colors mt-auto"
                            >
                                Agregar al Carrito
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WishlistPage;