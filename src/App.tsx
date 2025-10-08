import React, { useState, useEffect } from 'react';
import { CurrencyProvider } from './context/CurrencyContext';
import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';
import Header from './components/Header';
import Footer from './components/Footer';
import BackToTopButton from './components/BackToTopButton';
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
import { products } from './data/products';
import { Product, Page, Order } from './types';

const App: React.FC = () => {
    const [page, setPage] = useState<Page>('home');
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [lastOrder, setLastOrder] = useState<Order | null>(null);
    const [showBackToTop, setShowBackToTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowBackToTop(window.scrollY > 300);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
    useEffect(() => {
        let title = 'LUXA';
        if (page === 'category' && selectedCategory && selectedCategory !== 'all') {
            title = `LUXA | ${selectedCategory}`;
        } else if (page === 'category' && searchQuery) {
             title = `LUXA | Resultados para "${searchQuery}"`;
        } else if (page === 'product' && selectedProduct) {
            title = `LUXA | ${selectedProduct.name}`;
        }
        document.title = title;
    }, [page, selectedCategory, selectedProduct, searchQuery]);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleNavigate = (newPage: Page) => {
        setPage(newPage);
        scrollToTop();
    };

    const handleSelectCategory = (category: string) => {
        setSelectedCategory(category);
        setSearchQuery('');
        setPage('category');
        scrollToTop();
    };

    const handleSelectProduct = (product: Product) => {
        setSelectedProduct(product);
        setPage('product');
        scrollToTop();
    };
    
    const handleSearch = (query: string) => {
        setSearchQuery(query);
        setSelectedCategory(null);
        setPage('category');
        scrollToTop();
    };

    const handlePlaceOrder = (order: Order) => {
        setLastOrder(order);
        setPage('confirmation');
        scrollToTop();
    };

    const renderPage = () => {
        switch (page) {
            case 'home':
                return <HomePage onSelectProduct={handleSelectProduct} onSelectCategory={handleSelectCategory} />;
            case 'category': {
                const productsToList = searchQuery
                    ? products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase()))
                    : selectedCategory === 'all' || selectedCategory === null
                        ? products
                        : products.filter(p => p.category === selectedCategory);
                const categoryTitle = searchQuery ? `Resultados para "${searchQuery}"` : (selectedCategory === 'all' || selectedCategory === null) ? 'Todos los productos' : selectedCategory;
                return <CategoryPage products={productsToList} categoryTitle={categoryTitle} onSelectProduct={handleSelectProduct} onNavigate={handleNavigate} />;
            }
            case 'product':
                return selectedProduct ? <ProductDetailPage product={selectedProduct} onSelectProduct={handleSelectProduct} onNavigate={handleNavigate} onSelectCategory={handleSelectCategory} /> : <HomePage onSelectProduct={handleSelectProduct} onSelectCategory={handleSelectCategory} />;
            case 'cart':
                return <CartPage onNavigate={handleNavigate} />;
            case 'checkout':
                return <CheckoutPage onPlaceOrder={handlePlaceOrder} />;
            case 'confirmation':
                return lastOrder ? <ConfirmationPage order={lastOrder} onNavigate={handleNavigate} /> : <HomePage onSelectProduct={handleSelectProduct} onSelectCategory={handleSelectCategory} />;
            case 'wishlist':
                return <WishlistPage onSelectProduct={handleSelectProduct} onNavigate={handleNavigate} />;
            case 'about':
                return <AboutUsPage />;
            case 'careers':
                return <CareersPage />;
            case 'press':
                return <PressPage />;
            case 'help':
                return <HelpCenterPage onNavigate={handleNavigate} />;
            case 'how-to-buy':
                return <HowToBuyPage />;
            case 'shipping':
                return <ShippingPage />;
            case 'returns':
                return <ReturnsPage />;
            default:
                return <HomePage onSelectProduct={handleSelectProduct} onSelectCategory={handleSelectCategory} />;
        }
    };

    // Create a unique key for the main content area.
    // When this key changes, React will re-mount the component,
    // triggering the entry animation every time a new page is rendered.
    const pageKey = `${page}-${selectedCategory || ''}-${searchQuery || ''}-${selectedProduct?.id || ''}`;

    return (
        <CurrencyProvider>
            <CartProvider>
                <FavoritesProvider>
                    <div className="flex flex-col min-h-screen font-sans">
                        <Header onNavigate={handleNavigate} onSelectCategory={handleSelectCategory} onSearch={handleSearch} />
                        <main key={pageKey} className="flex-grow">
                            {renderPage()}
                        </main>
                        <Footer onNavigate={handleNavigate} />
                        <BackToTopButton isVisible={showBackToTop} onClick={scrollToTop} />
                    </div>
                </FavoritesProvider>
            </CartProvider>
        </CurrencyProvider>
    );
};

export default App;
