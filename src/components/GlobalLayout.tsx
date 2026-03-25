'use client';
import { AuthModal } from '@/components/AuthModal';
import { CategoryNav } from '@/components/CategoryNav';
import { ChatWidget } from '@/components/ChatWidget';
import { ContactModal } from '@/components/ContactModal';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { SupplierModal } from '@/components/SupplierModal';
import { useEffect, useState, useRef } from 'react';

function GlobalLayout(
    {
        children,
    }: Readonly<{
        children: React.ReactNode;
    }>
) {
    const [scrolled, setScrolled] = useState(false);
   
    const [activeCategory, setActiveCategory] = useState('Accounts');
    const [isAuthOpen, setIsAuthOpen] = useState(false);
    const [authTab, setAuthTab] = useState<'signin' | 'signup'>('signin');
    const [isContactOpen, setIsContactOpen] = useState(false);
    const [isSupplierOpen, setIsSupplierOpen] = useState(false);
    const sectionRefs = useRef<{
        [key: string]: HTMLElement | null;
    }>({});
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    // Notification Helper
   
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
            <Header
                scrolled={scrolled}
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
                onCategorySelect={handleCategorySelect}
            />


            <CategoryNav
                activeCategory={activeCategory}
                onCategorySelect={handleCategorySelect}
            />


            {children}

            <Footer />
            <ChatWidget />

            {/* Modals & Drawers */}
            <AuthModal
                isOpen={isAuthOpen}
                onClose={() => setIsAuthOpen(false)}
                initialTab={authTab}
                />


            <ContactModal
                isOpen={isContactOpen}
                onClose={() => setIsContactOpen(false)}
                onSuccess={() => {
                    setIsContactOpen(false);
                }} />


            <SupplierModal
                isOpen={isSupplierOpen}
                onClose={() => setIsSupplierOpen(false)}
                onSuccess={() => {
                    setIsSupplierOpen(false);
                }}
            />
        </div>
    );

}
export default GlobalLayout;