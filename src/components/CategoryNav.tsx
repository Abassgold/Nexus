import React, { useState } from 'react';
import { ChevronDownIcon, ChevronRightIcon, XIcon } from 'lucide-react';
import { megaMenuCategories, flatCategoryLinks } from '../data/mockData';
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
    megaMenuCategories[0].name
  );
  return (
    <div className="sticky top-14 z-40 w-full bg-surface-tertiary border-b border-border-subtle">
      <div className="max-w-7xl mx-auto flex items-center h-12 relative">
        {/* Mega Menu Trigger (Desktop Only) */}
        <div
          className="h-full hidden md:flex items-center"
          onMouseEnter={() => setIsMegaMenuOpen(true)}
          onMouseLeave={() => setIsMegaMenuOpen(false)}>

          <button
            className="h-full px-6 flex items-center gap-2 bg-surface-elevated border-r border-border-subtle hover:bg-surface-secondary transition-colors text-sm font-subheading font-medium text-txt-primary"
            onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}>

            Select a Category
            <ChevronDownIcon size={14} className="text-txt-muted" />
          </button>

          {/* Mega Menu Dropdown */}
          {isMegaMenuOpen &&
          <div className="absolute top-12 left-0 w-150 bg-surface-elevated border border-border-subtle shadow-2xl animate-slide-down flex rounded-sm overflow-hidden">
              {/* Left Column - Main Categories */}
              <div className="w-1/3 bg-surface-tertiary border-r border-border-subtle py-2">
                {megaMenuCategories.map((cat) =>
              <div
                key={cat.name}
                onMouseEnter={() => setActiveMegaCategory(cat.name)}
                onClick={() => {
                  onCategorySelect(cat.name);
                  setIsMegaMenuOpen(false);
                }}
                className={`px-4 py-2 text-sm cursor-pointer flex items-center justify-between transition-colors
                      ${activeMegaCategory === cat.name ? 'bg-surface-elevated text-accent border-l-2 border-accent' : 'text-txt-secondary hover:text-txt-primary border-l-2 border-transparent'}
                    `}>

                    <span className="font-subheading">{cat.name}</span>
                    {cat.subcategories &&
                <ChevronRightIcon size={14} className="opacity-50" />
                }
                  </div>
              )}
              </div>

              {/* Right Column - Subcategories */}
              <div className="w-2/3 p-6 bg-surface-elevated relative">
                <button
                onClick={() => setIsMegaMenuOpen(false)}
                className="absolute top-2 right-2 text-txt-muted hover:text-txt-primary p-1">

                  <XIcon size={16} />
                </button>
                {megaMenuCategories.find((c) => c.name === activeMegaCategory)?.
              subcategories ?
              <div className="grid grid-cols-2 gap-6">
                    {megaMenuCategories.
                find((c) => c.name === activeMegaCategory)?.
                subcategories?.map((sub) =>
                <div key={sub.name}>
                          <h4 className="font-heading text-xs text-txt-primary mb-3 uppercase tracking-wider">
                            {sub.name}
                          </h4>
                          <ul className="space-y-2">
                            {sub.items.map((item) =>
                    <li key={item}>
                                <button
                        onClick={() => {
                          onCategorySelect(activeMegaCategory);
                          setIsMegaMenuOpen(false);
                        }}
                        className="text-sm font-body text-txt-secondary hover:text-accent transition-colors text-left">

                                  {item}
                                </button>
                              </li>
                    )}
                          </ul>
                        </div>
                )}
                  </div> :

              <div className="h-full flex items-center justify-center text-txt-muted text-sm font-body">
                    No subcategories available.
                  </div>
              }
              </div>
            </div>
          }
        </div>

        {/* Flat Links (Scrollable on Mobile) */}
        <div className="flex-1 overflow-x-auto no-scrollbar flex items-center px-4 gap-6">
          {flatCategoryLinks.map((link) =>
          <button
            key={link}
            onClick={() => onCategorySelect(link)}
            className={`text-sm font-subheading whitespace-nowrap transition-colors py-3 border-b-2
                ${activeCategory === link ? 'text-accent border-accent' : 'text-txt-secondary border-transparent hover:text-txt-primary'}
              `}>

              {link}
            </button>
          )}
        </div>
      </div>
    </div>);

}