
import React, { useState } from 'react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

interface ProductDetailPageProps {
    product: Product;
    onSelectProduct: (product: Product) => void;
}

const StarIcon = ({ filled }: { filled: boolean }) => (
    <svg className={`w-5 h-5 ${filled ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
);

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ product, onSelectProduct }) => {
    const [mainImage, setMainImage] = useState(product.images[0]);
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();
    
    const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

    const handleAddToCart = () => {
        addToCart(product, quantity);
    };

    return (
        <div className="container mx-auto px-4 py-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Image Gallery */}
                <div>
                    <img src={mainImage} alt={product.name} className="w-full h-auto max-h-[550px] object-cover rounded-lg shadow-lg mb-4" />
                    <div className="flex space-x-2">
                        {product.images.map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                alt={`${product.name} ${index + 1}`}
                                onClick={() => setMainImage(img)}
                                className={`w-20 h-20 object-cover rounded-md cursor-pointer border-2 ${mainImage === img ? 'border-pink-500' : 'border-transparent'}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Product Info */}
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800">{product.name}</h1>
                    <div className="flex items-center my-4">
                        <div className="flex">
                            {[...Array(5)].map((_, i) => <StarIcon key={i} filled={i < Math.round(product.rating)} />)}
                        </div>
                        <span className="ml-2 text-gray-600">{product.rating} ({product.reviews.length} opiniones)</span>
                    </div>
                    <div className="flex items-baseline my-4">
                        {product.discountPrice ? (
                             <>
                                <p className="text-3xl font-bold text-red-500">${product.discountPrice.toLocaleString('es-MX')} MXN</p>
                                <p className="text-xl text-gray-500 line-through ml-3">${product.price.toLocaleString('es-MX')} MXN</p>
                            </>
                        ) : (
                             <p className="text-3xl font-bold text-gray-800">${product.price.toLocaleString('es-MX')} MXN</p>
                        )}
                    </div>
                    <p className="text-gray-600 leading-relaxed">{product.description}</p>
                    
                    <div className="my-6">
                        <label htmlFor="quantity" className="font-semibold mr-4">Cantidad:</label>
                        <input 
                          type="number" 
                          id="quantity"
                          value={quantity}
                          onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
                          min="1"
                          max={product.stock}
                          className="w-20 border border-gray-300 text-center rounded-md py-2"
                        />
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button onClick={handleAddToCart} className="flex-1 bg-pink-500 text-white font-bold py-3 px-6 rounded-md hover:bg-pink-600 transition-colors duration-300">
                            Agregar al Carrito
                        </button>
                        <button className="flex-1 bg-black text-white font-bold py-3 px-6 rounded-md hover:bg-gray-800 transition-colors duration-300">
                            Comprar Ahora
                        </button>
                    </div>
                </div>
            </div>

            {/* Reviews Section */}
            <div className="my-16">
                 <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">Opiniones de Clientes</h2>
                 {product.reviews.length > 0 ? (
                    <div className="space-y-6">
                    {product.reviews.map(review => (
                        <div key={review.id} className="border p-4 rounded-lg">
                            <div className="flex items-center mb-2">
                                <div className="flex">
                                     {[...Array(5)].map((_, i) => <StarIcon key={i} filled={i < review.rating} />)}
                                </div>
                                <p className="ml-4 font-bold">{review.author}</p>
                            </div>
                            <p className="text-gray-600">{review.comment}</p>
                        </div>
                    ))}
                    </div>
                 ) : (
                    <p>Este producto aún no tiene opiniones.</p>
                 )}
            </div>

            {/* Related Products */}
            <div className="my-16">
                 <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">Productos Similares</h2>
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                     {relatedProducts.map(p => (
                         <ProductCard key={p.id} product={p} onSelectProduct={onSelectProduct} />
                     ))}
                 </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;
