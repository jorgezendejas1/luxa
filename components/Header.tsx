import React, { useState } from 'react';
import { Page } from '../types';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';

interface HeaderProps {
    onNavigate: (page: Page) => void;
    onSelectCategory: (category: string) => void;
    onSearch: (query: string) => void;
}

const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);

const HeartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
    </svg>
);

const CartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
);

const MenuIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
);

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const Header: React.FC<HeaderProps> = ({ onNavigate, onSelectCategory, onSearch }) => {
    const { cartCount } = useCart();
    const { favoritesCount } = useFavorites();
    const [searchQuery, setSearchQuery] = useState('');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            onSearch(searchQuery.trim());
            setIsMobileMenuOpen(false); // Close mobile menu on search
        }
    };
    
    const handleMobileLinkClick = (category: string) => {
        onSelectCategory(category);
        setIsMobileMenuOpen(false);
    };

    const categories = ["Bolsas", "Tenis", "Sandalias", "Ropa", "Accesorios", "Suplementos", "Sets de Regalo"];

    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="bg-pink-500 text-white text-center p-2 text-sm font-semibold">
                Envíos a todo México 🇲🇽 | Paga con Oxxo, Mercado Pago o Tarjeta
            </div>
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center py-4">
                    {/* Left side: Hamburger (mobile) + Logo */}
                    <div className="flex items-center space-x-4">
                        <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden text-gray-600 hover:text-pink-500">
                            <MenuIcon />
                        </button>
                        <h1 onClick={() => onNavigate('home')} className="text-3xl md:text-4xl font-bold text-gray-800 cursor-pointer tracking-widest uppercase">
                            LUXA
                        </h1>
                    </div>
                    
                    {/* Center: Search bar (desktop) */}
                    <div className="hidden md:flex flex-1 justify-center">
                       <form onSubmit={handleSearchSubmit} className="relative w-full max-w-lg">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Buscar productos..."
                                className="w-full border border-gray-300 rounded-full py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-pink-300"
                            />
                            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                                <SearchIcon />
                            </button>
                        </form>
                    </div>

                    {/* Right side: Icons */}
                    <div className="flex items-center space-x-4">
                        <button className="text-gray-600 hover:text-pink-500"><UserIcon /></button>
                        <button className="relative text-gray-600 hover:text-pink-500">
                            <HeartIcon />
                             {favoritesCount > 0 && <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">{favoritesCount}</span>}
                        </button>
                        <button onClick={() => onNavigate('cart')} className="relative text-gray-600 hover:text-pink-500">
                            <CartIcon />
                            {cartCount > 0 && <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">{cartCount}</span>}
                        </button>
                    </div>
                </div>
            </div>
            <nav className="hidden md:flex justify-center border-t border-gray-200">
                 <ul className="flex space-x-8 py-3">
                    <li onClick={() => onSelectCategory('all')} className="text-gray-600 font-semibold hover:text-pink-500 cursor-pointer transition-colors duration-200">Novedades</li>
                    {categories.map(cat => (
                        <li key={cat} onClick={() => onSelectCategory(cat)} className="text-gray-600 font-semibold hover:text-pink-500 cursor-pointer transition-colors duration-200">{cat}</li>
                    ))}
                    <li onClick={() => onSelectCategory('all')} className="text-red-500 font-semibold hover:text-red-700 cursor-pointer transition-colors duration-200">Ofertas</li>
                </ul>
            </nav>
            
            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 bg-white z-50 flex flex-col md:hidden">
                    <div className="flex justify-between items-center p-4 border-b">
                         <h1 className="text-3xl font-bold text-gray-800 tracking-widest uppercase">LUXA</h1>
                         <button onClick={() => setIsMobileMenuOpen(false)} className="text-gray-600">
                             <CloseIcon />
                         </button>
                    </div>

                    <div className="p-4 border-b">
                        <form onSubmit={handleSearchSubmit} className="relative w-full">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Buscar productos..."
                                className="w-full border border-gray-300 rounded-full py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-pink-300"
                            />
                            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                                <SearchIcon />
                            </button>
                        </form>
                    </div>

                    <nav className="flex-grow p-4">
                        <ul className="flex flex-col space-y-6 text-lg font-semibold">
                             <li onClick={() => handleMobileLinkClick('all')} className="text-gray-700 hover:text-pink-500 cursor-pointer">Novedades</li>
                             {categories.map(cat => (
                                <li key={cat} onClick={() => handleMobileLinkClick(cat)} className="text-gray-700 hover:text-pink-500 cursor-pointer">{cat}</li>
                             ))}
                             <li onClick={() => handleMobileLinkClick('all')} className="text-red-500 hover:text-red-700 cursor-pointer">Ofertas</li>
                        </ul>
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Header;