import React, { useState } from 'react';
import { Product, Page } from '../types';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import Breadcrumb from '../components/Breadcrumb';
import ImageZoomModal from '../components/ImageZoomModal';
import LazyImage from '../components/LazyImage';

interface ProductDetailPageProps {
    product: Product;
    onSelectProduct: (product: Product) => void;
    onNavigate: (page: Page) => void;
    onSelectCategory: (category: string) => void;
}

const StarIcon: React.FC<{ filled: boolean }> = ({ filled }) => (
    <svg className={`w-5 h-5 ${filled ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
);

const FacebookIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
);

const TwitterIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
);

const WhatsAppIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.956-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01s-.521.074-.792.372c-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
);


const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ product, onSelectProduct, onNavigate, onSelectCategory }) => {
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [isGalleryOpen, setIsGalleryOpen] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();
    const { convertPrice } = useCurrency();
    
    const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

    const handleAddToCart = () => {
        addToCart(product, quantity);
        alert(`${product.name} ha sido agregado al carrito.`);
    };
    
    const handleBuyNow = () => {
        addToCart(product, quantity);
        onNavigate('checkout');
    };

    const productUrl = window.location.href;
    const shareText = `¡Mira este increíble producto de Pitaya Glam: ${product.name}!`;
    const encodedUrl = encodeURIComponent(productUrl);
    const encodedText = encodeURIComponent(shareText);

    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
    const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`;
    const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodedText}%20${encodedUrl}`;

    const breadcrumbLinks = [
        { name: 'Inicio', onClick: () => onNavigate('home') },
        { name: product.category, onClick: () => onSelectCategory(product.category) },
        { name: product.name }
    ];
    
    const mainImage = product.images[activeImageIndex];

    return (
        <div className="container mx-auto px-4 py-10 animate-fade-in">
             <div className="mb-8">
                <Breadcrumb links={breadcrumbLinks} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Image Gallery */}
                <div className="relative group">
                    <LazyImage
                        key={mainImage}
                        src={mainImage}
                        alt={product.name}
                        onClick={() => setIsGalleryOpen(true)}
                        className="w-full h-auto max-h-[550px] object-cover rounded-lg shadow-lg mb-4 animate-fade-in-opacity cursor-zoom-in transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="flex space-x-2 overflow-x-auto py-2">
                        {product.images.map((img, index) => (
                            <LazyImage
                                key={index}
                                src={img}
                                alt={`${product.name} ${index + 1}`}
                                onClick={() => setActiveImageIndex(index)}
                                className={`w-20 h-20 object-cover rounded-md cursor-pointer border-2 flex-shrink-0 transition-all ${activeImageIndex === index ? 'border-pink-500 scale-105' : 'border-transparent hover:border-gray-300'}`}
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
                                <p className="text-3xl font-bold text-red-500">{convertPrice(product.discountPrice)}</p>
                                <p className="text-xl text-gray-500 line-through ml-3">{convertPrice(product.price)}</p>
                            </>
                        ) : (
                             <p className="text-3xl font-bold text-gray-800">{convertPrice(product.price)}</p>
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
                        <button onClick={handleBuyNow} className="flex-1 bg-black text-white font-bold py-3 px-6 rounded-md hover:bg-gray-800 transition-colors duration-300">
                            Comprar Ahora
                        </button>
                    </div>

                    <div className="mt-8 pt-4 border-t">
                        <div className="flex items-center space-x-4">
                            <span className="font-semibold text-gray-700">Compartir:</span>
                            <a href={facebookShareUrl} target="_blank" rel="noopener noreferrer" aria-label="Compartir en Facebook" className="text-gray-500 hover:text-blue-600 transition-colors">
                                <FacebookIcon />
                            </a>
                            <a href={twitterShareUrl} target="_blank" rel="noopener noreferrer" aria-label="Compartir en Twitter" className="text-gray-500 hover:text-blue-400 transition-colors">
                                <TwitterIcon />
                            </a>
                            <a href={whatsappShareUrl} target="_blank" rel="noopener noreferrer" aria-label="Compartir en WhatsApp" className="text-gray-500 hover:text-green-500 transition-colors">
                                <WhatsAppIcon />
                            </a>
                        </div>
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
                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                     {relatedProducts.map(p => (
                         <ProductCard key={p.id} product={p} onSelectProduct={onSelectProduct} />
                     ))}
                 </div>
            </div>
             <ImageZoomModal 
                isOpen={isGalleryOpen} 
                onClose={() => setIsGalleryOpen(false)} 
                images={product.images} 
                startIndex={activeImageIndex}
            />
        </div>
    );
};

export default ProductDetailPage;