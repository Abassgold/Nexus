import { useState } from 'react';
import { ChevronDownIcon, ChevronRightIcon, XIcon } from 'lucide-react';
import {  flatCategoryLinks } from '../data/mockData';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
interface CategoryNavProps {
  activeCategory: string;
  onCategorySelect: (category: string) => void;
}
export function CategoryNav({
  activeCategory,
  onCategorySelect
}: CategoryNavProps) {
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [activeMegaCategory, setActiveMegaCategory] = useState<string>(
  );
  //  md:flex items-center gap-6
  const path = usePathname();
  return (
    <div className="hidden md:block sticky top-14 z-40 w-full bg-surface-tertiary border-b border-border-subtle">
      <div className="max-w-7xl mx-auto flex items-center h-12 relative">
        {/* Flat Links (Scrollable on Mobile) */}
        <div className="flex-1  overflow-x-auto no-scrollbar flex justify-center items-center px-4 gap-6">
          {flatCategoryLinks.map((link, index) =>
            <Link
              key={index}
              href={link.link}
              onClick={() => onCategorySelect(link.name)}
              className={`text-sm font-subheading whitespace-nowrap transition-colors py-3 border-b-2
                ${path === link.link ? 'text-accent border-accent' : 'text-txt-secondary border-transparent hover:text-txt-primary'}
              `}>
              {link.name}
            </Link>
          )}
        </div>
      
      </div>
    </div>);

}