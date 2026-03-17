'use client';
import { AuthModal } from '@/components/AuthModal';
import { CartDrawer, CartItem } from '@/components/CartDrawer';
import { CategoryNav } from '@/components/CategoryNav';
import { ChatWidget } from '@/components/ChatWidget';
import { ContactModal } from '@/components/ContactModal';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Notification, NotificationItem } from '@/components/Notification';
import { ProductSection } from '@/components/ProductSection';
import { PromoBanner } from '@/components/PromoBanner';
import { SupplierModal } from '@/components/SupplierModal';
import { mockProductsAccounts, mockProductsGameKeys, mockProductsGiftCards, mockProductsSoftware, mockProductsSubscriptions, mockProductsVPN, Product } from '@/data/mockData';
import { useEffect, useState, useRef } from 'react';

 function Home() {
  // Scroll State
  const [scrolled, setScrolled] = useState(false);
  // App State
  const [user, setUser] = useState<{
    username: string;
    email: string;
  } | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [activeCategory, setActiveCategory] = useState('Accounts');
  // Modal States
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authTab, setAuthTab] = useState<'signin' | 'signup'>('signin');
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isSupplierOpen, setIsSupplierOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  // Section Refs for scrolling
  const sectionRefs = useRef<{
    [key: string]: HTMLElement | null;
  }>({});
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  // Notification Helper
  const notify = (
    message: string,
    type: 'success' | 'error' | 'info' = 'info') => {
    const id = Math.random().toString(36).substr(2, 9);
    setNotifications((prev) => [
      ...prev,
      {
        id,
        message,
        type
      }]
    );
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 3000);
  };
  // Cart Handlers
  const handleAddToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ?
            {
              ...item,
              quantity: item.quantity + 1
            } :
            item
        );
      }
      return [
        ...prev,
        {
          product,
          quantity: 1,
          addedAt: new Date()
        }];

    });
    notify(`Added ${product.name} to cart`, 'success');
  };
  const handleRemoveFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    notify('Item removed from cart', 'info');
  };
  const handleCheckout = () => {
    if (!user) {
      setIsCartOpen(false);
      setAuthTab('signin');
      setIsAuthOpen(true);
      notify('Please sign in to checkout', 'error');
      return;
    }
    notify('Checkout functionality coming soon!', 'info');
  };
  // Category Scroll Handler
  const handleCategorySelect = (category: string) => {
    setActiveCategory(category);
    const element = sectionRefs.current[category];
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 120; // offset for fixed header + nav
      window.scrollTo({
        top: y,
        behavior: 'smooth'
      });
    }
  };
  return (
    <div className="min-h-screen bg-surface-primary text-txt-primary font-body flex flex-col">
      <Notification
        notifications={notifications}
        onDismiss={(id) =>
          setNotifications((prev) => prev.filter((n) => n.id !== id))
        } />


      <Header
        scrolled={scrolled}
        user={user}
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        onLoginClick={() => {
          setAuthTab('signin');
          setIsAuthOpen(true);
        }}
        onSignUpClick={() => {
          setAuthTab('signup');
          setIsAuthOpen(true);
        }}
        onContactClick={() => setIsContactOpen(true)}
        onSupplierClick={() => setIsSupplierOpen(true)}
        onCartClick={() => setIsCartOpen(true)}
        onLogout={() => {
          setUser(null);
          notify('Logged out successfully', 'info');
        }}
        onCategorySelect={handleCategorySelect} />


      <CategoryNav
        activeCategory={activeCategory}
        onCategorySelect={handleCategorySelect} />


      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-6 pt-8 md:pt-12 pb-16">
        <div className="mb-8">
          <h1 className="font-heading font-bold text-2xl md:text-3xl text-txt-primary tracking-tight mb-2">
            Marketplace Overview
          </h1>
          <p className="text-sm text-txt-secondary font-body">
            Browse our curated selection of premium digital assets and licenses.
          </p>
        </div>

        <ProductSection
          ref={(el) => {
            sectionRefs.current['Accounts'] = el;
          }}
          title="Accounts"
          products={mockProductsAccounts}
          accentLabel="HOT"
          onBuyClick={handleAddToCart}
        />
 
        <PromoBanner />

        <ProductSection
          ref={(el) =>{ sectionRefs.current['Software'] = el}}
          title="Software"
          products={mockProductsSoftware}
          onBuyClick={handleAddToCart} />


        <ProductSection
          ref={(el) => {sectionRefs.current['Gift Cards'] = el}}
          title="Gift Cards"
          products={mockProductsGiftCards}
          onBuyClick={handleAddToCart} />


        <ProductSection
          ref={(el) => {sectionRefs.current['Game Keys'] = el}}
          title="Game Keys"
          products={mockProductsGameKeys}
          onBuyClick={handleAddToCart} />


        <ProductSection
          ref={(el) => {sectionRefs.current['VPN & Security'] = el}}
          title="VPN & Security"
          products={mockProductsVPN}
          onBuyClick={handleAddToCart} />


        <ProductSection
          ref={(el) => {sectionRefs.current['Subscriptions'] = el}}
          title="Subscriptions"
          products={mockProductsSubscriptions}
          onBuyClick={handleAddToCart} />

      </main>

      <Footer />
      <ChatWidget />

      {/* Modals & Drawers */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        initialTab={authTab}
        onAuthSuccess={(userData) => {
          setUser(userData);
          setIsAuthOpen(false);
          notify(`Welcome back, ${userData.username}!`, 'success');
        }} />


      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        onSuccess={() => {
          setIsContactOpen(false);
          notify('Message sent successfully. We will reply soon.', 'success');
        }} />


      <SupplierModal
        isOpen={isSupplierOpen}
        onClose={() => setIsSupplierOpen(false)}
        onSuccess={() => {
          setIsSupplierOpen(false);
          notify(
            'Application submitted! We will review within 48 hours.',
            'success'
          );
        }} />


      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onRemoveItem={handleRemoveFromCart}
        onCheckout={handleCheckout} />

    </div>);

}
export default Home;