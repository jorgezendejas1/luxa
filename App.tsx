
import React, { useState } from 'react';
import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';
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
import { products } from './data/products';
import { Product, Page, Order } from './types';

const App: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<Page>('home');
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [lastOrder, setLastOrder] = useState<Order | null>(null);

    const navigateTo = (page: Page) => {
        setCurrentPage(page);
        window.scrollTo(0, 0);
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
                return <CategoryPage products={filteredProducts} categoryTitle={searchQuery ? `Resultados para "${searchQuery}"` : selectedCategory === 'all' ? 'Todos los productos' : selectedCategory} onSelectProduct={handleSelectProduct} />;
            case 'product':
                if (selectedProduct) {
                    return <ProductDetailPage product={selectedProduct} onSelectProduct={handleSelectProduct} onNavigate={navigateTo} />;
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
                return <HelpCenterPage />;
            case 'howtobuy':
                return <HowToBuyPage />;
            case 'shipping':
                return <ShippingPage />;
            case 'returns':
                return <ReturnsPage />;
            default:
                return <HomePage onSelectProduct={handleSelectProduct} onSelectCategory={handleSelectCategory} />;
        }
    };

    return (
        <CartProvider>
            <FavoritesProvider>
                <div className="flex flex-col min-h-screen font-sans">
                    <Header onNavigate={navigateTo} onSelectCategory={handleSelectCategory} onSearch={handleSearch} />
                    <main className="flex-grow">
                        {renderPage()}
                    </main>
                    <Footer onNavigate={navigateTo} />
                </div>
            </FavoritesProvider>
        </CartProvider>
    );
};

export default App;
