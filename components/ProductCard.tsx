
import React from 'react';
import { Product } from '../types';
import { useFavorites } from '../context/FavoritesContext';
import { useCurrency } from '../context/CurrencyContext';

interface ProductCardProps {
    product: Product;
    onSelectProduct: (product: Product) => void;
}

const HeartIconSolid = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-500" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
    </svg>
);

const HeartIconOutline = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
    </svg>
);

const ProductCard: React.FC<ProductCardProps> = ({ product, onSelectProduct }) => {
    const { toggleFavorite, isFavorite } = useFavorites();
    const { convertPrice } = useCurrency();
    const isFav = isFavorite(product.id);
    
    const handleFavoriteClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        toggleFavorite(product.id);
    };
    
    return (
        <div 
            onClick={() => onSelectProduct(product)}
            className="group cursor-pointer bg-white rounded-lg overflow-hidden transition-shadow duration-300 hover:shadow-xl"
        >
            <div className="relative">
                <img 
                    src={product.images[0]} 
                    alt={product.name} 
                    className="w-full h-64 md:h-80 object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                />
                {product.discountPrice && (
                    <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">OFERTA</span>
                )}
                <button 
                    onClick={handleFavoriteClick}
                    className="absolute top-3 right-3 bg-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                    {isFav ? <HeartIconSolid /> : <HeartIconOutline />}
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