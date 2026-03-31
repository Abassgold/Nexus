'use client';
import { AuthModal } from '@/components/AuthModal';
import { CategoryNav } from '@/components/CategoryNav';
import { ChatWidget } from '@/components/ChatWidget';
import { ContactModal } from '@/components/ContactModal';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { SupplierModal } from '@/components/SupplierModal';
import Home from '@/page/Home';
import { useEffect, useState, useRef } from 'react';

function Page() {
  const [scrolled, setScrolled] = useState(false);

  const [activeCategory, setActiveCategory] = useState('Accounts');
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
      />
      <CategoryNav
        activeCategory={activeCategory}
        onCategorySelect={handleCategorySelect}
      />
      <Home />
      <Footer />
      <ChatWidget />
    </div>
  );

}
export default Page;