import React, { useState, useMemo } from 'react';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';

interface CategoryPageProps {
    products: Product[];
    categoryTitle: string;
    onSelectProduct: (product: Product) => void;
}

const CategoryPage: React.FC<CategoryPageProps> = ({ products, categoryTitle, onSelectProduct }) => {
    const [filters, setFilters] = useState({ price: 'all', color: 'all', sort: 'default' });

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const filteredAndSortedProducts = useMemo(() => {
        let tempProducts = [...products];

        // Sorting logic
        if (filters.sort === 'price_asc') {
            tempProducts.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
        } else if (filters.sort === 'price_desc') {
            tempProducts.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
        } else if (filters.sort === 'newest') {
            tempProducts.sort((a, b) => b.id - a.id);
        }

        return tempProducts;
    }, [products, filters]);


    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6 capitalize">{categoryTitle}</h1>
            <div className="flex flex-col md:flex-row gap-8">
                {/* Filters */}
                <aside className="w-full md:w-1/4">
                    <h2 className="text-xl font-semibold mb-4">Filtros</h2>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="sort" className="block text-sm font-medium text-gray-700">Ordenar por</label>
                            <select id="sort" name="sort" value={filters.sort} onChange={handleFilterChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm rounded-md">
                                <option value="default">Relevancia</option>
                                <option value="newest">Más nuevo</option>
                                <option value="price_asc">Precio: Menor a Mayor</option>
                                <option value="price_desc">Precio: Mayor a Menor</option>
                            </select>
                        </div>
                        {/* More filters can be added here */}
                        <div>
                            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Precio</label>
                             <select id="price" name="price" disabled className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 bg-gray-100 cursor-not-allowed sm:text-sm rounded-md">
                                <option>Todos</option>
                            </select>
                        </div>
                         <div>
                            <label htmlFor="color" className="block text-sm font-medium text-gray-700">Color</label>
                             <select id="color" name="color" disabled className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 bg-gray-100 cursor-not-allowed sm:text-sm rounded-md">
                                <option>Todos</option>
                            </select>
                        </div>
                    </div>
                </aside>

                {/* Product Grid */}
                <main className="w-full md:w-3/4">
                    {filteredAndSortedProducts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                            {filteredAndSortedProducts.map(product => (
                                <ProductCard key={product.id} product={product} onSelectProduct={onSelectProduct} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <h2 className="text-2xl font-semibold text-gray-700">No se encontraron productos</h2>
                            <p className="text-gray-500 mt-2">Intenta ajustar tu búsqueda o filtros.</p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default CategoryPage;