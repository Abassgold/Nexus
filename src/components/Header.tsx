import React, { useState } from 'react';
import { MenuIcon, XIcon, ShoppingBagIcon, LogOutIcon } from 'lucide-react';
import { flatCategoryLinks } from '../data/mockData';
interface HeaderProps {
  scrolled: boolean;
  user: {
    username: string;
    email: string;
  } | null;
  cartCount: number;
  onLoginClick: () => void;
  onSignUpClick: () => void;
  onContactClick: () => void;
  onSupplierClick: () => void;
  onCartClick: () => void;
  onLogout: () => void;
  onCategorySelect: (category: string) => void;
}
export function Header({
  scrolled,
  user,
  cartCount,
  onLoginClick,
  onSignUpClick,
  onContactClick,
  onSupplierClick,
  onCartClick,
  onLogout,
  onCategorySelect
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const handleMobileNav = (action: () => void) => {
    action();
    setMobileMenuOpen(false);
  };
  return (
    <>
      <header
        className={`fixed top-0 w-full h-14 z-50 transition-all duration-150 border-b border-border-subtle flex items-center px-4 md:px-6
          ${scrolled ? 'bg-surface-secondary/80 backdrop-blur-md' : 'bg-surface-secondary'}
        `}>

        <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
          {/* Logo */}
          <div
            className="flex items-baseline gap-2 cursor-pointer"
            onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: 'smooth'
            })
            }>

            <h1 className="font-heading font-bold text-xl text-txt-primary tracking-tight">
              NE<span className="text-accent">X</span>US
            </h1>
            <span className="text-txt-muted text-[10px] tracking-[0.2em] font-medium uppercase hidden sm:inline-block">
              Market
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <button
              onClick={onContactClick}
              className="text-sm font-subheading text-txt-secondary hover:text-txt-primary transition-colors">

              Contact
            </button>

            {user ?
            <div className="flex items-center gap-4">
                <button
                onClick={onSupplierClick}
                className="text-xs font-semibold text-accent border border-accent/30 hover:border-accent hover:bg-accent/10 px-4 py-1.5 rounded-sm transition-all duration-150">

                  Supplier Dashboard
                </button>
                <div className="h-4 w-px bg-border-subtle mx-1"></div>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center text-accent font-bold text-xs uppercase">
                    {user.username.charAt(0)}
                  </div>
                  <span className="text-sm font-subheading text-txt-primary">
                    {user.username}
                  </span>
                </div>
                <button
                onClick={onLogout}
                className="text-txt-muted hover:text-red-500 transition-colors ml-2"
                title="Logout">

                  <LogOutIcon size={16} />
                </button>
              </div> :

            <>
                <button
                onClick={onLoginClick}
                className="text-sm font-subheading text-txt-secondary hover:text-txt-primary transition-colors">

                  Login
                </button>
                <div className="h-4 w-px bg-border-subtle mx-2"></div>
                <button
                onClick={onSignUpClick}
                className="text-xs font-semibold text-accent border border-accent/30 hover:border-accent hover:bg-accent/10 px-4 py-1.5 rounded-sm transition-all duration-150">

                  Sign Up
                </button>
                <button
                onClick={onSupplierClick}
                className="text-xs font-semibold bg-accent text-surface-primary hover:bg-accent-hover px-4 py-1.5 rounded-sm transition-all duration-150">

                  Become a Supplier
                </button>
              </>
            }

            {/* Cart Button */}
            <button
              onClick={onCartClick}
              className="relative text-txt-secondary hover:text-txt-primary transition-colors ml-2">

              <ShoppingBagIcon size={20} />
              {cartCount > 0 &&
              <span className="absolute -top-1.5 -right-1.5 bg-accent text-surface-primary text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-surface-secondary">
                  {cartCount}
                </span>
              }
            </button>
          </nav>

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center gap-4">
            <button
              onClick={onCartClick}
              className="relative text-txt-secondary hover:text-txt-primary transition-colors">

              <ShoppingBagIcon size={20} />
              {cartCount > 0 &&
              <span className="absolute -top-1.5 -right-1.5 bg-accent text-surface-primary text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-surface-secondary">
                  {cartCount}
                </span>
              }
            </button>
            <button
              className="text-txt-secondary hover:text-txt-primary"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>

              {mobileMenuOpen ? <XIcon size={20} /> : <MenuIcon size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen &&
      <div className="fixed inset-0 top-14 z-40 bg-surface-primary border-t border-border-subtle animate-fade-in md:hidden flex flex-col overflow-y-auto pb-8">
          {/* User Section */}
          {user ?
        <div className="p-4 border-b border-border-subtle bg-surface-secondary flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center text-accent font-bold text-lg uppercase">
                  {user.username.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-subheading text-txt-primary">
                    {user.username}
                  </div>
                  <div className="text-xs text-txt-secondary">{user.email}</div>
                </div>
              </div>
              <button
            onClick={() => handleMobileNav(onLogout)}
            className="text-txt-muted hover:text-red-500 p-2">

                <LogOutIcon size={18} />
              </button>
            </div> :

        <div className="p-4 border-b border-border-subtle grid grid-cols-2 gap-3">
              <button
            onClick={() => handleMobileNav(onLoginClick)}
            className="w-full text-sm font-semibold text-txt-primary bg-surface-tertiary border border-border-subtle px-4 py-2.5 rounded-sm">

                Login
              </button>
              <button
            onClick={() => handleMobileNav(onSignUpClick)}
            className="w-full text-sm font-semibold text-accent border border-accent/30 px-4 py-2.5 rounded-sm">

                Sign Up
              </button>
            </div>
        }

          {/* Categories */}
          <div className="p-4">
            <h3 className="text-xs font-heading font-semibold text-txt-muted uppercase tracking-wider mb-3">
              Categories
            </h3>
            <div className="flex flex-col gap-1">
              {flatCategoryLinks.map((link) =>
            <button
              key={link}
              onClick={() => handleMobileNav(() => onCategorySelect(link))}
              className="text-left text-sm font-subheading text-txt-secondary hover:text-accent py-2.5 border-b border-border-subtle last:border-0">

                  {link}
                </button>
            )}
            </div>
          </div>

          {/* Utilities */}
          <div className="p-4 mt-auto">
            <button
            onClick={() => handleMobileNav(onContactClick)}
            className="w-full text-left text-sm font-subheading text-txt-secondary hover:text-txt-primary py-3 border-b border-border-subtle">

              Contact Support
            </button>
            <button
            onClick={() => handleMobileNav(onSupplierClick)}
            className="w-full mt-4 text-sm font-semibold bg-accent text-surface-primary px-4 py-3 rounded-sm">

              Become a Supplier
            </button>
          </div>
        </div>
      }
    </>);

}