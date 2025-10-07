
import React, { useState, useEffect } from 'react';
import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { CurrencyProvider } from './context/CurrencyContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import ConfirmationPage from './pages/ConfirmationPage';
import AboutUsPage from './pages/AboutUsPage';
import CareersPage from './pages/CareersPage';
import PressPage from './pages/PressPage';
import HelpCenterPage from './pages/HelpCenterPage';
import HowToBuyPage from './pages/HowToBuyPage';
import ShippingPage from './pages/ShippingPage';
import ReturnsPage from './pages/ReturnsPage';
import WishlistPage from './pages/WishlistPage';
import BackToTopButton from './components/BackToTopButton';
import { products } from './data/products';
import { Product, Page, Order } from './types';

const App: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<Page>('home');
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [lastOrder, setLastOrder] = useState<Order | null>(null);
    const [showBackToTop, setShowBackToTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setShowBackToTop(true);
            } else {
                setShowBackToTop(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const getTitle = () => {
            switch (currentPage) {
                case 'home':
                    return 'LUXA | Moda Premium en México';
                case 'category':
                    const title = searchQuery ? `Resultados para "${searchQuery}"` : selectedCategory === 'all' ? 'Todos los productos' : selectedCategory;
                    return `LUXA | ${title}`;
                case 'product':
                    return selectedProduct ? `LUXA | ${selectedProduct.name}` : 'LUXA';
                case 'cart':
                    return 'LUXA | Carrito de Compras';
                case 'checkout':
                    return 'LUXA | Finalizar Compra';
                case 'confirmation':
                    return 'LUXA | Confirmación de Pedido';
                case 'about':
                    return 'LUXA | Nuestra Historia';
                case 'careers':
                    return 'LUXA | Carreras';
                case 'press':
                    return 'LUXA | Prensa';
                case 'help':
                    return 'LUXA | Centro de Ayuda';
                case 'howtobuy':
                    return 'LUXA | Cómo Comprar';
                case 'shipping':
                    return 'LUXA | Envíos y Entregas';
                case 'returns':
                    return 'LUXA | Política de Devoluciones';
                case 'wishlist':
                    return 'LUXA | Mi Wishlist';
                default:
                    return 'LUXA';
            }
        };
        document.title = getTitle();
    }, [currentPage, selectedProduct, selectedCategory, searchQuery]);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const navigateTo = (page: Page) => {
        setCurrentPage(page);
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const handleSelectProduct = (product: Product) => {
        setSelectedProduct(product);
        navigateTo('product');
    };

    const handleSelectCategory = (category: string) => {
        setSelectedCategory(category);
        setSearchQuery('');
        navigateTo('category');
    };
    
    const handleSearch = (query: string) => {
        setSearchQuery(query);
        setSelectedCategory('all');
        navigateTo('category');
    };
    
    const handlePlaceOrder = (order: Order) => {
      setLastOrder(order);
      navigateTo('confirmation');
    };

    const renderPage = () => {
        switch (currentPage) {
            case 'home':
                return <HomePage onSelectProduct={handleSelectProduct} onSelectCategory={handleSelectCategory} />;
            case 'category':
                const filteredProducts = products.filter(p => 
                    (selectedCategory === 'all' || p.category === selectedCategory) &&
                    (p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase()))
                );
                return <CategoryPage 
                    products={filteredProducts} 
                    categoryTitle={searchQuery ? `Resultados para "${searchQuery}"` : selectedCategory === 'all' ? 'Todos los productos' : selectedCategory} 
                    onSelectProduct={handleSelectProduct}
                    onNavigate={navigateTo}
                />;
            case 'product':
                if (selectedProduct) {
                    return <ProductDetailPage 
                        product={selectedProduct} 
                        onSelectProduct={handleSelectProduct} 
                        onNavigate={navigateTo}
                        onSelectCategory={handleSelectCategory}
                    />;
                }
                return <HomePage onSelectProduct={handleSelectProduct} onSelectCategory={handleSelectCategory} />; // fallback
            case 'cart':
                return <CartPage onNavigate={navigateTo} />;
            case 'checkout':
                return <CheckoutPage onPlaceOrder={handlePlaceOrder} />;
            case 'confirmation':
              return lastOrder ? <ConfirmationPage order={lastOrder} onNavigate={navigateTo} /> : <HomePage onSelectProduct={handleSelectProduct} onSelectCategory={handleSelectCategory} />;
            case 'about':
                return <AboutUsPage />;
            case 'careers':
                return <CareersPage />;
            case 'press':
                return <PressPage />;
            case 'help':
                return <HelpCenterPage onNavigate={navigateTo} />;
            case 'howtobuy':
                return <HowToBuyPage />;
            case 'shipping':
                return <ShippingPage />;
            case 'returns':
                return <ReturnsPage />;
            case 'wishlist':
                return <WishlistPage onSelectProduct={handleSelectProduct} onNavigate={navigateTo} />;
            default:
                return <HomePage onSelectProduct={handleSelectProduct} onSelectCategory={handleSelectCategory} />;
        }
    };

    return (
        <CurrencyProvider>
            <CartProvider>
                <FavoritesProvider>
                    <div className="flex flex-col min-h-screen font-sans">
                        <Header onNavigate={navigateTo} onSelectCategory={handleSelectCategory} onSearch={handleSearch} />
                        <main className="flex-grow animate-fade-in" key={currentPage}>
                            {renderPage()}
                        </main>
                        <Footer onNavigate={navigateTo} />
                        <BackToTopButton isVisible={showBackToTop} onClick={scrollToTop} />
                    </div>
                </FavoritesProvider>
            </CartProvider>
        </CurrencyProvider>
    );
};

export default App;