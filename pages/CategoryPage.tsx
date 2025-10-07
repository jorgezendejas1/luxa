import React, { useState, useMemo } from 'react';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';

interface CategoryPageProps {
    products: Product[];
    categoryTitle: string;
    onSelectProduct: (product: Product) => void;
}

const FilterSection: React.FC<{ title: string; items: string[]; name: string; selectedItems: string[]; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; }> = ({ title, items, name, selectedItems, onChange }) => (
    <div>
        <h3 className="font-semibold mb-2">{title}</h3>
        <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
            {items.map(item => (
                <label key={item} className="flex items-center">
                    <input
                        type="checkbox"
                        name={name}
                        value={item}
                        checked={selectedItems.includes(item)}
                        onChange={onChange}
                        className="h-4 w-4 rounded border-gray-300 text-pink-600 focus:ring-pink-500"
                    />
                    <span className="ml-2 text-sm text-gray-600">{item}</span>
                </label>
            ))}
        </div>
    </div>
);

const CategoryPage: React.FC<CategoryPageProps> = ({ products, categoryTitle, onSelectProduct }) => {
    const [filters, setFilters] = useState({
        sort: 'default',
        brands: [] as string[],
        colors: [] as string[],
        sizes: [] as string[],
    });

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, checked } = e.target;
        setFilters(prev => {
            const currentValues = prev[name as 'brands' | 'colors' | 'sizes'];
            const newValues = checked
                ? [...currentValues, value]
                : currentValues.filter(item => item !== value);
            return { ...prev, [name]: newValues };
        });
    };
    
    const availableBrands = useMemo(() => Array.from(new Set(products.map(p => p.brand))).sort(), [products]);
    const availableColors = useMemo(() => Array.from(new Set(products.flatMap(p => p.colors))).sort(), [products]);
    const availableSizes = useMemo(() => Array.from(new Set(products.flatMap(p => p.sizes))).sort(), [products]);


    const filteredAndSortedProducts = useMemo(() => {
        let tempProducts = [...products];

        // Filter logic
        if (filters.brands.length > 0) {
            tempProducts = tempProducts.filter(p => filters.brands.includes(p.brand));
        }
        if (filters.colors.length > 0) {
            tempProducts = tempProducts.filter(p => p.colors.some(color => filters.colors.includes(color)));
        }
        if (filters.sizes.length > 0) {
            tempProducts = tempProducts.filter(p => p.sizes.some(size => filters.sizes.includes(size)));
        }

        // Sorting logic
        switch (filters.sort) {
            case 'price_asc':
                tempProducts.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
                break;
            case 'price_desc':
                tempProducts.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
                break;
            case 'newest':
                tempProducts.sort((a, b) => b.id - a.id);
                break;
            case 'rating_desc':
                tempProducts.sort((a, b) => b.rating - a.rating);
                break;
            default: // relevance
                break;
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
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-1">Ordenar por</label>
                            <select id="sort" name="sort" value={filters.sort} onChange={handleSelectChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm rounded-md">
                                <option value="default">Relevancia</option>
                                <option value="newest">Más nuevo</option>
                                <option value="price_asc">Precio: Menor a Mayor</option>
                                <option value="price_desc">Precio: Mayor a Menor</option>
                                <option value="rating_desc">Mejor Calificados</option>
                            </select>
                        </div>
                        <FilterSection title="Marca" name="brands" items={availableBrands} selectedItems={filters.brands} onChange={handleCheckboxChange} />
                        <FilterSection title="Color" name="colors" items={availableColors} selectedItems={filters.colors} onChange={handleCheckboxChange} />
                        <FilterSection title="Talla" name="sizes" items={availableSizes} selectedItems={filters.sizes} onChange={handleCheckboxChange} />
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