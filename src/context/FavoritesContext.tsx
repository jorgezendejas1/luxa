import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Product } from '../types';

interface FavoritesContextType {
    favorites: number[];
    toggleFavorite: (productId: number) => void;
    isFavorite: (productId: number) => boolean;
    favoritesCount: number;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [favorites, setFavorites] = useState<number[]>([]);

    const toggleFavorite = (productId: number) => {
        setFavorites(prev =>
            prev.includes(productId)
                ? prev.filter(id => id !== productId)
                : [...prev, productId]
        );
    };

    const isFavorite = (productId: number) => {
        return favorites.includes(productId);
    };
    
    const favoritesCount = favorites.length;

    return (
        <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite, favoritesCount }}>
            {children}
        </FavoritesContext.Provider>
    );
};

export const useFavorites = (): FavoritesContextType => {
    const context = useContext(FavoritesContext);
    if (context === undefined) {
        throw new Error('useFavorites must be used within a FavoritesProvider');
    }
    return context;
};
