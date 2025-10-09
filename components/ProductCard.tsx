import React from 'react';
import { Product } from '../types';
import { useCurrency } from '../context/CurrencyContext';
import { useFavorites } from '../context/FavoritesContext';
import LazyImage from './LazyImage';

interface ProductCardProps {
    product: Product;
    onSelectProduct: (product: Product) => void;
}

const HeartIcon: React.FC<{ filled: boolean }> = ({ filled }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${filled ? 'text-pink-500' : 'text-gray-400'}`} fill={filled ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.664l1.318-1.346a4.5 4.5 0 116.364 6.364L12 21l-7.682-7.682a4.5 4.5 0 010-6.364z" />
    </svg>
);

const ProductCard: React.FC<ProductCardProps> = ({ product, onSelectProduct }) => {
    const { convertPrice } = useCurrency();
    const { isFavorite, toggleFavorite } = useFavorites();

    const isFav = isFavorite(product.id);

    const handleFavoriteClick = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent navigation when clicking the heart
        toggleFavorite(product.id);
    };
    
    return (
        <div 
            onClick={() => onSelectProduct(product)}
            className="group bg-white rounded-lg overflow-hidden transition-shadow duration-300 hover:shadow-xl cursor-pointer"
        >
            <div className="relative">
                <LazyImage 
                    src={product.images[0]} 
                    alt={product.name} 
                    className="w-full h-64 md:h-80 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {product.discountPrice && (
                    <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">OFERTA</span>
                )}
                 <button
                    onClick={handleFavoriteClick}
                    className="absolute top-2 right-2 bg-white rounded-full p-2 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                    aria-label="Añadir a wishlist"
                >
                    <HeartIcon filled={isFav} />
                </button>
            </div>
            <div className="p-4">
                <h3 className="text-sm font-semibold text-gray-700 truncate">{product.name}</h3>
                <div className="flex items-baseline mt-2">
                    {product.discountPrice ? (
                        <>
                            <p className="text-lg font-bold text-red-500">{convertPrice(product.discountPrice)}</p>
                            <p className="text-sm text-gray-500 line-through ml-2">{convertPrice(product.price)}</p>
                        </>
                    ) : (
                        <p className="text-lg font-bold text-gray-800">{convertPrice(product.price)}</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;