'use client';
import { ProductSection } from '@/components/ProductSection';
import { PromoBanner } from '@/components/PromoBanner';
import { mockProductsAccounts, mockProductsGameKeys, mockProductsGiftCards, mockProductsSoftware, mockProductsSubscriptions, mockProductsVPN} from '@/data/mockData';
import { getCategories, getSubCategories } from '@/fetchApi/Social-Accounts';
import { useEffect, useState, useRef } from 'react';

function Accounts() {
  const [scrolled, setScrolled] = useState(false);

  const sectionRefs = useRef<{
    [key: string]: HTMLElement | null;
  }>({});
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

   useEffect(() => {
  console.log(getCategories())
  console.log(getSubCategories(22))
  }, []);
  return (
    <>
      <div className="mb-8 mt-8">
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
      />

      <PromoBanner />

      <ProductSection
        ref={(el) => { sectionRefs.current['Software'] = el }}
        title="Software"
        products={mockProductsSoftware}
         />


      <ProductSection
        ref={(el) => { sectionRefs.current['Gift Cards'] = el }}
        title="Gift Cards"
        products={mockProductsGiftCards}
        />


      <ProductSection
        ref={(el) => { sectionRefs.current['Game Keys'] = el }}
        title="Game Keys"
        products={mockProductsGameKeys}
        />


      <ProductSection
        ref={(el) => { sectionRefs.current['VPN & Security'] = el }}
        title="VPN & Security"
        products={mockProductsVPN}
         />


      <ProductSection
        ref={(el) => { sectionRefs.current['Subscriptions'] = el }}
        title="Subscriptions"
        products={mockProductsSubscriptions}
        />
    </>
  );

}
export default Accounts;